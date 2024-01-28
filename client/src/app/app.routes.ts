import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShortComponent } from './short/short.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AnalysisComponent } from './analysis/analysis.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'short',
    component: ShortComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'analysis/:id',
    component: AnalysisComponent,
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];
