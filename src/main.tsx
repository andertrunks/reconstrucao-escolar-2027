import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import CloudAccountBar from './CloudAccountBar';
import './style.css';
createRoot(document.getElementById('root')!).render(<React.StrictMode><CloudAccountBar/><App/></React.StrictMode>);
