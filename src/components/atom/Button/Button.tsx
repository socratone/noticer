import clsx from 'clsx';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  /** 좌우 좁은 패딩 */
  compact?: boolean;
}

const Button = ({
  children,
  onClick,
  type = 'button',
  compact,
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, { [styles.compact]: compact })}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
