'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ResenaComercio() {
    const [shopInfo, setShopInfo] = useState(null);
    const [data, setData] = useState({
        user: '',
        scoring: '',
        resenas: '',
    });
    const router = useRouter();

    const setDataChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const dataSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`/api/comercios_login/${data.user}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const data = await res.json();

            if (res.ok) {
                setShopInfo(data.comercio);
                router.back();
            }
        } catch (error) {
            console.error('ERROR:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-100">
            <div className="max-w-md w-full p-6 bg-transparent rounded-xl border-8 border-black">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Review:</h1>
                        
                    <form onSubmit={dataSubmit} className="mt-4">

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Shop User:</label>
                            <input type="text" name="user" value={data.user} onChange={setDataChange} className="mt-1 p-2 w-full border rounded-md"/>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Score:</label>
                            <input type="number" name="scoring" value={data.scoring} onChange={setDataChange} className="mt-1 p-2 w-full border rounded-md" />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-gray-600">Review:</label>
                            <textarea name="resenas" value={data.resenas} onChange={setDataChange} className="mt-1 p-2 w-full border rounded-md"/>
                        </div>

                        <button type="submit" className="bg-indigo-300 text-white px-4 py-2 mb-4 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300">Save</button>

                    </form>

                    <button onClick={() => router.back()} className="bg-indigo-300 text-white px-4 py-2 rounded-xl hover:bg-indigo-600 focus:outline-none focus:ring focus:border-indigo-300">Back</button>
                </div>
            </div>
        </div>
    );
}

export default ResenaComercio;
