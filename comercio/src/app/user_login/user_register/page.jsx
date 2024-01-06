'use client'

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function userRegister(){
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        user: '',
        email: '',
        password: '',
        ciudad: '',
        intereses: '',
        recibirOfertas: false
    });

    const changeInfo = (e) => {
        const {name, value, type, checked} = e.target;
        setUserInfo({...userInfo, [name]: type === ' checbox' ? checked : value});
    };

    const registerInfo = async (e) => {
        const res = await fetch('/api/user_login/user_register', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify(userInfo)
        });

        if (res.ok){
            router.push('/user_login/user_log');
        }
    };

    return(
        <div>
            <div>
            <h1 className="text-2xl font-bold mb-4">Register User</h1>
                <form onSubmit={registerInfo}>
                    <label className="block mb-2">
                        Name:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="user"
                            value={userInfo.user}
                            onChange={changeInfo}
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Email:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="email"
                            value={userInfo.email}
                            onChange={changeInfo}
                        />
                    </label>
                    <label className="block mb-2">
                        <Password></Password>:
                        <input
                            className="w-full border p-2"
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={changeInfo}
                            required
                        />
                    </label>
                    <label className="block mb-2">
                        Age:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="edad"
                            value={userInfo.edad}
                            onChange={changeInfo}
                        />
                    </label>
                    <label className="block mb-2">
                        Ciudad:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="ciudad"
                            value={userInfo.ciudad}
                            onChange={changeInfo}
                        />
                    </label>
                    <label className="block mb-2">
                        Intereses:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="intereses"
                            value={userInfo.intereses}
                            onChange={changeInfo}
                        />
                    </label>
                    <label className="block mb-2">
                        Enable Offers:
                        <input
                            className="ml-2"
                            type="checkbox"
                            name="recibirOfertas"
                            checked={userInfo.recibirOfertas}
                            onChange={changeInfo}
                        />
                    </label>
                    <button className="block px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    )
}

