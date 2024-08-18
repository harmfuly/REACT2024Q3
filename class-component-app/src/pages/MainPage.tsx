import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MainPage: React.FC = () => {
  const formData = useSelector((state: any) => state.formData);

  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <Link to="/uncontrolled-form">Uncontrolled Form</Link>
        <Link to="/react-hook-form">React Hook Form</Link>
      </nav>
      <div>
        {formData.map((data: any, index: number) => (
          <div key={index} className="form-tile">
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;