import React from 'react';

type CardProps = {
    name: string;
    agency: string;
    image: string;
    wikipedia: string;
    status: string;
}

const CrewCard: React.FC<CardProps> = ({ name, agency, image, wikipedia, status }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden bg-cyan-800">
      <h1 className="text-center font-semibold text-xl text-black">Name: {name}</h1>
        <h2 className="text-center font-semibold text-xl text-black">Agency: {agency}</h2>
        <h3 className="text-center font-semibold text-xl text-black">Status: {status}</h3>
      <img className="w-full h-40 object-cover" src={image} />
      <div className="py-5 text-center mb-6">
      <a href={wikipedia} className="text-blue-500 mb-4" target="_blank" rel="noopener noreferrer">
        Wikipedia
      </a>
      </div>
    </div>
  );
};

export default CrewCard