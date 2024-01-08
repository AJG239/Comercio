'use client'

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react"


export default function useMod({paramas}){
    const [shopInfo, setShopInfo] = useState(null);
    const [shopData, setShopData] = useState({
        user: '',
        password: '',
        ciudad: '',
        actividad: '',
        titulo: '',
        textos: '',
        foto_perfil: ''
    });

    const changeShop = (a) =>{
        const {name, values, type, checked} = a.target;
        setShopData({...shopData, [name]:type === 'checkbox' ? checked:values});
    };

    const submitShop = async (a) => {
        a.preventDefault();

        try{
            const res = await fetch(`/api/comercio_login/shop_data/${paramas.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(shopData)
            });

            const data = await res.json();

            if (res.ok){
                setShopInfo(data.user);
            }
        } catch (error){
            console.error('ERROR --> ', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const res = await fetch(`/api/comercio_login/shop_data/${paramas.id}`);
                const data = await res.json();

                if (res.ok){
                    setShopInfo(data.user);
                    setShopData({
                        user: data.user.user || '',
                        password: data.user.password || '',
                        ciudad: data.user.ciudad || '',
                        actividad: data.user.actividad || '',
                        titulo: data.user.titulo || '',
                        textos: data.user.textos || '',
                        foto_perfil: data.user.foto_perfil || ''
                    })
                }
            } catch (error){
                console.error('ERROR --> ', error);
            }
        };

        fetchData();
    }, [paramas.id]);

    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                {shopInfo ? (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Update Data:{shopInfo.user}</h1>
    
                        <form onSubmit={submitShop} className="mt-4">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Name:</label>
                                <input
                                    type="text"
                                    name="user"
                                    value={shopData.user}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={shopData.password}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">City:</label>
                                <input
                                    type="text"
                                    name="ciudad"
                                    value={shopData.ciudad}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Activity:</label>
                                <input
                                    type="text"
                                    name="actividad"
                                    value={shopData.actividad}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Title:</label>
                                <input
                                    type="text"
                                    name="titulo"
                                    value={shopData.titulo}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Text:</label>
                                <textarea
                                    name="texto"
                                    value={shopData.textos}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-600">Photo:</label>
                                <textarea
                                    name="fotos"
                                    value={shopData.foto}
                                    onChange={changeShop}
                                    className="mt-1 p-2 w-full border rounded-md"
                                />
                            </div>
                            

                            <button type="submit" className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
                                SAVE
                            </button>
                        </form>
                        
                        <button onClick={() => router.back()} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none focus:ring focus:border-gray-300">
                            BACK
                        </button>
                    </div>
                ) : (
                    <p>LOADING...</p>
                )}
            </div>
        </div>
    );
}