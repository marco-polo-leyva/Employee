from rest_framework.pagination import LimitOffsetPagination


class PaginationEmployee(LimitOffsetPagination):
       max_limit = 10