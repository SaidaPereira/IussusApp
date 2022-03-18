import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CabecerapedidoPage } from './cabecerapedido.page';

const routes: Routes = [
  {
    path: '',
    component: CabecerapedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabecerapedidoPageRoutingModule {}
