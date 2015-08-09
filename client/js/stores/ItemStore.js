
let _            = require('lodash');
let EventEmitter = require('events').EventEmitter;
let dispatcher   = require('../dispatcher');

let ItemStore = Object.assign({}, EventEmitter.prototype, {

  initialize: function() {
    this.items = {};

    dispatcher.register((action) => {
      switch(action.actionType) {
        case 'items_load_success':
          let { items } = action.payload;
          this.onItemsLoaded(items);
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

  onItemsLoaded: function(items) {
    this.items = _.indexBy(items, 'id');
    this.emit('change');
  },

  getState: function() {
    return {
      items: this.items
    };
  }

});

ItemStore.initialize();
module.exports = ItemStore;
