let CartStore = require('./CartStore');
let ItemStore = require('./ItemStore');


module.exports = {
  CartStore: new CartStore(),
  ItemStore: new ItemStore()
};
