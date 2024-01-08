import { readFileSync } from "fs";
import { NextResponse } from "next/server";

export async function POST(request){
    try{   
        const shops = JSON.parse(readFileSync('data/comercios.json', 'utf-8'));
        const user = await request.json();
        const userVla = shops.some((shops) => shops.user === user.user && shops.password === user.password);

        if(userVla){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }
    } catch(error){
        return NextResponse.json({error: 'ERROR Shop Authentication'})
    }
}