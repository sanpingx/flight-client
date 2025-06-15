import React from 'react';
import { Toaster } from 'react-hot-toast';
import Routes from './Routes';


const App: React.FC = () => {
  return (
      <>
      {/* <AuthProvider> */}
      <Routes />
      <Toaster />
      {/* </AuthProvider> */}
      </>
  );
};

export default App;
