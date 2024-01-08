import fs, { readFileSync, writeFileSync } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(request, {params}){
        try {
            const data = await fs.promises.readFile('data/comercios.json', 'utf-8');
            const shops = JSON.parse(data || '[]');
            const shop = shops.find((shop) => shop.user === params.user);

            if (shop){
                return NextResponse.json({shop});
            } else{
                return NextResponse.json({error : 'Shop has not been found.'});
            }
        } catch (error){
            return NextResponse.json({error: 'ERROR'});
        }
}

export async function DELETE(request){
    try{
        const shops = JSON.parse(readFileSync('data/comercios.json', 'utf-8') || '[]');
        const {id} = await request.json();
        const shopDelete = shops.findIndex((shop) => shop.id === id);

        if(shopDelete !== -1){
            shops.splice(shopDelete, 1);
            await writeFileSync( 'data/comercios.json', JSON.stringify(shops, null, 2));
            return NextResponse.json({message: 'Shop Deleted'});
        } else{
            return NextResponse.json({message: 'Shop Do Not Exists'});
        }
    }catch (error){
        return NextResponse.json({message: 'Server ERROR'});
    }
}

export async function PUT(request, {paramas}){
    try{
        const shops = JSON.parse(readFileSync('data/comercios.json', 'utf-8') || '[]');
        const uptData = await request.json();
        const shopIndex = shops.findIndex((shops) => shops.user === paramas.user);

        if (shopIndex !== -1){
            shops[shopIndex] = {...shops[shopIndex], ...uptData};

            writeFileSync('data/comercios.json', JSON.stringify(shops, null, 2), 'utf-8');

            return NextResponse.json({message: 'User Updated', user: shops[shopIndex]});
        } else{
            return NextResponse.json({error: 'User Not Found'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR Updating User'});
    }
}