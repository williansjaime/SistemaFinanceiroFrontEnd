import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component,AfterViewInit } from '@angular/core';
import { Dashboard } from '../../interfaces/DashboardInterface';
import { Chart, ChartEvent, ActiveElement } from 'chart.js/auto';
import { GanhosService } from '../../services/CadastroGanhos/ganhos.service';
import { GastosService } from '../../services/CadastraGastos/gastos.service';
import { DashboardService } from '../../services/Dashboard/dashboard.service';

interface FilteredGanho {
  dataCadastro: string;
  tipoGanho: string;
  valor: number;
}

interface FilteredGastos {
  dataCadastro: string;
  tipogasto: string;
  valor:number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  private myLineChart: Chart | null = null;
  now = new Date();
  mesAtual:string="";
  listaInterface:Dashboard[]=[];
  lista_receitas:any[] =[];
  lista_despesas:any[] = [];
  receita_mes_atual: number = 0;
  despesas_mes_atual: number = 0;
  alimentacao:any[]=[];
  transporte:any[]=[];
  saude:any[]=[];
  apartamento:any[]=[];
  chacara:any[]=[];
  outros:any[]=[];
  vestuarios:any[] =[];
  projetos:any[] = [];
  construcao:any[] = [];
  educaco:any[] = [];
  lanches:any[] = [];
  total_porcentagem:any[]=[];
  currentMonth:number = 0
  months: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  mesList: string[] =  [      
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',  
    'Julho',    
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',  
  ];
    
  constructor(private dashboad_api:DashboardService,private router: Router, private receitas:GanhosService, private gastos_services:GastosService) 
  {    
    this.get_receitas();
    this.get_despesas();
    this.currentMonth = this.now.getMonth();
    this.mesAtual = this.mesList[this.currentMonth];    
  } 

  OnInit(){ 
    this.listaInterface;
    }

  OnDestroy(){
    this.listaInterface;
  }

  carregar_ocorrencias(id:number,nome:string){
    const parametros = {
      id_EPI: id,
      nome_EPI:nome
    };
    this.router.navigate(['/header/listaocorrencia'], { queryParams: parametros });
  }  

  ngAfterViewInit() {
    this.grafico_linhas();
  }
  
  grafico_linhas() {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    if (!ctx) {
        console.error('Failed to acquire context from the canvas element.');
        return;
    }

    if (this.myLineChart) {
      this.myLineChart.destroy();
    }

    const labels = this.mesList.slice(0, this.now.getMonth() + 1);
    const somarPorMes = (dados: any[], tipo: string) => {
      const somaMes = new Array(12).fill(0);
      dados.forEach(item => {
          const dataCadastro = new Date(item.dataCadastro);
          const mes = dataCadastro.getMonth(); 
          const ano = dataCadastro.getFullYear();
          // if (ano === 2024 && mes === 0) {
          //     console.log("Janeiro de 2024 detectado corretamente.");
          // }
  
          somaMes[mes] += item.valor;
      });
      return somaMes.slice(0, new Date().getMonth() + 1); 
    };
  

    const dataset_gastos = somarPorMes(this.lista_despesas, 'valor');
    const dataset_receitas = somarPorMes(this.lista_receitas, 'valor');
    
    this.myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Gastos',
                    data: dataset_gastos,
                    fill: false,
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                },
                {
                    label: 'Receita',
                    data: dataset_receitas,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            onClick: (event: MouseEvent | any, elements: any[], chart: Chart) => {
                // Handle chart click events here if needed
            }
        }
    });
  }
 
  carregar_grafico_detalhado(month:string){
    for (let i = 0; i < this.mesList.length; i++) {
      if (month === this.mesList[i]) {
        const parametros = {
          id_mes: i,
          nome_mes:this.mesList[i]
        };
        this.router.navigate(['/header/detalheocorrencia'], { queryParams: parametros });
        break;
      }
    }
  }

  async get_receitas()
  {    
    this.lista_receitas = [];        
    const data = await this.receitas.GET(0);
    if(data!=null)
    {
      this.lista_receitas = this.filter_data_ganhos(data);
    }
  }

  async get_despesas()
  {    
    this.lista_despesas = [];        
    const data = await this.dashboad_api.GET();
    if(data!=null)
    {
      this.lista_despesas = this.filter_data_gastos(data);
      this.filtra_despesas_tipo();
      this.grafico_linhas();
    }    
  } 
 
  filtra_despesas_tipo(){
      this.receita_mes_atual = this.filter_dados_mes(this.lista_receitas,this.currentMonth)
      this.despesas_mes_atual = this.filter_dados_mes(this.lista_despesas,this.currentMonth); 
      this.alimentacao = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "ALIMENTACAO"),"valor");
      this.total_porcentagem[0] = this.alimentacao[this.currentMonth]
      this.transporte = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "TRANSPORTE"),'valor');
      this.total_porcentagem[1] = this.transporte[this.currentMonth]
      this.saude = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "SAUDE"),'valor');
      this.apartamento = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "APARTAMENTO"),'valor');
      this.total_porcentagem[2] = this.apartamento[this.currentMonth]
      this.chacara = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "CHACARA"),'valor');      
      this.outros = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "OUTROS"),'valor');
      this.vestuarios = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "VESTUARIO"),'valor');
      this.projetos = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "PROJETOS"),'valor');
      this.construcao = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "CONSTRUÇÃO"),'valor');     
      this.educaco = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "EDUCAÇÃO"),'valor');      
      this.lanches = this.somarPorMes(this.lista_despesas.filter(gasto => gasto.tipogasto === "LANCHES"),'valor');      
      this.outros[this.currentMonth]= (this.outros[this.currentMonth] + this.vestuarios[this.currentMonth] + this.projetos[this.currentMonth]+this.construcao[this.currentMonth]+this.educaco[this.currentMonth]+this.lanches[this.currentMonth]) 
      this.total_porcentagem[2] = this.outros[this.currentMonth]
  }

  filter_data_ganhos(data: any[]):FilteredGanho[]{
    return data.map(({ dataCadastro, tipoGanho, valor }) => ({
      dataCadastro,
      tipoGanho,
      valor
    }));
  }

  filter_data_gastos(data: any[]):FilteredGastos[]{
    return data.map(({ dataCadastro, tipogasto, valor }) => ({
      dataCadastro,
      tipogasto,
      valor
    }));
  }

  filter_dados_mes(dados_to_filtro: any[], mes: number | null = null) {
    // Pegar o mês atual se nenhum mês for passado
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear();
    const mesCalculado = mes !== null ? `${anoAtual}-${(mes + 1).toString().padStart(2, '0')}` : dataAtual.toISOString().slice(0, 7);
    const totalMesCalculado = dados_to_filtro
      .filter(dado => dado.dataCadastro.startsWith(mesCalculado))
      .reduce((acumulador, dado) => acumulador + dado.valor, 0);

    return totalMesCalculado;
  }

  somarPorMes(dados: any[], tipo: string) {
    const somaMes = new Array(12).fill(0);

    dados.forEach(item => {
        const dataCadastro = new Date(item.dataCadastro); // A data já está no formato correto
        const mes = dataCadastro.getUTCMonth(); // Usando getUTCMonth para evitar timezone
        somaMes[mes] += item.valor;
    });

    return somaMes.slice(0, new Date().getUTCMonth() + 1); 
  };

  
  get_despesas_mes(id:number){    
    this.currentMonth = id;
    this.filtra_despesas_tipo();    
  }
  porcentagem_mes(valor: number) {
    let total: number = 0;  // Corrigido: Declarando a variável com 'let'

    if (this.receita_mes_atual > 0) {
        total = (valor / this.receita_mes_atual) * 100;
    }
    return total;
}
}
