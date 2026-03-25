import { Routes } from '@angular/router';
import { Login } from './components/components/login/login';
import { Home } from './components/components/home/home';
import { Workspace } from './components/components/workspace/workspace';
import { Notebooks } from './components/components/notebooks/notebooks';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'workspace', component: Workspace },
  { path: 'notebooks', component: Notebooks },
];
