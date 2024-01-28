import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-error',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p
    class="text-center flex justify-center items-center min-h-[400px] text-red-600 font-extrabold text-4xl"
  >
    Error occured
  </p>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent { }
