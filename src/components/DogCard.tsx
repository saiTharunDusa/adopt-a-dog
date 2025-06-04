// components/DogCard.tsx
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

interface Props {
  dog: Dog;
  isFavorite: boolean;
  locationInfo : Map<string, string[]>;
  onToggleFavorite: (dog: Dog) => void;
}

{/** Reusable Dog Card for displaying cards and modal for a matching card. */}
const DogCard: React.FC<Props> = ({ dog, isFavorite, locationInfo, onToggleFavorite }) => {
  return (
    <div className="relative p-4 bg-white border border-red-200 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow flex flex-col">
      <img
        src={dog.img}
        alt={dog.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-bold text-red-800">{dog.name}</h3>
      <p className="text-red-700">🐶 Breed: {dog.breed}</p>
      <p className="text-red-700">🎂 Age: {dog.age}</p>
      {locationInfo.has(dog.zip_code) && (
        <div className="text-red-700 leading-snug pt-2">
          <p>📍 {locationInfo.get(dog.zip_code)?.[2]}, {locationInfo.get(dog.zip_code)?.[0]}, {locationInfo.get(dog.zip_code)?.[1]} {dog.zip_code}</p>
          <p>🌍 Lat: {locationInfo.get(dog.zip_code)?.[3]}, Lon: {locationInfo.get(dog.zip_code)?.[4]}</p>
        </div>
      )}

      

      <div className="flex justify-end mt-auto pt-4">
        <button onClick={() => onToggleFavorite(dog)} className="text-xl">
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400 hover:text-red-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default DogCard;
