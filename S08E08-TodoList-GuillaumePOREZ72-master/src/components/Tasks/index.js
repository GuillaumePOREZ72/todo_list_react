import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";

import "./index.scss";

const Tasks = ({ taskList }) => {
  return (
    <ul className="tasks">
      {taskList.map((task) => (
        <Task key={task.id} label={task.label} done={task.done} />
      ))}
    </ul>
  );
};

export default Tasks;
