import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { SocketProvider } from './SocketContext';


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