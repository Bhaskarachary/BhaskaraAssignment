import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './input.css';

/**
 * Input field allow users to enter single line text.
 * Input text supports all html5 behaviour and attributes depending upon browser support of html5.
 */
export default class Input extends Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
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
			<div className={style.form}>
                <label className={style.label}>{this.props.label}</label>
                <input {...otherProps} className={style.input +' '+style[this.props.type]}
					   onChange={(ev)=>{this.handleChange(ev)}} />
			</div>
		);
	}
}

Input.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	onChange: PropTypes.func
};

Input.defaultProps = {
    type: 'full'
};
