import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JokesGenerator = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
      setJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Oops! Couldn't fetch a joke.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500">
      <div className="bg-white p-10 rounded-xl shadow-lg max-w-2xl w-full text-center transition-transform duration-300 transform hover:scale-105">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6">🎉 Joke Generator 🎉</h1>
        {loading ? (
          <p className="text-gray-500 text-lg animate-pulse">Loading...</p>
        ) : (
          <p className="text-gray-800 text-lg italic mb-6">{joke}</p>
        )}
        <button
          onClick={fetchJoke}
          className="mt-4 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-200 shadow-lg"
        >
          Get a New Joke
        </button>
      </div>
    </div>
  );
};

export default JokesGenerator;
