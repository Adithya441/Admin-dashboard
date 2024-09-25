import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from 'contexts/context';
// project-import
import renderRoutes, { routes } from './routes';

// ==============================|| APP ||============================== //

const App = () => {
  const [username, setUsername] = useState('null');
  return (
  <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
    <UserContext.Provider value={{ username, setUsername }}>
    {renderRoutes(routes)}
    </UserContext.Provider>
  </BrowserRouter>
  
  );
};

export default App;
