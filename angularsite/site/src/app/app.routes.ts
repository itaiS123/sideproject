import { Routes } from '@angular/router';
import { Login } from './components/components/login/login';
import { Home } from './components/components/home/home';

export const routes: Routes = [
  { path: '', component: Login }, // כתובת ריקה מציגה לוגין
  { path: 'home', component: Home }, // כתובת home מציגה דף בית
];
