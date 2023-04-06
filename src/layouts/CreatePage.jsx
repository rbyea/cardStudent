import React from "react";
import TextField from "../components/common/form/TextField";
import { useHistory } from "react-router-dom";
import Modal from "../components/common/ui/Modal";
import * as yup from "yup";

const CreatePage = () => {
  const history = useHistory();
  const [error, setError] = React.useState({});
  const [data, setData] = React.useState({
    img: "",
    firstName: "",
    lastName: "",
    year: "",
    portfolio: "",
  });
  const [localItem, setLocalItem] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const localObject = localItem && Object.keys(localItem).length;

  const handleModal = () => {
    setModalVisible(true);
  };

  React.useEffect(() => {
    setLocalItem(JSON.parse(localStorage.getItem("data")));
  }, []);

  React.useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      ...localItem,
    }));
  }, [localItem]);

  React.useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]:
        target.name === "year" ? Number(target.value) : target.value,
    }));
  };

  const handleBack = () => {
    history.push("/");
  };

  const onSumbitForm = (e) => {
    e.preventDefault();
    localStorage.setItem("data", JSON.stringify(data));
    const isValid = validate();
    history.push("/");
    if (!isValid) return;
    validate();
  };

  const validateScheme = yup.object().shape({
    portfolio: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        "Введите правильный URL-адрес!"
      )
      .required("Портфолио обязателеное поле для заполнения!"),
    year: yup
      .number()
      .min(1900, "Год рождения должен быть больше 1900")
      .max(
        new Date().getFullYear(),
        `Год рождения должен быть меньше ${new Date().getFullYear()}`
      )
      .required("Год рождения обязателен для заполнения"),
    lastName: yup
      .string()
      .required("Поле 'Фамилия' обязателено для заполнения!")
      .matches(/(?=.{3,})/, "Фамилия должена состоять минимум из 3 символов"),
    firstName: yup
      .string()
      .required("Поле 'Имя' обязателено для заполнения!")
      .matches(/(?=.{3,})/, "Имя должено состоять минимум из 3 символов"),
    img: yup
      .string()
      .url("Введите корректную ссылку на картинку")
      .matches(
        /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i,
        "Введите ссылку на изображение в формате PNG, JPG, JPEG или GIF"
      )
      .required("Поле обязательно для заполнения"),
  });

  const isValid = Object.keys(error).length === 0;
  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setError({}))
      .catch((err) => setError({ [err.path]: err.message }));
  };

  return (
    <>
      <div className="card">
        <form className="card-body" onSubmit={onSumbitForm}>
          <h1>Создать</h1>
          <TextField
            label="Фотография"
            type="text"
            name="img"
            value={data.img}
            error={error.img}
            onChange={handleChange}
          />
          <TextField
            label="Имя"
            type="text"
            name="firstName"
            value={data.firstName}
            error={error.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Фамилия"
            type="text"
            name="lastName"
            value={data.lastName}
            error={error.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Год рождения"
            type="string"
            name="year"
            value={data.year}
            error={error.year}
            onChange={handleChange}
          />
          <TextField
            label="Портфолио"
            type="text"
            name="portfolio"
            value={data.portfolio}
            error={error.portfolio}
            onChange={handleChange}
          />

          <div className="formlist">
            <button
              type={localObject ? "button" : "submit"}
              disabled={!isValid}
              onClick={handleModal}
              className="btn btn-primary btn-sm"
            >
              {localObject > 0 ? "Обновить" : "Добавить"}
            </button>
            <button
              onClick={handleBack}
              type="button"
              className="btn btn-secondary btn-sm"
            >
              Назад
            </button>
          </div>
        </form>
      </div>

      <Modal
        setData={setData}
        visible={modalVisible}
        data={data}
        localItem={localItem}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default CreatePage;
