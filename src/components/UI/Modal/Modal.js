import React, { Component } from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    // IMPROVEMENT: OrderSummary is not being re-rendered every time an ingredient is added
    // We only return true if show changed
    // We don't use PureComponent because it would run also modalclosed 
    // nextProps.children !== this.props.children; => for the spinner to take effect.
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    // componentWillUpdate() {
    //     console.log('[Modal] WillUpdate');
    // }

    render() {
        return (
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className={styles.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1': '0'
                }}
            >
                {this.props.children}
            </div>
        </Aux>
        );
    }
};

export default Modal;