import { useParams } from 'react-router-dom';
import hotSauceData from '../hotsauceData';
import { FaPepperHot, FaCalendarAlt } from 'react-icons/fa'; // Icons for hotness level and bottling date

function HotSauceDetails() {
  const { id } = useParams();
  const sauce = Object.values(hotSauceData)[id];

  if (!sauce) {
    return <p className="text-center text-red-500">Hot sauce not found!</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{sauce.name}</h1>
        
        <div className="flex justify-center mb-6">
          <img
            src={`https://raw.githubusercontent.com/louispaulet/menu_display_2/main/sauce_pictures/${encodeURIComponent(sauce.name.replace(/ /g, '_'))}.jpg`}
            alt={`${sauce.name}`}
            className="w-full max-w-sm h-auto rounded-lg shadow-md"
          />
        </div>
        
        <div className="mb-4">
          <p className="flex items-center text-gray-700 text-lg mb-2">
            <FaPepperHot className="text-red-500 mr-2" /> 
            <span className="font-semibold">Hotness Level: &nbsp; </span> {sauce.hotness_level}/10
          </p>
          <p className="flex items-center text-gray-700 text-lg mb-2">
            <FaCalendarAlt className="text-blue-500 mr-2" /> 
            <span className="font-semibold">Bottling Date: &nbsp; </span> {sauce.bottling_date}
          </p>
        </div>
        
        <p className="text-gray-600 leading-relaxed text-justify">{sauce.description}</p>
      </div>
    </div>
  );
}

export default HotSauceDetails;
