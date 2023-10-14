import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ComparisonSliderComponentModule } from './components/comparison-slider/comparison-slider.component-module';
import { OnSliderComparisonMoveDirectiveModule } from './directive/on-slider-comparison-move/on-slider-comparison-move.directive-module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ComparisonSliderComponentModule,
    OnSliderComparisonMoveDirectiveModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
