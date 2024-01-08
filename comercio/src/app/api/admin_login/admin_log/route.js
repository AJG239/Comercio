import { readFileSync } from "fs";
import { NextResponse } from "next/server";


export async function POST(request){
    try{
        const admins_2 = JSON.parse(readFileSync('data/admins.json', 'utf-8'));
        const user = await request.json();

        console.log(admins_2)

        const adminVla = admins_2.some((admins_2) => admins_2.user === user.user && admins_2.password === user.password);

        if (adminVla){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }
    } catch (e){    
        return NextResponse.json({error: 'ERROR Admin Authentication'});
    }
}