import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'week',
    loadComponent: () => import('./features/week/page/week/week').then((m) => m.Week),
  },
  {
    path: 'topics',
    loadComponent: () => import('./features/topics/page/topics/topics').then((m) => m.Topics),
  },
  {
    path: 'sessions/new',
    loadComponent: () =>
      import('./features/sessions/page/session-form/session-form').then((m) => m.SessionForm),
  },
  {
    path: 'sessions/:id/edit',
    loadComponent: () =>
      import('./features/sessions/page/session-form/session-form').then((m) => m.SessionForm),
  },
  {
    path: 'sessions/:id',
    loadComponent: () =>
      import('./features/sessions/page/session-detail/session-detail').then((m) => m.SessionDetail),
  },
  {
    path: 'review',
    loadComponent: () => import('./features/review/page/review/review').then((m) => m.Review),
  },
  { path: '', pathMatch: 'full', redirectTo: 'week' },
  { path: '**', redirectTo: 'week' },
];
