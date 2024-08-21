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

  constructor(private ganhos_services: GanhosService){ 
    this.get_gastos();
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

  async get_gastos()
  {    
    this.lista_ganhos = [];        
    const data = await this.ganhos_services.GET();
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
    if(valor!= null && descricaoGasto != null && tagGastos !=null)
    {
      this.lista_ganhos_post[0] = {
        id:0,
        tipoGanho:tagGastos.value,
        valor:valor.value,
        descricaoGanho:descricaoGasto.value,
        dataCadastro:""
      };
      //console.log(this.lista_ganhos_post)                     
      if(this.lista_ganhos_post.length > 0){
        let confirmacao = window.confirm("Deseja salvar as informações?");
        if (confirmacao) {
          const data = this.ganhos_services.POST(this.lista_ganhos_post);
          window.alert("Cadastrado com sucesso")    
          this.get_gastos();
          this.get_tag_gastos(); 
          
        }

      }
    }
  }
  
  deletar_ganho(id:number){
    this.ganhos_services.DELETE(id);
    this.lista_ganhos = [];    
    window.alert("Deletado com sucesso");
    this.get_gastos();
    this.get_tag_gastos(); 
  }  
}
