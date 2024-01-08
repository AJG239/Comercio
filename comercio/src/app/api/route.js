import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { readFileSync } from "fs";

export default async function GET({params}){
    try{
        const comercios = JSON.parse(readFileSync('comercios.json', 'utf-8') || '[]');

        if(comercios.length >0){ 
            return NextResponse.json({comercios});
        } else{ 
            return NextResponse.json({error: 'No existen comercios disponibles.'});
        }

    } catch (error){
        console.error('ERROR --> comercios.json', error);
        return NextResponse.json({error})
    }
}