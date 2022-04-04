import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroclientePageRoutingModule } from './registrocliente-routing.module';

import { RegistroclientePage } from './registrocliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroclientePageRoutingModule,
    ReactiveFormsModule 
  ],
  declarations: [RegistroclientePage]
})
export class RegistroclientePageModule {}
