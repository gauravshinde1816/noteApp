### 💡 Tech Stack
1. Express.js :
   - Used minimalist node.js framework which comes with easy to setup HTTP server , router, middlware for creating backend routes and controllers.
   - Provides this layer of abstraction on top of Node.js.


2. MongoDB :
   - NoSQL Document database
   - No specific reason to choose this database for current problem statement , could have been done using Postgres.
   - MongoDB provide more flexible way to store Notes document and inject sharedWith users inside Note schema.

3. Docker and Docker compose:
   - To containerize backend API
   - I have hosted the image for my public docker hub repository.
   - Will provide the compose file for the same.
   - As of now there is only one backend image but more images can be added for frontend and database services etc 

### 💡 External Tools:

1. bcryptjs : To encrypt the password.
2. express-rate-limit : To implement rate limiting and request throttling to handle high traffic.
3. express-validator : To validate the request input.
4. jsonwebtoken : To generate the JWY token , sign it and use to authenticate the user. Also to authorize the protected routes
5. mongoose: 
   - MongoDB ORM/ODM 
   - Manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
6. supertest : To test the API


### 💡 Local Setup Guide
1. Clone the project
` git clone https://github.com/gauravshinde1816/noteApp.git`

2. I have provided sample mongo DB atlas URL and other keys from default.json just make local setup simpler , feel free to replace that with your own keys.

3. Start backend
   - ` cd noteApp/`
   - Install Dependancies
   - ` npm install`
   - Start server
   - `npm start`
4. Backend will start on `http://localhost:5000`.

5. Import the postman collection provided below and you will be able to run the APIs

### 💡 Docker Setup Guide

- Run `docker-compose up -d`.
- Backend will start on `http://localhost:5000`.
- Import the postman collection provided below and you will be able to run the APIs


### 💡 Postman Collection
- `https://api.postman.com/collections/13215960-3a86f4b1-dab9-4eed-a0d6-e399d52abf53?access_key=PMAT-01HK9F02NJ9AH84M4179MHB95Q`

### 💡 Run API tests
- Run `npm run test`.

