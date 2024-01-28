import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService, IURL } from '../api.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UrlformComponent } from '../urlform/urlform.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, UrlformComponent],
  template: ` <div class="flex justify-center pt-24 ">
    <div class="bg-gray-100 shadow-xl min-w-[50%] rounded-md p-5 border-2">
      <p class="text-center font-extrabold text-gray-600 text-4xl">
        Paste the URL to be shortened
      </p>
      <app-url-form 
        [urlForm]="urlForm"
        [placeholder]="'Enter the link here'"
        [buttonLabel]="'SHORTEN URL'"
        (submitForm)="submitForm()"
      ></app-url-form>

      <p class="text-center font-medium text-gray-700 pb-4">
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
