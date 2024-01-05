'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function updateData({params}){
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () =>{
            const res = await fetch(`/api/user_login/${params,user}`);
            const data = await res.json();

            if (res.valid){
                setUserInfo(data.user);  
            }
        };
        
        fetchData();
    }, []);

    const eliminar = async () => {
        const id = userInfo.id;

        const res = await fetch(`/api/usel_login/${params.user}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });

        if (res.valid){
            const data = await res.json();

            if(data.message === 'user deleted'){
                router.push('/user_login/user_log');
            }
        }
    };

    const handleToggleOffers = async (active) => {
        const res = await fetch(`/api/user_login/${params.user}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body :JSON.stringify({
                recibirOfertas: active
            })
        });
    }

    
}


