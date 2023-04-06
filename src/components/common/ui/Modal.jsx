import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { compareObjects } from "../../../utils/compareObjects";

const Modal = ({ visible, setModalVisible, data, setData, localItem }) => {
  const [isEqual, setIsEqual] = React.useState(false);

  React.useEffect(() => {
    if (localItem && Object.keys(localItem).length > 0) {
      const objectsEqual = compareObjects(
        data,
        JSON.parse(localStorage.getItem("data"))
      );
      setIsEqual(objectsEqual);
    }
  }, [data, JSON.parse(localStorage.getItem("data")), setData]);

  console.log(isEqual);

  const history = useHistory();

  const closeModal = () => {
    setModalVisible(!visible);
  };

  const toggleDisplay = () => {
    return visible ? "block" : "none";
  };

  const handleUpdateData = () => {
    if (localItem && Object.keys(localItem).length) setModalVisible(!visible);
    localStorage.setItem("data", JSON.stringify(data));
    history.push("/");
  };

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: toggleDisplay(), background: "#0000003d" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Уведомление
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <strong>
                {!isEqual ? "Обновить данные?" : "Данные не изменены!"}
              </strong>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Закрыть
              </button>
              {!isEqual ? (
                <button
                  type="button"
                  onClick={handleUpdateData}
                  className="btn btn-primary"
                >
                  Обновить
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  data: PropTypes.object,
  setData: PropTypes.func,
  localItem: PropTypes.object,
};

export default Modal;
