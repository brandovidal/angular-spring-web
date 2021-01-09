import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client';
import { ClientService } from '../../services/client.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {
  title = 'Crear Cliente'
  client: Client = new Client();

  constructor(
    private clientService: ClientService,
    private utilService: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.setClient();
  }

  setClient() {
    this.activatedRoute.params.subscribe(params => {
      const { id } = params;
      if (!id) {
        return;
      }
      this.clientService.getClientById(id).subscribe(client => this.client = client);
      this.title = 'Actualizar Cliente'
    })
  }

  save() {
    console.log('save', this.client);
    this.client.id ? this.update() : this.create();
  }

  update() {
    if (!this.client) {
      return
    }

    const { id, name, lastname } = this.client;

    this.clientService.update(this.client, id)
      .subscribe(() => {
        this.utilService.showMessage({
          html: `<div>
            <div>Cliente actualizado</div>
            <small>Cliente ${name} ${lastname} actualizado con éxito</small>
          </div>`
        })
        this.router.navigate(['/clients']);
      })
  }

  create() {
    if (!this.client) {
      return
    }

    const { name, lastname } = this.client;

    this.clientService.create(this.client)
      .subscribe(() => {
        this.utilService.showMessage({
          html: `<div>
            <div>Nuevo Cliente</div>
            <small>Cliente ${name} ${lastname} creado con éxito</small>
          </div>`
        })
        this.router.navigate(['/clients']);
      })
  }
}
