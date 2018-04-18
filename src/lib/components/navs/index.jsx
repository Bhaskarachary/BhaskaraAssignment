import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './navs.css';

/**
 * Navs is list of clickable items.
 */
export default class Navs extends Component {
	constructor(props){
		super(props);
	}
	handleChange(ev){
		let e = ev || event;
		this.props.onChange(e.target.value)
	}
	render () {
		const {
			...otherProps
		} = this.props;

		return (
			<div>
				{
					this.props.items.map((i,ind)=>{
                        return <div className={[style.navs+' '+(ind===this.props.active?style.active:'')]} onClick={()=>this.props.onClick(i)}>{i}</div>
					})
				}
			</div>
		);
	}
}

Navs.propTypes = {
    items: PropTypes.array,
	active:PropTypes.number,
    onClick: PropTypes.func
};

Navs.defaultProps = {
    items: [],
    active:0
};
