import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export async function POST(request){
    try{
        const logged_users = JSON.parse(readFileSync('data/users.json', 'utf-8') || '[]');
        const user = await request.json();
        console.log("logeados ",logged_users)
        console.log(request)
        console.log(user)
        const validUsers = logged_users.some((usuario) => usuario.user === user.user && usuario.password === user.password);
        console.log("Valido ", validUsers)

        if(validUsers){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }

    } catch(e){
        return NextResponse.json({error: 'ERROR in validation of the user'})
    }
}