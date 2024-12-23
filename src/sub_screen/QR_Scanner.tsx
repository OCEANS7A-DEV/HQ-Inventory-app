import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      // 「back」が含まれるカメラを探す（背面カメラを自動選択）
      const backCamera = devices.find(
        (device) =>
          device.kind === 'videoinput' && device.label.toLowerCase().includes('back')
      );

      const cameraId = backCamera ? backCamera.deviceId : undefined;

      if (cameraId) {
        // カメラが特定できた場合は直接指定して起動
        scanner
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              setResult(decodedText);
              scanner.stop();
            },
            (error) => {
              console.warn("スキャンエラー:", error);
            }
          )
          .catch((err) => {
            console.error("スキャナの起動に失敗:", err);
          });
      } else {
        console.error("背面カメラが見つかりません");
      }
    });

    return () => {
      scanner.stop();
    };
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <div id="qr-reader" style={{ width: '500px' }}></div>
      <p>{result ? `スキャン結果: ${result}` : 'QRコードをスキャンしてください'}</p>
    </div>
  );
};

export default QRScanner;
