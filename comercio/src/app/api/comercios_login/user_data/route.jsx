import { readFileSync } from "fs";
import { users } from './../../../../../data/users.json'
import { NextResponse } from "next/server";


export async function GET({paramas}){
    try {
        const users_2 = JSON.parse(readFileSync(users, 'utf-8') || '[]');
         
        if (users_2.length > 0){
            return NextResponse.json({users_2});
        } else{
            return NextResponse.json({error: 'User Not Valid'})
        }
    } catch (error){
        return NextResponse({error: 'ERROR --> User File'});
    }
}