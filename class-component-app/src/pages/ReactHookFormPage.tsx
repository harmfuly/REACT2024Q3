import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z][a-z]*$/, 'Name must start with an uppercase letter'),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .email('Email must be a valid email')
    .required('Email is required'),
  gender: yup
    .string()
    .required('Gender is required'),
  termsAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .test('fileSize', 'File too large', value => {
      return !value || (value instanceof File && value.size <= 2 * 1024 * 1024);
    })
    .test('fileType', 'Unsupported file type', value => {
      return !value || (value instanceof File && ['image/png', 'image/jpeg'].includes(value.type));
    }),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface FormData {
  name: string;
  age: number;
  email: string;
  gender: string;
  termsAccepted: boolean;
  picture: FileList;
  password: string;
  confirmPassword: string;
}

const ReactHookFormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<any> = (data) => {
    const pictureFile = data.picture.length > 0 ? data.picture[0] : null;
    const base64Picture = pictureFile ? URL.createObjectURL(pictureFile) : null;
    const payload = { ...data, picture: base64Picture };
    dispatch({ type: 'SUBMIT_FORM', payload });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input type="text" {...register('name')} id="name" />
      {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

      <label htmlFor="age">Age:</label>
      <input type="number" {...register('age')} id="age" />
      {errors.age && <p style={{ color: 'red' }}>{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input type="email" {...register('email')} id="email" />
      {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

      <label htmlFor="gender">Gender:</label>
      <select {...register('gender')} id="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}

      <label>
        <input type="checkbox" {...register('termsAccepted')} />
        I accept the terms and conditions
      </label>
      {errors.termsAccepted && <p style={{ color: 'red' }}>{errors.termsAccepted.message}</p>}

      <label htmlFor="picture">Picture:</label>
      <input type="file" {...register('picture')} id="picture" />
      {errors.picture && <p style={{ color: 'red' }}>{errors.picture.message}</p>}

      <label htmlFor="password">Password:</label>
      <input type="password" {...register('password')} id="password" />
      {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input type="password" {...register('confirmPassword')} id="confirmPassword" />
      {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReactHookFormPage;