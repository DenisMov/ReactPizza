import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

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

  // Якщо змінили параметри і був перший ренедер - спрацьовує

  // useEffect(() => {
  // if (isMounted.current) {
  //   const params = {
  //     sortProperty: sort.sortProperty,
  //     categoryId: categoryId > 0 ? categoryId : null,
  //     currentPage,
  //   };
  //   const queryString = qs.stringify(params);
  //   navigate(`?${queryString}`);
  // }

  // if (window.location.search) {
  //   dispatch(fetchPizzas({} as SearchPizzaParams));
  // }

  // isMounted.current = true;
  // }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Пояснення для себе, якщо був перший рендер, то перевіряється ЮРЛ параметри і зберігаються в редаксі

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;

  //     const sort = sortItems.find(
  //       (obj) => obj.sortProperty === params.sort
  //     ) as Sort;

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortItems[0],
  //       })
  //     );
  //   }
  // }, []);

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
        <div className="content__error-info">
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
