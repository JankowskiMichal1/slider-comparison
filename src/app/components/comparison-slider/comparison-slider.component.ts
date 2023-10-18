import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-comparison-slider',
  styleUrls: ['./comparison-slider.component.scss'],
  templateUrl: './comparison-slider.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonSliderComponent {
  @Input() plane: string = 'horizontal'
}
