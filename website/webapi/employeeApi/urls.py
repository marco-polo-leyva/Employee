from django.conf.urls import url
from employeeApi import views

urlpatterns = [
    url(r'employees/$', views.emp_list),
    url(r'employees/(?P<pk>[0-9]+)$', views.emp_detail),
]
