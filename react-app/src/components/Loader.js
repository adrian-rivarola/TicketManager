import React from 'react';
import Header from './Header';

const Loader = props => (
  <div className="ui loading raised segment">
    <Header {...props} />
  </div>
);

export default Loader;