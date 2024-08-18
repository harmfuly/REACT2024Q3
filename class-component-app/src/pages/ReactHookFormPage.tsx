import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup.string().required().matches(/^[A-Z][a-z]*$/, "Name must start with an uppercase letter"),
  age: yup.number().required().positive().integer(),
  email: yup.string().email().required(),
});

const ReactHookFormPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    dispatch({ type: 'SUBMIT_FORM', payload: data });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" {...register('name')} id="name" />
      {errors.name && <p>{errors.name.message}</p>}
      <label htmlFor="age">Age:</label>
      <input type="number" {...register('age')} id="age" />
      {errors.age && <p>{errors.age.message}</p>}
      <label htmlFor="email">Email:</label>
      <input type="email" {...register('email')} id="email" />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookFormPage;