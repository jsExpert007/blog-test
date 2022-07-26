### GraphQL MySQL Typescript CRUD

### App created with node js version 14

### Installation

```
Step 1  :-  start the mysql server & create database
Step 2  :-  npm install
Step 3  :-  npm run build
Step 4  :-  npm start
```

#### Environment variables

```
APP_KEY=XXXXXXXXXX   // Need to pass this key for every request with headers as (app-key:050fc028-74f0-45f0-b84c-9a12d7b8b60b). For security purpose every request requires this app key in headers.
PORT=XXXX   // Server Running on this port.
DB_HOST=XXXX
DB_PORT=XXXX
DB_NAME=XXXX     // place the databse name here which is created on step 1   
DB_USERNAME=XXXX
DB_PASSWORD=XXXX
```


### Sample Queries and Mutations

1. For Create User
mutation{
  createUser(first_name:"John", last_name:"Doe", email:"john@mailinator.com", password:"123456"){
    id
    first_name
    last_name
    email
    password
  }
}

2. For Update User
mutation{
  updateUser(id:"6", input:{first_name:"Jack", last_name:"Rock"}){
    status
    message
  }
}


3. For Get user

query{
    getAllUsers{
        id
        first_name
        last_name
        email
        password
    }
}

