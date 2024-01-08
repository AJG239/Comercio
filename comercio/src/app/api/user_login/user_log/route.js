import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { users } from '../../../../../data/users.json';

export async function POST(request){
    try{
        const logged_users = JSON.parse(readFileSync(users, 'utf-8') || '[]');
        const {user, password} = await request.json();

        const validUsers = logged_users.some((user_2) => user_2.user === user && user_2.password === password);
        console.log(validUsers)

        if(validUsers){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }

    } catch(error){
        return NextResponse.json({error: 'ERROR --> in validation of the user'})
    }
}