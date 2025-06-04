import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa";
import DogCard from "./DogCard"; 

interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}
interface Match {
  match: string;
}

const Body: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [from, setFrom] = useState(0);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [total, setTotal] = useState(0);
  const [favorites, setFavorites] = useState<Map<string, Dog>>(new Map());
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          { withCredentials: true }
        );
        setBreeds(res?.data);
      } catch (err) {
        console.error("Error fetching breeds", err);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      if (selectedBreeds.length === 0) {
        setDogs([]);
        return;
      }

      try {
        const searchParams = new URLSearchParams();
        selectedBreeds.forEach((breed) =>
          searchParams.append("breeds", breed)
        );
        searchParams.append("sort", `breed:${sortOrder}`);
        searchParams.append("size", "24");
        searchParams.append("from", from.toString());

        const res1 = await axios.get(
          `https://frontend-take-home-service.fetch.com/dogs/search?${searchParams.toString()}`,
          { withCredentials: true }
        );

        const ids: string[] = res1?.data?.resultIds;
        setTotal(res1?.data?.total);

        const res2 = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          ids,
          { withCredentials: true }
        );
        setDogs(res2?.data);
      } catch (err) {
        console.error("Error fetching dogs", err);
      }
    };

    fetchDogs();
  }, [selectedBreeds, sortOrder, from]);

  const handleBreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFrom(0);
    setSelectedBreeds((prev) =>
      checked ? [...prev, value] : prev.filter((b) => b !== value)
    );
  };

  const toggleFavorite = (dog: Dog) => {
    setFavorites((prev) => {
      const newMap = new Map(prev);
      if (newMap.has(dog.id)) {
        newMap.delete(dog.id);
      } else {
        newMap.set(dog.id, dog);
      }
      return newMap;
    });
  };

  const handleMatch = async () => {
    const favoriteIds = Array.from(favorites.keys());
    if (favoriteIds.length === 0) return;
    try {
      const res = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favoriteIds,
        { withCredentials: true }
      );
      setMatch(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Filter Section */}
      <div className="w-full md:w-1/5 bg-red-200 border-b md:border-b-0 md:border-r border-red-300 p-4">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Filters</h2>
        <label className="block mb-2 text-red-600 font-medium">
          Select Breeds:
        </label>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {breeds.map((breed) => (
            <label key={breed} className="block text-red-700">
              <input
                type="checkbox"
                value={breed}
                checked={selectedBreeds.includes(breed)}
                onChange={handleBreedChange}
                className="mr-2"
              />
              {breed}
            </label>
          ))}
        </div>
        <label className="block mt-4 text-red-600 font-medium">
          Favourite List:
        </label>
        <div className="max-h-96 overflow-y-auto space-y-2">
          {Array.from(favorites.entries()).map(([id, dog]) => (
            <label key={id} className="block text-red-700">
              <input
                type="checkbox"
                checked={true}
                onChange={() => toggleFavorite(dog)}
                className="mr-2"
              />
              {dog.name}
            </label>
          ))}
        </div>
        <button
          onClick={handleMatch}
          className="px-4 py-2 mt-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-200"
        >
          Find a Match
        </button>
      </div>

      {/* Dog Cards Section */}
      <div className="w-full md:w-4/5 bg-red-50 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <div>
            <label className="mr-2 font-medium text-red-700">
              Sort by Breed:
            </label>
            <select
              value={sortOrder}
              onChange={(e) => {
                setFrom(0);
                setSortOrder(e.target.value as "asc" | "desc");
              }}
              className="border border-red-300 rounded px-2 py-1 bg-red-500 text-white"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <button
              onClick={() => setFrom((prev) => Math.max(prev - 24, 0))}
              disabled={from === 0}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-200"
            >
              Prev
            </button>
            <button
              onClick={() => {
                const next = from + 24;
                if (next < total) setFrom(next);
              }}
              disabled={from + 24 >= total}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-200"
            >
              Next
            </button>
            <button
              onClick={() => {
                setSelectedBreeds([]);
                setFavorites(new Map());
                setMatch(null);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              isFavorite={favorites.has(dog.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>

      {/* Modal for a matched dog */}
      {match && favorites.has(match.match) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-100 bg-opacity-50">
          <div className="relative bg-white border-2 border-red-500 rounded-2xl shadow-2xl w-[90%] max-w-md p-6">
            <button
              onClick={() => setMatch(null)}
              className="absolute top-2 right-2 text-red-600 text-xl font-bold hover:text-red-800"
            >
              ✕
            </button>
            <DogCard
              dog={favorites.get(match.match)!}
              isFavorite={favorites.has(match.match)}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Body;
