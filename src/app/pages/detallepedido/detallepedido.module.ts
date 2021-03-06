import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallepedidoPageRoutingModule } from './detallepedido-routing.module';

import { DetallepedidoPage } from './detallepedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallepedidoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetallepedidoPage]
})
export class DetallepedidoPageModule {}
