'use client'

import { useState } from "react"
import {useRouter} from 'next/navigation'
import Login from "@/app/components/login";

export default function logPage(){
    const [values, setValues] = useState({user: '', password: ''});

    const updValues = (a) => {
        const {name, value} = a.target;
        setValues({...values, [name]:value});
    }

    const router = useRouter();

    const logValues = async (a) => {
        a.preventDefault();

        try{
            const res = await fetch('/api/comercio_login/shop_log', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            
            if(data.ok){
                router.push(`/comercio_login/${values.user}`);
            }
        } catch (error){
            console.error('ERROR --> ', error);
        }
    }

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-3 py-2">Login Shop</h1>
                <Login values={values} setValues={updValues} submit={logValues}></Login>
            </div>
        </div>
    );
}