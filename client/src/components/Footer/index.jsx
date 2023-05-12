import React from 'react';
import './index.css';



  // const handleContactClick = () => {
  //   window.location.href = "/contact";
  // };
  const handleSkillsClick = () => {
    window.location.href = "/";
  };

function Footer() {
  return (
    <footer>
      <div className='footer_container'>
        <div className='information_container'>
          <h1 onClick={handleSkillsClick}>Skills</h1>
        </div>
        {/* <div className='footer_container_Menu'>
            <h3 onClick={handleContactClick}>Contact</h3>
         </div> */}
            <div className='envoyer_container'>
              <input type="text" placeholder='envoyer email'></input>
              <button type="submit">Send</button>
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
