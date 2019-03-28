import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {InformationComponent} from './admin/information/information.component';
import {SongListComponent} from './admin/song-list/song-list.component';
import {CreateSongComponent} from './admin/create-song/create-song.component';
import {SongEditComponent} from './admin/song-edit/song-edit.component';
import {MediaLibraryComponent} from './admin/media-library/media-library.component';
import {HomeUserComponent} from './home-user/home.component';
import {LoginUserComponent} from './login-user/login-user.component';
import {ListTopComponent} from './user/list-top/list-top.component';
import {SongListUserComponent} from './user/song-list-user/song-list.component';
import {InformationUserComponent} from './user/information-user/information.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {NewListUserComponent} from './user/new-list/new-list.component';
import {ListFavoriteComponent} from './user/favorite-list/list-favorite.component';

const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'information',
        component: InformationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'song-list',
        component: SongListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'create-song',
        component: CreateSongComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'song-edit',
        component: SongEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'media-library',
        component: MediaLibraryComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '',
    component: HomeUserComponent,
    children: [
      {
        path: 'list-top',
        component: ListTopComponent
      },
      {
        path: 'song-list',
        component: SongListUserComponent
      },
      {
        path: 'infomation-user',
        component: InformationUserComponent
      },
      {
        path: 'new-list',
        component: NewListUserComponent
      },
      {
        path: 'infomation/:id',
        component: InformationUserComponent
      },
      {
        path: 'favorite-song',
        component: ListFavoriteComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginUserComponent
  },
  {
    path: 'register',
    component: RegisterUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
