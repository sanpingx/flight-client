import React from 'react';
import Routes from './Routes';
import toast, { Toaster } from 'react-hot-toast';


const App: React.FC = () => {
  return (
      <>
      <Routes />
      <Toaster />
      </>
  );
};

export default App;
