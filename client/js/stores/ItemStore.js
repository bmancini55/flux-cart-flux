
let EventEmitter = require('events').EventEmitter;
let _            = require('lodash');
let dispatcher   = require('../dispatcher');

let ItemStore = Object.assign({}, EventEmitter.prototype, {

  initialize: function() {
    this.items = {};

    dispatcher.register((action) => {
      switch(action.actionType) {
        case 'items_load_success':
          this.onItemsLoaded(action.payload);
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

  onItemsLoaded: function({ items }) {
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
