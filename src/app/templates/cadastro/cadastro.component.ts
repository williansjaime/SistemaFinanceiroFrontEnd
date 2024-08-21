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
  //selectedTag: number | string;

  constructor(private gastos_services: GastosService){ 
    this.get_gastos();
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

  async get_gastos()
  {    
    this.lista_gastos = [];        
    const data = await this.gastos_services.GET();
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_gastos.push(data[value]);
      }       
    }      
  }


  salvar_gastos(){    
    const valor = document.getElementById(('idvalor'))  as HTMLInputElement || null;
    const descricaoGasto = document.getElementById(('iddescricaoGasto'))  as HTMLInputElement || null;
    const tagGastos= document.getElementById(('tagGastos'))  as HTMLInputElement || null;
    const parcelas = document.getElementById(('id_parcelas'))  as HTMLInputElement || null;
    if(valor!= null && descricaoGasto != null && tagGastos !=null && parcelas!= null)
    {
      this.lista_gastos_post[0] = {
        id:0,
        tipogasto:tagGastos.value,
        valor:valor.value,
        parcelas:parcelas.value,
        descricaoGasto:descricaoGasto.value,
        dataCadastro:""
      };
      // console.log(this.lista_gastos_post)                     
      if(this.lista_gastos_post.length > 0){
        let confirmacao = window.confirm("Deseja salvar as informações?");
        if (confirmacao) {
          const data = this.gastos_services.POST(this.lista_gastos_post);
          window.alert("Cadastrado com sucesso")    
          this.get_gastos();
          this.get_tag_gastos(); 
          
        }

      }
    }
  }
  
  deletar_camera(id:number){
    this.gastos_services.DELETE(id);
    this.lista_gastos = [];    
    window.alert("Deletado com sucesso");
    this.get_gastos();
    this.get_tag_gastos(); 
  }  
}