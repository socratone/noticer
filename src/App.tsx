import './App.css';
import Button from './components/atom/Button';
import Stack from './components/atom/Stack';
import TextField from './components/atom/TextField';
import useScheduledNotification from './hooks/useScheduledNotification';
import { useState } from 'react';

function App() {
  const { scheduleNotifications, clearNotification, clearAllNotifications } =
    useScheduledNotification();
  const [message, setMessage] = useState('');
  const [time, setTime] = useState('');
  const [notifications, setNotifications] = useState<
    { message: string; time: string }[]
  >([]);

  // 알림 목록에 추가
  const addNotification = () => {
    if (message && time) {
      const newNotification = { message, time };
      const updatedNotifications = [...notifications, newNotification];
      setNotifications(updatedNotifications);
      setMessage('');
      setTime('');
    } else {
      alert('메시지와 시간을 모두 입력해주세요.');
    }
  };

  // 특정 알림 제거
  const removeNotification = (index: number) => {
    const updatedNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(updatedNotifications);
  };

  return (
    <>
      <Stack direction="column" gap={16}>
        {/* 새로운 예약 알림 테스트 */}
        <Stack direction="column" gap={8}>
          <TextField
            placeholder="알림 메시지"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextField
            placeholder="시간 (HH:mm 형식, 예: 14:30)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button onClick={addNotification}>알림 추가</Button>
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
                    제거
                  </Button>
                  <Button onClick={() => clearNotification(notification.time)}>
                    이 시간 알림 취소
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
