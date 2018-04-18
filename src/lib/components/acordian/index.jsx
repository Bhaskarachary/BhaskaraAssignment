import React from 'react';
import AccordionHeader from './header';
import AccordionBody from './body';
import AccordionHeaderList from './header/list';
import AccordionBodyList from './body/list';
import style from './acordian.css';

/**
 * Accordion are a great way to allow the user to switch between several blocks that are full screen.
 */
export default class Accordion extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            currentItem: props.active || 0
        };
        this.ctx = {
            onChange: this.onChange
        };

        this.headerClick = this.headerClick.bind(this);
    }

    onChange(item) {
        console.log('onChange: ', item);
    }

    headerClick(e, onActivation, index){
        e.stopPropagation();
        e.preventDefault();
        if(this.state.currentItem === index) return false;
        let handled = null;
        if (onActivation) {
            handled = onActivation(index, this.state.currentItem);
        }
        if (handled) {
            e.preventDefault();
        } else {
            this.setState({currentItem: parseInt(index, 10)});
        }
    }

    componentWillReceiveProps(nextProps){
        this.props.active !== nextProps.active && this.setState({currentItem:nextProps.active});
    }

    render() {
        if(this.props.children.length !== 2) return null;

        const AccordionHeaderListTag = this.props.children[0];
        const AccordionBodyListTag = this.props.children[1];
        let bodyArr = React.Children.toArray(AccordionBodyListTag.props.children);

        return (AccordionHeaderListTag.type === AccordionHeaderList && AccordionBodyListTag.type === AccordionBodyList ? (<div className={style.container}>
            {
                React.Children.toArray(AccordionHeaderListTag.props.children).map((Header, i) => (Header.type === AccordionHeader ? (
                        <div key={i}>
                            <button className={ [
                                style.header, this.state.currentItem === i ? style.active: '','flex'
                            ].join(' ') } onClick={evnt => { this.headerClick(evnt, Header.props.onActivation, i) }} >

                                <div>{i+1}</div>
                                <div>{Header}</div>
                                <div>{this.state.currentItem === i?"-":"+"}</div>

                            </button>
                            <div className={[style.body,this.state.currentItem !== i?style.pad0:''].join(" ")}>
                                {
                                    this.state.currentItem === i && bodyArr[i] && bodyArr[i].type === AccordionBody ? (<div className={`width100 ${(this.state.currentItem === i) ? '': 'display-none'}`}> {bodyArr[i]} </div>) : null
                                }
                            </div>
                        </div>
                    ) : null)
                )
            }
        </div>):null);
    }

};
