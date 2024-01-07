import fs, { readFileSync, writeFileSync } from 'fs'
import { comercios } from './../../../../../data/comercios.json'
import { NextResponse } from 'next/server';

export async function GET(request, {paramas}){
    try{
        const data = await fs.promises.readFile(comercios, 'utf-8');
        const users = JSON.parse(data || '[]')
        const user = users.find((user) => user.id === paramas.id);
        
        if (user){
            return NextResponse.json({user});
        } else{
            return NextResponse.json({error: 'Shop Not Found'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR --> Reading File'});
    }
}

export async function PUT(request, {paramas}){
    try{
        const shops = JSON.parse(readFileSync(comercios, 'utf-8') || '[]');
        const shopUpdate = await request.json();
        const shopIndex = shops.findIndex((shop) => shop.id === paramas.id);

        if (shopIndex !== -1){
            shops[shopIndex] = {...shops[shopIndex], ...shopUpdate};
            writeFileSync(comercios, JSON.stringify(shops, null, 2), 'utf-8');

            return NextResponse.json({message: 'Shop Update', user: shops[shopIndex]});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR --> Shop Has Not Been Updated'});
    }
}