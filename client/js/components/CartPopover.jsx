
let React     = require('react');
let CartStore = require('../stores/CartStore.js');
let CartList  = require('./CartList.jsx');
let Bootstrap = require('react-bootstrap');


let CartPopover = React.createClass({

  componentDidMount: function() {
    CartStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    CartStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    let state = this.mergeStoreState(this.state);
    this.setState(state);
  },

  mergeStoreState: function(currentState) {
    let storeState = CartStore.getState();
    return Object.assign(currentState, {
      cart: storeState
    });
  },

  getInitialState: function () {
    return this.mergeStoreState({
      show: false,
      target: null
    });
  },

  toggle: function() {
    this.setState({
      show: !this.state.show
    });
  },

  render: function() {
    let cart = this.state.cart;
    let { Overlay } = Bootstrap;

    return (
        <div>
          <div onClick={this.toggle} ref='target'>
            <span className="glyphicon glyphicon-shopping-cart"></span>
            <span>&nbsp;</span>
            <span>{cart.qty} items</span>
          </div>
          <Overlay
            show={this.state.show}
            onHide={() => this.setState({ show: false })}
            target={() => React.findDOMNode(this.refs.target)}
            container={this}
            placement='bottom'
            rootClose={true}
          >
            <div className="cart-popover">
              <div className="cart-popover-title">Shopping Cart</div>
              <div className="cart-popover-content">
                <CartList cart={cart} />
              </div>
              <div className="cart-popover-footer">
                {() => {
                  if(cart.qty > 0) {
                    return <p>Subtotal: ${cart.subtotal}</p>;
                  }
                  else return '';
                }()}
              </div>
            </div>
          </Overlay>
        </div>
    );
  }

});


module.exports = CartPopover;
