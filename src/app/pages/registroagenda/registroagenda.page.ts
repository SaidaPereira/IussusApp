import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../../services/cliente.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AgendaService } from '../../../services/agenda.service';

@Component({
  selector: 'app-registroagenda',
  templateUrl: './registroagenda.page.html',
  styleUrls: ['./registroagenda.page.scss'],
})
export class RegistroagendaPage implements OnInit {


  registroagenda = this.fb.group({
    fecha: [new Date().toISOString().slice(0, 16), Validators.required],
    cliente: ['', Validators.required],
    notas: [''],
  
  }); 
  public codigo: string;
  public clientes = null;


  constructor(
    private clienteService: ClienteService,
    private agendaService : AgendaService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    private router: Router,
    public alertController: AlertController,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
   this.ObtenerAgenda();
  }

  guardarAgenda() {
    const agenda= this.registroagenda.value;
    const agendas = {
      age_codigo: this.codigo === '0' ? null : Number(this.codigo),
      age_fecha: agenda.fecha,
      age_codcli: agenda.cliente,
      age_notas: agenda.notas,
      
    };
    
    

    this.agendaService.create(agendas).subscribe(async (data: any) => {
      const message = data['success']
        ? 'Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/agenda']);
    });
  }

  ObtenerAgenda() {

    this.obtenerClientes();
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.agendaService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registroagenda.setValue({
            fecha: data.agenda.age_fecha,
            cliente: data.agenda.age_codcli,
            notas: data.agenda.age_notas,
          });
          console.log(data);
        }
      });
    }
  }

  private obtenerClientes() {
    this.clienteService.list().subscribe(data => {
      this.clientes = data.success ? data.clientes : null;
    });
  }
}
