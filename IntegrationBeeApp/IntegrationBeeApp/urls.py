from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls


from search import views as search_views

from .api import api_router

from django.contrib.sitemaps.views import sitemap
from .sitemaps import VueStaticSitemap


sitemaps = {
    'vue': VueStaticSitemap,
}


urlpatterns = [
    path('api/v2/cms/', api_router.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
    path("api/v2/", include("api.urls")),
    path("api/v2/cms/", include("home.urls")),

    path("robots.txt",TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),

    # Automatically generated sitemap
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),

    # Catch-all route for the main Vue app
    re_path(r'^(?!api/v2/|cms/|documents/|search/|django-admin/|media|robots\.txt|sitemap\.xml).*$',
            TemplateView.as_view(template_name="home/home.html")),
    re_path(r'^', include(wagtail_urls))
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
