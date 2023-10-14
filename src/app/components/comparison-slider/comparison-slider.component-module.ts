import { NgModule } from '@angular/core';
import { ComparisonSliderComponent } from './comparison-slider.component';
import { OnSliderComparisonMoveDirectiveModule } from 'src/app/directive/on-slider-comparison-move/on-slider-comparison-move.directive-module';

@NgModule({
  imports: [OnSliderComparisonMoveDirectiveModule],
  declarations: [ComparisonSliderComponent],
  providers: [],
  exports: [ComparisonSliderComponent]
})
export class ComparisonSliderComponentModule {
}
