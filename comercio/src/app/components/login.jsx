import React from "react";

export default function Login({values, setValues, submit}){
    return(
        <form onSubmit={(e) => submit(e)}>
            <h1 className='text-center'>Sing in</h1>

            <label className='flex mb-2 flex-row'> 
                <i className="bi bi-person-circle m-2 text-xl"></i>
                <input className='w-full border p-2 rounded-sm' type='text' name='user'  value={values.user} onChange={setValues} required />
            </label>

            <label className='flex mb-2 flex-row'>
                <i className="bi bi-lock m-2 text-xl"></i>
                <input className='w-full border p-2' type='password' name='password' value={values.password} onChange={setValues} required />
            </label>

            <button className="block ml-40 bg-center px-4 py-2 mb-4 my-4 text-white bg-indigo-200 rounded-2xl hover:bg-indigo-700 focus:outline-none focus:ring focus:border-green-300"> Submit </button>
        </form>
    );
}