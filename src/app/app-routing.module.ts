import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  
  {
    path: 'agenda',
    loadChildren: () => import('./pages/agenda/agenda.module').then( m => m.AgendaPageModule)
  },
  
  {
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrousuario',
    loadChildren: () => import('./pages/registrousuario/registrousuario.module').then( m => m.RegistrousuarioPageModule)
  },
  {
    path: 'registrocliente/:id',
    loadChildren: () => import('./pages/registrocliente/registrocliente.module').then( m => m.RegistroclientePageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'registroproducto/:id',
    loadChildren: () => import('./pages/registroproducto/registroproducto.module').then( m => m.RegistroproductoPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./pages/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'pedido',
    loadChildren: () => import('./pages/pedido/pedido.module').then( m => m.PedidoPageModule)
  },
  {
    path: 'detallepedido',
    loadChildren: () => import('./pages/detallepedido/detallepedido.module').then( m => m.DetallepedidoPageModule)
  },
  {
    path: 'cabecerapedido',
    loadChildren: () => import('./pages/cabecerapedido/cabecerapedido.module').then( m => m.CabecerapedidoPageModule)
  },
  {
    path: 'cargapedido',
    loadChildren: () => import('./pages/cargapedido/cargapedido.module').then( m => m.CargapedidoPageModule)
  },
  {
    path: 'estados',
    loadChildren: () => import('./pages/estados/estados.module').then( m => m.EstadosPageModule)
  },
  {
    path: 'registroestado/:id',
    loadChildren: () => import('./pages/registroestado/registroestado.module').then( m => m.RegistroestadoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  }






];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
