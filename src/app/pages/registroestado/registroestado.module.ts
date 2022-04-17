import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroestadoPageRoutingModule } from './registroestado-routing.module';

import { RegistroestadoPage } from './registroestado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroestadoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroestadoPage]
})
export class RegistroestadoPageModule {}
