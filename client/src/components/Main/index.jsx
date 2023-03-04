import "./styles.modules.css";
import RecipeReviewCard from "../Cards/offreCard";
import "./styles.modules.css";



const Main = () => {
  
  return (
    <div className="main_container">
      <div className="offer_cards">
        <div className="offer_card">
          <RecipeReviewCard/>
          </div>
      </div>
      
    </div>
  );
};

export default Main;
