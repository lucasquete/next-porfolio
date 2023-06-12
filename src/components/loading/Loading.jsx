import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
        <div className={styles.circle}>
            <div className={styles.circleBg}>Loading...</div>
        </div>
    </div>
  )
}

export default Loading