import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { users } from './../../../../../data/users.json'

export async function POST(request) {
    const data = await request.json();
    const user = JSON.parse(readFileSync( users , 'utf-8') || '[]');
    const id = Date.now().toString();
    const newUser = { id, ...data };

    user.push(newUser);

    writeFileSync( users , JSON.stringify(user));

    return NextResponse.json({message: 'Usuario registrado con exito', id: newUser.id});
}