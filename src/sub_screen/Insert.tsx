import React, {useState, useEffect} from 'react';
import '../css/QR.css'
import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
  setisLoading: (value: boolean) => void;
}


export default function InsertPage({ setCurrentPage, codeList, setisLoading }: SettingProps) {
  const [Data, setData] = useState<any[]>([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true); // ローディング開始
        const data = await AllData(); // 全データを取得
        const resultData = codeList.map(code => {
          return data.find(row => row[1] == code); // 条件に一致するデータを取得
        });
        setData(resultData.filter(Boolean)); // 有効なデータだけを設定
      } catch (error) {
        console.error("データ取得中にエラーが発生しました:", error);
      } finally {
        setisLoading(false); // 非同期操作完了後にローディング終了
      }
    };
  
    fetchData();
  }, []); // codeList に依存
  

  return(
    <div className="setwindow">
      <div>
        {
          Data.map((row,index) => (
            <div key={index}>
              <div>{row}</div>
            </div>
          ))
        }
      </div>
      <a className="buttonUnderlineSt" id="main_back" type="button" onClick={() => setCurrentPage('QR_Scanner')}>
        QRスキャンへ
      </a>
    </div>
  );
};


