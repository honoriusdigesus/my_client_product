import { Routes } from '@angular/router';

export const routes: Routes = [
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
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
