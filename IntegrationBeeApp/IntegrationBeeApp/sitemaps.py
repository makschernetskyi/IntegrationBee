from django.contrib.sitemaps import Sitemap

class VueStaticSitemap(Sitemap):
    priority = 0.5
    changefreq = 'monthly'

    # Manually list the Vue app's static URLs, including the root '/'
    def items(self):
        return [
            '/',
            '/events',
            '/news',
            '/contact',
            '/imprint',
            '/terms_of_use'
        ]

    def location(self, item):
        return item
