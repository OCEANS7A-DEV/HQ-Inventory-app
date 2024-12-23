import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  setisLoading: (value: boolean) => void;
}

export default function QRScanner({ setCurrentPage }: SettingProps) {
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes('back') || device.label.includes('背面')
      );
      const cameraId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;
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
              setCurrentPage('');
              scanner.stop();
            },
            (error) => {
              console.warn("スキャンエラー:", error);
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
      scanner.stop();
      // ここで取得したデータを持って在庫数入力する画面に移動
      
    };
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <div id="qr-reader"></div>
      <p>{result ? `スキャン結果: ${result}` : 'QRコードをスキャンしてください'}</p>
    </div>
  );
};


