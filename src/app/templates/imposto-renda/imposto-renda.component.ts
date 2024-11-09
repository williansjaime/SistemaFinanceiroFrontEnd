import { Component } from '@angular/core';

@Component({
  selector: 'app-imposto-renda',
  standalone: true,
  imports: [],
  templateUrl: './imposto-renda.component.html',
  styleUrl: './imposto-renda.component.css'
})
export class ImpostoRendaComponent {
  /*
  O cálculo do Imposto de Renda para um MEI (Microempreendedor Individual) funciona de maneira diferente em relação às pessoas 
  físicas ou outras modalidades de empresas. 
  Na prática, o MEI paga seus tributos de maneira simplificada através do DAS (Documento de Arrecadação do Simples Nacional), 
  e não paga Imposto de Renda diretamente sobre seus rendimentos empresariais. No entanto, ele pode ter que declarar 
  Imposto de Renda como pessoa física, dependendo dos seus rendimentos.

1. Tributação do MEI
O DAS inclui:

INSS: 5% do salário mínimo.
ISS: R$ 5, se a atividade for de prestação de serviços.
ICMS: R$ 1, se a atividade for de comércio ou indústria.
Este valor mensal é fixo, variando apenas de acordo com o salário mínimo.

2. Imposto de Renda como Pessoa Física
Apesar do MEI não pagar Imposto de Renda diretamente pela empresa, ele deve prestar atenção aos rendimentos como pessoa física. 
A tributação ocorre quando o rendimento ultrapassa o limite de isenção do IRPF (Imposto de Renda Pessoa Física).

Como calcular o lucro para fins de IR:
Receita Bruta do MEI: Soma de todas as receitas mensais.
Despesas do MEI: Incluem gastos como aluguel, mercadorias, fornecedores, etc.
Lucro: Receita bruta menos despesas.
O lucro do MEI é dividido em duas partes:

Parte isenta: Considera-se um lucro presumido com base na atividade. O percentual isento varia:

8% para comércio.
16% para indústria.
32% para serviços.
Esse percentual de lucro presumido não paga Imposto de Renda, pois é considerado isento.

Parte tributável: O restante do lucro que exceder o valor isento poderá ser tributado como rendimento na declaração de Imposto de Renda Pessoa Física.

Exemplo:
Suponha que o MEI tenha uma receita bruta anual de R$ 100.000 e despesas de R$ 30.000:

Receita Bruta: R$ 100.000
Despesas: R$ 30.000
Lucro Total: R$ 100.000 - R$ 30.000 = R$ 70.000
Se o MEI for prestador de serviços:

Lucro Presumido Isento (32% sobre R$ 100.000): R$ 32.000
Lucro Tributável: R$ 70.000 - R$ 32.000 = R$ 38.000
Os R$ 38.000 deverão ser declarados como rendimento tributável na declaração de pessoa física, sujeito às alíquotas do IRPF.

Quando o MEI deve declarar o IRPF?
O MEI deverá declarar o Imposto de Renda como pessoa física se:

Os rendimentos tributáveis (aqueles acima da parte isenta) forem superiores a R$ 28.559,70 no ano.
Possuir rendimentos isentos, não tributáveis ou tributados exclusivamente na fonte superiores a R$ 40.000.
Tiver patrimônio superior a R$ 300.000 em 31 de dezembro do ano-base.
Se o MEI tiver rendimentos que excedam esses limites, precisará enviar a Declaração de Imposto de Renda Pessoa Física (DIRPF).
  */

// lista_investimentos:Investimentos[] = [];
// lista_investimentos_post:Investimentos[] = [];
// lista_tags_name:Tags[] = [];
//selectedTag: number | string; 

constructor(){ 
  this.get_gastos();
  this.get_tag_gastos();
}

async get_tag_gastos()
{    
  // this.lista_tags_name = [];        
  // const data = await this.investimentos_services.GET_TAGS();
  // if(data!=null)
  // {
  //   for (var value in data) 
  //   {
  //     this.lista_tags_name.push(data[value]);
  //   }        
  // }
    
}

async get_gastos()
{    
  // this.lista_investimentos = [];        
  // const data = await this.investimentos_services.GET();
  // if(data!=null)
  // {
  //   for (var value in data) 
  //   {
  //     this.lista_investimentos.push(data[value]);
  //   }       
  // }
    
}


salvar_investimento(){
  
  // const valor = document.getElementById(('idUnitario'))  as HTMLInputElement || null;
  // const descricaoGasto = document.getElementById(('idDescricao'))  as HTMLInputElement || null;
  // const tagGastos= document.getElementById(('tags'))  as HTMLInputElement || null;
  // const ticket= document.getElementById(('idTicket'))  as HTMLInputElement || null;
  // const idQuantidade= document.getElementById(('idQuantidade'))  as HTMLInputElement || null;
  // if(valor!= null && descricaoGasto != null && tagGastos !=null && ticket != null && idQuantidade != null)
  // {
  //   this.lista_investimentos_post[0] = {
  //     id:0,
  //     valorUnitario:valor.value,
  //     Quantidade:Number(idQuantidade.value),
  //     tagInvestimento:tagGastos.value,
  //     valorTotal:String(Number(idQuantidade.value) * Number(valor.value)),
  //     descricaoInvestimento:descricaoGasto.value,
  //     ticket:ticket.value,
  //     dataCadastro:"",
  //     valorAtual:0
  //   };
  //   //console.log(this.lista_ganhos_post)                     
  //   if(this.lista_investimentos_post.length > 0){
  //     let confirmacao = window.confirm("Deseja salvar as informações?");
  //     if (confirmacao) {
  //       const data = this.investimentos_services.POST(this.lista_investimentos_post);
  //       window.alert("Cadastrado com sucesso")    
  //       this.get_gastos();
  //       this.get_tag_gastos(); 
  //       this.lista_investimentos_post = [];          
  //     }

  //   }
  // }
}

deletar_ganho(id:number){
  // this.investimentos_services.DELETE(id);
  // this.lista_investimentos = [];    
  // window.alert("Deletado com sucesso");
  // this.get_gastos();
  // this.get_tag_gastos(); 
} 

}
