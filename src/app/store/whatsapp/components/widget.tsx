import api from '@/api/api';
import { LoadingSpinner } from '@/components/admin/loading-spinner';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Widget = ({
  icon,
  status,
  handlerUpdateStatus,
}: any) => {
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkWhatsapp();
  });

  useEffect(() => {
    const check = setInterval(checkWhatsapp, 5000);

    return () => {
      clearInterval(check);
    };
  }, []);

  const checkWhatsapp = () => {
    api
      .get('qr-code/check')
      .then((response) => {
        if (Boolean(response.data)) {
          handlerUpdateStatus(true);
        } else {
          handlerUpdateStatus(false);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição GET:', error);
      });
  };

  const generateQrCode = () => {
    if (!isLoading) {
      setIsLoading(true);
      api
        .get('qr-code')
        .then((response: any) => {
          if (response.data === 'Already conected.') {
            handlerUpdateStatus(true);
          } else {
            setQrCodeImage(response.data);
            handlerUpdateStatus(false);
          }
          setIsLoading(false);
        })
        .catch((error: any) => {
          console.error('Erro na requisição GET:', error);
        });
    }
  };

  const deleteSession = () => {
    api
      .delete('qr-code')
      .then(() => {
        handlerUpdateStatus(false);
        setQrCodeImage('');
        setIsLoading(false);
      })
      .catch((error: any) =>
        console.error('Erro na requisição DELETE:', error),
      );
  };

  return (
    <Card className="p-4 justify-center w-[30vw] ml-auto mr-auto">
      <LoadingSpinner visible={isLoading} />
      <div className="text-brand-500 dark:text-white ml-[48%] mb-3">
        {icon}
      </div>

      {!status ? (
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Desconectado
          </h4>
          {qrCodeImage ? (
            <div>
              <p className="font-dm text-sm font-medium text-gray-600">
                Escanei o QR-Code para ativar sua sessão
                (Aguarde até o fim da sincronização)
              </p>
              <Image
                src={qrCodeImage}
                alt="QR Code"
                className="mt-5 ml-auto mr-auto h-auto w-auto"
                height={100}
                width={100}
              />

              <button
                onClick={() => generateQrCode()}
                className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
              >
                Gerar novo QR Code
              </button>
            </div>
          ) : (
            <div>
              <p className="font-dm text-sm font-medium text-gray-600">
                Você não possui nenhuma sessão ativa
              </p>
              <button
                onClick={() => generateQrCode()}
                className="mt-5 rounded-xl bg-green-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200"
              >
                Conectar
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-50 ml-4 flex w-auto flex-col justify-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Conectado
          </h4>
          <p className="font-dm text-sm font-medium text-gray-600">
            Sua sessão está ativa!
          </p>
          <button
            className="mt-5 rounded-xl bg-red-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
            onClick={() => deleteSession()}
          >
            Desconectar
          </button>
        </div>
      )}
    </Card>
  );
};

export default Widget;
