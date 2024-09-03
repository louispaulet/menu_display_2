import { useParams } from 'react-router-dom';
import hotSauceData from '../hotsauceData';

function HotSauceDetails() {
  const { id } = useParams();
  const sauce = Object.values(hotSauceData)[id];

  if (!sauce) {
    return <p>Hot sauce not found!</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{sauce.name}</h1>
      
      <img
        src={`https://raw.githubusercontent.com/louispaulet/menu_display_2/main/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.jpg`}
        alt={`${sauce.name}`}
        className="w-full max-w-lg h-auto rounded-lg"
      />
      
      <p className="mb-2">Hotness Level: {sauce.hotness_level}/10</p>
      <p className="mb-2">Bottling Date: {sauce.bottling_date}</p>
      <p className="mb-4">{sauce.description}</p>
    </div>
  );
}

export default HotSauceDetails;
