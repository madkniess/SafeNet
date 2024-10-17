import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [urls, setUrls] = useState([]);

  // Fetch all URLs from the backend on component load
  useEffect(() => {
    axios.get('http://localhost:5001/urls') // Adjust port if needed
      .then(res => setUrls(res.data))
      .catch(err => console.log(err));
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5001/submit', { url }) // Adjust port if needed
      .then(res => {
        const { isMalicious } = res.data;
        setStatus(isMalicious ? 'Dangerous' : 'Safe');
        setUrls([...urls, { url, isMalicious }]);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h1>SafeNet URL Submission</h1>
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {status && <p>Status: <strong>{status}</strong></p>}
      
      <h2>Submitted URLs</h2>
      <ul>
        {urls.map((entry, index) => (
          <li key={index}>
            <strong>URL:</strong> {entry.url} <br />
            <strong>Status:</strong> {entry.isMalicious ? 'Dangerous' : 'Safe'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
