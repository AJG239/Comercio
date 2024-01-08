'use client' ;

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "../../components/login";
import Link from "next/link"

export default function user_Log(){
    const [values, setValues] = useState({user: '', password: ''});
    const router = useRouter();

    const UpdateValues = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]:value});
    }

    const LogUser = async (a) => {
        a.preventDefault();
        
        try{
            const response = await fetch('/api/user_login/user_log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });
            
            const data = await response.json();
            console.log(data);

            if (data.ok){
                router.push(`/user_login/${values.user}`);
            }
        } catch (error){
            console.error('ERROR: ', error);
        }
            
    };

    return(
        <div className="min-h-10 flex items-center justify-center bg-indigo-100">
            <div className="max-w-md w-full p-6 bg-transparent rounded-lg">
                <h1 className="text-2xl font-bold mb-3 py-2">Login User</h1>
                <Login values={values} setValues={UpdateValues} submit={LogUser}></Login>
                <p>Don't have an account? <Link href='/user_login/user_register'>Sign Up</Link></p>
            </div>
        </div>
    );
}