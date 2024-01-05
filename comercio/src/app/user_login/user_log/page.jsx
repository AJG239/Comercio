"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { METHODS } from "http";

export default function user_Log(){

    const [values, setValues] = useState({user: '', password: ''});
    const router = useRouter();

    const UpdateValues = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]:value});
    }

    const LogUser = async (a) => {
        
    }

    return(
        <></>
    );
}