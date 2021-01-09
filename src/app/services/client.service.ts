import { Injectable } from '@angular/core';
import { Client } from '../client/client';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`)
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/clients/${id}`)
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client, { headers: this.headers })
  }

  update(client: Client, id: number): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${id}`, client, { headers: this.headers })
  }

  delete(id: number): Observable<Client> {
    return this.http.delete<Client>(`${this.apiUrl}/clients/${id}`, { headers: this.headers })
  }
}
