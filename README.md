# Employee
WEbServices and WebSite with DJango-Python


Description.

This site allows the administration of employees entering by user password and password.
It allows the registration of new employees, editing of data, delete an employee and listing of registered employees.
The site consumes web services to perform the operations of consultation, registration, editing and delete employees.



The project is divided into two sites:

1.- Backend: Provides webservices for data maintenance

2.- FrondEnd: View that consumes web services and gives the user an alternative to manage records.


REQUIREMENTS

The project requires these resources:

python 3.6.6
pip 9.0.1
virtualenv == 16.0.0
django-2.1.3
pytz-2018.7
djangorestframework-3.9.0
rest_framework.authtoken
django-cors-headers == 2.4.0

Vue.js v2.5.17
bootstrap-4.1.3
jquery-1.11.1
popper.js-1.14.3
axios v0.18.0


INSTALLATION.

1.- Clone the project

2.- Open virtual environment
 
    cd website
    virtualenv website

3.- Run the server

python manage.py runserver

    to access from other computers:

    python manage.py runserver 0.0.0.0:8000


CHARACTERISTICS

-------- BackEnd:

   The backend services were developed with the python framework, Django. The database is SQLite.

   A custom class was created for paging the records (PageNumberPagination), accepting Limit as a parameter in the service.

   Security level with token was implemented, I think that for websites it is better to use session (rest_framework.authentication.SessionAuthentication) but thinking about portability for mobile applications I decided to leave it as a token using rest_framework.authentication.TokenAuthentication.

   CORS was integrated for the cross-accesses, the white list of the origins and the permissions in the methods are kept, these are configured in the file settings.py

   The services (with the exception of the api-token-auth / service) require the authorization header to assign this property the value of the token that the api-token-auth / service returns. If the token is not assigned, the services will return an error 401-Unauthorizes (invalid token)

   The users are created in the database structure created by the Migration of the DJango security model.



    
-------- FrondEnd:

   The application was integrated into the same project but as an independent application.

   For the view, the decision was made to use bootstrap for the ease of layout, for the integration with html, css and javascript, for the use of LESS and for the simplicity of use.

   For the integration of html and javascript the decision was made to use the VueJS framework because I think it integrates the best of React and Angular, it is a progressive framework, use of templates and components, it is also very easy to use and facilitates the development.
   The consumption of webservices was done with AXIOS taking advantage of the advantages that it has to consume webservices RESTFull with Ajax and its simplicity to use it
   
   
   
WEBSERVICES

- Login: This service authenticates the user. Users are created from the Django administrator. Currently there is only the administrator user:

       user: admin
       pwd:  adminadmin
       
  This service requires the JSON chain to be sent:     
  {
	  "username":"admin",
	  "password":"adminadmin"
   }

   To access this service:

    http://localhost:8000/api-token-auth/

    Header:

    METHOD:  GET
    Content-Type : application/json

    Return:

    If the authentication is successful, return the token for the other services

    {
    "token": "bfe214a7b2f5f7416ec80bac75381482799adfbc"
	}

	If authentication fails, status server error 400 returns

	{
    "non_field_errors": [
        "Unable to log in with provided credentials."
    	]
	}
       
       
       
       



-- Get All Employees: This service returns all the employees that exist in the database. The pagination has been implemented:


   To access this service:

   http://localhost:8000/employeeApi/employees/?limit=10

   Header:

   METHOD:  GET
   Content-Type : application/json
   Authorization: Token <KEY-TOKEN>


   Return:

   If the correct token is sent, an array of employees will return:

	ej:

	[
	    {
	        "id": 16,
	        "name": "Jhon Doe",
	        "gender": "M",
	        "email": "JDoe@hotmail.com",
	        "startDate": "2018-11-07",
	        "role": "Administrator"
	    },
	    {
	        "id": 18,
	        "name": "Peter Weller",
	        "gender": "M",
	        "email": "peter@person.com",
	        "startDate": "2018-11-09",
	        "role": "Administrator"
	    }
	]

	If authentication fails it returns status server error 401-Unauthorized

	{
    	"detail": "Invalid token."
    }







-- Get Employee By ID: This service returns an employee requested by the GET method:


   To access this service:

   http://localhost:8000/employeeApi/employees/ID_EMPLOYEE

   
   ID_EMPLOYEE = Id of the employee generated automatically by the system

   Header:
   METHOD:  GET
   Content-Type : application/json
   Authorization: Token <KEY-TOKEN>


   Return:

   If the correct token is sent and the requested employee does not exist, it will return:

    ERROR-SERVER 404 Not Found

   If the correct token is sent and if the requested employee exists, it will return:

    ej:

    http://localhost:8000/employeeApi/employees/5

	{
    "id": 18,
    "name": "Peter Weller",
    "gender": "M",
    "email": "peter@person.com",
    "startDate": "2018-11-09",
    "role": "Administrator"
	}

	If authentication fails it returns status server error 401-Unauthorized

	{
    	"detail": "Invalid token."
    }





-- POST Employee: This service adds an employee to the database:


   To access this service:

   http://localhost:8000/employeeApi/employees/

 

   Header:

   Content-Type : application/json
   Authorization: Token <KEY-TOKEN>

   Body:
	ej:

		{
	    "id": 18,
	    "name": "Peter Weller",
	    "gender": "M",
	    "email": "peter@person.com",
	    "startDate": "2018-11-09",
	    "role": "Administrator"
		}


   Return:

   If the correct token is sent and the data is correct, it will return Server Status 201-Created and the data added to the database in the body:
   
    ej:

	{
	    "id": 19,
	    "name": "new 1",
	    "gender": "F",
	    "email": "peter@997xxx.com",
	    "startDate": "2018-11-07",
	    "role": "Administrator"
	}


	If authentication fails it returns error 401-Unauthorized

	{
    	"detail": "Invalid token."
    }







-- PUT Modify Employee: This service modifies the data of an employee in the database:


   To access this service:

   http://localhost:8000/employeeApi/employees/ID_EMPLOYEE

   ID_EMPLOYEE = Id of the employee generated automatically by the system
 

   Header:

   METHOD: PUT
   Content-Type : application/json
   Authorization: Token <KEY-TOKEN>

   Body:
	
  ej:

	   http://localhost:8000/employeeApi/employees/19

		{
	    "name": "Peter Weller",
	    "gender": "M",
	    "email": "peter@person.com",
	    "startDate": "2018-11-09",
	    "role": "Administrator"
		}


   Return:

   If the correct token is sent and the data is correct, it will return 200-OK server status and the data added to the database in the body:

    ej:

	{
	    "name": "new 1",
	    "gender": "F",
	    "email": "peter@997xxx.com",
	    "startDate": "2018-11-07",
	    "role": "Administrator"
	}

    If the correct token is sent but the employee ID does not exist in the database, it will send a 404-Not Found status server code

 
	If authentication fails it returns status server error 401-Unauthorized

	{
    	"detail": "Invalid token."
    }





-- DELETE Delete Employee: This service removes an employee from the database:


  To access this service:

   http://localhost:8000/employeeApi/employees/ID_EMPLOYEE

   ID_EMPLOYEE = Id of the employee generated automatically by the system
 

   Header:

   METHOD: DELETE
   Content-Type : application/json
   Authorization: Token <KEY-TOKEN>

   Body:
	ej:

	   http://localhost:8000/employeeApi/employees/19



   Return:

   If the correct token is sent and the ID is from an employee that exists in the database, it will return Server Status 204-No Content:


   If the correct token is sent but the employee ID does not exist in the database, it will send a 404-Not Found status code

 
	If authentication fails it returns error 401-Unauthorized

	{
    	"detail": "Invalid token."
    }




FLOW OF SCREENS



Authentication:

![alt text](https://raw.githubusercontent.com/marco-polo-leyva/Employee/develop/images/log1.png)

List of employees:



Employee Registration:



Employee Edition:



Discharge from the Employee:  
       
       
       
       
   
   
   
   
   
   
   



















