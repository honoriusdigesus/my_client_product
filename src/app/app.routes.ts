import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    loadComponent: () => import('./auth/login/login.component')
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.component')
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children:[
      {
        path: 'product',
        title: 'Products',
        loadComponent: () => import('./dashboard/pages/product/product.component')
      },
      {
        path:'user',
        title: 'Users',
        loadComponent: () => import('./dashboard/pages/user/user.component')
      },
      {
        path:'role',
        title: 'Roles',
        loadComponent: () => import('./dashboard/pages/role/role.component')
      }
    ]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
