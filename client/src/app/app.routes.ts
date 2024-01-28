import { Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { ShortComponent } from './short/short.component';
import { HomeComponent } from './home/home.component';

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
    path: '**',
    component: NotfoundComponent,
  },
];
