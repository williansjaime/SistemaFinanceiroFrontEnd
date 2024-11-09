import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GanhosService } from '../../services/CadastroGanhos/ganhos.service';
import { Ganhos } from '../../interfaces/GanhosInterface';
import { TagGanhos } from '../../interfaces/GanhosTagInterface';


@Component({
  selector: 'app-ganhos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ganhos.component.html',
  styleUrl: './ganhos.component.css'
})
export class GanhosComponent {

  lista_ganhos:Ganhos[] = [];
  lista_ganhos_post:Ganhos[] = [];
  lista_tags_name:TagGanhos[] = [];
  //selectedTag: number | string;
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private ganhos_services: GanhosService){ 
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.get_receitas(monthIndex+1);
    this.get_tag_gastos();
  }

  async get_tag_gastos()
  {    
    this.lista_tags_name = [];        
    const data = await this.ganhos_services.GET_TAGS();
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_tags_name.push(data[value]);
      }        
    }
      
  }

  async get_receitas(id:number)
  {    
    this.lista_ganhos = [];        
    const data = await this.ganhos_services.GET(id);
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_ganhos.push(data[value]);
      }       
    }
      
  }


  salvar_ganho(){
    
    const valor = document.getElementById(('idvalor'))  as HTMLInputElement || null;
    const descricaoGasto = document.getElementById(('iddescricaoGanho'))  as HTMLInputElement || null;
    const tagGastos= document.getElementById(('tagGanho'))  as HTMLInputElement || null;
    const dataDespesas = document.getElementById(('iddata'))  as HTMLInputElement || null;

    if(valor!= null && descricaoGasto != null && tagGastos !=null && dataDespesas != null)
    {
      if(valor.value!= "" && descricaoGasto.value != "" && tagGastos.value !="" && dataDespesas.value != "")
      {
        this.lista_ganhos_post[0] = {
          id:0,
          tipoGanho:tagGastos.value,
          valor:valor.value,
          descricaoGanho:descricaoGasto.value,
          dataCadastro:dataDespesas.value
        };
        //console.log(this.lista_ganhos_post)                     
        if(this.lista_ganhos_post.length > 0){
          let confirmacao = window.confirm("Deseja salvar as informações?");
          if (confirmacao) {
            const data = this.ganhos_services.POST(this.lista_ganhos_post);
            window.alert("Cadastrado com sucesso")              
            const currentDate = new Date();
            const monthIndex = currentDate.getMonth();
            this.get_receitas(monthIndex+1);
            this.get_tag_gastos();             
          }
        }
      }else{
          window.alert("Preencha todos os dados abaixo!!!") 
      }
    }
  }

  get_receitas_mes(id:number){
    this.lista_ganhos = [];     
    this.get_receitas(id+1);    
  }
  
  deletar_ganho(id:number){
    this.ganhos_services.DELETE(id);
    this.lista_ganhos = [];    
    window.alert("Deletado com sucesso");
    const currentDate = new Date();
    const monthIndex = currentDate.getMonth();
    this.get_receitas(monthIndex+1);
    this.get_tag_gastos(); 
  }  
}
