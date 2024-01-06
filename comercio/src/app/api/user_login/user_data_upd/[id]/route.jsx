import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { users } from './../../../../../data/users.json'
import fs from 'fs';

export async function GET(request, { params }) {
    try {
        const data = await fs.promises.readFile( users , 'utf-8');
        const user_data = JSON.parse(data || '[]');     
        const user = user_data.find((user) => user.id === params.id);
        
       
        if (user) {
            console.log(user);
            return NextResponse.json({ user });
        } else {
            return NextResponse.json({ error: 'user not found' });
        }
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ error: 'ERROR' });
    }
}



export async function PUT(request, { params }) {
    try {
        console.log(params.id);
        const user = JSON.parse(readFileSync( users , 'utf-8') || '[]');
        const updateData = await request.json();
        const userIndex = user.findIndex((user) => user.id === params.id);

        if (userIndex !== -1) {
            user[userIndex] = { ...user[userIndex], ...updateData };
            writeFileSync( users , JSON.stringify(user, null, 2), 'utf-8');

            return NextResponse.json({
                message: 'user update',
                user: user[userIndex],
            });
        } else {
            return NextResponse.json({ error: 'user not found',});
        }
    } catch (e) {
        return NextResponse.json({ error: 'ERROR --> User not udated', });
    }
}

