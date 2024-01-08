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
            console.error('ERROR user not deleted: ', error);
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
        <div className="min-h-12 flex items-center justify-center bg-indigo-100">
            <div className="max-w-md w-full m-4 p-6 bg-transparent rounded-lg border-8 border-black">
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

                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300" onClick={deleteUser}>Shut Down Account</button>

                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300" onClick={() => handleToggleOffers(!userInfo.recibirOfertas)}> {userInfo.recibirOfertas ? 'Disable Offers' : 'Enable Offers'}</button>

                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300" onClick={() => router.push(`/user_login/user_data_upd/${userInfo.id}`)}>Update Data</button>

                        <Link href="/user_login/user_search">
                            <p className="block px-4 py-2 text-white bg-indigo-300 rounded-xl hover:bg-indigo-300 focus:outline-none focus:ring focus:border-pink-300">Search shop and make a review</p>
                        </Link>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}
            </div>
        </div>
    );
}


