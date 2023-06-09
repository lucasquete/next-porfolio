import React from 'react';
import styles from "./footer.module.css";
import Image from 'next/image';

const Footer = () => {
  return (
    <div className={styles.container}>  
        <div>2023 Vahalla.ai. All rights reserved.</div>
        <div className={styles.social}>
          <Image src={"/1.png"} width={25} height={25} className={styles.icon} alt='vahalla'/>
          <Image src={"/2.png"} width={25} height={25} className={styles.icon} alt='vahalla'/>
          <Image src={"/3.png"} width={25} height={25} className={styles.icon} alt='vahalla'/>
          <Image src={"/4.png"} width={25} height={25} className={styles.icon} alt='vahalla'/>
        </div>
    </div>
  )
}

export default Footer