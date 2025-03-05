import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SeoService } from './core/seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Angular 19 User';
  seoService = inject(SeoService);
  constructor() {}
  ngOnInit() {
    // Initialize the SEO service to watch route changes
    this.seoService.init();
  }
}
