import { readFileSync } from "fs";
import { NextResponse } from "next/dist/server/web/spec-extension/response";


export async function POST(request){
    try{
        const admins_2 = JSON.parse(readFileSync('data/admins.json', 'utf-8') ||'[]');
        const {user, password} = await request.json();
        const adminVla = admins_2.some((admins_2) => admins_2.user === user && admins_2.password === password);

        if (adminVla){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }
    } catch (error){    
        return NextResponse.json({error: 'ERROR --> Admin Authentication'});
    }
}