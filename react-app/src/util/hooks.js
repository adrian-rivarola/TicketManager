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

export const useLocalStorage = (key, defaultValue=[]) => {
  const localData = localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : defaultValue;
  const [state, setState] = useState(localData);

  const updateState = newData => {
    let shouldUpdate = typeof newData === 'object' ? localData.length !== newData.length : localData !== newData;

    if (shouldUpdate) {
      localStorage.setItem(key, JSON.stringify(newData));
      setState(newData);
    }
  }

  return [state, updateState]
}