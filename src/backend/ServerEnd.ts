const Get_URL = 'https://script.google.com/macros/s/AKfycbwdZ3lhe2QH2BChceXrTsxzGAkUd9EgZ2AZ7pWXWlMJvwtOtOcjXDTOXUmdBRJgCs25/exec';
const URL_STRING = "https://script.google.com/macros/s/AKfycbznkMazxV3wlmS66uEHcOSRkI_SBQkdfT_MfMzJnvueFkSwDxGFiLlmFtq-MfMM6ldL/exec";
export default async function main() {};
import { toast } from 'react-toastify';



export const AllData = async(
) => {
  try {
    const response = await fetch(
      Get_URL,
      {
        method: 'POST',
        body: JSON.stringify({
          action: 'allDataNum',
          sheetName: '在庫一覧',
        })
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json();
    //console.log(result);
    return result;

  }catch(e){
    return (e);
  }
};
export const UPDATE = async(
  data: any
) => {
  try {
    const response = await fetch(
      URL_STRING,
      {
        method: 'POST',
        headers: {
          "Content-Type" : "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          sub_action: 'get',
          action: 'updateCells',
          sheetName: '在庫一覧',
          updata: data
        })
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json();
    if(result === 'complete'){
      toast.success('入力完了')
    }

  }catch(e){
    return (e);
  }
};

