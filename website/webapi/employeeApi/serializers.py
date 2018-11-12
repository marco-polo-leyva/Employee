from rest_framework import serializers
from employeeApi.models import Employee
from rest_framework import pagination


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id',
                  'name',
                  'gender',
                  'email',
                  'startDate',
                  'role')


class CustomPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        from rest_framework.response import Response
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'results': data
        })
