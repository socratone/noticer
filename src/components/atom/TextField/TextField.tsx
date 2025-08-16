import styles from './TextField.module.css';
import { forwardRef } from 'react';

interface TextFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ placeholder, value, onChange, name, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={styles.input}
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
