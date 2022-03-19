import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./intro/intro.module').then( m => m.IntroPageModule)
  },
  
  {
    path: 'agenda',
    loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrousuario',
    loadChildren: () => import('./registrousuario/registrousuario.module').then( m => m.RegistrousuarioPageModule)
  },
  {
    path: 'registrocliente',
    loadChildren: () => import('./registrocliente/registrocliente.module').then( m => m.RegistroclientePageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registroproducto',
    loadChildren: () => import('./registroproducto/registroproducto.module').then( m => m.RegistroproductoPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'estado',
    loadChildren: () => import('./estado/estado.module').then( m => m.EstadoPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'cabecerapedido',
    loadChildren: () => import('./cabecerapedido/cabecerapedido.module').then( m => m.CabecerapedidoPageModule)
  },  {
    path: 'cargapedido',
    loadChildren: () => import('./cargapedido/cargapedido.module').then( m => m.CargapedidoPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
