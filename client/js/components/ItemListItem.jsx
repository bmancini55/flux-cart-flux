
let React       = require('react');
let CartActions = require('../actions/CartActions');

let ItemListItem = React.createClass({

  render: function() {
    let item = this.props.item;
    return (
      <div className="shop-item col-md-3 col-sm-4 col-xs-6">
        <img className="img-responsive item-img" src={item.imagePath} />
        <h3 className="shop-item-title">{item.title}</h3>
        <p className="shop-item-subtitle">{item.publisher}</p>
        <button onClick={this.addToCart}>Add to Cart</button>
      </div>
    );
  },

  addToCart: function() {
    let item = this.props.item;
    CartActions.addItem(item);
  }

});

module.exports = ItemListItem;
