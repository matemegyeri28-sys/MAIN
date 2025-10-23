import type { MetadataRoute } from 'next';

const routes = ['', '/learn', '/interactive', '/course', '/about', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourbrandhere.example.com';
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8
  }));
}
