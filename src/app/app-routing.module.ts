import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: 'login', component: LoginComponent
}, {
  path: 'user', loadChildren: () => import('./components/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard]
}, {
  path: '**', redirectTo: 'login', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
