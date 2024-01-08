'use client'

import { useEffect, useState } from "react"


const searchShop = () => {
    const [shops, setShops] = useState([]);
    const [searchShop, setSearchShop] = useState('');
    const [foundShop, setFoundShop] = useState([]);

    useEffect(() => {
        fetch('/api/admin_login/admin_shop/').then(res => res.json()).then(data => {setShops(data.shops || []);})
        .catch(error => console.error('ERROR ', error));
    }, []);

    const searchShoppig = () => {
        const found = shops.filter(shops => {
            const shopsName = shops.user ? shops.user.toLowerCase() : '';
            const shopsCity = shops.ciudad ? shops.ciudad.toLowerCase() : '';
            const shopsActivity = shops.actividad ? shops.actividad.toLowerCase() : '';

            return(
                shops.id.toString() === searchShop || shopsName.includes(searchShop.toLowerCase()) ||
                shopsCity.includes(searchShop.toLowerCase()) || shopsActivity.includes(searchShop.toLowerCase())
            );
        })

        setFoundShop(found);
    };

    const deleteShop = async (id) => {
        try {
            const res = await fetch('/api/admin_login/admin_shop/', {
                method: 'DELETE',
                header: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id})
            });

            if(res.ok){
                const data = await res.json();

                if(data.message === 'Shop Deleted'){
                    setShops((prevShops) => prevShops.filter((shops) => shops.id !== id));
                }
            }
        } catch (error){
            console.error('ERROR Deleting The Shop ', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">

                <Link href="/admin/AdministrarComercios/RegistrarComercio">
                    <p className="block px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
                        Sign Up Shoop
                    </p>
                </Link>

                <h1 className="text-2xl font-bold mb-4">Your Shops</h1>
                {shops.length > 0 ? (
                    <ul>
                        {shops.map(comercio => (
                            <li key={comercio.id} className="mb-2">
                                {`Shop name: ${comercio.user}, City: ${comercio.ciudad}, Activity: ${comercio.actividad}`}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No shops are enable.</p>
                )}

                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4">Look up by ID, Name or City</h2>
                    <div className="flex">
                        <input
                            className="flex-grow px-3 py-2 mr-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            type="text"
                            placeholder="ID, Nombre, Ciudad, Actividad"
                            value={searchShop}
                            onChange={(e) => setSearchShop(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={searchShoppig}
                        >
                            Buscar
                        </button>
                    </div>
                    {foundShop.length > 0 ? (
                        <div className="mt-4">
                            <h4 className="text-xl font-bold mb-2">Shops Founded:</h4>
                            <ul>
                                {foundShop.map(foundShop => (
                                    <li key={foundShop.id} className="mb-2">
                                        {`ID: ${foundShop.id}, Name: ${foundShop.user}, City: ${foundShop.ciudad}, Activity: ${foundShop.actividad}`}
                                        <button className="ml-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300" onClick={() => deleteShop(foundShop.id)}>
                                            Delete
                                        </button>
                                    </li>
                                    
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="mt-4">Shop Not Found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default searchShop;