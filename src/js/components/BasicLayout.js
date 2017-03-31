'use strict';
var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var WidthProvider = require('react-grid-layout').WidthProvider;
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
ResponsiveReactGridLayout = WidthProvider(ResponsiveReactGridLayout);


var BasicLayout = React.createClass({
  mixins: [PureRenderMixin],

  propTypes: {
    onLayoutChange: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      className: "layout",
      onLayoutChange: function() {},
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
      rowHeight: 100
    };
  },

  getInitialState: function() {
    // var layout = this.generateLayout();
    // return {
    //   layout: layout
    // };
    return{
      items: [0,1,2,3,4].map(function(i, key, list){
        return {
          i: i.toString(),
          x: i*2,
          y: 0,
          w: 2,
          h: 2,
          add: i === (list.length -1).toString()
        }
      }),
      newCounter: 0
    };
  },

  // generateDOM() {
  //   return _.map(_.range(this.props.items), function(i) {
  //     return (<div key={i}><span className="text">{i}</span></div>);
  //   });
  // },

  // generateLayout() {
  //   var p = this.props;
  //   return _.map(new Array(p.items), function(item, i) {
  //     var y = _.result(p, 'y') || Math.ceil(Math.random() * 4) + 1;
  //     return {x: i * 2 % 12, y: Math.floor(i / 6) * y, w: 2, h: y, i: i.toString()};
  //   });
  // },

  onLayoutChange: function(layout) {
    this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  },

  onBreakpointChange: function(breakpoint, cols){
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  },

  onAddItem: function(){
    console.log("adding" , 'n' + this.state.newCounter);
    this.setState({
      items: this.state.items.concat({
        i: 'n' + this.state.newCounter,
        x: this.state.items.length * 2 % (this.state.cols || 12),
        y: Infinity,
        w: 2,
        h: 2
      }),
      newCounter: this.state.newCounter + 1
    });
  },

  createElement: function(el){
    var removeStyle = {
      position: 'absolute',
      right: '2px',
      top: 0,
      cursor: 'pointer'
    };
    var i = el.add ? '+' : el.i;
    return(
      <div key={i} data-grid={el}>
        {
          el.add ?
            <span className="add text" onClick={this.onAddItem} title="you can add here"> Add +</span>
            : <span className="text">{i}</span>
        }
        <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)}> x </span>
      </div>
    );
  },

  onRemoveItem: function(i){
    this.setState({items: _.reject(this.state.items, {i: i})});
  },

  render: function() {
    return (
      <div>
        <button onClick = { this.onAddItem }>Add Item</button>
        <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}
          {...this.props}>

          {_.map(this.state.items, this.createElement)}          
        </ResponsiveReactGridLayout>
      </div>
    );
  }
});

module.exports = BasicLayout;

// if (require.main !== module) {
//   console.log("hi");
//   require('../client.jsx')(module.exports);
// }