This project was built with the following technologies:

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JSON Web Tokens (JWT) for authentication

1) Clone the repository to your local machine
2) Navigate to the backend folder:
   cd backend
3) Create a .env file in the root directory with the following content:
    PORT=5000
    MONGO_URI=mongodb+srv://username:password@yourcluster.lptwdk7.mongodb.net/?retryWrites=true&w=majority&appName=toDoCluster
    JWT_SECRET=yourjsonwebtoken
   Replace username, password, and yourcluster with your MongoDB Atlas username, password, and cluster name respectively. Also, you may choose your own JWT_SECRET.
4) Install dependencies:
    npm install
5) Run the application:
    npm start
