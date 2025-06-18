import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AwardsPage = () => {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const res = await api.get('/awards');
        setAwards(res.data);
      } catch (err) {
        console.error('Error fetching awards:', err.message);
      }
    };

    fetchAwards();
  }, []);

  return (
    <div>
      <h1>Awards</h1>
      <ul>
        {awards.map((award) => (
          <li key={award.id}>{award.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AwardsPage;
