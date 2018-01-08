import React, {Fragment} from 'react';
import is from 'prop-types';



export default class AdminDropdownMenu extends React.PureComponent{
	static propTypes = {
		className: is.string,
		deleteHandler: is.func
	}

	state = {menuOpen: false}

	render() {

		return(
			<div className={`adminDropdownButton ${this.props.className ? this.props.className : ''}`}
				onClick={()=>this.setState({menuOpen: !this.state.menuOpen})}
				onBlur={()=>this.setState({menuOpen: false})}
				tabIndex="0">
					Admin

					{this.state.menuOpen &&
						<div className="adminDropdownMenu">
							{this.props.deleteHandler && <div onClick={this.props.deleteHandler}>Delete</div>}
							<div onClick={()=>console.log('some admin function')}>Some Action</div>
						</div>}
			</div>
		);
	}
}