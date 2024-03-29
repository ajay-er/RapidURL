import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ApiService, IURL } from '../api.service';
import { Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-short',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <p class="text-center font-extrabold text-gray-600 text-4xl pt-24 ">
      Your shortened URL
    </p>
    <p class="text-center font-medium text-gray-600 pb-6">
      Copy the short link and share it in messages, texts, posts, websites and
      other locations.
    </p>

    <div class="flex justify-center ">
      <div class=" bg-gray-100 shadow-xl min-w-[50%] rounded-md p-5 border-2">
        <div class="flex p-6">
          <div class="relative w-full">
            <input
              #shortUrl
              type="search"
              class="block p-4 w-full
              z-20 text-sm text-gray-900 bg-gray-50 
              border-1 border-black
              focus:ring-blue-500"
              [value]="getUrl()"
              placeholder="Get your URL"
            />
            <button
              (click)="copyToClipboard(shortUrl)"
              class="absolute top-0 end-0 h-full p-2.5 text-sm font-bold text-white  bg-teal-500 "
            >
              COPY URL
            </button>
          </div>
        </div>

        <div class="px-6 py-3 justify-center flex flex-col gap-8">
          <div>
            <span class="font-bold text-gray-700">Original URL: </span>
            <a [href]="originalUrl" class="text-blue-500">{{ originalUrl }}</a>
          </div>
          <a
            [routerLink]="['/analyse']"
            class="text-white cursor-pointer bg-teal-500 font-bold p-2 text-center"
          >
            Total of clicks of your short URL
          </a>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShortComponent {
  private api = inject(ApiService);
  private router = inject(Router);

  originalUrl!: string;
  shortenedUrl!: string;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.api.urlData$.pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (res: IURL | null) => {
        if (res !== null) {
          this.originalUrl = res.url
          this.shortenedUrl = res.id
        } else {
          this.router.navigate(['error']);
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getUrl(): string {
    return environment.apiUrl + '/' + this.shortenedUrl;
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  copyToClipboard(inputElement: HTMLInputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    alert(`${inputElement.value} copied successfully!`)
  }
}
