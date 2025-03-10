import { stockList } from '../backend/ServerEnd';
import * as jaconv from 'jaconv';


export default function main(){}

export const localStorageSet = async (
) => {
  const data = await stockList();
  localStorage.setItem('data', JSON.stringify(data));
};




export const searchStr = async (searchword: string) => {
  //console.log(searchword)
  const swKZ = jaconv.toKatakana(searchword);
  const swHZ = jaconv.toHiragana(swKZ);
  const swKH = jaconv.toHan(swKZ);
  const data = JSON.parse(localStorage.getItem('data') ?? '');
  if (!data || data.length === 0) {
    console.log('データが存在しません。');
    return [];
  }

  const result = data.filter((item: any[]) => {
    const productName = item[2];
    const productCode = String(item[1]);
    if (typeof productName !== 'string') {
      return false;
    }
    return (
      productName.indexOf(swKZ) !== -1 ||
      productName.indexOf(swKH) !== -1 ||
      productName.indexOf(swHZ) !== -1 ||
      productCode.indexOf(searchword) !== -1
    );
  });

  //console.log(result)
  const FiltereResult = result.filter(row => row[2] !== "");
  const Last = FiltereResult.filter(row => Number.isInteger(row[1]));
  return Last;
};
