import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#fff' }}>
      <h1 style={{ color: '#fff' }}>Hello world</h1>
      <Button component={Link} to="/weather" variant="contained" color="primary">
        Go to Weather Page
      </Button>
    </div>
  );
};

export default HomePage;
