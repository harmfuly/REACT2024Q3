import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get('name') as string;
    const age = formData.get('age') as string;
    const email = formData.get('email') as string;

    const validationErrors: { [key: string]: string } = {};

    if (!name || !/^[A-Z][a-z]*$/.test(name)) {
      validationErrors.name = 'Name must start with an uppercase letter and contain only alphabetic characters.';
    }
    if (!age || isNaN(Number(age)) || Number(age) < 0) {
      validationErrors.age = 'Age must be a non-negative number.';
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'Email must be a valid email address.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      name,
      age: Number(age),
      email,
    };

    dispatch({ type: 'SUBMIT_FORM', payload: data });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="number" name="age" id="age" />
        {errors.age && <div style={{ color: 'red' }}>{errors.age}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledFormPage;
