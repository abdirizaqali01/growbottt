import os
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import openai
from django.contrib.auth.decorators import login_required


# Create your views here.
def index (request, *args, **kwargs):
    return render(request, 'landingPage.html')

@login_required
def chat(request):
    global conversation

    if request.method == "POST":
        message = request.POST.get("message", "")

        conversation.append(f"User: {message}")
        conversation_text = "\n".join(conversation[-6:]) 

        openai.api_key = os.environ.get("OPENAI_API_KEY")

        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"The following is a conversation with an AI urban farming assistant. The assistant is a robot version of David Attenborough named Mr Growbot.\n{conversation_text}\nAI:",
            temperature=0.9,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0.6,
            stop=[" Human:", " AI:"]
        )
        result = response.choices[0].text.strip()
        conversation.append(f"Mr Growbot: {result}")

        # Remove old conversation history
        conversation = conversation[-6:]

        messages = list(zip(conversation[::2], conversation[1::2]))
        return render(request, 'chat_page.html', {'messages': messages})
    else:
        conversation = []
        return render(request, 'chat_page.html')
    
def signup(request):
    if request.method == 'POST':
        # Get the form data from the request
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Check if the user already exists
        if User.objects.filter(username=username).exists():
            error_message = 'Username already taken. Please choose a different one.'
            return render(request, 'user_create.html', {'error_message': error_message})

        # Create a new User object and save it to the database
        user = User.objects.create_user(username, email, password)
        user.save()

        # Authenticate the user after signing up
        authenticated_user = authenticate(request, username=username, password=password)

        if authenticated_user is not None:
            login(request, authenticated_user)
            request.session['user_id'] = authenticated_user.id  # Create a session with the user ID
            return redirect('chat')  # Redirect to the chat page

    return render(request, 'user_create.html')

def login_view(request):
    if request.method == 'POST':
        # Get the username or email and password from the request
        username_or_email = request.POST.get('username')
        password = request.POST.get('password')

        # Try to authenticate the user using the username or email and password
        user = authenticate(request, username=username_or_email, password=password)
        print(user)

        # If the user is authenticated, log them in and create a session
        if user is not None:
            login(request, user)
            request.session['user_id'] = user.id  # Create a session with the user ID
            return redirect('chat')
        else:
            # If the user is not authenticated, return an error message
            error_message = 'Invalid username/email or password'
            return render(request, 'login.html', {'error_message': error_message})
    else:
        return render(request, 'login.html')
