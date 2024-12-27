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
    setisLoading(true);
    //console.log(codeList)
    const Dataset = async () => {
      const data = await AllData();
      const resultData = [];
      for (let i = 0; i < codeList.length; i++){
        console.log(codeList[i])
        let sData = data.find(row => row[1] == codeList[i])
        resultData.push(sData)
      }
      //console.log(resultData)
      setData(resultData)
    }
    Dataset()
    console.log(Data)
    setisLoading(false);
  },[])

  return(
    <div className="setwindow">
      <div>
        {
          Data.map((row,index) => (
            <div key={index}>

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


