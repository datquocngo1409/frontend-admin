import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatDividerModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
  MatSlideToggleModule, MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './navigation/header/header.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { InformationComponent } from './admin/information/information.component';
import {ChartsModule} from 'ng2-charts';
import { SongListComponent } from './admin/song-list/song-list.component';
import { CreateSongComponent } from './admin/create-song/create-song.component';
import { PostDialogComponent } from './admin/post-dialog/post-dialog.component';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {SongEditComponent} from './admin/song-edit/song-edit.component';
import {ButtonModule, CoreModule, InputModule, ToasterModule} from 'truly-ui';
import {DropdownModule} from 'primeng/primeng';
import { MediaLibraryComponent } from './admin/media-library/media-library.component';
import {LoginUserComponent} from './login-user/login-user.component';
import {InformationUserComponent} from './user/information-user/information.component';
import {ListTopComponent} from './user/list-top/list-top.component';
import {SongListUserComponent} from './user/song-list-user/song-list.component';
import {SidenavListUserComponent} from './navigation-user/sidenav-list-user/sidenav-list.component';
import {HomeUserComponent} from './home-user/home.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {NewListUserComponent} from './user/new-list/new-list.component';
import {HeaderUserComponent} from './navigation-user/header-user/header-user.component';
import {ListFavoriteComponent} from './user/favorite-list/list-favorite.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    InformationComponent,
    SongListComponent,
    CreateSongComponent,
    PostDialogComponent,
    SongEditComponent,
    MediaLibraryComponent,
    LoginUserComponent,
    ListTopComponent,
    SongListUserComponent,
    HeaderUserComponent,
    SidenavListUserComponent,
    HomeUserComponent,
    RegisterUserComponent,
    NewListUserComponent,
    InformationUserComponent,
    ListFavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    FlexLayoutModule,
    MatTabsModule,
    MatDividerModule,
    ChartsModule,
    MatSelectModule,
    MatOptionModule,
    MatFileUploadModule,
    MatPaginatorModule,
    MatSortModule,
    ButtonModule,
    CoreModule.forRoot({theme: 'default'}),
    InputModule.forRoot(),
    ToasterModule.forRoot(),
    DropdownModule,
    MatGridListModule,
    JwSocialButtonsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [PostDialogComponent]
})
export class AppModule { }
