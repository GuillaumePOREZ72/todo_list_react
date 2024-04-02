import React from "react";
import PropTypes from "prop-types";


 export const handleChange = () => {
    console.log("La case a été cochée");
  };

const Task = ({ id, label, done }) => {
  const classnames = done ? "tasks__item tasks__item--done" : "tasks__item";

  return (
    <li className={classnames}>
      <input
        type="checkbox"
        className="task__checkbox"
        id={id}
        checked={done}
        onChange={handleChange}
      />
      <label htmlFor={id}>{label}</label>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
};

export default Task;
