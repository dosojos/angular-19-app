import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SeoConfig } from './models/seo.model';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly defaultConfig: SeoConfig = {
    title: 'Your Website',
    description: 'Default website description',
    image: 'https://yourwebsite.com/default-image.jpg',
    type: 'website',
    robots: 'index, follow',
  };

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  /**
   * Initialize the service to update meta tags on route changes
   */
  init() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        if (data['seo']) {
          this.updateMetaTags(data['seo']);
        } else {
          // Reset to defaults if no SEO data is provided
          this.updateMetaTags({});
        }
      });
  }

  /**
   * Update all meta tags, removing old ones and setting new ones
   */
  updateMetaTags(config: SeoConfig) {
    // Clear existing tags
    this.meta.removeTag("name='description'");
    this.meta.removeTag("name='robots'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("name='twitter:card'");

    // Get current URL if not provided
    const url = config.url || `${window.location.origin}${this.router.url}`;

    // Merge with defaults
    const mergedConfig: SeoConfig = { ...this.defaultConfig, ...config, url };

    // Set title
    this.title.setTitle(mergedConfig.title!);

    // Basic SEO
    this.meta.addTag({
      name: 'description',
      content: mergedConfig.description!,
    });
    this.meta.addTag({ name: 'robots', content: mergedConfig.robots! });

    // OpenGraph
    this.meta.addTag({ property: 'og:title', content: mergedConfig.title! });
    this.meta.addTag({
      property: 'og:description',
      content: mergedConfig.description!,
    });
    this.meta.addTag({ property: 'og:url', content: mergedConfig.url! });
    this.meta.addTag({ property: 'og:image', content: mergedConfig.image! });
    this.meta.addTag({ property: 'og:type', content: mergedConfig.type! });

    // Twitter
    this.meta.addTag({ name: 'twitter:title', content: mergedConfig.title! });
    this.meta.addTag({
      name: 'twitter:description',
      content: mergedConfig.description!,
    });
    this.meta.addTag({ name: 'twitter:image', content: mergedConfig.image! });
    this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });

    // Canonical URL
    if (mergedConfig.canonical || mergedConfig.url) {
      // Remove existing canonical link
      const canonicalElement = document.querySelector('link[rel="canonical"]');
      if (canonicalElement) {
        canonicalElement.remove();
      }

      // Add new canonical link
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', mergedConfig.canonical || mergedConfig.url!);
      document.head.appendChild(link);
    }
  }
}
