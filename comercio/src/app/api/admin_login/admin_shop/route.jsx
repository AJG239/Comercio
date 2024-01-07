import { readFileSync, writeFileSync } from "fs";
import { comercios } from './../../../../../data/comercios.json'
import { NextResponse } from "next/server";


export async function POST(request){
    const data = await request.json();
    const shops = JSON.parse(readFileSync(comercios, 'utf-8') || '[]');
    const id = Date.now().toString();
    const newShop = { id, ...data};

    writeFileSync(comercios, JSON.stringify(shops));

    return NextResponse.json({message: 'Shop Registered', id: newShop.id});
}

export async function DELETE(request){
    try{
        const shops = JSON.parse(readFileSync(comercios, 'utf-8') || '[]');
        const {id} = await request.json();
        const shopIndex = shops.findIndex((shop) => shop.id === id);

        if (shopIndex !== -1){
            shops.splice(shopIndex, 1);
            await writeFileSync(comercios, JSON.stringify(shops, null, 2));
            return NextResponse.json({message: 'Shop Deleted'});
        } else{
            return NextResponse.json({message: 'Shop Does Not Exists'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR'});
    }
}

export async function GET({paramas}){
    try{
        const shops = JSON.parse(readFileSync(comercios, 'utf-8') || '[]');
        
        if (shops.length > 0){
            return NextResponse.json({shops});
        } else{
            return NextResponse.json({error: 'No Shops Available'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR --> File Shops'});
    }
}