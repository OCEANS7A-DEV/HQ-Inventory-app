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
    //setisLoading(true);
    const validData = Object.fromEntries(
      Object.entries(inputData).filter(([key, value]) => value !== '')
    );
    if(Object.keys(validData).length > 0){
      //const result = await UPDATE(validData);
      await toast.promise(UPDATE(validData),{loading: '入力中...',
        success: <b>入力完了</b>,
        error: <b>入力失敗</b>
      })
      //setisLoading(false);
      setCurrentPage('QR_Scanner');
    }else if(Object.keys(validData).length == 0){
      toast.success('入力完了')
    }
    
  }

  const Test = async() => {
    //setisLoading(true);
    const validData = Object.fromEntries(
      Object.entries(inputData).filter(([key, value]) => value !== '')
    );
    if(Object.keys(validData).length > 0){
      //const result = await UPDATE(validData);
      await toast.promise(UPDATE(validData),{loading: '入力中...',
        success: <b>入力完了</b>,
        error: <b>入力失敗</b>
      })
      //setisLoading(false);
      setCurrentPage('QR_Scanner');
    }else if(Object.keys(validData).length == 0){
      toast.success('入力完了')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true); // ローディング開始
        const data = await AllData(); // 全データを取得
        console.log(data)
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
      //console.log(codeList[i])
      inputList[codeList[i]] = '';
    }
    console.log(inputList)
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
                <div className="QR-product-dataNum">データ上在庫: {row[12]}</div>
                <div>
                  <input
                    className="QR-product-inputNum"
                    type="text"
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
        {/* <a className="buttonUnderlineSt" id="main_back" type="button" onClick={() => Test()}>
          test
        </a> */}
      </div>
    </div>
  );
};


