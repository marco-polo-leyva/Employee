from rest_framework import status
from employeeApi.models import Employee
from employeeApi.serializers import EmployeeSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.settings import api_settings


@api_view(['GET', 'POST'])
def emp_list(request):
    if request.method == 'GET':
        pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
        paginator = pagination_class()
        emp = Employee.objects.all()

        page = paginator.paginate_queryset(emp, request)

        emp_serializer = EmployeeSerializer(page, many=True)

        return Response(emp_serializer.data)

    elif request.method == 'POST':
        emp_serializer = EmployeeSerializer(data=request.data)
        if emp_serializer.is_valid():
            emp_serializer.save()
            return Response(emp_serializer.data, status=status.HTTP_201_CREATED)
        return Response(emp_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def emp_detail(request, pk):
    try:
        emp = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        employee_serializer = EmployeeSerializer(emp)
        return Response(employee_serializer.data)

    elif request.method == 'PUT':
        employee_serializer = EmployeeSerializer(emp, data=request.data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return Response(employee_serializer.data)
        return Response(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        emp.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
