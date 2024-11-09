import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { HeaderComponent } from './templates/header/header.component';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { CadastroComponent } from './templates/cadastro/cadastro.component';
import { LoginComponent } from './templates/login/login.component';
import { GanhosComponent } from './templates/ganhos/ganhos.component';
import { InvestimentosComponent } from './templates/investimentos/investimentos.component';
import { ProcessosComponent } from './templates/processos/processos.component';
import { ImpostoRendaComponent } from './templates/imposto-renda/imposto-renda.component';



const routes: Routes = [  
  { 
    path: '', 
    component:LoginComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path:'login', component: LoginComponent},            
    ]
  },
  {
    path: 'header',
    component: HeaderComponent,
    children: [
    { path:'dashboard', component: DashboardComponent},
    { path:'cadastro', component: CadastroComponent},
    { path:'ganhos', component: GanhosComponent},
    { path:'investimentos', component: InvestimentosComponent},
    { path:'processos', component: ProcessosComponent},
    {path:'IR',component:ImpostoRendaComponent},
    ]
  }
  ];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    HttpClientModule,],
  exports: [RouterModule]
})

export class AppRoutingModule {}