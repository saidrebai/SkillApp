import React from "react";

const PowerBi = () => {
  const id = localStorage.getItem("id");
  const reportURL = `https://app.powerbi.com/reportEmbed?reportId=bd9f6d82-454b-4057-a402-77f504ec6824&autoAuth=true&ctid=dbd6664d-4eb9-46eb-99d8-5c43ba153c61&filter=offermodels/admin eq '${id}'`;
  return (
    <div>
      <iframe
        src={reportURL}
        title="Final BI"
        width="100%"
        height="600"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default PowerBi;
