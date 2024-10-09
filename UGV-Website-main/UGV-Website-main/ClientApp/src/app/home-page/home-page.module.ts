import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { ImagesSliderComponent } from './images-slider/images-slider.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { OurBranchesComponent } from './our-branches/our-branches.component';



@NgModule({
  declarations: [
    HomePageComponent,
    ImagesSliderComponent,
    AboutUsComponent,
    OurBranchesComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class HomePageModule { }
