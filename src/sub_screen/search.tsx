import React, { useState, ChangeEvent } from 'react';
import '../css/ProductSearchWord.css';
import { searchStr } from '../backend/WebStorage';
import { AllClearCells } from '../backend/ServerEnd';


interface SettingProps {
  setCurrentPage: (page: string) => void;
  setisLoading: (value: boolean) => void;
  setCodeList: (codes: Array<any>) => void;
}

export default function WordSearch({ setCurrentPage, setisLoading, setCodeList }: SettingProps) {
  const [SWord, setSWord] = useState<string>('');
  const [tableData, setTableData] = useState<any[]>([]); // 検索結果を保存する状態

  // テキスト入力が変更されたときに実行される関数
  const handlewordchange = (event: ChangeEvent<HTMLInputElement>) => {
    setSWord(event.target.value); // 入力された値をSWordにセット
  };

  // 商品の再検索を行い、結果を状態に保存
  const productReSearch = async () => {
    const result = await searchStr(SWord); // 検索関数を実行
    setTableData(result); // 結果を状態にセット
  };


  const handleKeyDown = (e) => {
    if (e.key == 'Enter'){
      productReSearch();
    }
  };

  const codeSelect = (row) => {
    const result = [row[1]];
    setCodeList(result)
    setCurrentPage('InsertPage')
  }



  return (
    <div className="search-window">
      <div className="WordSearch-area">
        <div className="search-input">
          <input
            type="text"
            value={SWord}
            pattern="^[ぁ-ん]+$"
            onChange={handlewordchange}
            placeholder="検索ワードを入力"
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <a className="buttonUnderlineSe" onClick={productReSearch}>
            検索
          </a>
        </div>
        <div className="search-head">
          <table className="search-head">
            <thead>
              <tr>
                <th className="stcode">商品ナンバー</th>
                <th className="stname">商品名</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="search-table">
          <div className="scrollable-table">
            <table className="search-data-table">
              <tbody className="datail">
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="scode">
                      <a
                        className="buttonUnderlineDR"
                        role="button"
                        href="#"
                        onClick={() => codeSelect(row)}
                      >
                        {row[1]}
                      </a>
                    </td>
                    <td className="sname">
                      <a
                        className="buttonUnderlineD"
                        role="button"
                        href="#"
                        onClick={() => codeSelect(row)}
                      >
                        {row[2]}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div><a className="buttonUnderlineSt" type="button" onClick={() => setCurrentPage('QR_Scanner')}>QRスキャンへ</a></div>
        <div><a className="buttonUnderlineSt" type="button" onClick={() => AllClearCells()}>現物数クリア</a></div>
      </div>
    </div>
    
  );
}