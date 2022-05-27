import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroagendaPageRoutingModule } from './registroagenda-routing.module';

import { RegistroagendaPage } from './registroagenda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroagendaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegistroagendaPage]
})
export class RegistroagendaPageModule {}
