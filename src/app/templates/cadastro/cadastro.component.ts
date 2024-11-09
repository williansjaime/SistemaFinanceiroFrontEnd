import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GastosService } from '../../services/CadastraGastos/gastos.service';
import { CadastroGastos } from '../../interfaces/CadastroFinanceiroInterface';
import { TagGastos } from '../../interfaces/GastosTagInterface';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})

export class CadastroComponent {
  lista_gastos:CadastroGastos[] = [];
  lista_gastos_post:CadastroGastos[] = [];
  lista_tags_name:TagGastos[] = [];
  total_gastos:number = 0;
  //selectedTag: number | string;
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private gastos_services: GastosService){ 
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.get_gastos(monthIndex+1);
    this.get_tag_gastos();
  }

  async get_tag_gastos()
  {    
    this.lista_tags_name = [];        
    const data = await this.gastos_services.GET_TAGS();
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_tags_name.push(data[value]);
      }        
    }
      
  }

  async get_gastos(id:number)
  {    
    this.lista_gastos = [];        
    const data = await this.gastos_services.GET(id);
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_gastos.push(data[value]);
      }       
    }     
    this.total_gastos = this.gastos_total();
  }


  salvar_gastos(){
    this.lista_gastos_post=[];
    const nota = document.getElementById('idCheckNota') as HTMLInputElement;
    const valor = document.getElementById(('idvalor'))  as HTMLInputElement || null;
    const descricaoGasto = document.getElementById(('iddescricaoGasto'))  as HTMLInputElement || null;
    const tagGastos= document.getElementById(('tagGastos'))  as HTMLInputElement || null;
    const parcelas = document.getElementById(('id_parcelas'))  as HTMLInputElement || null;
    const dataDespesas = document.getElementById(('iddata'))  as HTMLInputElement || null;
    const quantidade = document.getElementById(('idquantidade'))  as HTMLInputElement || null;
    
    if(valor!= null && descricaoGasto != null && tagGastos !=null && parcelas!= null && dataDespesas != null)
    {
      if(valor.value!= "" && descricaoGasto.value != "" && tagGastos.value !="" && parcelas.value != "" && dataDespesas.value != "")
      {
        for (let i = 0; i < Number(parcelas.value); i++) {
          this.lista_gastos_post[i] = {
            id: i, 
            tipogasto: tagGastos.value,
            valor: String(Number(valor.value)/Number(parcelas.value)),
            parcelas: parcelas.value,
            descricaoGasto: descricaoGasto.value,
            dataCadastro: this.adicionar_meses(dataDespesas.value, i),
            quantidade: quantidade.value !== "" ? quantidade.value : "",
            notaFiscal:nota.checked? 1 : 0 
          };
        }
                  
        // console.log(this.lista_gastos_post)
        if(this.lista_gastos_post.length > 0){
          let confirmacao = window.confirm("Deseja salvar as informações?");
          if (confirmacao) {
            const data = this.gastos_services.POST(this.lista_gastos_post);
            window.alert("Cadastrado com sucesso")
            const currentDate = new Date();
            const monthIndex = currentDate.getMonth();
            this.get_gastos(monthIndex+1);
            this.get_tag_gastos();             
          }
        }      
      }else{
        window.alert("Preencha todos os dados corretamente")
      }
    }
      
  }
  
  adicionar_meses(data: string, meses: number): string {
    let dataObj = new Date(data); // Converter a string para objeto Date
    let diaOriginal = dataObj.getDate(); // Capturar o dia original
    
    // Adicionar meses
    dataObj.setMonth(dataObj.getMonth() + meses);
    
    // Caso o dia original não exista no novo mês, será ajustado para o último dia do mês
    if (dataObj.getDate() < diaOriginal) {
      dataObj.setDate(0); // Ir para o último dia do mês anterior
    }

    return dataObj.toISOString().split('T')[0]; // Converter para string no formato 'YYYY-MM-DD'
  }

  
  get_despesas_mes(id:number){
    this.lista_gastos = [];    
    this.get_gastos(id+1);    
  }

  deletar(id:number){
    this.gastos_services.DELETE(id);
    this.lista_gastos = [];    
    window.alert("Deletado com sucesso");
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.get_gastos(monthIndex+1);
    this.get_tag_gastos(); 
  }  

  gastos_total(){
    const total_gastos = this.lista_gastos
        .filter(x => x.valor !== undefined && x.valor !== null) // Ensure `valor` exists and is not null
        .reduce((soma, item) => soma + Number(item.valor), 0); // Sum the `valor` values
    return total_gastos;
  }
}