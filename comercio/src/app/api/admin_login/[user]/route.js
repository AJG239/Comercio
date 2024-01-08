import fs from 'fs'
import { NextResponse } from 'next/dist/server/web/spec-extension/response';

export async function GET(request, {paramas}){
    try{
        const data = await fs.promises.readFile('data/admins.json', 'utf-8');
        const admins_2 = JSON.parse(data || '[]');
        const admin = admins_2.find((admin_2) => admin_2.user === paramas.user);

        if (admin){
            return NextResponse.json({admin});
        } else{
            return NextResponse.json({error: 'Shop Not Found'});
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR File'});
    }
}