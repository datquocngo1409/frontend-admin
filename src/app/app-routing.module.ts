import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './auth.guard';
import {InformationComponent} from './admin/information/information.component';
import {SongListComponent} from './admin/song-list/song-list.component';
import {CreateSongComponent} from './admin/create-song/create-song.component';
import {SongEditComponent} from './admin/song-edit/song-edit.component';

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
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
