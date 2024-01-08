'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function registerShop(){
    const [shop, setShop] = useState({
        user: '',
        password: '',
        cif: '',
        ciudad: '',
        mail: ''
    });

    const updShop = (a) => {
        const {name, value} = a.target;
        setShop({...shop, [name]:value});
    } 

    const router = useRouter();

    const registerShop = async (a) => {
        a.preventDefault();

        try{
            const res = await fetch('/api/admin_login/admin_shop', {
                method: 'POST',
                headers:{
                    'Content-Type': 'aplication/json'
                }, 
                body: JSON.stringify(shop)
            });

            const data = await res.json();

            if (res.ok){
                console.log(data);
                router.push('/admin_login/admin_shop');    
            }
        } catch (error){
            console.error('ERROR ', error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">Sign Up Shop</h1>
                <form onSubmit={registerShop}>
                    <label className="block mb-2">
                        Names Shop:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="user"
                            value={shop.user}
                            onChange={updShop}
                        />
                    </label>

                    <label className="block mb-2">
                        Password:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="password"
                            value={shop.password}
                            onChange={updShop}
                        />
                    </label>

                    <label className="block mb-2">
                        CIF:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="cif"
                            value={shop.cif}
                            onChange={updShop}
                        />
                    </label>

                    <label className="block mb-2">
                        City:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="ciudad"
                            value={shop.ciudad}
                            onChange={updShop}
                        />
                    </label>

                    <label className="block mb-2">
                        Mail:
                        <input
                            className="w-full border p-2"
                            type="text"
                            name="mail"
                            value={shop.mail}
                            onChange={updShop}
                        />
                    </label>

                    <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
                        Sign Up Shop
                    </button>
                </form>
            </div>
        </div>
    );
}