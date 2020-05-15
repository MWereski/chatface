import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalchatComponent } from './globalchat/globalchat.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { AuthGuard } from './auth.guard';
import { MapfinderComponent } from './mapfinder/mapfinder.component';
import { PostListComponent } from './post-list/post-list.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { LocalstorageGuard } from './localstorage.guard';
import { SearchAsGuestComponent } from './search-as-guest/search-as-guest.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'globalchat',
    component: GlobalchatComponent,
    canActivate: [LocalstorageGuard]
  },
  {
    path: 'search',
    component: SearchAsGuestComponent,
    canActivate: [LocalstorageGuard]
  },
  {
    path: 'mapfinder',
    component: MapfinderComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'main',
    component: MainSiteComponent,
    canActivate: [AuthGuard]
  },
  { 
    path:'add-friend',
   component: AddFriendComponent,
   canActivate: [AuthGuard] 
  },
  {
    path: 'login',
    component:  LoginComponent,
    canActivate: [LocalstorageGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LocalstorageGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
