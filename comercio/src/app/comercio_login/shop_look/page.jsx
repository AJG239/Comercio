'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const userLookShop = () => {
    const router = useRouter();
    const [user, setUser] = useState([]);
    const [lookUp, setLookUp] = useState('');
    const [foundUser, setFoundUser] = useState([]);

    useEffect(() => {
        const lookShop = async () => {
            try {
                const res = await fetch('/api/comercio_login/user_data');

                if (res.ok) {
                    const data = await res.json();

                    setUser(data.user);
                } 
            } catch (error) {
                console.error('ERROR --> ', error);
            }
        };

        lookShop();
    }, []);

    const lookUpShop = () => {
        const found = user.filter(user => {
            return (
                user.ciudad.toLowerCase() === lookUp.toLowerCase() && user.recibirOfertas
            );
        });

        setFoundUser(found);
    };

    const sendEmail = (email) => {
        console.log(`Enviando correo a ${email}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Interested Users</h2>
                <div className="flex">
                    <input className="flex-grow px-3 py-2 mr-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300" type="text" placeholder="Ciudad" value={lookUp} onChange={(e) => setLookUp(e.target.value)} />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300" onClick={lookUpShop}>
                        Search
                    </button>
                </div>

               
                {foundUser.length > 0 ? (
                    <div className="mt-4 mb-4">
                        <h4 className="text-xl font-bold mb-2">User founds:</h4>
                        <ul>
                            {foundUser.map(foundUser => (
                                <li key={foundUser.id} className="mb-2">
                                    {`Nombre: ${foundUser.user}, Email: ${foundUser.email}, Intereses: ${foundUser.intereses}`}
                                    <button className="ml-2 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300" onClick={() => sendEmail(foundUser.email)}>Send Mail</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-4 mb-4">Interested users not found in this city.</p>
                )}

                <button onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300"> Back</button>
            </div>
        </div>
    );
};

export default userLookShop;
