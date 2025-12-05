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
    // Destructure props that shouldn't be passed to the button element
    const { active, element, icon, color, ...buttonProps } = props;
    
    return (
      <div /* className={styles.wrapper} */>
        <button
          style={{ color: color }}
          className={`${active ? styles.buttonActive : styles.button} ${icon && styles.buttonIcon}`}
          {...buttonProps}
        >
          {icon}
          {props.children}
        </button>
      </div>
    );
  }
};