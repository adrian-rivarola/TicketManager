import React from 'react';
import { FormattedMessage } from "react-intl";

const Header = ({titulo, icono, loading}) => {
	
	const TITULO = (
	  <div className="ui horizontal divider">
	    <h4 className="ui header">
	      <i aria-hidden="true" className={`${icono} icon`}></i>
	      <FormattedMessage 
	      	id={titulo}
	      	defaultMessage={titulo} />
	    </h4>
	  </div>
	);

	return loading 
		? <div className="ui loading raised segment fh">{ TITULO }</div> 
		: TITULO
}

export default Header;