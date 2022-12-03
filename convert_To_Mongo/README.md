# EXPRESS REST API with JADE template engine


# https://restapijade.herokuapp.com/
### docker repository
```sh
docker pull yinotherhino/expressapimoviesrest
```
### Setup

1. Use and setup the project with `yarn`.
2. The project is written in Typescript...
## Problem Description:

Create A basic Express application, that makes a CRUD operation (create, read, update, delete) using SQLite database, document and publish your endpoints using postman.
In this project, you’ll build a basic CRUD (Create, Read, Update, Delete) for a Movie Listing Application.

## Implementation:

IMPLEMENTED AUTHORIZATION AND AUTHENTICATION: PROTECTED ALL ROUTES. ONLY THE LOGGED-IN USERS CAN PERFORM THE FOLLOWING OPERATIONS

- You can add a Movies.
- You can edit Movies.
- You can delete a Movies

## NOTE
- Users that are not authenticated can browse through  Movies on the app

## How I completed this project?

- The application is able to perform.
  - `GET` Request which returns all the data in your database
  - `POST` Request which adds data to your database
  - `PUT` Request which updates fields of a particular data using the id in database
  - `DELETE` Request which removes a particular data from your database using the id
- Hosted the application on Heroku.
- Data format example: This show the model for users and the Movies added/created by the user

```
[

 {
   fullname: 'john doe',
   username:'Yourusername'
   email: 'john@example.com', // no duplicates allowed.
   password:"ofyource",
 }
 
   Movies:[
   {
    title: 'Avengers',
    description :'Avengers is an interesting movie'
    image:"https://mycourseimge.com",
    price: 3000
    id:"databaseId1"
   },
     {
    title: 'God's must be crazy',
    description :'You know it's God's not God, because he cant be.'
    image:"https://mymovieimage.com",
    price: 8000
    id:"databaseId2"
   }
   ......
]
```

## FRONTEND IS DONE WITH PUG TEMPLATE ENGINE

### Test was written using jest

- Test for a GET request
- Test for a POST request
- Test for a PUT request
- Test for a DELETE request
- Test to return proper HTTP status codes

##Routes
GET POST
/users
/movies
/login

GET PUT DELETE
/users/:id
/movies/:id

image urls to use

https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?s=1024x1024&w=is&k=20&c=cSI-8stXlD8mieP_sD7jCDdWwrSXEV1w7TbTZo2TSRs=