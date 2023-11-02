import { Card } from '@/components/ui/card';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUpload({
  uploadedFile,
  setUploadedFile,
}: any) {
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { accept: ['image/*'] },
  });

  return (
    <Card className="p-9 mt-5 mb-5 cursor-pointer">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>
          Arraste e solte a imagem do produto aqui ou clique
          para selecionar uma imagem.
        </p>
      </div>
      {uploadedFile && (
        <div className="text-center mt-2">
          <p>Imagem carregada:</p>
          <Image
            className="ml-auto mr-auto mt-5"
            src={URL.createObjectURL(uploadedFile)}
            alt="Imagem Carregada"
            width={100}
            height={100}
          />
        </div>
      )}
    </Card>
  );
}

export default ImageUpload;
