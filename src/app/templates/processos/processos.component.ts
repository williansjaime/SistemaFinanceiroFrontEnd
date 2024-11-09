import { Component } from '@angular/core';
import { ProcessosService } from '../../services/CadastroProcesso/processos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-processos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processos.component.html',
  styleUrl: './processos.component.css'
})
export class ProcessosComponent {


  selectedFile: File | null = null;
  extractedData: { estado: string, numeroProcesso: string }[] = [];

  constructor(private excelService: ProcessosService) {}

  onFileChange(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.extractedData = this.excelService.readExcel(file);
    }
  }

  salvar_investimento(){
    
    
    if(this.extractedData.length>0)
    {      
      console.log(this.extractedData)      
      let confirmacao = window.confirm("Deseja salvar as informações?");
      if (confirmacao) {
        const data = this.excelService.POST(this.extractedData);
        window.alert("Cadastrado com sucesso")          
      }
    }
  }
}
