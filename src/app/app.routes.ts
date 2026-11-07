import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login').then(m => m.Login)
    },
    {
        path: 'summary',
        loadComponent: () => import('./features/summary/summary').then(m => m.Summary)
    },
    {
        path: 'board',
        loadComponent: () => import('./features/board/board').then(m => m.Board)
    },
    {
        path: 'add-task',
        loadComponent: () => import('./features/add-task/add-task').then(m => m.AddTask)
    },
    {
        path: 'contacts',
        loadComponent: () => import('./features/contacts/contacts').then(m => m.Contacts)
    },
    {
        path: 'help',
        loadComponent: () => import('./features/help/help').then(m => m.Help)
    },
    {
        path: 'legal-notice',
        loadComponent: () => import('./features/legal-notice/legal-notice').then(m => m.LegalNotice)
    },
    {
        path: 'privacy-policy',
        loadComponent: () => import('./features/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];