import { Service } from "typedi"
const extract = require('extract-zip');

@Service()
export class BulkImportService {
// XLSX to Json
public async xlsxToJson(inputFile: any, sheetName: string): Promise<any> {
  const xlsxToJson = require('xlsx-to-json');
  return new Promise((resolve, reject) => {
    xlsxToJson({
      input: inputFile,
      output: null,
      sheet: sheetName,
    }, (err, result) =>{
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  })
}

// csv to Json
public async csvToJson(filePath): Promise<any> {
  const csvtojson = require('csvtojson');
  return new Promise((resolve, reject) => {
    csvtojson()
    .fromFile(filePath).then((jsonValue) => {
      resolve(jsonValue);
    }).catch((err) => {
      reject(err);
    });
  });
}
}
