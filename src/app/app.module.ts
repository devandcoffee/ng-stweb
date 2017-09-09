import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';

import { ComponentsModule } from './components/components.module';


import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { AlertService } from './services/alert.service';
import { AlertComponent } from './alert/alert.component';

const client = new ApolloClient();

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ROUTING,
    ComponentsModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
