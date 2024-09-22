import React, { memo } from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (id: number) => void;
};

const categoriesNames = [
  "Всі",
  "М'ясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

const Categories: React.FC<CategoriesProps> = memo(
  ({ value, onClickCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categoriesNames.map((categoryName, id) => (
            <li
              key={id}
              onClick={() => onClickCategory(id)}
              className={value === id ? "active" : ""}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Categories;
