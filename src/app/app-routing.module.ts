import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'new-day-modal',
    loadChildren: () => import('./pages/new-day-modal/new-day-modal.module').then( m => m.NewDayModalPageModule)
  },
  {
    path: 'project',
    loadChildren: () => import('./pages/project/project.module').then( m => m.ProjectPageModule)
  },
  {
    path: 'new-activity',
    loadChildren: () => import('./pages/new-activity/new-activity.module').then( m => m.NewActivityPageModule)
  },
  {
    path: 'view-day',
    loadChildren: () => import('./pages/view-day/view-day.module').then( m => m.ViewDayPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
