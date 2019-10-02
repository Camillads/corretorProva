import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const access_token = localStorage.getItem('access_token');
const token_type = localStorage.getItem('token_type');

const httpOptionsToken = { headers: new HttpHeaders({ 'Authorization': token_type + ' '
+ access_token, 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private baseUrl = 'https://gabrielsohza.pythonanywhere.com/api';

  constructor(private http: HttpClient) { }

  corrigirProva(arquivo1: any, arquivo2: any) {
    return this.http.post<any>(this.baseUrl, { arquivo1, arquivo2 }, httpOptions);
  }
}