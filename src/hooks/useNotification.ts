import { useEffect } from 'react';

const useNotification = () => {
  // 앱이 처음 로드될 때 알림 권한 요청
  useEffect(() => {
    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한이 승인되었습니다.');
        }
      });
    }
  }, []);

  const showNotification = (message: string) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(message, {
        // 아이콘 추가 (권장 크기: 192x192 픽셀)
        icon: '/vite.svg',
      });

      // 알림 클릭 시 현재 앱의 탭으로 포커스 이동
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  return {
    showNotification,
  };
};

export default useNotification;
