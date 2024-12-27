const Get_URL = 'https://script.google.com/macros/s/AKfycbwdZ3lhe2QH2BChceXrTsxzGAkUd9EgZ2AZ7pWXWlMJvwtOtOcjXDTOXUmdBRJgCs25/exec';

export default async function main() {};



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
      Get_URL,
      {
        method: 'POST',
        body: JSON.stringify({
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
    //console.log(result);
    return result;

  }catch(e){
    return (e);
  }
};

