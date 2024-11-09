import { Injectable } from '@angular/core';
import { API_URL } from '../../env';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private apiUrl = API_URL;
  constructor() { }

  async GET(){
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(this.apiUrl+"/api/v1/despesas/0",requestOptions)
            .then(response => response.json());
        return data;
      } catch (error) {
        return error;
      } 
  }

}