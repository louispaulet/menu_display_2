import { Link } from 'react-router-dom';
import { FaFireAlt, FaPepperHot } from 'react-icons/fa';  // Icons for hotness and sauce

function HotSaucePreview({ name, hotnessLevel, bottlingDate, description, id }) {
  const baseImageUrl = "https://raw.githubusercontent.com/louispaulet/menu_display_2/main/sauce_pictures/";  // Replace with your actual image URL path

  const generateImageUrl = (name) => {
    const nameEncoded = encodeURIComponent(name.replace(/ /g, '_'));
    return `${baseImageUrl}${nameEncoded}.jpg`;
  };

  return (
    <Link to={`/hot-sauce/${id}`} className="block bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex justify-center md:justify-start">
        <img
          src={generateImageUrl(name)}
          alt={`${name} image`}
          className="w-full max-w-md h-auto rounded-lg"
        />
      </div>
      <h2 className="text-3xl my-2 text-center font-playfair">{name}</h2>
      <p className="text-gray-600 mb-2 flex items-center">
        <FaPepperHot className="mr-2" /> Hotness Level: {hotnessLevel}/10
      </p>
      <p className="text-gray-600 mb-2">
        Bottling Date: {bottlingDate}
      </p>
      <p className="text-gray-600">
        {description.slice(0, 100)}... {/* Show a snippet of the description */}
      </p>
    </Link>
  );
}

export default HotSaucePreview;
