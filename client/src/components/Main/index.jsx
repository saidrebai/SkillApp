import "./styles.modules.css";
import RecipeReviewCard from "../offers/offre";
import "./styles.modules.css";




const Main = () => {
  return (
    <div className="main_container">
      <div className="offer_cards">
        <div className="offer_card">
          <RecipeReviewCard/>
          <br/>
          <RecipeReviewCard/>
          </div>
      </div>
      
    </div>
  );
};

export default Main;
