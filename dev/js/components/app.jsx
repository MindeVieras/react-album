// import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';

require('../../scss/app/main.scss');

const App = () => (
  <div>
    <div className="app-content" id="app-container">
      <Header />
      <div id="app-content">
        cc
      </div>
      <Footer />
    </div>
  </div>
);

export default App;
