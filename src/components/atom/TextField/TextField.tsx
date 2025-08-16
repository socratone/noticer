import clsx from 'clsx';
import styles from './TextField.module.css';
import { forwardRef } from 'react';

interface TextFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  fullWidth?: boolean;
  className?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { placeholder, value, onChange, name, fullWidth, className, ...props },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={clsx(
          styles.input,
          {
            [styles.fullWidth]: fullWidth,
          },
          className
        )}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
      />
    );
  }
);

export default TextField;
