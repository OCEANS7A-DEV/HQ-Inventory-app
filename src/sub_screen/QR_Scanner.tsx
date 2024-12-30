import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface SettingProps {
  setCurrentPage: (page: string) => void;
  setCodeList: (codes: Array<any>) => void;
}

interface CameraDevice {
  deviceId: string;
  label: string;
}

export default function QRCodeScanner({ setCurrentPage, setCodeList }: SettingProps) {
  const [videoDevices, setVideoDevices] = useState<CameraDevice[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);

  useEffect(() => {
    const initScanner = new Html5Qrcode("qr-reader");
    setScanner(initScanner);

    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices
        .filter((device) => device.kind === 'videoinput')
        .map((device) => ({
          deviceId: device.deviceId,
          label: device.label || `カメラ ${device.deviceId}`,
        }));

      setVideoDevices(cameras);
      
      if (cameras.length > 0) {
        const backCamera = cameras.find((device) =>
          device.label.toLowerCase().includes('back') || device.label.includes('背面')
        );
        const initialCameraId = backCamera ? backCamera.deviceId : cameras[0].deviceId;
        setSelectedCamera(initialCameraId);
        startScanning(initScanner, initialCameraId);
      }
    }).catch((err) => {
      console.error('デバイスの取得に失敗:', err);
    });

    return () => {
      if (scanner) {
        scanner.stop();
      }
    };
  }, []);

  const startScanning = (qrScanner: Html5Qrcode, cameraId: string) => {
    qrScanner
      .start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          const dataArray = JSON.parse(decodedText);
          setCodeList(dataArray);
          setCurrentPage('InsertPage');
          qrScanner.stop();
        },
        () => {}
      )
      .catch((err) => {
        console.error("スキャナの起動に失敗:", err);
      });
  };

  const handleCameraChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDeviceId = event.target.value;
    setSelectedCamera(selectedDeviceId);
    if (scanner) {
      scanner.stop().then(() => {
        startScanning(scanner, selectedDeviceId);
      });
    }
  };

  return (
    <div>
      <h1>QRコードをスキャンしてください。</h1>
      
      {videoDevices.length > 0 ? (
        <div>
          <label>カメラを選択してください:</label>
          <select onChange={handleCameraChange} value={selectedCamera || ''}>
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>利用可能なカメラがありません。</p>
      )}

      <div id="qr-reader" style={{ width: '100dvw' }}></div>
    </div>
  );
}


