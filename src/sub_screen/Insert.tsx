import React, {useState, useEffect, ChangeEvent} from 'react';
import '../css/QR.css'
import { AllData, UPDATE } from '../backend/ServerEnd';
import toast from 'react-hot-toast';



interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
  setisLoading: (value: boolean) => void;
}

interface InputData {
  [key: string]: number | string;  // 必要な型を設定
}



export default function InsertPage({ setCurrentPage, codeList, setisLoading }: SettingProps) {
  const [Data, setData] = useState<any[]>([]);
  const [inputData, setInputData] = useState<InputData>({});

  const numchange = (code: string, event: ChangeEvent<HTMLInputElement>) => {
    const numberValue = event.target.value;
    setInputData(prevInputData => ({
      ...prevInputData,
      [code]: numberValue
    }));
  };

  const DataUpdate = async() => {
    setisLoading(true);
    
    const result = await UPDATE(inputData);
    console.log(result)
    if(result === 'complete'){
      toast.success('入力完了')
    }
    setisLoading(false);
    setCurrentPage('QR_Scanner');
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
    const inputList = {};
    for (let i = 0; i < codeList.length; i++){
      inputList[codeList[i]] = 0;
    }
    setInputData(inputList)
  }, []); // codeList に依存
  

  return(
    <div className="setwindow">
      <div className="products-window">
        {
          Data.map((row,index) => (
            <div key={index} className="products">
              <div className="QR-product-code">商品コード: {row[1]}</div>
              <div className="QR-product-name">商品名: {row[2]}</div>
              <div className="QR-product-Num">
                <div className="QR-product-dataNum">データ上在庫: {row[9]}</div>
                <div>
                  <input
                    className="QR-product-inputNum"
                    type="tel"
                    pattern="^[0-9\-\/]+$"
                    placeholder='現物数'
                    value={inputData[row[1]] || ''}
                    onChange={(e) => numchange(row[1], e)}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className="InsertbuttonArea">
        <a className="buttonUnderlineSt" id="main_back" type="button" onClick={() => setCurrentPage('QR_Scanner')}>
          QRスキャンへ
        </a>
        <a className="buttonUnderlineSt" id="main_back" type="button" onClick={() => DataUpdate()}>
          現物数入力
        </a>
      </div>
    </div>
  );
};


