'use strict';
var React = require('react');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var WidthProvider = require('react-grid-layout').WidthProvider;
var ReactGridLayout = require('react-grid-layout');
ReactGridLayout = WidthProvider(ReactGridLayout);

var DynamicMinMaxLayout = React.createClass({
	mixins: [PureRenderMixin],

	getDefaultProps(){
		return {
			isDraggable: true,
			isResizeable: true,
			items: 20,
			rowHeight: 30,
			onLayoutChange: function(){},
			cols: 12,
			// No Vertical Compacting (Free Movement)
			VerticalCompact: false
		};
	},

	getInitialState(){
		return {};
	},

	generateDOM(){
		var layout = this.generateLayout();
		return _.map(layout, function(l){
			return (
				<div key={l.i} data-grid={l}>
					<span className="text">{l.i}</span>
				</div>
			);
		});
	},

	generateLayout(){
		var p = this.props;
		var arr = new Array(p.items); // 20
		return _.map(arr, function(item, i){
			var w = _.random(1, 2);
			var h = _.random(1, 3);
			return {
				x: i * 2 % 12,
				y: Math.floor(i / 6),
				w: w,
				h: h,
				i: i.toString()
			};
		});
	},

	onLayoutChange(){
		this.props.onLayoutChange(layout);
	},

	onResize(layout, oldLayoutItem, layoutItem, placeholder, e){
		// `oldLayoutItem` contains the state of the item before the resize.
    	// You can modify `layoutItem` to enforce constraints.
		if (layoutItem.h < 3 && layoutItem.w > 2)
		{
			layoutItem.w  = 2;
			placeholder.w = 2;
		}

		if (layoutItem.h >= 3 && layoutItem.w < 2)
		{
			layoutItem.w  = 2;
			placeholder.w = 2;
		}
	},

	render(){
		return(
			<ReactGridLayout onLayoutChange={this.onLayoutChange} onResize={this.onResize} {...this.props}>
				{this.generateDOM()}
			</ReactGridLayout>
		);
	}
});

module.exports = DynamicMinMaxLayout;