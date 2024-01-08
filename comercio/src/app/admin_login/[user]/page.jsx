'use client'

import { useEffect, useState } from "react"

export default function adminLog({paramas}){
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/admin_log/${paramas.user}`);
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
        <div className="min-h-screen flex items-center justify-center bg-white-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                {admin ? (
                    <div className="flex items-center justify-center mb-4"> 
                        <div>
                            <h1 className="text-2xl font-bold"> Welcome {admin.user} </h1>
                        </div>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}

                <Link href="/admin_login/admin/shop">
                    <p className="block px-4 py-2 mb-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                        Admin Shops
                    </p>
                </Link>
            </div>
        </div>
    );
}