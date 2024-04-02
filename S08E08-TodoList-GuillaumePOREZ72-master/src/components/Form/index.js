import React from 'react';

import './index.scss';

const Form = () => {
    return (
      <form className="form">
        <input
          type="text"
          placeholder="Ajouter une tâche"
          className="form-item"
        />
      </form>
    );
}

export default Form;