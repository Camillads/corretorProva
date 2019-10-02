import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS', 'Accept': 'application/json',
  'content-type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private baseUrl = 'http://gabrielsohza.pythonanywhere.com/api';

  constructor(private http: HttpClient) { }

  corrigirProva(key: string, test: string) {
    return this.http.post<any>(this.baseUrl, { "key": key, "test": test }, httpOptions);
  }
}