import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-urlform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="urlForm" (ngSubmit)="submitForm.emit()">
      <div class="flex">
        <div class="relative w-full">
          <input
            type="search"
            class="block p-4 w-full z-20 text-sm text-gray-900 bg-gray-50 border-1 border-black focus:ring-blue-500"
            formControlName="url"
            [placeholder]="placeholder"
            required
          />
          <button
            type="submit"
            class="absolute top-0 end-0 h-full p-2.5 text-sm font-bold text-white bg-teal-500"
            [disabled]="urlForm.invalid"
          >
            {{ buttonLabel }}
          </button>
        </div>
      </div>
      <div
        *ngIf="
          urlForm.get('url').hasError('pattern') && urlForm.get('url').touched
        "
        class="text-red-500 mt-2"
      >
        Invalid URL. Please enter a valid URL starting with 'http://' or
        'https://'.
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlformComponent {
  @Input() urlForm!: FormGroup;
  @Input() placeholder!: string;
  @Input() buttonLabel!: string;
  @Output() submitForm = new EventEmitter<void>();
}
