import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
//import App from './pages/promptpage'
import { SocketProvider } from './SocketContext';
import { BrowserRouter } from 'react-router-dom';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
      <SocketProvider>
          <App />
      </SocketProvider>
    );
} else {
  console.error('Root element not found');
}