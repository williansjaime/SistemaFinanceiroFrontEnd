import { Component } from '@angular/core';
import { Router} from '@angular/router';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css','./sb-admin-2.min.css','./sb-admin-2.css',]
  })

export class HeaderComponent {
  urlRetorno:string="";  
  authToken:any = null;
  user:string = "";
  cabecalho:string = "";
  isSidebarToggled: boolean = false;

  constructor(private readonly router: Router) {    
    this.urlRetorno = router.url;
    this.authToken =  true;
    this.user = "WILLIANS";
    this.cabecalho = "";
  }

  atualisarRoute(url:string){
      this.urlRetorno="";
      this.urlRetorno = url;
      this.cabecalho = "";
      if(url == '/header/dashboard'){this.cabecalho = "Dashboard"}
      if(url == '/header/cadastro'){this.cabecalho = "Cadastro de Gastos"}
      if(url == '/header/ganhos'){this.cabecalho = "Ganhos"}
      if(url == '/header/investimentos'){this.cabecalho = "Investimentos"}
  }

  DoLogout() {
    window.localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  Autorizacao(){
    if(this.user == 'WILLIANS')
    {
      this.CabecalhoRota();
      return true;
    }else{
      this.CabecalhoRota();
      return false;
    }
  }

  
  CabecalhoRota() {
    const urlToCabecalho: {
      [key: string]: string;
    } = {
      '/header/cadastrarprojetos': 'Cadastrar',
      '/header/editarprojetos': 'Editar',
    };
    
    this.cabecalho = urlToCabecalho[this.urlRetorno] || '';
  }
   
  ToggleSidebar(): void {
    this.isSidebarToggled = !this.isSidebarToggled;
  }
  
  ToggleCadastro(): void {
    this.isSidebarToggled = false;
  }

}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [],
//   templateUrl: './header.component.html',
//   styleUrl: './header.component.css'
// })
// export class HeaderComponent {

// }
