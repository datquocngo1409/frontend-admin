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
  MatCardModule, MatCheckboxModule,
  MatDialogModule, MatDividerModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatProgressSpinnerModule, MatSidenavContainer, MatSidenavContent, MatSidenavModule, MatSlideToggleModule,
  MatTableModule, MatTabsModule,
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SidenavListComponent,
    InformationComponent,
    SongListComponent,
    CreateSongComponent
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
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
