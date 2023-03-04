import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import{BrowserRouter} from 'react-router-dom';
import ResponsiveAppBar from "./components/Menu/menu";
import Footer from './components/Footer/index';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render( 
    <BrowserRouter>
    <ResponsiveAppBar/>
    <React.StrictMode>
    <App />
     </React.StrictMode>
     <Footer/>
    </BrowserRouter>
    
 
);


