import React, {useState, useEffect, ChangeEvent} from 'react';
import '../css/QR.css'
import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
  setisLoading: (value: boolean) => void;
}


export default function InsertPage({ setCurrentPage, codeList, setisLoading }: SettingProps) {
  const [Data, setData] = useState<any[]>([]);
  const [inputData, setInputData] = useState([])

  const numchange = (code: number, event: ChangeEvent<HTMLInputElement>) => {
    const numberValue = event.target.value;
  }

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
    const inputList = [];
    for (let i = 1; i < codeList.length; i++){
      inputList.push({[codeList[i]]: 0})
    }
    setInputData(inputList)
  }, []); // codeList に依存
  

  return(
    <div className="setwindow">
      <div>
        {
          Data.map((row,index) => (
            <div key={index} className="products">
              <div className="QR-product-code">{row[1]}</div>
              <div className="QR-product-name">{row[2]}</div>
              <div className="QR-product-Num">
                <div className="QR-product-dataNum">データ上在庫{row[9]}</div>
                <div>
                  <input
                  className="QR-product-inputNum"
                  type="tel"
                  pattern="^[0-9\-\/]+$"
                  value={inputData[row[2]]}
                  onChange={(e) => numchange(index, e)}
                  />
                </div>
              </div>
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


