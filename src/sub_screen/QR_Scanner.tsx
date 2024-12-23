import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    Html5QrcodeScanner: any;
  }
}

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scannerRef.current) {
      const scanner = new window.Html5QrcodeScanner(
        'qr-reader', // HTML要素のID
        { fps: 10, qrbox: 250 } // FPSとQRコードのサイズ
      );

      scanner.render(
        (decodedText: string) => {
          setResult(decodedText); // スキャン結果
          scanner.clear(); // 成功後にスキャン停止
        },
        (error: any) => {
          console.warn(error); // スキャンエラー
        }
      );
    }
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <div id="qr-reader" ref={scannerRef}></div>
      <p>{result ? `スキャン結果: ${result}` : 'QRコードをスキャンしてください'}</p>
    </div>
  );
};

export default QRScanner;
