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

const primeng = [
    CardModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ToastModule,
    SplitButtonModule,
    InputSwitchModule,
    ConfirmDialogModule,
]

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
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, comp, primeng],
  exports: [CommonModule, comp, primeng],
  providers: [],
})
export class SharedModule {}
