"use client"

import { AiOutlineExpandAlt } from "react-icons/ai";
import Lightbox from "yet-another-react-lightbox";
import React, { useState } from "react";

export default async function Carrusel(){
    const comercios = await fs.readFile(process.cwd() + '/data/comercios.json', 'utf-8')

    const [open, setOpen] = useState(false);
    const [image, setImage] = useState("");

    return(
        <>
            <div className="w-full">
                <div>
                    <div className="flex flex-col md:grid md:grid-cols-3 h-full gap-0 flex-wrap mx-2 md:mx-0">
                        {comercios.map((comercio) => {
                            <div className="md:h-[50vw] h-screen relative">
                                <div className="group h-full">
                                    <div className="bg-cover bg-center h-full w-full bg-no-repeat">
                                        <div className="text-3xl text-white absolute bottom-0 left-2 z-10">
                                            <div>{comercio.Actividad}</div>
                                            <div>{comercio.Titulo}</div>
                                        </div>

                                        <div className="bg-black opacity-0 group-hover:opacity-70 absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out"
                                            onClick={() =>{
                                                setOpen(true);
                                                setImage(comercio.Foto_perfil);
                                            }}>

                                            <p className="text-white">
                                                <AiOutlineExpandAlt className="text-5xl border w-16 h-16 bg-neutral-50 hover:bg-white hover:text-black p-3 cursor-pointer rounded-full"></AiOutlineExpandAlt>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
                <Lightbox open={open} close={() => setOpen(false)} plugins={[Zoom]} showPrevNext={false} slides={slides}></Lightbox>
            </div>
        </>
    );
}