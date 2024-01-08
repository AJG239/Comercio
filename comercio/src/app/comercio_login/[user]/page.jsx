'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function userShop({params}) {
    const [shopInfo, setShopInfo] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('params', params)
                console.log('paramsid', params.user)
                const res = await fetch(`/api/comercios_login/${params.user}`);
                const data = await res.json();
    
                if (res.ok) {
                    setShopInfo(data.shop); //El problema del comercio por ahora esta aquí
                }
            } catch (error) {
                console.error('ERROR ', error);
            }
        };
        fetchData();
    }, []);
    
    const deleteShop = async () => {
        const id = shopInfo.id;

        try {
            const res = await fetch(`/api/comercios_login/${params.user}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });
    
            const data = await res.json();

            if (res.ok) {
                if (data.message === 'Shop Deleted') {
                    router.push('/comercio_login/shop_log');
                } 
            }
        } catch (error) {
            console.error('ERROR ', error);
        }
    };

    const router = useRouter();

    const shopSearch = () => {
        router.push(`/comercio_login/shop_look/`);
    };

    const shopUpdate = () => {
        router.push(`/comercio_login/shop_mod/${shopInfo.id}`);
    };

    return (
        <div className="min-h-10 flex items-center justify-center bg-indigo-100">
            <div className="max-w-md w-full p-6 bg-transparent rounded-lg">
                {shopInfo ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Shop Data: {shopInfo.user}</h1>

                        <p><strong>Shop_ID:</strong> {shopInfo.id}</p>
                        <p><strong>CIF:</strong> {shopInfo.cif}</p>

                        <p><strong>Coty:</strong> {shopInfo.ciudad}</p>
                        <p><strong>Email:</strong> {shopInfo.mail}</p>

                        <p><strong>Activity:</strong> {shopInfo.actividad}</p>
                        <p><strong>Text:</strong> {shopInfo.textos}</p>

                        <img className="w-full h-40 object-none object-center" src={`./${shopInfo.foto_perfil}`} alt={`${shopInfo.titulo}`} />
                        
                        <h1 className="text-2xl font-bold mb-4">Shop Info</h1>

                        <p><strong>Score:</strong> {shopInfo.scoring}</p>
                        <p><strong>Total Reviews:</strong> {shopInfo.numero_Puntuaciones}</p>
                        <p><strong>Shop Reviews:</strong> {shopInfo.resenas}</p>

                        <h2 className="text-lg font-semibold mt-4">ADMIN</h2>
                        
                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-300" onClick={deleteShop}>Delete Shop</button>
                        
                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-300" onClick={shopSearch}>Ask For Review</button>

                        <button className="block px-4 py-2 mb-4 text-white bg-indigo-300 rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-300" onClick={shopUpdate}>UPDATE</button>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}
            </div>
        </div>
    );
}