import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { EstadoService } from '../../../services/estado.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cabecerapedido',
  templateUrl: './cabecerapedido.page.html',
  styleUrls: ['./cabecerapedido.page.scss'],
})
export class CabecerapedidoPage implements OnInit {

  registropedido = this.fb.group({
    fecha: [new Date().toISOString().slice(0, 16), Validators.required],
    cliente: ['', Validators.required],
    estado: ['', Validators.required],
    observacion: [''],
  
  }); 


  public codigo: string;
  public clientes = null;
  public estados= null;

  public fecha = '';

 

  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private estadoService: EstadoService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    private router: Router,
    public alertController: AlertController,
    private activateRoute: ActivatedRoute

  ) { }
  ngOnInit() {
    this.ObtenerPedido();
  }

  guardarPedido() {
    const pedido = this.registropedido.value;
    const pedidos = {
      ped_codigo: this.codigo === '0' ? null : Number(this.codigo),
      ped_fecha: pedido.fecha,
      ped_codcli: pedido.cliente,
      ped_codest: pedido.estado,
      ped_obse: pedido.observacion,
      
    };
    
    
    console.log('DATA', pedidos);

    this.pedidoService.create(pedidos).subscribe(async (data: any) => {
      const message = data['success']
        ? 'Pedido Guardado con exito'
        : ' Error al guardar';
      const toast = await this.toastCtrl.create({
        message,
        duration: 2000,
      });

      toast.present();

      this.router.navigate(['/home']);
    });
  }

  sendCabecera(){
    this.pedidoService.cabecer=(this.registropedido.value);
    this.router.navigate(['/pedido/detalle']);
  }


  ObtenerPedido() {

    this.obtenerClientes();
    this.obtenerEstados();
    this.codigo = this.activateRoute.snapshot.params.id;

    if (this.codigo !== '0') {
      this.clienteService.getById(this.codigo).subscribe((data) => {
        if (data.success) {
          this.registropedido.setValue({
            fecha: data.pedido.ped_fecha,
            cliente: data.pedido.ped_codcli,
           estado: data.pedido.ped_estado,
            observacion: data.pedido.ped_obse,
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

  private obtenerEstados() {
    this.estadoService.listEstados().subscribe(data => {
      this.estados= data.success ? data.estados : null;
    });
  }

  
}
