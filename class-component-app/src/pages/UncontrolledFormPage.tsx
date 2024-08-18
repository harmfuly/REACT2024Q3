import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      age: formData.get('age'),
      email: formData.get('email'),
    };
    dispatch({ type: 'SUBMIT_FORM', payload: data });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="age">Age:</label>
      <input type="number" name="age" id="age" />
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledFormPage;