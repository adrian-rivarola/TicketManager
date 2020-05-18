import React from 'react';

const Header = ({titulo, icono, loading}) => {
	
	const TITUlO = (
	  <div className="ui horizontal divider">
	    <h4 className="ui header">
	      <i aria-hidden="true" className={`${icono} icon`}></i>
	      {titulo}
	    </h4>
	  </div>
	);

	return loading 
		? <div className="ui loading raised segment">{ TITUlO }</div> 
		: TITUlO
}

export default Header;