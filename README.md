Pinterest Clone 🖼️
This project is a Pinterest-inspired web application where users can upload, view, and manage posts (images with captions). It showcases the use of Node.js, Express, MongoDB, and EJS to build a functional and interactive platform.

Features ✨
User authentication and session management.
Upload and display posts (images with captions).
A clean and responsive UI built with CSS and EJS templates.
Back-end integration with MongoDB for data storage.

Prerequisites 🛠️
Before running the project, ensure you have the following installed:

Node.js (Latest stable version)
Download Node.js
MongoDB (Community Edition or Atlas for cloud)
Download MongoDB
npm (Node Package Manager, comes with Node.js)

Installation Guide 🚀
1. Clone the Repository
git clone https://github.com/yourusername/pinterest-clone.git
cd Pinterest-clone

2. Install Dependencies
Run the following command to install all the required packages:
npm install

3. Set Up MongoDB
Option 1: Local MongoDB
Ensure MongoDB is installed and running on your system.
Create a new database (e.g., Pinterest clone).
Option 2: MongoDB Atlas
Sign up for MongoDB Atlas and create a cluster.
Copy the connection string (e.g., mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority).

4. Configure Environment Variables
Create a .env file in the root directory and add the following:
PORT=3000
MONGO_URI=<Your MongoDB Connection String>
SESSION_SECRET=<Your Session Secret Key>

5. Start the Server
Run the application with:

npm filename.js, npx nodemon
The application will be accessible at http://localhost:3000.

Usage 🖥️
Navigate to http://localhost:3000.
Create an account or log in with existing credentials.
Upload images with captions and view them in the posts section.
Edit or delete your posts as needed.

Technologies Used 💻
Back-End: Node.js, Express.js
Database: MongoDB, Mongoose
View Engine: EJS
Styling: CSS3
Authentication: Passport.js
File Uploads: Multer

Folder Structure 📁
Pinterest-clone/
│
├── public/              # Static assets (CSS, images, etc.)
├── routes/              # Route handlers (e.g., auth, posts)
├── views/               # EJS templates
├── models/              # MongoDB models (User, Posts)
├── .env                 # Environment variables
├── app.js               # Main application file
├── package.json         # Project metadata and dependencies
└── README.md            # Project description and setup guide

Contribution 🤝
Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

Let me know if you need further assistance or any modifications!
