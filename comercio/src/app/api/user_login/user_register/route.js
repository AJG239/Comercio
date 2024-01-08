import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
    const data = await request.json();
    const user = JSON.parse(readFileSync( 'data/users.json' , 'utf-8') || '[]');
    const id = Date.now().toString();
    const newUser = { id, ...data };

    user.push(newUser);

    writeFileSync( 'data/users.json' , JSON.stringify(user));

    return NextResponse.json({message: 'Usuario registrado con exito', id: newUser.id});
}