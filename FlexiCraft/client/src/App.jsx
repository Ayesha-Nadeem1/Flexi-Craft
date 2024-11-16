import React from 'react'
import LandingPage from './components/pages/landing page/LandingPage';
import DocumentationPage from './components/pages/landing page/Documentation';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Profile from './components/pages/Profile';
import Documentations from './components/pages/Documentations';
import Settings from './components/pages/Settings';
import HelpAndSupport from './components/pages/HelpAndSupport';
import AssetLibrary from './components/pages/AssetLibrary';
import Projects from './components/pages/projects/Projects';
import Analytics from './components/pages/Analytics';
import ComponentsLibrary from './components/pages/components library/ComponentsLibrary';
import Headers from './components/pages/components library/Headers';
import HeroSections from './components/pages/components library/HeroSections';
import Footers from './components/pages/components library/Footers';
import ProjectDetails from './components/pages/projects/ProjectDetails';
import CreateProject from './components/pages/projects/CreateProject';
import DragDropEditor from './components/pages/projects/canvas';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ResetPassword from './components/pages/ResetPassword';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/dashboard" element={<Dashboard />}/> 
          <Route path="/profile" element={<Profile />}/>
          <Route path="/analytics" element={<Analytics />}/>
          <Route path="/settings" element={<Settings />}/>
          <Route path="/assetlibrary" element={<AssetLibrary />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/projects/:projectId" element={<ProjectDetails />}/>
          <Route path="/projects/create-project" element={<CreateProject />}/>
          <Route path="/documentations" element={<Documentations />}/>
          <Route path="/helpandsupport" element={<HelpAndSupport />}/>
          <Route path='/componentslibrary' element={<ComponentsLibrary/>}/>
          <Route path='/headers' element={<Headers/>}/>
          <Route path='/herosections' element={<HeroSections/>}/>
          <Route path='/footers' element={<Footers/>}/>
          <Route path='/canvas/:id' element={<DragDropEditor/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/reset-password/:token' element={<ResetPassword/>}/>
      </Routes>
    </Router>
  )
}

export default App