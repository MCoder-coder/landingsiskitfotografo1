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
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'contact',
      //  canActivate: [AdminGuard],
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
      },
    ]
  },
  {
    path: '**',


    loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: '404',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy : PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
