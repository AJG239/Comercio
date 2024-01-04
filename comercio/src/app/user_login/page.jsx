"use client"

import 'bootstrap-icons/font/bootstrap-icons.css';
import styles from './../styles/logs.css';

export default function User_Login(){
    return(
        <div className={styles.bod}>
            <div className={styles.wrapper}>
                <form>
                    <h1 className='text-center'>Sign In</h1>

                    <form className={styles.input_box}>
                        <i class="bi bi-envelope-fill"></i>
                        <input type="text" placeholder="E-mail" required></input>
                    </form>

                    <form className={styles.input_box}>
                        <i class="bi bi-lock"></i>
                        <input type='password' placeholder='Password' required></input>
                    </form>

                    <form className={styles.remember_forgot}>
                        <label><input type='checbox'></input><p>Remember me</p></label>
                    </form>

                    <button type='submit' className={styles.btn}>Login</button>
                </form>
            </div>
        </div>
    )
}