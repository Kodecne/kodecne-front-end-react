import styles from './TelaConexoes.module.css';

export function CompassLoader() {
  return (
    <div className={styles.loaderContainer}>
      <svg
        className={styles.compass}
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.compassCircle}
          cx="50"
          cy="50"
          r="45"
          stroke="#D0B9E9"
          strokeWidth="2"
        />
        <path
          className={styles.compassNeedle}
          d="M50 10 L45 50 L50 90 L55 50 Z"
          fill="#6A3696"
        />
        <circle cx="50" cy="50" r="5" fill="#6A3696" />
      </svg>
      <p className={styles.loaderText}>Buscando conexões...</p>
    </div>
  );
}