'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation'
import Login from "@/app/components/login";


export default function adminLogPage() {
    const [values, setValues] = useState({user: '', password: ''});
    
    const valuesUpd = (a) => {
        const {name, value} = a.target;
        setValues({...values, [name]: value})
    };

    const router = useRouter();

    const admin_Log = async (a) => {
        a.preventDefault();

        try{
            const response = await fetch('/api/admin_login/admin_log', {
                method: 'POST',
                header:{
                    'Content_type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (data.ok){
                router.push(`/admin_login/${values.user}`);
            }
        } catch (error){
            console.error('ERROR ', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-3 py-2">Login Admin</h1>
                <Login values={values} setValues={valuesUpd} submit={admin_Log}></Login>
            </div>
        </div>
    );
}