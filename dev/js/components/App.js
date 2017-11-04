import React from 'react';
// import Header from '../containers/header';
import PageList from '../containers/page-list';
import PageContent from '../containers/page-content';
require('../../scss/style.scss');

const App = () => (
    <div>

      <h2>Page list</h2>
      <PageList />
      <hr />
      <h2>Page content</h2>
      <PageContent />
    </div>
);

export default App;
