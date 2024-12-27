import React, {useState, useEffect} from 'react';

import { AllData } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  codeList: Array<any>;
  setisLoading: (value: boolean) => void;
}

const findRowsByColumn = (
  array: any,
  target: number[],
  columnIndex: number
): number[][] => {
  return array.filter(
    (row) => row[columnIndex] !== undefined && target.includes(row[columnIndex])
  );
};

export default function InsertPage({ setCurrentPage, codeList, setisLoading }: SettingProps) {
  const [Data, setData] = useState([]);

  useEffect(() => {
    setisLoading(true);
    //console.log(codeList)
    const data = AllData();
    const matchingRows = findRowsByColumn(data, codeList, 1);
    console.log(matchingRows)

  })

  return(
    <div>
    </div>
  );
};


