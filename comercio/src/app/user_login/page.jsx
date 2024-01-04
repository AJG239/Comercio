"use client"

import 'bootstrap-icons/font/bootstrap-icons.css';
import './../styles/logs.css';

export default function User_Login(){
    return(
        <div id='bod'>
            <div id='wrapper'>
                <form>
                    <h1 className='text-center'>Sign In</h1>

                    <form id='input_box'>
                        <i class="bi bi-envelope-fill"></i>
                        <input type="text" placeholder="E-mail" required></input>
                    </form>

                    <form id='input_box'>
                        <i class="bi bi-lock"></i>
                        <input type='password' placeholder='Password' required></input>
                    </form>

                    <form id='remember_forgot'>
                        <label><input type='checbox'></input><p>Remember me</p></label>
                    </form>

                    <button type='submit' id='btn'>Login</button>
                </form>
            </div>
        </div>
    )
}