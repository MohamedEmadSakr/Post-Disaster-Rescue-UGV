import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { footerComponent } from './footer/footer.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';


//Created modules
import { HomePageModule } from 'src/app/home-page/home-page.module';
import { VehicleControlModule } from 'src/app/vehicle-control/vehicle-control.module';
// Router components
import { HomePageComponent } from 'src/app/home-page/home-page/home-page.component';
import { VehicleControlComponent } from 'src/app/vehicle-control/vehicle-control/vehicle-control.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    footerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    HomePageModule,
    VehicleControlModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent, pathMatch: 'full' },
      { path: 'control', component: VehicleControlComponent, pathMatch: 'full', canActivate: [AuthorizeGuard] }
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
