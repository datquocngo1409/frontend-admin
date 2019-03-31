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
import {HomeUserComponent} from "./user/home-user/home-user.component";
import {FavoriteSongComponent} from "./user/favorite-song/favorite-song.component";
import {PodcastsComponent} from "./user/podcasts/podcasts.component";
import {CollectionComponent} from "./collection/collection.component";

const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
  },
  {
    path: 'collection',
    component: CollectionComponent,
    children: [
      {
        path: 'favorite-song',
        component: FavoriteSongComponent
      },
      {
        path: 'podcasts',
        component: PodcastsComponent
      },
    ]
  },
  {
    path: 'favorite-song',
    component: FavoriteSongComponent,
    outlet: 'favorite'
  },
  {
    path: 'podcasts',
    component: PodcastsComponent,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
