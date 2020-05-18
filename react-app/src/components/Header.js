import React from 'react';

const Header = ({titulo, icono}) => (
  <div className="ui horizontal divider">
    <h4 className="ui header">
      <i aria-hidden="true" className={`${icono} icon`}></i>
      {titulo}
    </h4>
  </div>
);

export default Header;