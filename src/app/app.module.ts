import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HeaderComponent } from './templates/header/header.component';
import { DashboardComponent } from './templates/dashboard/dashboard.component';
import { CadastroComponent } from './templates/cadastro/cadastro.component';
import { LoginComponent } from './templates/login/login.component';



const routes: Routes = [
];

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
      HeaderComponent,
      //DashboardComponent,
    // CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [provideNgxMask({})],
  bootstrap: [AppComponent]
})
export class AppModule { }