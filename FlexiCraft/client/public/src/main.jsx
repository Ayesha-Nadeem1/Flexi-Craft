import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { ProjectsProvider } from './components/ProjectsContext.jsx';
import { UserProvider } from './components/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-6itxwndrgzi5njtk.us.auth0.com"
    clientId="Nn6YZtXwpvZEt6a1t10gfBNjSCDsgx4l"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <ProjectsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ProjectsProvider>,
  </Auth0Provider>,
)
