import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Converted to a class to define the handler methods
class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // DON'T USE state when changing state
        // this.setState({showSideDrawer: !this.state.showSideDrawer});
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render() {
        return (
            <Aux>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler} />
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

export default Layout;