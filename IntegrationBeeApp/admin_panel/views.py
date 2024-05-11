from django.shortcuts import render


def admin_page(request):
    return render(request, "admin_panel/index.html")

