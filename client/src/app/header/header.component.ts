import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="bg-white border-gray-200 shadow-md">
      <div
        class="max-w-screen-xl mx-auto p-4"
      >
        <a
          href="#"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span
            class="self-center text-2xl  font-extrabold whitespace-nowrap text-teal-500"
            >RAPID-URL</span
          >
        </a>
        
      </div>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
 
}
