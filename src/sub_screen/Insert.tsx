import React, {useState, useEffect} from 'react';

import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
}

export default function InsertPage({ setCurrentPage, codeList }: SettingProps) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    const merchandise = AllData();
    console.log(merchandise)
    setData(merchandise);
  })

  return(
    <div>
      
    </div>
  );
};


