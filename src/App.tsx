import './App.css';
import Button from './components/atom/Button';
import Stack from './components/atom/Stack';
import TextField from './components/atom/TextField';
import useScheduledNotification from './hooks/useScheduledNotification';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// zod 스키마 정의
const notificationSchema = z.object({
  message: z
    .string()
    .min(1, '메시지를 입력해주세요.')
    .max(100, '메시지는 100자 이하로 입력해주세요.'),
  time: z
    .string()
    .min(1, '시간을 입력해주세요.')
    .regex(
      /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
      '올바른 시간 형식(HH:mm)을 입력해주세요.'
    ),
});

// zod 스키마에서 타입 추출
type NotificationFormData = z.infer<typeof notificationSchema>;

function App() {
  const { scheduleNotifications, clearNotification, clearAllNotifications } =
    useScheduledNotification();

  // react-hook-form 설정 - zod resolver 사용
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  });

  const [notifications, setNotifications] = useState<
    { message: string; time: string }[]
  >([]);

  // 알림 목록에 추가 - react-hook-form 사용
  const addNotification = (data: NotificationFormData) => {
    const newNotification = { message: data.message, time: data.time };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    reset(); // 폼 초기화
  };

  // 특정 알림 제거 (목록에서 제거 + 예약 취소)
  const removeNotification = (index: number) => {
    const notification = notifications[index];
    // 예약된 알림도 함께 취소
    clearNotification(notification.time);
    // 목록에서 제거
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <Stack direction="column" gap={16}>
        {/* 새로운 예약 알림 테스트 */}
        <Stack direction="column" gap={8}>
          <form onSubmit={handleSubmit(addNotification)}>
            <Stack direction="column" gap={8}>
              <TextField placeholder="알림 메시지" {...register('message')} />
              {errors.message && (
                <span style={{ color: 'red' }}>{errors.message.message}</span>
              )}

              <TextField
                placeholder="시간 (HH:mm 형식, 예: 14:30)"
                {...register('time')}
              />
              {errors.time && (
                <span style={{ color: 'red' }}>{errors.time.message}</span>
              )}

              <Button type="submit">알림 추가</Button>
            </Stack>
          </form>

          <hr style={{ width: '100%' }} />
          <Stack direction="row" gap={8}>
            <Button onClick={() => scheduleNotifications(notifications)}>
              모든 알림 예약
            </Button>
            <Button onClick={clearAllNotifications}>모든 알림 취소</Button>
          </Stack>
          <hr style={{ width: '100%' }} />

          {/* 알림 목록 표시 */}
          {notifications.length > 0 && (
            <Stack direction="column" gap={4}>
              <p>예약된 알림 목록:</p>
              {notifications.map((notification, index) => (
                <Stack key={index} direction="row" gap={8}>
                  <span>
                    {notification.time} - {notification.message}
                  </span>
                  <Button onClick={() => removeNotification(index)}>
                    삭제
                  </Button>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
}

export default App;
