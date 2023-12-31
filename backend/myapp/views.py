from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
from .models import Item
import datetime
import random
from django.views.decorators.http import require_http_methods
import json
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.db import transaction
from .models import Cart



def items(request):
    items_list = list(Item.objects.values())
    return JsonResponse({'items': items_list})

def populate_database(request):
    try:
        with transaction.atomic():
            # Clear existing data
            User.objects.all().delete()
            Item.objects.all().delete()

            # Create users
            for i in range(1, 7):
                user = User.objects.create_user(f'testuser{i}', f'testuser{i}@shop.aa', 'pass{i}')
                
                # Create items for first three users
                if i <= 3:
                    for j in range(1, 11):
                        Item.objects.create(
                            seller=user,
                            title=f'Item {j} of User {i}', 
                            description=f'Description for item {j} of user {i}', 
                            price=random.uniform(10.0, 100.0),
                            dateAdded=datetime.datetime.now()
                        )
        
        return JsonResponse({'message': 'Database populated successfully'})

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# Any user can search for items by title. Note: any search action should result in a request to the API
# and not a search in the frontend.
def search(request):
    # Get the search term from the request
    search_term = request.GET.get('q')

    # Search for items with the search term in the title
    items_list = list(Item.objects.filter(title__icontains=search_term).values())

    return JsonResponse({'items': items_list})


@login_required
def auth_status(request):
    return JsonResponse({'message': 'User is authenticated'})

@csrf_exempt
@require_http_methods(["POST"])
def signup_view(request):
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        # Validate the received data
        if not username or not password or not email:
            return JsonResponse({'message': 'Missing username, password or email'}, status=400)

        # Check if the username is already taken
        if User.objects.filter(username=username).exists():
            return JsonResponse({'message': 'Username already exists'}, status=400)

        # Create the user
        User.objects.create_user(username=username, password=password, email=email)
        
        return JsonResponse({'message': 'User registered successfully'}, status=201)

    except json.JSONDecodeError:
        # If JSON is invalid
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        # For any other errors
        return JsonResponse({'message': str(e)}, status=500)

def get_all_users(request):
    users = list(User.objects.values())
    return JsonResponse({'users': users})

@csrf_exempt
@require_http_methods(["POST"])
def user_login(request):
    try:
        # Parse JSON data from request body
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Validate the received data
        if not username or not password:
            return JsonResponse({'message': 'Missing username or password'}, status=400)

        # Authenticate the user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Log the user in
            login(request, user)
            return JsonResponse({'message': 'User authenticated successfully'})
        else:
            return JsonResponse({'message': 'Invalid username or password'}, status=401)

    except json.JSONDecodeError:
        # If JSON is invalid
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        # For any other errors
        return JsonResponse({'message': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["GET"])
def get_cart(request):
    try:
        user = request.user

        cart = Cart.objects.get(user=user)

        items = list(cart.items.values())

        return JsonResponse({'items': items})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def add_item(request):
    try:
        data = json.loads(request.body)
        title = data.get('title')
        description = data.get('description')
        price = data.get('price')

        if not title or not description or not price:
            return JsonResponse({'message': 'Missing title, description, or price'}, status=400)

        seller = request.user if request.user.is_authenticated else None
        item = Item(seller=seller, title=title, description=description, price=price)
        item.save()

        return JsonResponse({'message': 'Item added successfully', 'item_id': item.id}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@csrf_exempt
@require_http_methods(["POST"])
@login_required
def add_to_cart(request, item_id):
    user = request.user
    item = Item.objects.get(id=item_id)

    # Check if the item is added by the same user
    if item.seller == user:
        return JsonResponse({'error': 'Cannot add your own item to the cart'}, status=400)

    cart, created = Cart.objects.get_or_create(user=user)
    cart.items.add(item)

    return JsonResponse({'message': 'Item added to cart'})