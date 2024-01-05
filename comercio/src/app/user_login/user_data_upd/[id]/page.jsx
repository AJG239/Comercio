'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function updateUser({params}){
    const router = useRouter();
    const [userInfo, setUserInfo] = useState(null);
    const [userData, setUserData] = useState({
        user: '',
        email: '',
        password: '',
        ciudad: '',
        intereses: '',
        recibirOfertas: false
    });

    const changeInfo = (e) => {
        const {name, value, type, checked} = e.target;
        setUserInfo({...userData, [name]: type === ' checbox' ? checked : value});
    };

    const registerInfo = async (e) => {
        const res = await fetch(`/api/user_login/user_data_upd/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (res.value){
            setUserInfo(data.user);
        }
    }; 
}
