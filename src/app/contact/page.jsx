import React from 'react';
import styles from "./page.module.css";
import Image from 'next/image';
import Button from '@/components/button/Button';

export const metadata = {
  title: 'Contact info',
  description: 'Vahalla ai contact page',
}

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's keep in touch</h1>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <Image src={"/contact.png"} alt='contact image' className={styles.image} fill={true}/>
        </div>
        <form className={styles.form}>
          <input type="text" placeholder='Name' className={styles.input}/>
          <input type="text" placeholder='Email' className={styles.input} />
          <textarea className={styles.textarea} placeholder='Message' cols="30" rows="10"></textarea>
          <Button url={"#"} text={"Send"}/>
        </form>
      </div>
    </div>
  )
}

export default Contact