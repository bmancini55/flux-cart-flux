
let React        = require('react');
let ItemListItem = require('./ItemListItem.jsx');
let ItemStore    = require('../stores/ItemStore');
let ItemActions  = require('../actions/ItemActions');


let ItemList = React.createClass({

  componentDidMount: function() {
    ItemStore.addChangeListener(this.onChange);
    ItemActions.loadItems();
  },

  componentWillUnmount: function() {
    ItemStore.removeChangeListener(this.onChange);
  },

  onChange: function() {
    let state = this.mergeStoreState(this.state);
    this.setState(state);
  },

  mergeStoreState: function(state) {
    let storeState = ItemStore.getState();
    return Object.assign(state, {
      items: storeState
    });
  },

  getInitialState: function() {
    return this.mergeStoreState({});
  },

  render: function() {
    let items = this.state.items.items;
    return (
      <div className="row shop-item-list">
        {
          Object.keys(items).map((key, idx) => {
            let results = [];
            results.push(<ItemListItem item={items[key]} />);

            if (idx % 2 === 1)
              results.push(<div className="clearfix visible-xs"></div>);

            if (idx % 3 === 2)
              results.push(<div className="clearfix visible-sm"></div>);

            if (idx % 4 === 3)
              results.push(<div className="clearfix visible-md"></div>);

            return results;
          })
        }
      </div>
    );
  }

});

module.exports = ItemList;
