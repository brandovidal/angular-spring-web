import { UtilService } from 'src/app/services/util.service';
import { Component, OnInit } from '@angular/core';
import { Client } from './client';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clients: Client[]

  constructor(
    private clientService: ClientService,
    private utilService: UtilService,
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
  }

  delete(client: Client): void {
    const { name, lastname } = client;
    this.utilService.showMessage({
      html: `
      <div>
        <div>Eliminar Cliente</div>
        <small>Desea eliminar al cliente ${name} ${lastname}</small>
      </div>`,
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Eliminar'

    }).then((result) => {
      if(!result.value) return;

      this.clientService.delete(client.id).subscribe(() => {
        this.clients = this.clients.filter(cli => cli.id != client.id)
        this.utilService.showMessage({
          html: `
          <div>
            <div>Cliente Eliminado</div>
            <small>Cliente ${name} ${lastname} eliminado</small>
          </div>`
        })

      })
    })
  }
}
