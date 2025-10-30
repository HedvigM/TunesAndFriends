import { colors } from 'styles/theme';

type LoadingSpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  color?: string;
};

export const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 24,
    medium: 48,
    large: 64,
  };

  const spinnerSize = sizeMap[size];

  return (
    <div className="spinner-container">
      <div className="spinner" />

      <style jsx>{`
        .spinner-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .spinner {
          width: ${spinnerSize}px;
          height: ${spinnerSize}px;
          border: 2px solid lightgrey;
          border-top-color: ${ colors.third };
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
