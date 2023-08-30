import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Tarefa } from '../model/tarefa.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: Tarefa[] = [];

  constructor(private alert: AlertController) {}

  async showAdd(){
    const screen = await this.alert.create({
      header: 'O que deseja fazer?',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'O que deseja fazer...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {console.log('apagar a tarefa')}
        },
        {
          text: 'Adicionar',
          handler: (form) => {
                                let obj = {descricao: form.task, status: false};
                                this.tarefas.push(obj);
                             }
        }
      ]
    });

    screen.present();
  }
}
