from django.urls import path
from . import views

urlpatterns = [
    path('todos/', views.TodoListCreate.as_view()),
    # we need to specify the URI path to route to that page.
    path('todos/<int:pk>/', views.TodoRetriveUpdateDestroy.as_view()),
    path('todos/<int:pk>/complete/', views.TodoToggleComplete.as_view()),
    path('signup/', views.signup),
    path('login/', views.login),
]