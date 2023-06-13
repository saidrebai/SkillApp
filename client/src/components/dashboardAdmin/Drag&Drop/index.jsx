import React, { useState, useEffect } from "react";
import axios from "axios";
// import Picture from "./Picture";
import { useDrop } from "react-dnd";
import { useDrag } from "react-dnd";
import "./index.css"

function Picture({ id}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type :"text",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      width="150px"
      style={{ border: isDragging ? "5px solid pink" : "0px" }}>
</div>
  );
}


const PictureList = [
  {
    id: 1,
  },
];

function DragDrop() {
  const [board, setBoard] = useState([]);

  const id = localStorage.getItem("id");

  const [scores, setScores] = useState([]);
  const [countScores, setCountScores] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [idOffer, setIdOffer] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/offerRouter/getofferbyid/${id}`
        );
        const idOffers = response.data.offer
          .map((offer) => offer._id)
          .join(",");
        const responseScores = await axios.get(
          "http://localhost:8080/api/ApplicationRouter/getscorebyid",
          { params: { q: idOffers } }
        );
        const idUsers = responseScores.data?.scores
          ?.map((score) => score.user)
          .join(",");
        const responseUser = await axios.get(
          "http://localhost:8080/api/candidatRouters/searchuser",
          { params: { q: idUsers } }
        );
        const idAdmin = localStorage.getItem("id");

        console.log("psps", idUsers);
        setScores(responseScores.data?.scores);
        setCountScores(responseScores.data?.scoreCount);
        setIdOffer(response.data.offer);
        setUsers(responseUser.data?.data);
        console.log(users);
        console.log(idOffer);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "text",
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addImageToBoard = (id) => {
    const pictureList = scores.filter((score) => id === score.id);
    setBoard((board) => [...board, pictureList[0]]);
  };
  return (
    <>
      <div className="Pictures">
        {scores.map((score) => {
          <Picture id={score.id}><div key={score.id}>
            <div> {users.find((user) => user._id === score.user)?.email}</div>
            <div> {idOffer.find((offer) => offer._id === score.offer)?.Name}</div>
            {/* <div> {score.accepted ===true ?(<div>true</div>):(<div>false</div>)}</div> */}
          </div></Picture>;
        })}
      </div>
      <div className="Board" ref={drop}>
        {board.map((picture) => {
        <Picture id={picture.id} />;
        })}
      </div>
    </>
  );
}

export default DragDrop;