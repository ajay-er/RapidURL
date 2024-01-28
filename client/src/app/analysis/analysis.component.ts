import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-analysis',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>analysis works!</p>`,
    styleUrl: './analysis.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent { }
