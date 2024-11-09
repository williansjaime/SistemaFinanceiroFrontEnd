import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { API_URL } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class ProcessosService {

  private apiUrl = API_URL ; // 

  constructor() { }

  readExcel(file: File): { estado: string, numeroProcesso: string }[] {
    const reader: FileReader = new FileReader();
    const data: { estado: string, numeroProcesso: string }[] = [];
  
    reader.onload = (event: any) => {
      const binaryStr: string = event.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryStr, { type: 'binary' });
  
      const sheetName: string = workbook.SheetNames[0]; // Lê a primeira planilha
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
  
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
      jsonData.forEach((row: any[]) => {
        // Verifica se as colunas "JUI.Estado" e "PRO.Número do processo" estão presentes
        if (row.length >= 7) { // Supondo que "JUI.Estado" esteja na coluna 5 e "PRO.Número do processo" na coluna 6
          const estado = row[4]; // Coluna "JUI.Estado"
          const numeroProcesso = row[6]; // Coluna "PRO.Número do processo"
  
          // Filtra os valores específicos que não devem aparecer no resultado
          if (estado && numeroProcesso && estado !== 'JUI.Estado' && numeroProcesso !== 'PRO.Número do processo') {
            data.push({ estado, numeroProcesso });
          }
        }
      });
    };
  
    reader.readAsBinaryString(file);
    return data;
  }
  
  
  
  async POST(dataJSON:any[])
  { 
    try{
        const requestOptions = {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
          body: JSON.stringify(dataJSON)
        };
        const data = await fetch(this.apiUrl+"/api/v1/processos", requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  } 
 
}
