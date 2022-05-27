import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CabecerapedidoPageRoutingModule } from './cabecerapedido-routing.module';

import { CabecerapedidoPage } from './cabecerapedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CabecerapedidoPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CabecerapedidoPage]
})
export class CabecerapedidoPageModule {}
