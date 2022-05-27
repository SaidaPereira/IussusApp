import { Component, OnInit, ViewChild } from '@angular/core';
import { AgendaService } from '../../../services/agenda.service';
import { ToastController, AlertController, IonList } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  @ViewChild(IonList) ionList: IonList;
  agendas= [];


  constructor(
    private agendaService: AgendaService,
    private toastCtrl: ToastController,
    public router: Router,
    public alertController: AlertController
  ) { }

  ngOnInit() {
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  listar() {
    this.agendaService.listAgenda().subscribe((data) => {
      if (data.success) {
        this.agendas = data.agendas;
      } else {
        this.agendas= [];
      }
      console.log(data)
    });
  }

  

  async eliminar(codigo) {

    const alert = await this.alertController.create({
      header: 'Eliminar Registro',
      message: '¿Está seguro de querer eliminarlo ?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          id: 'cancel-button',
        }, {
          text: 'Eliminar',
          id: 'confirm-button',
          handler: () => {


    this.agendaService.delete(codigo).subscribe(async (data) => {
      const message = data['success']
        ? 'Registro borrado con exito'
        : ' Error al eliminar, el registro esta siendo utilizado';
      const toast = await this.toastCtrl.create({
        message: 'Borrado con exito',
        duration: 2000,
      });
      this.listar();

      toast.present();

   
    });
  }
        }
  ]
});

await alert.present();
    
  }
}
