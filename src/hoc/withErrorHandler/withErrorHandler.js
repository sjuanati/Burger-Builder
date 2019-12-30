import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        constructor(props) {
            super(props);

            this.state = {
                error: null
            }

            // Creation of state variables on the fly. This is used to remove them in componentWillUnmount()
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        // To prevent memory leaks with interceptors. (clean up interceptors)
        componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        // state = {
        //     error: null
        // }

        // componentDidMount OK for post requests, but KO for Component Lifecycle (ex: getting ingredients)
        // Solution: use ComponentWillMount instead of componentDidMount
        // In fact, ComponentWillMount will be removed. Solution2: do it in Constructor.
        //componentDidMount() {
        // componentWillMount() {
        //     // Clear any errors when I send the request
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         return req;
        //     })
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({error: error});
        //     });
        // }

        // Also clear the error when clicking the modal
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
            </Aux>
            )
        }
    }
}

export default withErrorHandler;