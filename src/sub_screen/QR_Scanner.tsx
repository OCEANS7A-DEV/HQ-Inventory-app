import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

// new URLを使ってパスを解決
QrScanner.WORKER_PATH = new URL('qr-scanner/qr-scanner-worker.min.js', import.meta.url).toString();

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const scanner = new QrScanner(
        videoRef.current,
        (decodedText) => {
          setResult(decodedText);
        },
        {
          onDecodeError: (error) => {
            console.warn(error);
          },
          maxScansPerSecond: 2,
        }
      );
      scannerRef.current = scanner;
      scanner.start();

      return () => {
        scanner.stop();
      };
    }
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <video ref={videoRef} style={{ width: '100%', maxHeight: '400px' }} />
      <p>スキャン結果: {result || "読み取り中..."}</p>
    </div>
  );
};

export default QRScanner;
