import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Tarefa } from '../model/tarefa.model';
import { TarefaService } from '../service/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefas: Tarefa[] = [];

  constructor(private service: TarefaService, private alert: AlertController, private toastController: ToastController) {
    service.listarTarefas().subscribe(dados => this.tarefas = dados);
  }

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
                                //this.atualizarDados(form);
                                this.incluirTarefa(form);
                             }
        }
      ]
    });

    screen.present();
  }

  atualizarDados(form: any){
    if(!form.task || form.task.trim() == ''){
      this.showToast(`A tarefa precisa ser preenchida`);
      return;
    }

    let obj = {id: this.getId(this.tarefas), 
               descricao: form.task, 
               status: false};

    this.tarefas.push(obj);

    localStorage.setItem('TarefasDB', JSON.stringify(this.tarefas));
  }

  apagar(id: number) {
    /*
    let index = this.tarefas.findIndex(tarefa => tarefa.id == id);

    this.tarefas.splice(index, 1);

    localStorage.setItem('TarefasDB', JSON.stringify(this.tarefas));
    */
    this.apagarTarefa(id);

    this.showToast('Tarefa apagada com sucesso!');
  }

  getId(dados: Tarefa[]): number {
    let tamanho:number = (dados.length) + 1;
    
    return tamanho;
  }

  async showToast(mensagem: string){
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-config'
    });

    toast.present();
  }

  async showEdit(tarefa: Tarefa){
    const screen = await this.alert.create({
      header: 'Editar Tarefa',
      inputs: [
        {
          name: 'newTask',
          type: 'text',
          value: tarefa.descricao
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {console.log('editar a tarefa')}
        },
        {
          text: 'Salvar',
          handler: (form) => {
                                tarefa.descricao = form.newTask;
                                localStorage.setItem('TarefasDB', JSON.stringify(this.tarefas));

                             }
        }
      ]
    });

    screen.present();
  }

  alterarStatus(tarefa: Tarefa){
    tarefa.status = !tarefa.status;
  }

  incluirTarefa(form: any){
    let tarefa: Tarefa = {id: 0, descricao: form.task, status: false};

    this.service.incluirTarefa(tarefa).subscribe(() => this.listarTarefas());
  }

  listarTarefas(){
    this.service.listarTarefas().subscribe(dados => this.tarefas = dados);
  }

  apagarTarefa(id: number){
    this.service.excluirTarefa(id).subscribe(() => this.listarTarefas());
  }
}
