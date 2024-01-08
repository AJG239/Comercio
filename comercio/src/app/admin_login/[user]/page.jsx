'use client'

import { useEffect, useState } from "react"
import Link from 'next/link'

export default function adminLog({params}){
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/admin_log/${params.user}`);
                const data = await res.json();

                if(res.ok){
                    setAdmin(data.admin);
                }
            } catch (error){    
                console.log('ERROR ', error);
            }
        };
        fetchData();
    }, []);

    return(
        <div className="min-h-10 flex items-center justify-center bg-indigo-100">
            <div className="max-w-md w-full p-6 bg-transparent rounded-lg">
                {admin ? (
                    <div className="flex items-center justify-center mb-4"> 
                        <div>
                            <h1 className="text-2xl font-bold"> Welcome {admin.user} </h1>
                        </div>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}

                <Link href="/admin_login/admin_shop">
                    <p className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-lg hover:bg-indigo-600">Admin Shops</p>
                </Link>
            </div>
        </div>
    );
}