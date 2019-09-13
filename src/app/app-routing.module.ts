import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterationComponent } from './registeration/registeration.component';
import { ChatComponent } from './chat/chat.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';


const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'register', component: RegisterationComponent },
  { path: 'chatroom', component: ChatComponent, canActivate: [CanActivateRouteGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
