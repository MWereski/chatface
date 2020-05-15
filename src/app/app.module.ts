import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GlobalchatComponent } from './globalchat/globalchat.component';
import { AuthService } from './auth.service';
import { MainSiteComponent } from './main-site/main-site.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { MarkerService } from './marker.service';
import { SignalRService } from './signal-r.service';
import { MapfinderComponent } from './mapfinder/mapfinder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostListComponent } from './post-list/post-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { PostService } from './services/post.service';
import { ChatComponent } from './chat/chat.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { ProfileComponent } from './profile/profile.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenuComponent } from './menu/menu.component';
import { UserService } from './services/user.service';
import { LocalstorageGuard } from './localstorage.guard';
import { SearchAsGuestComponent } from './search-as-guest/search-as-guest.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const MatModule = [
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
  MatListModule,
  MatDividerModule,
  MatTabsModule
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    GlobalchatComponent,
    MainSiteComponent,
    MapfinderComponent,
    MenuComponent,
    PostListComponent,
    FriendListComponent,
    AddPostDialogComponent,
    ChatComponent,
    AddFriendComponent,
    ProfileComponent,
    SearchAsGuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ScrollingModule,
    Ng2SearchPipeModule,
    MatModule
  ],
  providers: [UserService, PostService,SignalRService, MarkerService, LocalstorageGuard, AuthService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
],
entryComponents: [AddPostDialogComponent],
  //schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


