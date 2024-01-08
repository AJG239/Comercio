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
        edad: '',
        ciudad: '',
        intereses: '',
        recibirOfertas: false
    });

    const changeInfo = (e) => {
        const {name, value, type, checked} = e.target;
        setUserData({...userData, [name]: type === ' checbox' ? checked : value});
    };

    const registerInfo = async (e) => {
        const res = await fetch(`/api/user_login/user_data_upd/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.ok){
            setUserInfo(data.user);
        }
    }; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/user_login/user_data_upd/${params.id}`);
                const data = await res.json();
    
                if (res.ok) {
                    setUserInfo(data.user);
                    setFormData({
                        user: data.user.user || '',
                        email: data.user.email || '',
                        password: '',
                        edad: data.user.edad || '',
                        ciudad: data.user.ciudad || '',
                        intereses: data.user.intereses || '',
                        recibirOfertas: data.user.recibirOfertas || false,
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [params.id]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-violet-100">
            <div className="max-w-md w-full p-6 bg-transparent rounded-lg border-8 border-black">

                {userInfo ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Update {userInfo.user}</h1>
    
                        <form onSubmit={registerInfo} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Name:</label>
                                <input type="text" name="user"value={userData.user} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md" required/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Email:</label>
                                <input type="text" name="email" value={userData.email} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Password:</label>
                                <input type="password" name="password" value={userData.password} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md" required/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Age:</label>
                                <input type="text" name="edad" value={userData.edad} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">City:</label>
                                <input type="text" name="ciudad" value={userData.ciudad} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md"/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Looking for:</label>
                                <input type="text" name="intereses" value={userData.intereses} onChange={changeInfo} className="mt-1 p-2 w-full border rounded-md"/>
                            </div>
                            <div className="mb-4 flex flex-row">
                                <label className="block text-sm font-semibold text-gray-600">Enable Offers:</label>
                                <input className="ml-2" type="checkbox" name="recibirOfertas" checked={userData.recibirOfertas} onChange={changeInfo}/>
                            </div>
                            <button type="submit" className="bg-indigo-300 text-white px-4 py-2 mb-4 rounded hover:bg-indigo-600 focus:outline-none focus:ring focus:border-green-300">Save</button>
                        </form>
                        
                        <button onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">Volver</button>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}
            </div>
        </div>
    );
}
