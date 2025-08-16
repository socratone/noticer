import { useCallback, useRef } from 'react';

/**
 * 알림 설정 타입 정의
 */
type NotificationItem = {
  message: string;
  time: string;
};

/**
 * 예약된 시간에 매일 반복되는 알림을 관리하는 훅
 * @returns scheduleNotification 함수와 clearNotification 함수를 반환
 */
const useScheduledNotification = () => {
  const timersRef = useRef<
    Map<string, { timeout: number; interval: number | null }>
  >(new Map());

  /**
   * HH:mm 형식의 시간 문자열을 파싱하여 오늘 날짜의 Date 객체로 변환
   * @param timeString - "HH:mm" 형식의 시간 문자열
   * @returns 오늘 날짜의 해당 시간 Date 객체
   */
  const parseTimeString = (timeString: string): Date => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);
    return targetTime;
  };

  /**
   * 다음 알림 시간까지의 밀리초를 계산
   * @param targetTime - 목표 시간 Date 객체
   * @returns 다음 알림까지의 밀리초
   */
  const getNextNotificationDelay = (targetTime: Date): number => {
    const now = new Date();
    const nextNotification = new Date(targetTime);

    // 오늘 해당 시간이 이미 지났다면 내일로 설정
    if (nextNotification <= now) {
      nextNotification.setDate(nextNotification.getDate() + 1);
    }

    return nextNotification.getTime() - now.getTime();
  };

  /**
   * 알림을 실제로 표시하는 함수
   * @param message - 표시할 메시지
   */
  const showNotification = (message: string) => {
    // 브라우저 알림이 지원되고 권한이 있는 경우
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(message, {
        icon: '/vite.svg',
      });
    }

    // 콘솔에도 출력
    console.log(`[${new Date().toLocaleTimeString()}] 예약 알림: ${message}`);
  };

  /**
   * 모든 예약된 알림을 취소
   */
  const clearAllNotifications = useCallback(() => {
    timersRef.current.forEach(({ timeout, interval }) => {
      clearTimeout(timeout);
      if (interval) {
        clearInterval(interval);
      }
    });
    timersRef.current.clear();
    console.log('모든 예약된 알림이 취소되었습니다.');
  }, []);

  /**
   * 여러 시간에 매일 반복되는 알림들을 예약
   * @param notifications - 알림 설정 배열
   */
  const scheduleNotifications = useCallback(
    (notifications: NotificationItem[]) => {
      // 기존 타이머들 정리
      clearAllNotifications();

      // 브라우저 알림 권한 요청
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            console.log('알림 권한이 승인되었습니다.');
          }
        });
      }

      notifications.forEach(({ message, time }) => {
        try {
          const targetTime = parseTimeString(time);
          const initialDelay = getNextNotificationDelay(targetTime);

          console.log(
            `알림이 예약되었습니다: "${message}" - ${time} (${Math.round(
              initialDelay / 1000 / 60
            )}분 후 첫 알림)`
          );

          // 첫 번째 알림 예약
          const timeout = setTimeout(() => {
            showNotification(message);

            // 24시간마다 반복하는 인터벌 설정
            const interval = setInterval(() => {
              showNotification(message);
            }, 24 * 60 * 60 * 1000); // 24시간 = 86,400,000ms

            // 인터벌 ID 저장
            const existingTimer = timersRef.current.get(time);
            if (existingTimer) {
              timersRef.current.set(time, { ...existingTimer, interval });
            }
          }, initialDelay);

          // 타이머 정보 저장
          timersRef.current.set(time, { timeout, interval: null });
        } catch (error) {
          console.error(`알림 예약 중 오류가 발생했습니다 (${time}):`, error);
        }
      });
    },
    [clearAllNotifications]
  );

  return {
    scheduleNotifications,
  };
};

export default useScheduledNotification;
