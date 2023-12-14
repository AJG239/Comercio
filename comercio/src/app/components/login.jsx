import Link from 'next/link'

import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Login(){
    const router = useRouter();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const redirection  = (code) =>{
        console.log("Code", code)

        if(code == 200){
            router.push("/inicio")
        }
    }

    const handleSubmit = (i) =>{
        i.preventDefault();

        const user = {
            email: email,
            password: password,
        }

    }
}