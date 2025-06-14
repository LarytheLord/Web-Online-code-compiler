import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sourceCode, setSourceCode] = useState('');
  const [languageId, setLanguageId] = useState(71); // Default to Python (Judge0 ID for Python 3)
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setOutput('');
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/run', {
        language_id: languageId,
        source_code: sourceCode,
        stdin: stdin,
      });
      
      const { stdout, stderr, compile_output, status } = response.data;

      if (stdout) {
        setOutput(stdout);
      } else if (stderr) {
        setError(stderr);
      } else if (compile_output) {
        setError(compile_output);
      } else if (status && status.description) {
        setOutput(`Status: ${status.description}`);
      }

    } catch (err) {
      console.error('Error during code execution:', err);
      setError('Failed to execute code. Please check your backend server and API key.');
    }
  };

  return (
    <div className="App">
      <h1>Online Code Compiler</h1>
      <div className="controls">
        <label htmlFor="language">Language:</label>
        <select id="language" value={languageId} onChange={(e) => setLanguageId(Number(e.target.value))}>
          <option value={71}>Python 3</option>
          <option value={62}>Java</option>
          <option value={54}>C++</option>
          <option value={50}>C</option>
          <option value={63}>JavaScript</option>
        </select>
      </div>
      <div className="editor-container">
        <textarea
          className="code-editor"
          placeholder="Write your code here..."
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
        ></textarea>
        <textarea
          className="stdin-input"
          placeholder="Enter standard input here (optional)"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
        ></textarea>
      </div>
      <button onClick={handleSubmit}>Run Code</button>
      <div className="output-container">
        <h2>Output:</h2>
        {output && <pre className="output">{output}</pre>}
        {error && <pre className="error">{error}</pre>}
      </div>
    </div>
  );
}

export default App;
