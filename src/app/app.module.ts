import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { MessageService } from 'primeng/api';
import { LoaderModule } from './shared/components/loader/loader.module';
import { LayoutComponent } from './shared/layout/layout.component';



@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    PagesModule,
    LoaderModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
