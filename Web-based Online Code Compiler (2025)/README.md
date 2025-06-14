# Web-based Online Code Compiler

This project is a web-based online code compiler developed using React.js for the frontend, Express.js for the backend, and the Judge0 API for code execution.

## Features

- Write and execute code in multiple programming languages.
- Web interface for easy interaction.
- Frontend-backend integration.
- API communication with Judge0.

## Setup and Installation

Follow these steps to set up and run the project locally:

### 1. Clone the repository (if applicable)

```bash
git clone <repository_url>
cd "Web-based Online Code Compiler (2025)"
```

### 2. Backend Setup

Navigate to the `backend` directory, install dependencies, and start the server.

```bash
cd backend
npm install
node index.js
```

**Note:** Before running the backend, you need to obtain a RapidAPI Key for the Judge0 API. Replace `'YOUR_RAPIDAPI_KEY'` in `backend/index.js` with your actual key.

### 3. Frontend Setup

Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the React development server.

```bash
cd frontend
npm install
npm start
```

This will open the application in your browser at `http://localhost:3000`.

## Usage

1. Select your desired programming language from the dropdown.
2. Write your source code in the code editor.
3. (Optional) Provide standard input in the `stdin` textarea.
4. Click the "Run Code" button to execute your code.
5. The output (or error) will be displayed in the output section.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Express.js, Node.js
- **Code Execution API:** Judge0
- **HTTP Client:** Axios
- **Styling:** CSS

## Project Structure

```
Web-based Online Code Compiler (2025)/
├── backend/                  # Express.js backend
│   ├── index.js              # Main backend server file
│   ├── package.json          # Backend dependencies
│   └── ...
├── frontend/                 # React.js frontend
│   ├── public/               # Public assets
│   ├── src/                  # React source code
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling for App component
│   │   └── ...
│   ├── package.json          # Frontend dependencies
│   └── ...
└── README.md                 # Project README
```