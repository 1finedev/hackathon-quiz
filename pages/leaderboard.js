import { useState, useEffect } from 'react';
import data from '../components/Layout/database';

function Leaderboard() {
  const [people, setPeople] = useState(data);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // fetch data from API or JSON file
    setPeople(data);
  }, []);

  const filterPeople = (value) => {
    setFilter(value);

    if (value === 'thisWeek') {
      const filteredData = data.filter(person => person.score >= 50);
      setPeople(filteredData);
    } else if (value === 'thisMonth') {
      const filteredData = data.filter(person => person.score >= 70);
      setPeople(filteredData);
    } else {
      setPeople(data);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* buttons */}
      <div className="flex justify-center space-x-4 my-4">
        <button className={`py-2 px-4 rounded-md ${filter === 'thisWeek' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white'}`} onClick={() => filterPeople('thisWeek')}>
          This Week
        </button>
        <button className={`py-2 px-4 rounded-md ${filter === 'thisMonth' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white'}`} onClick={() => filterPeople('thisMonth')}>
          This Month
        </button>
        <button className={`py-2 px-4 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500 hover:bg-blue-500 hover:text-white'}`} onClick={() => filterPeople('all')}>
          All Time
        </button>
      </div>

      {/* wall of fame */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {people.map(person => (
          <div key={person.id} className="bg-white rounded-md p-4">
            {/* person info */}
            <h2 className="text-lg font-bold text-blue-500 mb-2">{person.name}</h2>
            <p className="text-gray-500 mb-2">{person.position}</p>
            <p className="text-blue-500 font-bold text-xl">{person.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;



