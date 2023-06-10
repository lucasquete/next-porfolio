"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import styles from "./navbar.module.css";
import DarkMode from '../darkmode/DarkMode';
import { signOut, useSession } from 'next-auth/react';

const links = [
    {
      id: 1,
      title: "Home",
      url: "/",
    },
    {
      id: 2,
      title: "Portfolio",
      url: "/porfolio",
    },
    {
      id: 3,
      title: "Blog",
      url: "/blog",
    },
    {
      id: 4,
      title: "About",
      url: "/about",
    },
    {
      id: 5,
      title: "Contact",
      url: "/contact",
    },
    {
      id: 6,
      title: "Dashboard",
      url: "/dashboard",
    },
];

const Navbar = () => {

  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const useOutsideClick = (callback) => {
    const ref = useRef();
    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [ref]);

    return ref;
  }

  const handleClick = () => {
    setIsOpen(false);
  }

  const ref = useOutsideClick(handleClick);


  return (
    <div className={styles.container}>
        <Link href={"/"} className={styles.logo}>Vahalla.ai</Link>
        <DarkMode/>
        <div className={styles.links}>
          {links.map((link) => (
              <Link href={link?.url} key={link?.id} className={styles.link}>{link?.title}</Link>
          ))}
          {session.status === "authenticated" && (
            <button onClick={signOut} className={styles.logout}>Logout</button>
          )}
        </div>
        <div className={styles.open} onClick={() => setIsOpen(!isOpen)} ref={ref}>
          <div className={styles.line}/>
          <div className={styles.line}/>
          <div className={styles.line}/>
        </div>
        {isOpen && (  
          <div className={styles.sidebar}>
              <div className={styles.sideLinks}>
                {links.map((link) => (
                    <Link onClick={() => setIsOpen(false)} href={link?.url} key={link?.id} className={styles.link}>{link?.title}</Link>
                ))}
                {session.status === "authenticated" && (
                  <button onClick={signOut} className={styles.logout}>Logout</button>
                )}
              </div>
          </div>
        )}
    </div>
  )
}

export default Navbar