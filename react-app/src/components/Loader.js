import React from 'react';

const Loader = props => (
  <div className="ui loading raised segment">
    <div className="ui horizontal divider">
      <h4 className="ui header">
        <i aria-hidden="true" className={`${props.icon} icon`}></i>
        {props.titulo}
      </h4>
    </div>
  </div>
);

export default Loader;