import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};

export const useLocalStorage = key => {
  const localData = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
  const [state, setState] = useState(localData);

  const updateState = newData => {
    if (localData === null || (localData.length !==  newData.length)) {
      localStorage.setItem(key, JSON.stringify(newData));
      setState(newData);
    }
  }

  return [state, updateState]
}