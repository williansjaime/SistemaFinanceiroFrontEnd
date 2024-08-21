import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestimentosService } from '../../services/CadastroInvestimentos/investimentos.service';
import { Investimentos } from '../../interfaces/InvestimentosInterface';
import { Tags } from '../../interfaces/TagsInterface';


@Component({
  selector: 'app-investimentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investimentos.component.html',
  styleUrl: './investimentos.component.css'
})
export class InvestimentosComponent {

  lista_investimentos:Investimentos[] = [];
  lista_investimentos_post:Investimentos[] = [];
  lista_tags_name:Tags[] = [];
  //selectedTag: number | string;

  constructor(private investimentos_services: InvestimentosService){ 
    this.get_gastos();
    this.get_tag_gastos();
  }

  async get_tag_gastos()
  {    
    this.lista_tags_name = [];        
    const data = await this.investimentos_services.GET_TAGS();
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
    this.lista_investimentos = [];        
    const data = await this.investimentos_services.GET();
    if(data!=null)
    {
      for (var value in data) 
      {
        this.lista_investimentos.push(data[value]);
      }       
    }
      
  }


  salvar_investimento(){
    
    const valor = document.getElementById(('idValor'))  as HTMLInputElement || null;
    const descricaoGasto = document.getElementById(('idDescricao'))  as HTMLInputElement || null;
    const tagGastos= document.getElementById(('tags'))  as HTMLInputElement || null;
    const ticket= document.getElementById(('idTicket'))  as HTMLInputElement || null;
    if(valor!= null && descricaoGasto != null && tagGastos !=null && ticket != null)
    {
      this.lista_investimentos_post[0] = {
        id:0,
        tagInvestimento:tagGastos.value,
        valorTotal:valor.value,
        descricaoInvestimento:descricaoGasto.value,
        ticket:ticket.value,
        dataCadastro:"",
        valorAtual:0
      };
      //console.log(this.lista_ganhos_post)                     
      if(this.lista_investimentos_post.length > 0){
        let confirmacao = window.confirm("Deseja salvar as informações?");
        if (confirmacao) {
          const data = this.investimentos_services.POST(this.lista_investimentos_post);
          window.alert("Cadastrado com sucesso")    
          this.get_gastos();
          this.get_tag_gastos(); 
          this.lista_investimentos_post = [];          
        }

      }
    }
  }
  
  deletar_ganho(id:number){
    this.investimentos_services.DELETE(id);
    this.lista_investimentos = [];    
    window.alert("Deletado com sucesso");
    this.get_gastos();
    this.get_tag_gastos(); 
  }  
}

