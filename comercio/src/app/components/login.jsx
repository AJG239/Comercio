import React from "react";

export default function Login({values, setValues, submit}){
    return(
        <form onSubmit={(e) => submit(e)}>
            <h1 className='text-center'>Sing in</h1>

            <label className='block mb-2'>User Name:
                <input className='w-full border p-2' type='text' name='user' value={values.user} onChange={setValues} required />
            </label>

            <label className='block mb-2'>Password:
                <input className='w-full border p-2' type='password' name='password' value={values.password} onChange={setValues} required />
            </label>

            <button className="block px-4 py-2 mb-4 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300">
                Submit
            </button>
        </form>
    );
}