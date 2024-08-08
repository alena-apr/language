import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ExescisesRoutingModule } from './pages/exercises/exescises-routing.module';
import { AuthService } from './services/auth/auth.service';
import { RestInterceptorsService } from './services/interceptors/restIntesceptors';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ExescisesRoutingModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestInterceptorsService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
