# exercise2-3

This is an exercise showing the REST API using Express JS and MySQL.

The code in the main branch is working with MySQL database.


## Runing the code

1. Clone the repository 
2. Create a .env file in the root directory with the template given in the .env-template file. The values should specify the host, database, and user and password to connect to your database.
3. npm install
4. npm start


## REST Endpoints
This is a sample documentation. At the time when you check this, the server might not be available to use the endpoint.

BaseURL: 

| Method        | Endpoint           | Parameters  | Description  |
| ------------- |:-------------:| -----:| -----:|
| GET  | api/course | course_id, course_name | Find the list of courses with the given course id or course name, e.g., api/course?course_name="COMP-3504"|
| POST  | api/course| course_id, course_name, course_description | Add a course to the table including the course id, course name , and description|
| POST  | api/course | course_description  | udpade the course description|
