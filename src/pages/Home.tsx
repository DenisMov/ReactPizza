import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../redux/store";
import {
  Categories,
  PizzaBlock,
  SortPopup,
  Skeleton,
  Pagination,
} from "../components";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
  selectPizzaData,
  fetchPizzas,
  SearchPizzaParams,
  Sort,
} from "../redux";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const getPizzas = async () => {
    setIsLoading(true);

    const search = searchValue ? `search=${searchValue}` : "";
    const category = categoryId > 0 ? `category=${categoryId}` : "";

    dispatch(
      fetchPizzas({
        search,
        category,
        currentPage: String(currentPage),
        sort: sort.sortProperty,
      })
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id: any) => onClickCategory(id)}
        />
        <SortPopup value={sort} />
      </div>
      {status === "error" ? (
        <div className="content__error-info" data-testid="error-message">
          <p>
            Схоже, відбулась якась помилка. 😕
            <br /> Спробуйте спробувати ще раз.
          </p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Всі піцци</h2>

          <div className="content__items">
            {status === "loading" ? skeletons : pizzas}
          </div>
        </>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
