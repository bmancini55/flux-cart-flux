
let _            = require('lodash');
let EventEmitter = require('events').EventEmitter;
let dispatcher   = require('../dispatcher');


let CartStore = Object.assign({}, EventEmitter.prototype, {

  initialize: function() {
    this.items = {};

    dispatcher.register((action) => {
      switch(action.actionType) {
        case 'cart_add_item':
          let { item } = action.payload;
          this.onAddItem(item);
          break;
        case 'cart_remove_item':
          let { id } = action.payload;
          this.onRemoveItem(id);
          break;
        case 'cart_update_qty':
          this.onUpdateQty(action.payload);
          break;
      }
    });
  },

  addChangeListener: function (callback) {
    this.on('change', callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  getQty: function() {
    var items = _.values(this.items);
    return items
      .map((item) => parseInt(item.qty) || 0)
      .reduce((pre, cur) => pre + cur, 0);
  },

  getSubTotal: function() {
    let items = _.values(this.items);
    return items
      .map((item) => (parseInt(item.qty) || 0) * item.price)
      .reduce((pre, cur) => pre + cur, 0);
  },

  onAddItem: function(item) {
    if(!this.items[item.id]) {
      this.items[item.id] = item;
    }

    if(!this.items[item.id].qty) {
      this.items[item.id].qty = 0;
    }

    this.items[item.id].qty += 1;
    this.emit('change');
  },

  onRemoveItem: function(id) {
    delete this.items[id];
    this.emit('change');
  },

  onUpdateQty: function({ id, qty }) {
    let item = this.items[id];
    item.qtyInvalid = isNaN(parseInt(qty));
    item.qty        = qty;
    this.emit('change');
  },

  getState: function() {
    return {
      items: this.items,
      qty: this.getQty(),
      subtotal: this.getSubTotal()
    };
  }

});

CartStore.initialize();
module.exports = CartStore;
