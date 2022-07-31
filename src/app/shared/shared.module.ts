import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
// Firebase services + environment module
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import {InputNumberModule} from 'primeng/inputnumber';
import {TooltipModule} from 'primeng/tooltip';
import {EditorModule} from 'primeng/editor';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MenubarModule} from 'primeng/menubar';

const firebase = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireAuthModule,
  AngularFireDatabaseModule,
  AngularFireModule,
  AngularFireStorageModule,
  AngularFirestoreModule,
];

const primeng = [
  CardModule,
  ButtonModule,
  InputTextModule,
  DialogModule,
  ToastModule,
  SplitButtonModule,
  InputSwitchModule,
  ConfirmDialogModule,
  RadioButtonModule,
  AccordionModule,
  InputNumberModule,
  TooltipModule,
  EditorModule,
  MenubarModule
];

const comp = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  HttpClientModule,
  ReactiveFormsModule,
  TableModule,
];

const pipes = [SortPipe, SearchFilterPipe];

@NgModule({
  declarations: [LoadingSpinnerComponent, pipes],
  imports: [CommonModule, comp, primeng, firebase],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    comp,
    primeng,
    firebase,
    pipes,
  ],
  providers: [ SortPipe, ConfirmationService, MessageService],
})
export class SharedModule {}
