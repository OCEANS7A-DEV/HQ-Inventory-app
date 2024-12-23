import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: 250 }
      );
      scanner.render(
        (decodedText) => {
          setResult(decodedText);
        },
        (error) => {
          console.warn(error);
        }
      );
    }
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <div id="qr-reader" ref={scannerRef}></div>
      <p>スキャン結果: {result}</p>
    </div>
  );
};

export default QRScanner;
