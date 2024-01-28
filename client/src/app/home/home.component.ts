import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService, IURL } from '../api.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: ` <div class="flex justify-center pt-24 ">
    <div class="bg-gray-100 shadow-xl min-w-[50%] rounded-md p-5 border-2">
      <p class="text-center font-extrabold text-gray-600 text-4xl">
        Paste the URL to be shortened
      </p>
      <form class="pt-8 p-6" [formGroup]="urlForm" (ngSubmit)="submitForm()">
        <div class="flex">
          <div class="relative w-full">
            <input
              type="search"
              class="block p-4 w-full
              z-20 text-sm text-gray-900 bg-gray-50 
              border-1 border-black
              focus:ring-blue-500
              "
              formControlName="url"
              placeholder="Enter the link here"
              required
            />
            <button
              type="submit"
              class="absolute top-0 end-0 h-full p-2.5 text-sm font-bold text-white  bg-teal-500 "
              [disabled]="urlForm.invalid"
            >
              SHORTERN URL
            </button>
          </div>
        </div>
        <div
          *ngIf="
            urlForm!.get('url')!.hasError('pattern') &&
            urlForm!.get('url')!.touched
          "
          class="text-red-500 mt-2"
        >
          Invalid URL. Please enter a valid URL starting with 'http://' or
          'https://'.
        </div>
      </form>
      <p class="text-center font-medium text-gray-700 pb-6">
        RapidURL: Elevate Your Links, Simplify Your Sharing.
      </p>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  urlForm: FormGroup;

  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  constructor() {
    this.urlForm = this.fb.group({
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  submitForm() {
    if (this.urlForm.valid) {
      const enteredUrl = this.urlForm!.get('url')!.value;
      this.api
        .create(enteredUrl)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: IURL) => {
            this.api.setData(res);
            this.router.navigate(['short']);
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
