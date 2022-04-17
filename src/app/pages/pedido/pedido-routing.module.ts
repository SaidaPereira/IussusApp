import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidoPage } from './pedido.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pedido/cabecera',
    pathMatch: 'full'
  },
  
  
  {
    path: '',
    component: PedidoPage,
    children: [
      {
        path: 'cabecera',
        loadChildren: () => import('../cabecerapedido/cabecerapedido.module').then(m=> m.CabecerapedidoPageModule)
      },
      {
        path: 'detalle',
        loadChildren: () => import('../detallepedido/detallepedido.module').then(m => m.DetallepedidoPageModule)
      }

    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidoPageRoutingModule {}
