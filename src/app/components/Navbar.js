'use client'
import Cookies from "js-cookie";
import React from 'react'
import { useRouter } from 'next/navigation';

import styles from '@/app/styles/navbar.module.css'

const Navbar = () => {

    const router = useRouter();

    const handleLogOut = (e)=>{
        e.preventDefault();
        Cookies.remove("loggedin");
        router.push('/');

    }
  return (
    <>
      <div className={styles.btn}>
        <button onClick={handleLogOut}>Sign Out</button>
      </div>
    </>
  )
}

export default Navbar
