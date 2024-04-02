import React from 'react';
import Counter from '/src/components/Counter';
import Tasks from '/src/components/Tasks';
import  { useState } from "react";
import tasksData from '/src/data/tasks';

import './index.scss';

const TodoList = () => {

  const [taskList, setTaskList] = useState(tasksData);

    return (
      <div className="todolist">
        <Counter />
        <Tasks taskList={taskList} />
      </div>
    );
}

export default TodoList;