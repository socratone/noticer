import styles from './Stack.module.css';

interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
}

const Stack = ({ children, direction = 'column', gap = 0 }: StackProps) => {
  return (
    <div className={styles.stack} style={{ flexDirection: direction, gap }}>
      {children}
    </div>
  );
};

export default Stack;
