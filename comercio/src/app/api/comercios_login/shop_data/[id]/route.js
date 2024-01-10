import fs, { readFileSync, writeFileSync } from 'fs'
import { NextResponse } from 'next/server';

export async function GET(request, {params}){
    try{
        const data = await fs.promises.readFile('data/comercios.json', 'utf-8');
        const users = JSON.parse(data || '[]')
        const user = users.find((user) => user.id === params.id);
  
        console.log(user)
        
        if (user){
            return NextResponse.json({user});
        } else{
            return NextResponse.json({error: 'Shop Not Found'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR Reading File'});
    }
}

export async function PUT(request, {paramas}){
    try{
        const shops = JSON.parse(readFileSync('data/comercios.json', 'utf-8'));
        const shopUpdate = await request.json();
        const shopIndex = shops.findIndex((shop) => shop.id === paramas.id);

        if (shopIndex !== -1){
            shops[shopIndex] = {...shops[shopIndex], ...shopUpdate};
            writeFileSync('data/comercios.json', JSON.stringify(shops, null, 2), 'utf-8');

            return NextResponse.json({message: 'Shop Update', user: shops[shopIndex],});
        }
    } catch (e){
        return NextResponse.json({error: 'ERRORs Shop Has Not Been Updated'});
    }
}