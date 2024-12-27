import React, {useState, useEffect} from 'react';

import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
  setisLoading: (value: boolean) => void;
}


export default function InsertPage({ setCurrentPage, codeList, setisLoading }: SettingProps) {
  const [Data, setData] = useState([]);

  

  useEffect(() => {
    setisLoading(true);
    //console.log(codeList)
    const Dataset = async () => {
      const alldata = await AllData();
      return alldata;
    }
    const data = Dataset()
    console.log(data)
    return
    const resultData = [];
    for (let i = 0; i < codeList.length; i++){
      let sData = data.find(row => row[1] === codeList[i])
      resultData.push(sData)
    }
    console.log(resultData)
    //console.log(data.filter(row => row[1] == codeList))

  },[])

  return(
    <div>
    </div>
  );
};


