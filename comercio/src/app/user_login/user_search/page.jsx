'use client'

import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

const searchShop = () => {
    const [shop, setShop] = useState([]);
    const [searchShop, setSearchShop] = useState('');
    const [foundShop, setFoundShop] = useState([]);

    useEffect(() => {
        fetch('/api').then(res => res.json()).then(data => {setShop(data.shop);}).catch(error => console.error('ERROR in Shops:', error));
    }, []);

    const search = () => {
        const look_up = shop.filter(shop => {
            return(
                shop.id === searchShop ||
                shop.user.toLowerCase().includes(searchShop.toLowerCase()) ||
                shop.ciudad.toLowerCase().includes(searchShop.toLowerCase())
            );
        });

        setFoundShop(look_up);
    };

    const router = useRouter();

    const searchRes = () => {
        router.push(`/user_login/user_search/search_shop`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-100">
            <div className="container mx-auto w-full p-6 bg-transparent">
                <h2 className="text-2xl font-bold mb-4">Search Shop: </h2>
                <div className="flex mb-4">
                    <input className="flex-grow px-3 py-2 mr-2 border rounded-md focus:outline-none focus:ring focus:border-indigo-300" type="text" placeholder="ID, Name, City o Activity" value={searchShop} onChange={(e) => setSearchShop(e.target.value)}/>
                    <button className="px-4 py-2 rounded-xl text-black bg-lime-500 hover:bg-lime-600 focus:outline-none focus:ring focus:border-lime-300" onClick={search}> Search: </button>
                </div>
        
                {foundShop.length > 0 ? (
                    <div className="mt-4 mb-4">
                        <h4 className="text-xl font-bold mb-4">Founded Shops:</h4>
                        <ul>
                            {foundShop.map(foundShop => (
                                <li key={foundShop.id} className="mb-2">
                                    {`ID: ${foundShop.id}, User: ${foundShop.user}, City: ${foundShop.ciudad}, Activity: ${foundShop.actividad}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="mt-4 mb-4">No shop found</p>
                )}

                <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300" onClick={searchRes}>Post review</button>
                
                <button onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">Back</button>
            </div>
        </div>
    );
}

export default searchShop;