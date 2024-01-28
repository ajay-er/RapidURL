import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-white border-gray-200 shadow-md">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          [routerLink]="['/']"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            class="self-center text-2xl  font-extrabold whitespace-nowrap text-teal-500"
            >RAPID-URL</span
          >
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="font-medium flex flex-col p-4 md:p-0 mt-4"
          >
            <li>
              <a
                [routerLink]="['/analyse']"
                class="font-bold  cursor-pointer rounded md:bg-transparent md:p-0 text-teal-500"
                aria-current="page"
                >Analyse</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
