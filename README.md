# Notes Taking Application

## Getting Started

Follow the steps below to set up and run the Notes Taking Application on your local machine.

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)
- Git

### Installation

1. **Initialize a new Git repository:**

   Open the terminal and run:

   ```sh
   git init
   ```

2. **Clone the repository:**

   Clone the Notes Taking Application repository using the command:

   ```sh
   git clone https://github.com/Neetesh-Trivedi0028/note-taking-application.git
   ```

3. **Set up environment variables:**

   - Place the `.env` file attached in the email in the root directory of the project.
   - Update the values in the `.env` file as needed (e.g., MongoDB URL, etc.).

4. **Install dependencies:**

   Navigate to the project directory and run:

   ```sh
   npm install
   ```

### Running the Application

After completing the above steps, the code is ready to run.

1. **Start the Node.js server:**

   To start the server, use the following npm script:

   ```sh
   npm run start
   ```

   Once the server is running, you can visit the Swagger documentation for all REST APIs at:

   ```
   http://localhost:3000/api/docs/
   ```

### Testing

Before running the test script, you may need to update the payload (e.g., email) for register user test case in the `restApi.test.js` file to avoid conflicts if a user with the same email already exists in the database.

1. **Run the tests:**

   To test all APIs using Jest, use the following npm script:

   ```sh
   npm run testapi
   ```

   This will run all test cases for the APIs, and you should see all tests passing if everything is set up correctly.

## npm Scripts

The following npm scripts are available in the `package.json` file:

1. **Start Node.js server:**

   ```sh
   npm run start
   ```

2. **Test all APIs using Jest:**
   ```sh
   npm run testapi
   ```

## Additional Information

- Ensure your `.env` file is correctly set up with the required environment variables.
- Refer to the Swagger documentation for detailed information on the available APIs and their usage.

Feel free to reach out if you have any questions or need further assistance.

Happy coding!
