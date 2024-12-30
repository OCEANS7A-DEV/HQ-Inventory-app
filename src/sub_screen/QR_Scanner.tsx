import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  setCodeList: (codes: Array<any>) => void;
}

export default function QRCodeScanner({ setCurrentPage, setCodeList }: SettingProps) {
  const [result, setResult] = useState<string>('');
  const [devicename, setdevicename] = useState();

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setdevicename(videoDevices)

      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes('back') || device.label.includes('背面')
      );
      const cameraId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;
      //console.log(cameraId)
      if (cameraId) {
        scanner
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              setResult(decodedText);
              const dataArray = JSON.parse(decodedText)
              setCodeList(dataArray);
              setCurrentPage('InsertPage');
              scanner.stop();
            },
            () => {
            }
          )
          .catch((err) => {
            console.error("スキャナの起動に失敗:", err);
          });
      }
    }).catch((err) => {
      console.error('デバイスの取得に失敗:', err);
    });

    return () => {
      //scanner.stop();
    };
  }, []);

  return (
    <div>
      <h1>QRコードをスキャンしてください。</h1>
      <div id="qr-reader"style={{ width: '100dvw'}}></div>
      <div>{devicename}</div>
    </div>
  );
};


