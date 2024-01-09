import { NextResponse } from "next/server";
import { readFileSync } from "fs";

export default async function GET({paramas}){
    try{
        const comercios = JSON.parse(readFileSync('data/comercios.json', 'utf-8'));

        if(comercios.length > 0){ 
            return NextResponse.json({comercios});
        } else{ 
            return NextResponse.json({error: 'No existen comercios disponibles.'});
        }

    } catch (error){
        console.error('ERROR --> comercios.json', error);
        return NextResponse.json({error})
    }
}