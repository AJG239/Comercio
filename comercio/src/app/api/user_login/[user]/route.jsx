import { NextResponse } from "next/dist/server/web/spec-extension/response";
import fs, { read } from 'fs';
import { readFileSync, writeFileSync } from "fs";
import { users } from './../../../../../data/users.json'

export default async function GET(request, { params }){
    try{
        const data = await fs.promises.readFile(users, 'utf-8');
        const user_log = JSON.parse(data || '[]');
        const user = user_log.find((user) => user.user === params.user);

        if (user){
            return NextResponse.json({user});
        } else{
            return NextResponse.json({error: 'user not found'})
        }

    } catch (error){
        return NextResponse.json({error: 'ERROR'})
    }
}

export default async function DELETE(request){
    try{
        const user = JSON.parse(readFileSync(users, 'utf-8') || '[]');
        const { id } = await request.json();
        const delete_user = user.findIndex((user) => user.id === id);

        if (delete_user !== -1){
            user.splice(delete_user, 1);
            await writeFileSync(users, JSON.stringify(user, null, 2));

            return NextResponse.json({message: 'user deleted'});
        } else{
            return NextResponse.json({message: 'user does not exist'})
        }
    } catch (error){
        return NextResponse.json({message: 'ERROR'}, {status: 500});
    }
}


export default async function PUT(request, { params }){
    try{
        const user = JSON.parse(readFileSync(users, 'utf-8') || '[]');
        const userIn = user.findIndex((user) => user.user === params.user);
        const dataUdate = await request.json();

        if (userIn !== -1){
            user[userIn] = {...user[userIn], ...dataUdate};

            writeFileSync(users, JSON.stringify(user, null, 2), 'utf-8');

            return NextResponse.json({message: 'user data did not update', user: user[userIn]});
        } else{
            return NextResponse.json({error: 'user has not been found'})
        }
    } catch (error){
        return NextResponse.json({error: 'ERROR --> user denied'})
    }
}





