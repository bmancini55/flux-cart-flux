
let dispatcher = require('../dispatcher');

// cart_add_item
// cart_remove_item
// cart_update_qty

module.exports = {
  addItem: function(item) {
    dispatcher.dispatch({
      actionType: 'cart_add_item',
      payload: {
        item: item
      }
    });
  },

  removeItem: function(id) {
    dispatcher.dispatch({
      actionType: 'cart_remove_item',
      payload: {
        id: id
      }
    });
  },

  updateQty: function(id, qty) {
    dispatcher.dispatch({
      actionType: 'cart_update_qty',
      payload: {
        id: id,
        qty: qty
      }
    });
  }
};
