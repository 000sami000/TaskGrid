# TaskGrid

TaskGrid is a task management application designed to help users organize and prioritize tasks efficiently.
It features a user-friendly drag-and-drop interface to manage tasks across different stages—To Do, In Progress, and Completed—making task tracking easy and intuitive.

![Screenshot (15)](https://github.com/user-attachments/assets/f26361d6-72a5-4f5c-b009-7444e1297f6c)

![Screenshot (16)](https://github.com/user-attachments/assets/75ee0712-8ce8-4e31-a368-aab25b11f4a2)


https://github.com/user-attachments/assets/1f21f9c8-73cc-4ca5-955c-959c2c4272c5




## Features

- **Drag-and-Drop Interface**: Move tasks between To Do, In Progress, and Completed sections.
- **Real-time Updates**: Instant task status updates using React DnD.
- **Task Management**: Easily create, update, and delete tasks.

## Demo

Check out the live demo: [TaskGrid Demo](https://task-grid-giwo.vercel.app/) 

## Technologies Used

- **Frontend**: React, React DnD, CSS/Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (if applicable)
- **Hosting**: Vercel for frontend, Heroku for backend (or specify your deployment platform)

## Installation
1. **Environment Variables**

   Create a `.env` file in the backend root directory and add the following:

   ```plaintext
   CONNECTION_URL=your_mongodb_url       # MongoDB connection URL
   JWT_SECRET=your_jwt_secret            # JWT secret for authentication
   ORIGIN=your_frontend_url              # Frontend URL for CORS
   PORT=your_port                        # Port number
2. **Clone the repository**

   ```bash
   git clone https://github.com/000sami000/TaskGrid.git
   cd TaskGrid
3. **Install dependencies**
   npm install
