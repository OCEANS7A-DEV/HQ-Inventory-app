import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  // const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  // const [Device, setDevice] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      
      // setCameras(videoDevices);
      // setDevice(videoDevices);

      if (videoDevices.length === 0) {
        setCameraError('カメラが接続されていません');
        return;
      }

      // 背面カメラを検索
      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes('back') || device.label.includes('背面')
      );

      const cameraId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;

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
            setCameraError('スキャナの起動に失敗しました');
          });
      } else {
        
        setCameraError('背面カメラが見つかりません');
      }
    }).catch((err) => {
      console.error('デバイスの取得に失敗:', err);
      setCameraError('カメラデバイスの取得に失敗しました');
    });

    return () => {
      scanner.stop();
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

export default QRScanner;
