import { NgModule } from '@angular/core';
import { Routes, RouterModule  , PreloadAllModules} from '@angular/router';



import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule)
      },
      {
        path: 'contact',
      //  canActivate: [AdminGuard],
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
     // {
        //path: 'login',
      // loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      //}

    ]
  },
  {
    path: '**',
    loadChildren: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy : PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
