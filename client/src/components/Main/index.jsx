import React from "react";
import "./styles.modules.css";
import { useState,useEffect } from "react";
const Main = () => {

  const [pageviews,setPageviews] = useState();
  const [visits,setVisits] = useState();

  
  function updateCounter() {
    const type = sessionStorage.getItem('visit') === null ? 'type=visit-pageview' : 'type=pageview';
  
    fetch('http://localhost:8080/api?'+type)
      .then(res => res.json())
      .then(data => {
        setPageviews(data.pageviews);
        setVisits(data.visits);
        sessionStorage.setItem('visit', data.visits);
        sessionStorage.setItem('pageviews', data.pageviews);
        console.log("data",data);
      });
  }
  
  useEffect(() => {
    updateCounter();
  }, []);
  return (
    <div className="main_container">
    </div>
  );
};

export default Main;
