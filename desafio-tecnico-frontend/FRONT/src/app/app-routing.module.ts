import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent},
  { 
    path: 'board',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }