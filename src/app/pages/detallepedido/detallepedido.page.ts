import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormBuilder } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-detallepedido',
  templateUrl: './detallepedido.page.html',
  styleUrls: ['./detallepedido.page.scss'],
})
export class DetallepedidoPage implements OnInit {
   productos= null;
    cabecera;
  registroitem = this.fb.group({
    producto: [''],
    precio: [''],
    cantidad: [''],
    descripcion: [''],

  
  }); 
  constructor(
    private productoService:ProductoService,
    private fb: FormBuilder,
    public toastCtrl: ToastController,
    private router: Router,
    public alertController: AlertController,
    private activateRoute: ActivatedRoute,
    private PedidoService:PedidoService
  ) { }

  ngOnInit() {
    this.obtenerProductos();
  }
  descripcion="";
  total=0;
  codigo;
  pro_codigo;
  detalles=[];
  

  guardardetalle(){
 let index=0;
   if (this.detalles.length>0)
   index=this.detalles.length;

    const pedido = this.registroitem.value;
    let totalTemp=pedido.precio*pedido.cantidad;
    console.log(pedido)

    const pedidos = {
      index:index,
      pedi_codigo: this.codigo === '0' ? null : Number(this.codigo),
      productoCod: pedido.producto.pro_codigo,
      precio: pedido.precio,
      cant: pedido.cantidad,
      pedi_total:totalTemp,
      pro_descripcion:pedido.producto.pro_descripcion
    };

    this.total+=totalTemp;   
    this.detalles.push(pedidos);
    console.log( this.detalles,pedidos);
  }

  eliminarDetalle(index,totalDetalle){
    this.total-=totalDetalle;
   for(let i =0 ; i<this.detalles.length;i++){
    
    if(this.detalles[i].index===index){
      this.detalles.splice(i,1);
    }
   }
    console.log
  }

  onChange($event){
    console.log($event)
    this.pro_codigo=$event.detail.value.pro_codigo;
  
    console.log(this.pro_codigo)

  }

 guardarPedido(){
  this.cabecera= this.PedidoService.cabecer
  let enviar={
    "fecha": this.cabecera.fecha,
    "clienteCod" : this.cabecera.cliente,
    "estadoCod": this.cabecera.estado,
     "obse" : this.cabecera.observacion,
     "total" : this.total,
     "detalles" : this.detalles
  }
  console.log(enviar);

  console.table(enviar.detalles)
  this.PedidoService.create(enviar).subscribe(x=>{
    console.log(x)
  })
  this.router.navigate(['/home']);

 }

  

  private obtenerProductos() {
    this.productoService.list().subscribe(data => {
      this.productos= data.success ? data.productos : null;
      console.log(data)
    });
  }


volverCabecera(){
  this.router.navigate(['/pedido/cabecera']);
}

}




/*
cliente: 1
estado: 2
fecha: "2022-05-26"
observacion: "123"

*/