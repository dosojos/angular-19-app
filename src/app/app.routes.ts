import { Routes } from '@angular/router';
import { SeoConfig } from './core/models/seo.model';

// Custom interface to include SEO data in route configuration
interface RouteWithSeo {
  seo: SeoConfig;
}

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard-page/dashboard-page.component').then(
        (c) => c.DashboardPageComponent
      ),
  },
  {
    path: 'tree',
    loadComponent: () =>
      import('./tree-page/tree-page.component').then(
        (c) => c.TreePageComponent
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./table-page/table-page.component').then(
        (c) => c.TablePageComponent
      ),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./drag-drop-page/drag-drop-page.component').then(
        (c) => c.DragDropPageComponent
      ),
  },
  {
    path: 'rating',
    loadComponent: () =>
      import('./rating/rating-page/rating-page.component').then(
        (c) => c.RatingPageComponent
      ),
  },
  {
    path: 'address',
    loadComponent: () =>
      import('./address-page/address-page.component').then(
        (c) => c.AddressPageComponent
      ),
    data: {
      seo: {
        title: 'Shipping Address | Your Store',
        description:
          'Enter your shipping and billing information to complete your purchase',
        type: 'website',
        robots: 'index, follow',
      } as SeoConfig,
    },
  },
];
