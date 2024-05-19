import { Routes } from '@angular/router';

export const routes: Routes = [
    //     {
    //     path: '',
    //     component: HomeComponent,
    //     pathMatch: 'full',
    // },

    {
        path: 'hiring',
        loadChildren: () => import('./recrutement/recrutement.module').then((m) => m.RecrutementModule),
    },
        {
        path: 'employers',
        loadChildren: () => import('./employers/employers.module').then((m) => m.EmployersModule),
    },
];
