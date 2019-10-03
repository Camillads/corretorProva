import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text' as 'json'
};

@Injectable({cer!!
  providedIn: 'root'
})
export class AppServiceService {
  private baseUrl = 'http://gabrielsohza.pythonanywhere.com/api';

  constructor(private http: HttpClient) { }

  corrigirProva(key: string, test: string) {
    return this.http.post<any>(this.baseUrl, { key, test }, httpOptions);
  }
}