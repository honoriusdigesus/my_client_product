import { Routes } from '@angular/router';
import {isAuthenticatedGuard} from './dashboard/guards/is-authenticated.guard';
import {isNotAuthenticate} from './dashboard/guards/is-not-authenticate.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    canActivate: [isNotAuthenticate],
    loadComponent: () => import('./auth/login/login.component')
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./auth/register/register.component')
  },
  {
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./dashboard/dashboard.component'),
    children:[
      {
        path: 'product',
        title: 'Products',
        loadComponent: () => import('./dashboard/pages/product/product.component')
      },
      {
        path: 'product/update',
        title: 'Update product',
        loadComponent: () => import('./dashboard/pages/product-update/product-update.component')
      },
      {
        path:'user',
        title: 'Users',
        loadComponent: () => import('./dashboard/pages/user/user.component')
      },
      {
        path:'User/Get/:DI',
        title: 'Users',
        loadComponent: () => import('./dashboard/pages/users/users.component')
      },
      {
        path:'role',
        title: 'Roles',
        loadComponent: () => import('./dashboard/pages/role/role.component')
      },
      {
        path:'**',
        redirectTo: 'product',
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
