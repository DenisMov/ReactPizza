import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import SortPopup from "../components/SortPopup";

function Home() {
  return (
    <div className="container">
      <div className="content__top">
        <Categories items={"М'ясні"} />
        <SortPopup />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <PizzaBlock />
    </div>
  );
}

export default Home;
