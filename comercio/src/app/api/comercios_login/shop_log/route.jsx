import { readFileSync } from "fs";
import { NextResponse } from "next/server";
import { comercios } from './../../../../../data/comercios.json'


export async function POST(request){
    try{   
        const shops = JSON.parse(readFileSync(comercios, 'utf-8') || '[]');
        const {user, password} = await request.json();
        const userVla = shops.some((shops) => shops.user === user && shops.password === password);

        if(userVla){
            return NextResponse.json({ ok: true, message: 'user validated'});
        } else{
            return NextResponse.json({ ok: false, message: 'user no validated'});
        }
    } catch(error){
        return NextResponse.json({error: 'ERROR --> Shop Authentication'})
    }
}