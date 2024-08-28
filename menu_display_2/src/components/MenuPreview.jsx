// src/components/MenuPreview.jsx

function MenuPreview({ restaurantName, chefName, location, numberOfCourses, totalPrice }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2">{restaurantName}</h2>
      <p className="text-gray-600 mb-2"><strong>Chef:</strong> {chefName}</p>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {location}</p>
      <p className="text-gray-600 mb-2"><strong>Courses:</strong> {numberOfCourses}</p>
      <p className="text-gray-600"><strong>Total Price:</strong> ${totalPrice}</p>
    </div>
  );
}

export default MenuPreview;
