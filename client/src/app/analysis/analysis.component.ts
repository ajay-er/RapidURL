import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ApiService } from '../api.service';
import { UrlformComponent } from '../urlform/urlform.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [UrlformComponent, CommonModule],
  template: `
    <div class="flex justify-center pt-24 ">
      <div class="bg-gray-100 shadow-xl min-w-[50%] rounded-md p-5 border-2">
        <p class="text-center font-extrabold text-gray-600 text-4xl">
          Get your shortened URL traffic
        </p>

        <app-url-form
          [urlForm]="urlForm"
          [placeholder]="'Enter the shortern url here'"
          [buttonLabel]="'Analyse'"
          (submitForm)="submitForm()"
        ></app-url-form>

        @if(totalClicks$ | async; as count){
        <p class="font-extrabold  text-gray-600 pb-4">
          Total Clicks: {{ count }}
        </p>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent {
  urlForm: FormGroup;
  totalClicks$ = new BehaviorSubject<number>(0);

  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private destroy$ = new Subject<void>();

  constructor() {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  submitForm() {
    if (this.urlForm.valid) {
      const enteredUrl = this.urlForm!.get('url')!.value;
      const idRegex = /\/([^\/]+)$/;
      const match = enteredUrl.match(idRegex);
      if (match) {
        const id = match[1];
        this.api
          .getReport(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (res: any) => {
              this.totalClicks$.next(res.totalClicks);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
      } else {
        console.log('Invalid URL format');
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
