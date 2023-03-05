import React from 'react';
import './index.css';


const handleHomeClick = () => {
    window.location.href = "/";
  };
  const handleAboutusClick = () => {
    window.location.href = "/aboutus";
  };
  const handleOffersClick = () => {
    window.location.href = "/offers";
  };
  const handleContactClick = () => {
    window.location.href = "/contact";
  };

function Footer() {
  return (
    <footer>
      <div className='footer_container'>
        <div className='footer_container_Menu'>
            <div className='menu_buttons'>
            <button onClick={handleHomeClick}>Home</button>
            <button onClick={handleAboutusClick}>About as</button>
            <button onClick={handleOffersClick}>Offers</button>
            <button onClick={handleContactClick}>Contact</button>
            </div>
        </div>
        <div className='footer_container_icons'>
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
