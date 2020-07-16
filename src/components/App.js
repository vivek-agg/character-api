import React from 'react';
import '../styles/styles.scss';
import Characters from './Characters/Characters';
import Header from './Header';
// import Home from './Home';

const App = () => {
  return (
    <>
      <Header />
      {/* <Home /> */}
      <Characters />
    </>
  );
};

export default App;
