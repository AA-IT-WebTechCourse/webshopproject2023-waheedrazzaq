from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Item
import datetime
import random

def items(request):
    items_list = list(Item.objects.values())
    return JsonResponse({'items': items_list})

def populate_db(request):
    # Clear existing data
    Item.objects.all().delete()

    # Create 50 items
    for i in range(50):
        title = f'Item {i+1}'
        description = f'Description for Item {i+1}'
        price = random.randint(10, 100)  # Random price between 10 and 100
        date_added = datetime.date.today()

        Item.objects.create(title=title, description=description, price=price, date_added=date_added)

    return JsonResponse({'message': '50 items created successfully'})


# Any user can search for items by title. Note: any search action should result in a request to the API
# and not a search in the frontend.
def search(request):
    # Get the search term from the request
    search_term = request.GET.get('q')

    # Search for items with the search term in the title
    items_list = list(Item.objects.filter(title__icontains=search_term).values())

    return JsonResponse({'items': items_list})