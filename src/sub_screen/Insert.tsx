import React, {useState, useEffect} from 'react';

import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
}

export default function InsertPage({ setCurrentPage, codeList }: SettingProps) {
  //const [Data, setData] = useState([]);

  useEffect(() => {
    console.log(codeList)
  })

  return(
    <div>
      
    </div>
  );
};


