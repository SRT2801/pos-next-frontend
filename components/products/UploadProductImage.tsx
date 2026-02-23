"use client"

import { uploadImage } from "@/actions/upload-image-action";
import { getImagePath } from "@/src/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadProductImage({currentImage}: {currentImage?: string}) {

    const [image, setImage] = useState("");

    const onDrop = useCallback (async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("file", file);
        });

        const image =  await uploadImage(formData);
        setImage(image);

    }, [])
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: {
            "image/jpeg": ['.jpg'],
            "image/png": ['.png'],
        },
        onDrop,
        maxFiles: 1,
    })

    return (
        <>

            <div className="space-y-1">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                    Imagen Producto
                </label>
                <div {...getRootProps({
                    className: `
            py-20 border-2 border-dashed  text-center 
            ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
            ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
        `})}>
                    <input {...getInputProps()} />
                    {isDragAccept && (<p>Suelta la Imagen</p>)}
                    {isDragReject && (<p>Archivo no válido</p>)}
                    {!isDragActive && (<p>Arrastra y suelta una imagen aquí</p>)}
                </div>
            </div>


            {image && (
                <div className="py-5 space-y-5">
                    <p className="font-bold">Imagen de Producto:</p>
                    <div className="w-75 h-105 relative">
                        <Image
                        src={image}
                        alt="Imagen del producto"
                        className="object-cover"
                        fill
                        />
                    </div>
                </div>
            )}

            {currentImage && !image && (
                <div className="py-5 space-y-5">
                    <p className="font-bold">Imagen actual:</p>
                    <div className="w-75 h-105 relative">
                        <Image
                        src={getImagePath(currentImage)}
                        alt="Imagen del producto"
                        className="object-cover"
                        fill
                        />
                    </div>
                </div>
            )}

            <input type="hidden" name="image" value={image ? image : currentImage} />

        </>
    )
}
