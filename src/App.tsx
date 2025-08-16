import './App.css';
import Button from './components/atom/Button';
import Stack from './components/atom/Stack';
import TextField from './components/atom/TextField';
import useScheduledNotification from './hooks/useScheduledNotification';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
      '올바른 시간 형식(HH:mm)을 입력해주세요.',
    ),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

function App() {
  const { scheduleNotifications } = useScheduledNotification();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
  });

  // localStorage에서 저장된 알림 목록을 불러오는 함수
  const loadNotificationsFromStorage = (): {
    message: string;
    time: string;
  }[] => {
    try {
      const saved = localStorage.getItem('notifications');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('알림 목록을 불러오는 중 오류가 발생했습니다:', error);
      return [];
    }
  };

  // localStorage에 알림 목록을 저장하는 함수
  const saveNotificationsToStorage = (
    notifications: { message: string; time: string }[],
  ) => {
    try {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('알림 목록을 저장하는 중 오류가 발생했습니다:', error);
    }
  };

  const [notifications, setNotifications] = useState<
    { message: string; time: string }[]
  >(loadNotificationsFromStorage);

  // notifications 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveNotificationsToStorage(notifications);
  }, [notifications]);

  // 앱 시작 시 저장된 알림들을 예약
  useEffect(() => {
    const savedNotifications = loadNotificationsFromStorage();
    if (savedNotifications.length > 0) {
      scheduleNotifications(savedNotifications);
    }
  }, [scheduleNotifications]);

  const addNotification = (data: NotificationFormData) => {
    const newNotification = { message: data.message, time: data.time };
    const updatedNotifications = [...notifications, newNotification];
    setNotifications(updatedNotifications);
    // 새로운 알림 목록으로 자동 예약
    scheduleNotifications(updatedNotifications);
    reset();
  };

  // 특정 알림 제거 (목록에서 제거 + 전체 스케줄 재설정)
  const removeNotification = (index: number) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
    scheduleNotifications(updatedNotifications);
  };

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
      <Stack direction="column" gap={16}>
        {/* 새로운 예약 알림 테스트 */}
        <Stack direction="column" gap={8}>
          <form onSubmit={handleSubmit(addNotification)}>
            <Stack direction="column" gap={8}>
              <TextField placeholder="알림 메시지" {...register('message')} />
              {errors.message && (
                <span style={{ color: 'tomato' }}>
                  {errors.message.message}
                </span>
              )}

              <TextField placeholder="14:30" {...register('time')} />
              {errors.time && (
                <span style={{ color: 'tomato' }}>{errors.time.message}</span>
              )}

              <Button type="submit">⏰ 알림 추가</Button>
            </Stack>
          </form>

          {/* 알림 목록 표시 */}
          {notifications.length > 0 && (
            <Stack direction="column" gap={8}>
              <p>예약된 알림 목록:</p>
              {notifications.map((notification, index) => (
                <Stack
                  key={index}
                  direction="row"
                  gap={8}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <span>
                    {notification.time} - {notification.message}
                  </span>
                  <Button compact onClick={() => removeNotification(index)}>
                    🗑️ 삭제
                  </Button>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </div>
  );
}

export default App;
