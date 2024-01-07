'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function updateData({params}){
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const res = await fetch(`/api/user_login/${params.user}`);
                const data = await res.json();

                if (res.ok){
                    setUserInfo(data.user);  
                }
            } catch (error){
                console.error('ERROR at looking data: ', error);
            }
        };
        
        fetchData();
    }, []);

    const deleteUser = async () => {
        const id = userInfo.id;
        try{
            const res = await fetch(`/api/user_login/${params.user}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });
    
            if (res.ok){
                const data = await res.json();
    
                if(data.message === 'user deleted'){
                    router.push('/user_login/user_log');
                }
            }
        } catch (error){
            console.error('ERROR --> user not deleted: ', error);
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

        if (res.ok) {
            const userData = await res.json();
            setUserInfo(userData.user); 
        } 
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                {userInfo ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">User data: {userInfo.id}</h1>
                        <p><strong>User:</strong> {userInfo.user}</p>
                        <p><strong>Email:</strong> {userInfo.email}</p>
                        <p><strong>Age:</strong> {userInfo.edad}</p>
                        <p><strong>City:</strong> {userInfo.ciudad}</p>
                        <p><strong>Looking for:</strong> {userInfo.intereses}</p>
                        <p><strong>Enable Offers:</strong> {userInfo.recibirOfertas ? 'Sí' : 'No'}</p>

                        <h2 className="text-lg font-semibold mt-4">User Options</h2>

                        <button className="block px-4 py-2 mb-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300" onClick={deleteUser}>
                            Shut Down Account
                        </button>
                        

                        <button className="block px-4 py-2 mb-4 text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300" onClick={() => handleToggleOffers(!userInfo.recibirOfertas)}>
                            {userInfo.recibirOfertas ? 'Disable Offers' : 'Enable Offers'}
                        </button>


                        <button className="block px-4 py-2 mb-4 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:border-yellow-300" onClick={() => router.push(`/usuario/modDatos/${userInfo.id}`)}>
                            Update Data
                        </button>

                        {/*cambiar ruta*/}
                        <Link href="/usuario/buscarComercios">
                            <p className="block px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:border-pink-300">
                                Search shop and make a review
                            </p>
                        </Link>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}
            </div>
        </div>
    );
}


