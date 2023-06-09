import React from 'react'
import styles from "./porfolio.module.css";
import Link from 'next/link';

const Porfolio = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.selectedTitle}>Choose a gallary</h1>
      <div className={styles.items}>
        <Link href={"porfolio/illustrations"} className={styles.item}>
          <span className={styles.title}>Illustrations</span>
        </Link>
        <Link href={"porfolio/websites"} className={styles.item}>
          <span className={styles.title}>Websites</span>
        </Link>
        <Link href={"porfolio/applications"} className={styles.item}>
          <span className={styles.title}>Applications</span>
        </Link>
      </div>
    </div>
  )
}

export default Porfolio