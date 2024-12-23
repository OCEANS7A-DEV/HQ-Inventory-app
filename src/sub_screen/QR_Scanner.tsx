import React, { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';

// Web Workerのパスを解決
QrScanner.WORKER_PATH = new URL('qr-scanner/qr-scanner-worker.min.js', import.meta.url).toString();

const QRScanner: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      // QRスキャナーのインスタンス生成
      const scanner = new QrScanner(
        videoRef.current,
        (decodedResult) => {
          // オブジェクトで返される場合に安全にdataを抽出
          if (typeof decodedResult === 'object' && decodedResult.data) {
            setResult(decodedResult.data);
          } else if (typeof decodedResult === 'string') {
            setResult(decodedResult);
          }
        },
        {
          onDecodeError: (error) => {
            console.warn('QRコードの読み取りエラー:', error);
          },
          maxScansPerSecond: 2,
        }
      );
      
      scannerRef.current = scanner;
      scanner.start().catch((error) => {
        console.error('QRスキャナーの起動に失敗しました:', error);
      });

      // クリーンアップ処理
      return () => {
        if (scannerRef.current) {
          scannerRef.current.stop();
          scannerRef.current.destroy();
          scannerRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div>
      <h1>QRコードスキャナー</h1>
      <video ref={videoRef} style={{ width: '100%', maxHeight: '300px' }} />
      <p>スキャン結果: {result || "読み取り中..."}</p>
    </div>
  );
};

export default QRScanner;
