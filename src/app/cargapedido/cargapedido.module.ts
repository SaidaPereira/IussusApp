import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargapedidoPageRoutingModule } from './cargapedido-routing.module';

import { CargapedidoPage } from './cargapedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargapedidoPageRoutingModule
  ],
  declarations: [CargapedidoPage]
})
export class CargapedidoPageModule {}
