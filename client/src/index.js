import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{BrowserRouter} from 'react-router-dom';
import ResponsiveAppBar from "./components/Menu/menu";
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter><ResponsiveAppBar />
    <App />
    </BrowserRouter>
    
  </React.StrictMode>
);


