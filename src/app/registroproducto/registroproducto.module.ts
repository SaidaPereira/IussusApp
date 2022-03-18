import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroproductoPageRoutingModule } from './registroproducto-routing.module';

import { RegistroproductoPage } from './registroproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroproductoPageRoutingModule
  ],
  declarations: [RegistroproductoPage]
})
export class RegistroproductoPageModule {}
