
var React = require('react');

var CartItem = require('./CartItem.jsx');
var CartList = React.createClass({

  propTypes: {
    cart: React.PropTypes.object.isRequired
  },

  render: function() {
    var items = this.props.cart.items;
    return (
      <div className="cart-items">
        {() => {
          let results = [];
          let keys    = Object.keys(items);

          if(keys.length === 0)
            results.push(<p>No items in cart</p>);
          else
            results = keys.map((id) => <CartItem key={id} item={items[id]} />);

          return results;
        }()}
      </div>
    );
  }

});

module.exports = CartList;
