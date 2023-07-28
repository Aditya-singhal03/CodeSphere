# CodeSphere - A Full-Stack MERN Coding Platform with Secure Code Execution using Docker and Efficient Asynchronous Communication with RabbitMQ.
CodeSphere is a feature-rich Full-Stack MERN (MongoDB, Express.js, React.js, Node.js) Coding Platform designed to enhance the coding experience for users. It offers a range of functionalities to cater to developers of all levels. This project allows you to run **C++** code in a containerized manner.

## Key Features

1. **User Authentication:** Secure user registration and login system using *JSON Web Tokens* (JWT) to protect user data and provide a personalized coding experience.

2. **Admin Panel:** A dedicated admin panel to manage and add coding problems, enabling seamless content updates. Admin can add Test cases separately.

3. **Code Execution with Docker:** CodeSphere employs containerization using *Docker* to execute user code securely, preventing any potential harm to the server.

4. **Asynchronous Communication with RabbitMQ:** Leveraging *RabbitMQ*, the platform enables efficient and scalable asynchronous communication for better responsiveness and improved user experience.
   
5. **Real-time Code Evaluation:** Instant feedback on code correctness and performance, promoting a learn-by-doing approach.

6. **Feedback Quality:** To ensure an accurate evaluation, user code is executed within a secure containerized environment. The feedback generated includes multiple possibilities such as *"Accepted"* for correct solutions, *"Wrong Answer"* for incorrect outputs, *"Compilation Error"* for code that fails to compile, *"Time Limit Exceeded"* for code that takes too long to execute, and *"Run-time Error"* for code that encounters errors during execution. This comprehensive feedback allows users to identify and rectify errors, promoting a robust learning experience.

**Example** -> Testing on test case, **Input - 2,4**  **Expected Output - 16**

https://github.com/Aditya-singhal03/CodeSphere/assets/76598520/a4b2ad5c-38c4-4a46-8461-80741d793dd1

7. **Submission History:** Access past code submissions and their evaluation results for review and learning purposes.

8. **Problem-Solving:** Users can access a wide range of coding problems, Each coding question has a clear description with all necessary sections like Description, Input Specification, Output Specification, and Test Cases.

## Prerequisites

Before running this project, please ensure that you have the following dependencies installed:
   1. Node.js (v14 or higher)
   2. Docker
   3. RabbitMQ server

## Getting Started

Follow the steps below to start the project locally:
   1. Clone the repository:
      - ```bash
        git clone https://github.com/Aditya-singhal03/CodeSphere.git
   2. Pull the aditya/code-runner image from Docker Hub:
      - ```bash
        docker pull aditya03singhal/codesphere03:latest
   3. Start the RabbitMQ server. Make sure it is running and accessible.
   4. Start the Server :
      - Navigate to the `server` directory:
        ```bash
        cd server
      - Install the server dependencies:
        ```bash
        npm install
      - Start the server:
        ```bash
        nodemon index.js
   5. Run the client:
      - Navigate to the client directory:
        ```bash
        cd client
      - Install the client dependencies:
        ```bash
        npm install
      - Start the client:
        ```bash
        npm run dev
   The client will be accessible at http://localhost:3000.
