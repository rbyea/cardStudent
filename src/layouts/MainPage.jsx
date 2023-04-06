import React from "react";
import { Link } from "react-router-dom";
import { ageText } from "../utils/ageText";

const MainPage = () => {
  const date = new Date();
  const [item, setItem] = React.useState({});

  React.useEffect(() => {
    setItem(JSON.parse(localStorage.getItem("data")));
  }, []);

  const handleClose = (e) => {
    e.preventDefault();

    localStorage.clear();
    setItem({});
  };

  return (
    <div>
      <h1>Карточка студента</h1>

      {item && Object.keys(item).length > 0 ? (
        <div className="card mb-3" style={{ width: "20rem" }}>
          <a href="#" onClick={handleClose} className="card-close">
            x
          </a>
          <div className="card-body">
            <img src={item.img} alt={item.firstName} />
            <h5 className="card-title">Имя: {item.firstName}</h5>
            <h5 className="card-title">Фамилия: {item.lastName}</h5>
            <h5 className="card-title mb-3">
              Год рождения: {item.year} (
              {ageText(date.getFullYear() - item.year)}
              )
            </h5>
            <a
              href={item.portfolio}
              target="_blank"
              className="btn btn-primary"
            >
              Портфолио
            </a>
          </div>
        </div>
      ) : (
        <p>Данных нет</p>
      )}

      <Link to="/create" type="button" className="btn btn-primary">
        {item ? "Изменить" : "Добавить"}
      </Link>
    </div>
  );
};

export default MainPage;
