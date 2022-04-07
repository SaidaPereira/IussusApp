import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroestadoPage } from './registroestado.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroestadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroestadoPageRoutingModule {}
