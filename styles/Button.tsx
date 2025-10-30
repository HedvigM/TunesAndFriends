import Link, { LinkProps } from 'next/link';
import styles from './button.module.scss';

type Props =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      element?: 'button';
      active?: boolean;
      color?: string;
      icon?: React.ReactNode;
    })
  | (LinkProps & {
      children: React.ReactNode;
      element: 'a';
      color?: string;
      icon?: React.ReactNode;
    });

export const Button = (props: Props) => {
  if (props.element === 'a') {
    return (
      <div /* className={styles.wrapper} */>
        <Link className={styles.button} {...props} />
      </div>
    );
  } else {
    return (
      <div /* className={styles.wrapper} */>
        <button
        style={{ color: props.color }}
        className={`${props.active ? styles.buttonActive : styles.button} ${props.icon && styles.buttonIcon}`}
        active={props.active}
        {...props}
        >
          {props.icon}
          {props.children}
        </button>
      </div>
    );
  }
};