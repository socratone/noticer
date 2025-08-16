import styles from './Stack.module.css';

interface StackProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const Stack = ({
  children,
  direction = 'column',
  gap,
  alignItems,
  justifyContent,
}: StackProps) => {
  return (
    <div
      className={styles.stack}
      style={{ flexDirection: direction, gap, alignItems, justifyContent }}
    >
      {children}
    </div>
  );
};

export default Stack;
