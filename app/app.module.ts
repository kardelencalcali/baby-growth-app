import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { LocalStorageService } from './local-storage.service'; 
@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,


  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LocalStorageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
