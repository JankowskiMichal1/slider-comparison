import { NgModule } from '@angular/core';
import { ComparisonServiceModule } from 'src/app/services/comparision.service-module';
import { OnSliderComparisonMoveDirective } from './on-slider-comparison-move.directive';

@NgModule({
  imports: [ComparisonServiceModule],
  declarations: [OnSliderComparisonMoveDirective],
  providers: [],
  exports: [OnSliderComparisonMoveDirective],
})
export class OnSliderComparisonMoveDirectiveModule {}
