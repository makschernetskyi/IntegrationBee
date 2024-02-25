from django.shortcuts import render


from rest_framework.views import APIView
from rest_framework.response import Response

from django.core.exceptions import ObjectDoesNotExist
from django.core.paginator import Paginator

from home.models import NewsPage




class NewsAPIView(APIView):
    def get(self, request, page_id):


        try:
            page = NewsPage.objects.get(id=page_id)
        except ObjectDoesNotExist:
            return Response({"error": "page does not exist"}, status=404)
        stream_data = page.content

        paginator = Paginator(stream_data, per_page=10)  # Adjust per_page as needed
        page_number = request.query_params.get("page", 1)
        paginated_data = paginator.get_page(page_number)