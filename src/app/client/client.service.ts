import { Injectable } from '@angular/core';
import { Client } from './client';
import { CLIENTS } from './client.json';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = 'http://localhost:8080/api'

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.url}/clients`)
  }
}
