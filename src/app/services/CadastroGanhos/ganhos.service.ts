import { Injectable } from '@angular/core';
import { API_URL } from '../../env';

@Injectable({
  providedIn: 'root'
})
export class GanhosService {
 
  private apiUrl = API_URL; 
  constructor() { 
  }

  async GET_TAGS(){
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(this.apiUrl+"/api/v1/ganhos",requestOptions)
            .then(response => response.json());
        return data;
      } catch (error) {
        return error;
      } 
  }

  async GET(){
    try{
        const requestOptions = {
          method: 'GET',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
        };
        const data = await fetch(this.apiUrl+"/api/v1/ganhos/1",requestOptions)
            .then(response => response.json());
        return data;
      } catch (error) {
        return error;
      } 
  }

  async POST(dataJSON:any[])
  { 
    try{
        const requestOptions = {
          method: 'POST',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          },
          body: JSON.stringify(dataJSON)
        };
        const data = await fetch(this.apiUrl+"/api/v1/ganhos", requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  } 


  async DELETE(id:number)
  { 
    try{
        const requestOptions = {
          method: 'DELETE',
          headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200'
          }
        };
        const data = await fetch(this.apiUrl+"/api/v1/ganhos/"+id, requestOptions)
        .then(response => response.json());
        return data;
    } catch (error) {
      return error;
    }  
  }
}
