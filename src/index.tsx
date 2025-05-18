import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css'; // Menggunakan path relatif daripada alias

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Check if the element exists
if (!rootElement) {
  throw new Error('Root element not found in the document');
}

// Create a root
const root = createRoot(rootElement);

// Render the app inside StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);