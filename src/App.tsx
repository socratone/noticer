import './App.css';
import Button from './components/atom/Button';
import Stack from './components/atom/Stack';
import TextField from './components/atom/TextField';
import useNotification from './hooks/useNotification';

function App() {
  const { showNotification } = useNotification();

  return (
    <>
      <Stack direction="row" gap={8}>
        <TextField placeholder="테스트" />
        <Button onClick={() => showNotification('테스트')}>Button</Button>
      </Stack>
    </>
  );
}

export default App;
