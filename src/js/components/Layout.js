import React from "react";

// var ReactGridLayout = require('react-grid-layout');

// var MyFirstGrid = React.createClass({
//   render: function() {
//     // layout is an array of objects, see the demo for more complete usage
//     var layout = [
//       {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
//       {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
//       {i: 'c', x: 4, y: 0, w: 1, h: 2}
//     ];
//     return (
//       <ReactGridLayout className="layout" layout={layout} cols={6} rowHeight={50} width={1200}>
//         <div key={'a'}>a</div>
//         <div key={'b'}>b</div>
//         <div key={'c'}>c</div>
//       </ReactGridLayout>
//     )
//   }
// });

// export default MyFirstGrid;

//**************RESPONSIVE******//

var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;

var MyFirstGrid = React.createClass({
    render: function() {
      var layouts = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ];
      // var layouts = getLayoutsFromSomewhere();
      return (
        <ResponsiveReactGridLayout className="layout" layouts={layouts}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 120, md: 100, sm: 60, xs: 40, xxs: 20}}>
          <div key={"a"}>1</div>
          <div key={"b"}>2</div>
          <div key={"c"}>3</div>
        </ResponsiveReactGridLayout>
      )
    }
})

export default MyFirstGrid;


