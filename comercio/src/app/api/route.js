import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export async function GET({params}){
    try{
        const shop = JSON.parse(readFileSync('data/comercios.json', 'utf-8'));

        if(shop.length > 0){ 
            return NextResponse.json({shop});
        } else{ 
            return NextResponse.json({error: 'No existen comercios disponibles.'});
        }

    } catch (error){
        console.error('ERROR --> comercios.json', error);
        return NextResponse.json({error: 'ERROR'})
    }
}