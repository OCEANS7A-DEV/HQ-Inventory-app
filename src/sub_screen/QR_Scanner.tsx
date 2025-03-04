import React, { useEffect, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { localStorageSet } from '../backend/WebStorage'


interface SettingProps {
  setCurrentPage: (page: string) => void;
  setCodeList: (codes: Array<any>) => void;
}

export default function QRCodeScanner({ setCurrentPage, setCodeList }: SettingProps) {

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      const backCamera = videoDevices.find((device) =>
        device.label.toLowerCase().includes('back') || device.label.includes('背面')
      );
      const cameraId = backCamera ? backCamera.deviceId : videoDevices[0].deviceId;
      console.log(cameraId)
      if (cameraId) {
        scanner
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
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

  useEffect(() => {
    localStorageSet()
  },[])

  return (
    <>
      <div>
        <h1>QRコードをスキャンしてください。</h1>
        <div id="qr-reader"style={{ width: '100dvw'}}></div>
        <a className="buttonUnderlineSt" type="button" onClick={() => setCurrentPage('WordSearch')}>その他商品</a>
        
      </div>
    </>
    
  );
};


