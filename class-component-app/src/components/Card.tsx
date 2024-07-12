import { SearchResult } from './SearchResults';

interface CardProps {
  result: SearchResult;
  onCardClick: (name: string) => void;
}

const Card: React.FC<CardProps> = ({ result, onCardClick }) => {
  const handleClick = () => {
    onCardClick(result.name);
  };

  return (
    <div className="result-item" onClick={handleClick}>
      <h2>{result.name}</h2>
      <p>Height: {result.height}</p>
      <p>Mass: {result.mass}</p>
      <p>Hair Color: {result.hair_color}</p>
      <p>Skin Color: {result.skin_color}</p>
      <p>Eye Color: {result.eye_color}</p>
      <p>Birth Year: {result.birth_year}</p>
      <p>Gender: {result.gender}</p>
    </div>
  );
};

export default Card;
