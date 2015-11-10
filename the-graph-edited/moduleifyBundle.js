(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by twi18192 on 27/10/15.
 */


//(function(){
//
//    console.log(require.bind(window, './the-graph-edited.js'));
//
//    require('./the-graph-edited.js');
//    for(var key in require.bind(null,'./the-graph-edited.js')){
//        console.log(key);
//        console.log(require('./the-graph-edited.js')[key])
//    }
//
//    console.log(module.exports);
//    console.log(typeof module.exports);
//    console.log(typeof require('./the-graph-edited.js'));
//    console.log(typeof require.bind(null, './the-graph-edited.js').bind(window, null));
//
//    //require.bind(window, './the-graph-edited.js');
//
//    //require('./the-graph-edited.js').bind(window, null);
//    console.log(require.bind(null, './the-graph-edited.js').bind(window, null));
//
//    require.bind(this, './the-graph-edited.js').bind(window, null);
//
//
//    console.log(module.exports);
//
//    //require.bind(null, './font-awesome-unicode-map-edited.js').bind(window, null);
//
//    //require('./the-graph-app-edited.js');
//    //require('./the-graph-graph-edited.js');
//    //require('./the-graph-node-edited.js');
//    //require('./the-graph-node-menu-edited.js');
//    //require('./the-graph-node-menu-port-edited.js');
//    //require('./the-graph-node-menu-ports-edited.js');
//    //require('./the-graph-port-edited.js');
//    //require('./the-graph-edge-edited.js');
//    //require('./the-graph-iip-edited.js');
//    //require('./the-graph-group-edited.js');
//    //require('./the-graph-tooltip-edited.js');
//    //require('./the-graph-menu-edited.js');
//    //require('./the-graph-clipboard-edited.js');
//
//    console.log("here's this in getAllJSFiles:");
//    console.log(this);
//    //console.log(context);
//    console.log(window);
//
//})();

//var test = (function(Module){
//    console.log(Module)
//
//})(require('./the-graph-edited.js')).call(window);



/* For use with exports, NOT module.exports

var context = window;
//var test = require('./the-graph-edited.js');
var TheGraph = context.TheGraph = require('./the-graph-edited.js').TheGraph;

//var TheGraph = context.TheGraph = test.TheGraph;
console.log(TheGraph);
console.log(context.TheGraph);

//console.log(Testing);

//console.log(test);
//console.log(typeof test);
//console.log(test.TheGraph);
//console.log(test.TheGraph.SVGImage);
console.log(require('./the-graph-app-edited.js'));
var test2 = require('./the-graph-app-edited.js');
*/

console.log("here's 'this' in 'getAllJSFiles:'");
console.log(this);

/* 'this' inside this file refers to an empty object; binding 'window' to be 'this' allows
console.log(this) to return the window, thus changing the value of 'this' inside the defined function 'check()'
 */

var check = function(){
    console.log(this)
}.bind(window);
console.log("now 'this' should be window");
check(this);


/* Potential solution where you remove var TheGraph = context.TheGraph from
every JS file apart from graph-edited


var TheGraph = require('./the-graph-edited.js').TheGraph;
window.TheGraph = TheGraph;
require('./the-graph-app-edited.js');

*/



//var Try = require('./the-graph-edited');
//console.log(Try);
//var TheGraph = Try.TheGraph;
//console.log(TheGraph);
//window.TheGraph = TheGraph;
//
//var context = this;
//context.TheGraph = TheGraph;

//var appEdited = require('./the-graph-app-edited.js');
//console.log(require('./the-graph-app-edited.js'));
//require('./the-graph-app-edited.js').context = TheGraph;
//console.log(require('./the-graph-app-edited.js'));
//var secondTry = require('./the-graph-app-edited.js');

/* Trying to see if 'this' inside the JS files referred to the 'this' inside this file,
after checking I'm pretty sure it doesn't

(function(yep){
    console.log("here's 'this' inside the function I made:");
    console.log(this);
    //var Try = require('./the-graph-edited');
    //var secondTry = require('./the-graph-app-edited.js');
    console.log(yep);
    var secondTry = require;
    var comeOn = secondTry.call(require('./the-graph-app-edited.js'), './the-graph-app-edited.js').bind(window, window);
}.bind(window))(this);
 */

require('./the-graph-edited.js');
//require('./font-awesome-unicode-map-edited.js');
require('./the-graph-app-edited.js');
//require('./the-graph-graph-edited.js');
//require('./the-graph-node-edited.js');
//require('./the-graph-node-menu-edited.js');
//require('./the-graph-node-menu-port-edited.js');
//require('./the-graph-node-menu-ports-edited.js');
//require('./the-graph-port-edited.js');
//require('./the-graph-edge-edited.js');
//require('./the-graph-iip-edited.js');
//require('./the-graph-group-edited.js');
//require('./the-graph-tooltip-edited.js');
//require('./the-graph-menu-edited.js');
//require('./the-graph-clipboard-edited.js');
},{"./the-graph-app-edited.js":2,"./the-graph-edited.js":3}],2:[function(require,module,exports){
(function (context) {

  //var theGraph = require('./the-graph-edited.js');
  //console.log(theGraph);
  //console.log(require('./the-graph-edited.js'));
  //console.log(module.exports);
  //var fontAwesomeEdited = require('./font-awesome-unicode-map-edited.js');
  //var theGraphGraphEdited = require('./the-graph-graph-edited.js');
  //var theGraphNodeEdited = require('./the-graph-node-edited.js');
  //var theGraphNodeMenuEdited = require('./the-graph-node-menu-edited.js');
  //var theGraphNodeMenuPortEdited = require('./the-graph-node-menu-port-edited.js');
  //var theGraphNodeMenuPortsEdited = require('./the-graph-node-menu-ports-edited.js');
  //var theGraphPortEdited = require('./the-graph-port-edited.js');
  //var theGraphEdgeEdited = require('./the-graph-edge-edited.js');
  //var theGraphIIPEdited = require('./the-graph-iip-edited.js');
  //var theGraphGroupEdited = require('./the-graph-group-edited.js');
  //var theGraphTooltipEdited = require('./the-graph-tooltip-edited.js');
  //var theGraphMenuEdited = require('./the-graph-menu-edited.js');
  //var theGraphClipboardEdited = require('./the-graph-clipboard-edited.js');

  "use strict";
  console.log("here's this in app edited:");
  console.log(this);
  console.log(window);

  console.log("here's context in app edited:");
  console.log(context);

  var TheGraph = context.TheGraph;

  //console.log(context.TheGraph);

  TheGraph.config.app = {
    container: {
      className: "the-graph-app",
      name: "app"
    },
    canvas: {
      ref: "canvas",
      className: "app-canvas"
    },
    svg: {
      className: "app-svg"
    },
    svgGroup: {
      className: "view"
    },
    graph: {
      ref: "graph"
    },
    tooltip: {
      ref: "tooltip"
    },
    modal: {
      className: "context"
    }
  };

  TheGraph.factories.app = {
    createAppContainer: createAppContainer,
    createAppCanvas: TheGraph.factories.createCanvas,
    createAppSvg: TheGraph.factories.createSvg,
    createAppSvgGroup: TheGraph.factories.createGroup,
    createAppGraph: createAppGraph,
    createAppTooltip: createAppTooltip,
    createAppModalGroup: TheGraph.factories.createGroup,
    createAppModalBackground: createAppModalBackground
  };

  // No need to promote DIV creation to TheGraph.js.
  function createAppContainer(options, content) {
    //console.log("here is content input:")
    //console.log(content);
    //
    console.log("here is the options object:");
    console.log(options);

    //console.log("here is the options input variable:");

    //for(var key in options){
    //  console.log(key)
    //  console.log(options[key])
    //}

    var args = [options];

    if (Array.isArray(content)) {
      args = args.concat(content);
    }

    return React.DOM.div.apply(React.DOM.div, args);
  }

  function createAppGraph(options) {
    console.log("createAppGraph options:");
    console.log(options);
    return TheGraph.Graph(options);
  }

  function createAppTooltip(options) {
    console.log("createAppTooltip options:");
    console.log(options);
    return TheGraph.Tooltip(options);
  }

  function createAppModalBackground(options) {
    console.log("createAppModalBackground options:");
    console.log(options);
    return TheGraph.ModalBG(options);
  }

  TheGraph.App = React.createFactory( React.createClass({
    displayName: "TheGraphApp",
    //mixins: [React.Animate],
    minZoom: 0.15,
    getInitialState: function() {
      // Autofit
      var fit = TheGraph.findFit(this.props.graph, this.props.width, this.props.height);

      return {
        x: fit.x,
        y: fit.y,
        scale: fit.scale,
        width: this.props.width,
        height: this.props.height,
        tooltip: "",
        tooltipX: 0,
        tooltipY: 0,
        tooltipVisible: false,
        contextElement: null,
        contextType: null,
        offsetY: this.props.offsetY,
        offsetX: this.props.offsetX
      };
    },
    zoomFactor: 0,
    zoomX: 0,
    zoomY: 0,
    onWheel: function (event) {
      // Don't bounce
      event.preventDefault();

      if (!this.zoomFactor) { // WAT
        this.zoomFactor = 0;
      }

      // Safari is wheelDeltaY
      this.zoomFactor += event.deltaY ? event.deltaY : 0-event.wheelDeltaY;
      this.zoomX = event.clientX;
      this.zoomY = event.clientY;
      requestAnimationFrame(this.scheduleWheelZoom);
    },
    scheduleWheelZoom: function () {
      if (isNaN(this.zoomFactor)) { return; }

      // Speed limit
      var zoomFactor = this.zoomFactor/-50;
      zoomFactor = Math.min(0.5, Math.max(-0.5, zoomFactor));
      var scale = this.state.scale + (this.state.scale * zoomFactor);
      this.zoomFactor = 0;

      if (scale < this.minZoom) { 
        scale = this.minZoom;
      }
      if (scale === this.state.scale) { return; }

      // Zoom and pan transform-origin equivalent
      var scaleD = scale / this.state.scale;
      var currentX = this.state.x;
      var currentY = this.state.y;
      var oX = this.zoomX;
      var oY = this.zoomY;
      var x = scaleD * (currentX - oX) + oX;
      var y = scaleD * (currentY - oY) + oY;

      this.setState({
        scale: scale,
        x: x,
        y: y,
        tooltipVisible: false
      });
    },
    lastScale: 1,
    lastX: 0,
    lastY: 0,
    pinching: false,
    onTransformStart: function (event) {
      console.log("here's the event in onTransformStart:");
      console.log(event);
      // Don't drag nodes
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Hammer.js
      this.lastScale = 1;
      this.lastX = event.gesture.center.clientX;
      this.lastY = event.gesture.center.clientY;
      this.pinching = true;
    },
    onTransform: function (event) {
      // Don't drag nodes
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Hammer.js
      var currentScale = this.state.scale;
      var currentX = this.state.x;
      var currentY = this.state.y;

      var scaleEvent = event.gesture.scale;
      var scaleDelta = 1 + (scaleEvent - this.lastScale);
      this.lastScale = scaleEvent;
      var scale = scaleDelta * currentScale;
      scale = Math.max(scale, this.minZoom);

      // Zoom and pan transform-origin equivalent
      var oX = event.gesture.center.clientX;
      var oY = event.gesture.center.clientY;
      var deltaX = oX - this.lastX;
      var deltaY = oY - this.lastY;
      var x = scaleDelta * (currentX - oX) + oX + deltaX;
      var y = scaleDelta * (currentY - oY) + oY + deltaY;

      this.lastX = oX;
      this.lastY = oY;

      this.setState({
        scale: scale,
        x: x,
        y: y,
        tooltipVisible: false
      });
    },
    onTransformEnd: function (event) {
      // Don't drag nodes
      event.stopPropagation();
      event.stopImmediatePropagation();

      // Hammer.js
      this.pinching = false;
    },
    onTrackStart: function (event) {
      event.preventTap();
      var domNode = this.getDOMNode();
      domNode.addEventListener("track", this.onTrack);
      domNode.addEventListener("trackend", this.onTrackEnd);
    },
    onTrack: function (event) {
      if ( this.pinching ) { return; }
      this.setState({
        x: this.state.x + event.ddx,
        y: this.state.y + event.ddy
      });
    },
    onTrackEnd: function (event) {
      // Don't click app (unselect)
      event.stopPropagation();

      var domNode = this.getDOMNode();
      domNode.removeEventListener("track", this.onTrack);
      domNode.removeEventListener("trackend", this.onTrackEnd);
    },
    onPanScale: function () {
      // Pass pan/scale out to the-graph
      if (this.props.onPanScale) {
        this.props.onPanScale(this.state.x, this.state.y, this.state.scale);
      }
    },
    showContext: function (options) {
      this.setState({
        contextMenu: options,
        tooltipVisible: false
      });
    },
    hideContext: function (event) {
      this.setState({
        contextMenu: null
      });
    },
    changeTooltip: function (event) {
      var tooltip = event.detail.tooltip;

      // Don't go over right edge
      var x = event.detail.x + 10;
      var width = tooltip.length*6;
      if (x + width > this.props.width) {
        x = event.detail.x - width - 10;
      }

      this.setState({
        tooltip: tooltip,
        tooltipVisible: true,
        tooltipX: x,
        tooltipY: event.detail.y + 20
      });
    },
    hideTooltip: function (event) {
      this.setState({
        tooltip: "",
        tooltipVisible: false
      });
    },
    triggerFit: function (event) {
      var fit = TheGraph.findFit(this.props.graph, this.props.width, this.props.height);
      this.setState({
        x: fit.x,
        y: fit.y,
        scale: fit.scale
      });
    },
    focusNode: function (node) {
      var duration = TheGraph.config.focusAnimationDuration;
      var fit = TheGraph.findNodeFit(node, this.state.width, this.state.height);
      var start_point = {
        x: -(this.state.x - this.state.width / 2) / this.state.scale,
        y: -(this.state.y - this.state.height / 2) / this.state.scale,
      }, end_point = {
        x: node.metadata.x,
        y: node.metadata.y,
      };
      var graphfit = TheGraph.findAreaFit(start_point, end_point, this.state.width, this.state.height);
      var scale_ratio_1 = Math.abs(graphfit.scale - this.state.scale);
      var scale_ratio_2 = Math.abs(fit.scale - graphfit.scale);
      var scale_ratio_diff = scale_ratio_1 + scale_ratio_2;

      // Animate zoom-out then zoom-in
      this.animate({
        x: graphfit.x,
        y: graphfit.y,
        scale: graphfit.scale,
      }, duration * (scale_ratio_1 / scale_ratio_diff), 'in-quint', function() {
        this.animate({
          x: fit.x,
          y: fit.y,
          scale: fit.scale,
        }, duration * (scale_ratio_2 / scale_ratio_diff), 'out-quint');
      }.bind(this));
    },
    edgeStart: function (event) {
      // Listened from PortMenu.edgeStart() and Port.edgeStart()
      this.refs.graph.edgeStart(event);
      this.hideContext();
    },
    componentDidMount: function () {
      console.log("here's app.js this.props:");
      console.log(this.props);
      var domNode = this.getDOMNode();
      console.log("here's domNode:");
      console.log(domNode);

      // Set up PolymerGestures for app and all children
      var noop = function(){};
      PolymerGestures.addEventListener(domNode, "up", noop);
      PolymerGestures.addEventListener(domNode, "down", noop);
      PolymerGestures.addEventListener(domNode, "tap", noop);
      PolymerGestures.addEventListener(domNode, "trackstart", noop);
      PolymerGestures.addEventListener(domNode, "track", noop);
      PolymerGestures.addEventListener(domNode, "trackend", noop);
      PolymerGestures.addEventListener(domNode, "hold", noop);

      // Unselect edges and nodes
      if (this.props.onNodeSelection) {
        domNode.addEventListener("tap", this.unselectAll);
      }

      // Don't let Hammer.js collide with polymer-gestures
      if (Hammer) {
        Hammer(domNode, {
          tap: false,
          hold: false, 
          transform: true
        });
      }

      // Pointer gesture event for pan
      domNode.addEventListener("trackstart", this.onTrackStart);

      var isTouchDevice = 'ontouchstart' in document.documentElement;
      if( isTouchDevice && Hammer ){
        Hammer(domNode).on("transformstart", this.onTransformStart);
        Hammer(domNode).on("transform", this.onTransform);
        Hammer(domNode).on("transformend", this.onTransformEnd);
      }

      // Wheel to zoom
      if (domNode.onwheel!==undefined) {
        // Chrome and Firefox
        domNode.addEventListener("wheel", this.onWheel);
      } else if (domNode.onmousewheel!==undefined) {
        // Safari
        domNode.addEventListener("mousewheel", this.onWheel);
      }

      // Tooltip listener
      domNode.addEventListener("the-graph-tooltip", this.changeTooltip);
      domNode.addEventListener("the-graph-tooltip-hide", this.hideTooltip);

      // Edge preview
      domNode.addEventListener("the-graph-edge-start", this.edgeStart);

      domNode.addEventListener("contextmenu",this.onShowContext);

      // Start zoom from middle if zoom before mouse move
      this.mouseX = Math.floor( this.props.width/2 );
      this.mouseY = Math.floor( this.props.height/2 );

      // HACK metaKey global for taps https://github.com/Polymer/PointerGestures/issues/29
      document.addEventListener('keydown', this.keyDown);
      document.addEventListener('keyup', this.keyUp);

      // Canvas background
      this.bgCanvas = unwrap(this.refs.canvas.getDOMNode());
      this.bgContext = unwrap(this.bgCanvas.getContext('2d'));
      this.componentDidUpdate();


      // Rerender graph once to fix edges
      setTimeout(function () {
        this.renderGraph();
      }.bind(this), 500);
    },
    onShowContext: function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (event.preventTap) { event.preventTap(); }

      // Get mouse position
      var x = event.x || event.clientX || 0;
      var y = event.y || event.clientY || 0;

      // App.showContext
      this.showContext({
        element: this,
        type: "main",
        x: x,
        y: y,
        graph: this.props.graph,
        itemKey: 'graph',
        item: this.props.graph
      });
    },
    keyDown: function (event) {
      // HACK metaKey global for taps https://github.com/Polymer/PointerGestures/issues/29
      if (event.metaKey || event.ctrlKey) {
        TheGraph.metaKeyPressed = true;
      }
    },
    keyUp: function (event) {
      // Escape
      if (event.keyCode===27) {
        if (!this.refs.graph) {
          return;
        }
        this.refs.graph.cancelPreviewEdge();
      }
      // HACK metaKey global for taps https://github.com/Polymer/PointerGestures/issues/29
      if (TheGraph.metaKeyPressed) {
        TheGraph.metaKeyPressed = false;
      }
    },
    unselectAll: function (event) {
      // No arguments = clear selection
      console.log("here's the event for unselectAll:");
      console.log(event);
      this.props.onNodeSelection();
      this.props.onEdgeSelection();
    },
    renderGraph: function () {
      this.refs.graph.markDirty();
    },
    componentDidUpdate: function (prevProps, prevState) {
      this.renderCanvas(this.bgContext);
      if (!prevState || prevState.x!==this.state.x || prevState.y!==this.state.y || prevState.scale!==this.state.scale) {
        this.onPanScale();
      }
    },
    renderCanvas: function (c) {
      // Comment this line to go plaid
      c.clearRect(0, 0, this.state.width, this.state.height);

      // Background grid pattern
      var scale = this.state.scale;
      var g = TheGraph.config.nodeSize * scale;

      var dx = this.state.x % g;
      var dy = this.state.y % g;
      var cols = Math.floor(this.state.width / g) + 1;
      var row = Math.floor(this.state.height / g) + 1;
      // Origin row/col index
      var oc = Math.floor(this.state.x / g) + (this.state.x<0 ? 1 : 0);
      var or = Math.floor(this.state.y / g) + (this.state.y<0 ? 1 : 0);

      while (row--) {
        var col = cols;
        while (col--) {
          var x = Math.round(col*g+dx);
          var y = Math.round(row*g+dy);
          if ((oc-col)%3===0 && (or-row)%3===0) {
            // 3x grid
            c.fillStyle = "green";
            c.fillRect(x, y, 1, 1);
          } else if (scale > 0.5) {
            // 1x grid
            c.fillStyle = "grey";
            c.fillRect(x, y, 1, 1);
          }
        }
      }

    },

    getContext: function (menu, options, hide) {
        return TheGraph.Menu({
            menu: menu,
            options: options,
            triggerHideContext: hide,
            label: "Hello",
            graph: this.props.graph,
            node: this,
            ports: [],
            process: [],
            processKey: null,
            x: options.x,
            y: options.y,
            nodeWidth: this.props.width,
            nodeHeight: this.props.height,
            deltaX: 0,
            deltaY: 0,
            highlightPort: false
        });
    },
    render: function() {
      console.log("inside render for graphApp");
      console.log(TheGraph.merge);

      // console.timeEnd("App.render");
      // console.time("App.render");

      // pan and zoom
      var sc = this.state.scale;
      var x = this.state.x;
      var y = this.state.y;
      var transform = "matrix("+sc+",0,0,"+sc+","+x+","+y+")";

      var scaleClass = sc > TheGraph.zbpBig ? "big" : ( sc > TheGraph.zbpNormal ? "normal" : "small");

      var contextMenu, contextModal;
      if ( this.state.contextMenu ) {
        var options = this.state.contextMenu;
        var menu = this.props.getMenuDef(options);
        if (menu) {
          contextMenu = options.element.getContext(menu, options, this.hideContext);
        }
      }
      if (contextMenu) {

        var modalBGOptions ={
          width: this.state.width,
          height: this.state.height,
          triggerHideContext: this.hideContext,
          children: contextMenu
        };

        contextModal = [ 
          TheGraph.factories.app.createAppModalBackground(modalBGOptions)
        ];
        this.menuShown = true;
      } else {
        this.menuShown = false;
      }

      var graphElementOptions = {
        graph: this.props.graph,
        scale: this.state.scale,
        app: this,
        library: this.props.library,
        onNodeSelection: this.props.onNodeSelection,
        onEdgeSelection: this.props.onEdgeSelection,
        showContext: this.showContext
      };
      console.log("here's 'this' in app.js:");
      console.log(this);
      graphElementOptions = TheGraph.merge(TheGraph.config.app.graph, graphElementOptions);
      var graphElement = TheGraph.factories.app.createAppGraph.call(this, graphElementOptions);

      var svgGroupOptions = TheGraph.merge(TheGraph.config.app.svgGroup, { transform: transform });
      var svgGroup = TheGraph.factories.app.createAppSvgGroup.call(this, svgGroupOptions, [graphElement]);

      var tooltipOptions = {
        x: this.state.tooltipX,
        y: this.state.tooltipY,
        visible: this.state.tooltipVisible,
        label: this.state.tooltip
      };

      tooltipOptions = TheGraph.merge(TheGraph.config.app.tooltip, tooltipOptions);
      var tooltip = TheGraph.factories.app.createAppTooltip.call(this, tooltipOptions);

      var modalGroupOptions = TheGraph.merge(TheGraph.config.app.modal, { children: contextModal });
      var modalGroup = TheGraph.factories.app.createAppModalGroup.call(this, modalGroupOptions);

      var svgContents = [
        svgGroup,
        tooltip,
        modalGroup
      ];

      var svgOptions = TheGraph.merge(TheGraph.config.app.svg, { width: this.state.width, height: this.state.height });
      var svg = TheGraph.factories.app.createAppSvg.call(this, svgOptions, svgContents);

      var canvasOptions = TheGraph.merge(TheGraph.config.app.canvas, { width: this.state.width, height: this.state.height });
      var canvas = TheGraph.factories.app.createAppCanvas.call(this, canvasOptions);

      //var testOptions = TheGraph.merge(TheGraph.config.app.container, {width: this.state.width, height: this.state.height});
      //var test = TheGraph.factories.app.createAppContainer.call(this, testOptions)
      //
      //var testArray= [
      //    test
      //]

      var appContents = [
        canvas,
        svg
      ];
      var containerOptions = TheGraph.merge(TheGraph.config.app.container, { style: { width: this.state.width, height: this.state.height } });
      containerOptions.className += " " + scaleClass;
      return TheGraph.factories.app.createAppContainer.call(this, containerOptions, appContents);
    }
  }));


})(this);
},{}],3:[function(require,module,exports){
(function (context) {
  console.log("inside the-graph-edited.js, here's 'this':");
  console.log(this);
  "use strict";

  console.log("here's context in graph edited:");
  console.log(context);

  var defaultNodeSize = 72;
  var defaultNodeRadius = 8;

  // Dumb module setup
  var TheGraph = context.TheGraph = {
    // nodeSize and nodeRadius are deprecated, use TheGraph.config.(nodeSize/nodeRadius),ie lines 20 and 22
    nodeSize: defaultNodeSize,
    nodeRadius: defaultNodeRadius,
    nodeSide: 56,
    // Context menus
    contextPortSize: 36,
    // Zoom breakpoints
    zbpBig: 1.2,
    zbpNormal: 0.4,
    zbpSmall: 0.01,
    config: {
      nodeSize: defaultNodeSize,
      nodeWidth: defaultNodeSize,
      nodeRadius: defaultNodeRadius,
      nodeHeight: defaultNodeSize,
      autoSizeNode: true,
      maxPortCount: 9,
      nodeHeightIncrement: 12,
      focusAnimationDuration: 1500
    },
    factories: {}
  };

  // React setup
  React.initializeTouchEvents(true);

  // rAF shim
  window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  // Mixins to use throughout project
  TheGraph.mixins = {};

  // Show fake tooltip
  // Class must have getTooltipTrigger (dom node) and shouldShowTooltip (boolean)
  TheGraph.mixins.Tooltip = {
    showTooltip: function (event) {
      if ( !this.shouldShowTooltip() ) { return; }

      var tooltipEvent = new CustomEvent('the-graph-tooltip', {
        detail: {
          tooltip: this.props.label,
          x: event.clientX,
          y: event.clientY
        },
        bubbles: true
      });
      this.getDOMNode().dispatchEvent(tooltipEvent);
    },
    hideTooltip: function (event) {
      if ( !this.shouldShowTooltip() ) { return; }

      var tooltipEvent = new CustomEvent('the-graph-tooltip-hide', {
        bubbles: true
      });
      if (this._lifeCycleState === "MOUNTED") {
        this.getDOMNode().dispatchEvent(tooltipEvent);
      }
    },
    componentDidMount: function () {
      //console.log("here's this.props of graph.js:");
      //console.log(this.props);
      if (navigator && navigator.userAgent.indexOf("Firefox") !== -1) {
        // HACK Ff does native tooltips on svg elements
        return;
      }
      var tooltipper = this.getTooltipTrigger();
      tooltipper.addEventListener("tap", this.showTooltip);
      tooltipper.addEventListener("mouseenter", this.showTooltip);
      tooltipper.addEventListener("mouseleave", this.hideTooltip);
    }
  };

  TheGraph.findMinMax = function (graph, nodes) {
    var inports, outports;
    if (nodes === undefined) {
      nodes = graph.nodes.map( function (node) {
        return node.id;
      });
      // Only look at exports when calculating the whole graph
      inports = graph.inports;
      outports = graph.outports;
    }
    if (nodes.length < 1) {
      return undefined;
    }
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;

    // Loop through nodes
    var len = nodes.length;
    for (var i=0; i<len; i++) {
      var key = nodes[i];
      var node = graph.getNode(key);
      if (!node || !node.metadata) {
        continue;
      }
      if (node.metadata.x < minX) { minX = node.metadata.x; }
      if (node.metadata.y < minY) { minY = node.metadata.y; }
      var x = node.metadata.x + node.metadata.width;
      var y = node.metadata.y + node.metadata.height;
      if (x > maxX) { maxX = x; }
      if (y > maxY) { maxY = y; }
    }
    // Loop through exports
    var keys, exp;
    if (inports) {
      keys = Object.keys(inports);
      len = keys.length;
      for (i=0; i<len; i++) {
        exp = inports[keys[i]];
        if (!exp.metadata) { continue; }
        if (exp.metadata.x < minX) { minX = exp.metadata.x; }
        if (exp.metadata.y < minY) { minY = exp.metadata.y; }
        if (exp.metadata.x > maxX) { maxX = exp.metadata.x; }
        if (exp.metadata.y > maxY) { maxY = exp.metadata.y; }
      }
    }
    if (outports) {
      keys = Object.keys(outports);
      len = keys.length;
      for (i=0; i<len; i++) {
        exp = outports[keys[i]];
        if (!exp.metadata) { continue; }
        if (exp.metadata.x < minX) { minX = exp.metadata.x; }
        if (exp.metadata.y < minY) { minY = exp.metadata.y; }
        if (exp.metadata.x > maxX) { maxX = exp.metadata.x; }
        if (exp.metadata.y > maxY) { maxY = exp.metadata.y; }
      }
    }

    if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
      return null;
    }
    return {
      minX: minX,
      minY: minY,
      maxX: maxX,
      maxY: maxY
    };
  };

  TheGraph.findFit = function (graph, width, height) {
    var limits = TheGraph.findMinMax(graph);
    if (!limits) {
      return {x:0, y:0, scale:1};
    }
    limits.minX -= TheGraph.config.nodeSize;
    limits.minY -= TheGraph.config.nodeSize;
    limits.maxX += TheGraph.config.nodeSize * 2;
    limits.maxY += TheGraph.config.nodeSize * 2;

    var gWidth = limits.maxX - limits.minX;
    var gHeight = limits.maxY - limits.minY;

    var scaleX = width / gWidth;
    var scaleY = height / gHeight;

    var scale, x, y;
    if (scaleX < scaleY) {
      scale = scaleX;
      x = 0 - limits.minX * scale;
      y = 0 - limits.minY * scale + (height-(gHeight*scale))/2;
    } else {
      scale = scaleY;
      x = 0 - limits.minX * scale + (width-(gWidth*scale))/2;
      y = 0 - limits.minY * scale;
    }

    return {
      x: x,
      y: y,
      scale: scale
    };
  };

  TheGraph.findAreaFit = function (point1, point2, width, height) {
    var limits = {
      minX: point1.x < point2.x ? point1.x : point2.x,
      minY: point1.y < point2.y ? point1.y : point2.y,
      maxX: point1.x > point2.x ? point1.x : point2.x,
      maxY: point1.y > point2.y ? point1.y : point2.y
    };

    limits.minX -= TheGraph.config.nodeSize;
    limits.minY -= TheGraph.config.nodeSize;
    limits.maxX += TheGraph.config.nodeSize * 2;
    limits.maxY += TheGraph.config.nodeSize * 2;

    var gWidth = limits.maxX - limits.minX;
    var gHeight = limits.maxY - limits.minY;

    var scaleX = width / gWidth;
    var scaleY = height / gHeight;

    var scale, x, y;
    if (scaleX < scaleY) {
      scale = scaleX;
      x = 0 - limits.minX * scale;
      y = 0 - limits.minY * scale + (height-(gHeight*scale))/2;
    } else {
      scale = scaleY;
      x = 0 - limits.minX * scale + (width-(gWidth*scale))/2;
      y = 0 - limits.minY * scale;
    }

    return {
      x: x,
      y: y,
      scale: scale
    };
  };

  TheGraph.findNodeFit = function (node, width, height) {
    var limits = {
      minX: node.metadata.x - TheGraph.config.nodeSize,
      minY: node.metadata.y - TheGraph.config.nodeSize,
      maxX: node.metadata.x + TheGraph.config.nodeSize * 2,
      maxY: node.metadata.y + TheGraph.config.nodeSize * 2
    };

    var gWidth = limits.maxX - limits.minX;
    var gHeight = limits.maxY - limits.minY;

    var scaleX = width / gWidth;
    var scaleY = height / gHeight;

    var scale, x, y;
    if (scaleX < scaleY) {
      scale = scaleX;
      x = 0 - limits.minX * scale;
      y = 0 - limits.minY * scale + (height-(gHeight*scale))/2;
    } else {
      scale = scaleY;
      x = 0 - limits.minX * scale + (width-(gWidth*scale))/2;
      y = 0 - limits.minY * scale;
    }

    return {
      x: x,
      y: y,
      scale: scale
    };
  };

  // SVG arc math
  var angleToX = function (percent, radius) {
    return radius * Math.cos(2*Math.PI * percent);
  };
  var angleToY = function (percent, radius) {
    return radius * Math.sin(2*Math.PI * percent);
  };
  var makeArcPath = function (startPercent, endPercent, radius) {
    return [ 
      "M", angleToX(startPercent, radius), angleToY(startPercent, radius),
      "A", radius, radius, 0, 0, 0, angleToX(endPercent, radius), angleToY(endPercent, radius)
    ].join(" ");
  };
  TheGraph.arcs = {
    n4: makeArcPath(7/8, 5/8, 36),
    s4: makeArcPath(3/8, 1/8, 36),
    e4: makeArcPath(1/8, -1/8, 36),
    w4: makeArcPath(5/8, 3/8, 36),
    inport: makeArcPath(-1/4, 1/4, 4),
    outport: makeArcPath(1/4, -1/4, 4),
    inportBig: makeArcPath(-1/4, 1/4, 6),
    outportBig: makeArcPath(1/4, -1/4, 6),
  };


  // Reusable React classes
  TheGraph.SVGImage = React.createFactory( React.createClass({
    displayName: "TheGraphSVGImage",
    render: function() {
        var html = '<image ';
        html = html +'xlink:href="'+ this.props.src + '"';
        html = html +'x="' + this.props.x + '"';
        html = html +'y="' + this.props.y + '"';
        html = html +'width="' + this.props.width + '"';
        html = html +'height="' + this.props.height + '"';
        html = html +'/>';

        return React.DOM.g({
            className: this.props.className,
            dangerouslySetInnerHTML:{__html: html}
        });
    }
  }));

  TheGraph.TextBG = React.createFactory( React.createClass({
    displayName: "TheGraphTextBG",
    render: function() {
      var text = this.props.text;
      if (!text) {
        text = "";
      }
      var height = this.props.height;
      var width = text.length * this.props.height * 2/3;
      var radius = this.props.height/2;

      var textAnchor = "start";
      var dominantBaseline = "central";
      var x = this.props.x;
      var y = this.props.y - height/2;

      if (this.props.halign === "center") {
        x -= width/2;
        textAnchor = "middle";
      }
      if (this.props.halign === "right") {
        x -= width;
        textAnchor = "end";
      }

      return React.DOM.g(
        {
          className: (this.props.className ? this.props.className : "text-bg"),
        },
        React.DOM.rect({
          className: "text-bg-rect",
          x: x,
          y: y,
          rx: radius,
          ry: radius,
          height: height * 1.1,
          width: width
        }),
        React.DOM.text({
          className: (this.props.textClassName ? this.props.textClassName : "text-bg-text"),
          x: this.props.x,
          y: this.props.y,
          children: text
        })
      );
    }
  }));

  // The `merge` function provides simple property merging.
  TheGraph.merge = function(src, dest, overwrite) {
    //console.log("here's the 3 inputs of emrge:")
    //console.log(src)
    //console.log(dest)
    //console.log(overwrite)
    // Do nothing if neither are true objects.
    if (Array.isArray(src) || Array.isArray(dest) || typeof src !== 'object' || typeof dest !== 'object')
      return dest;

    // Default overwriting of existing properties to false.
    overwrite = overwrite || false;
    //console.log(overwrite)

    for (var key in src) {
      // Only copy properties, not functions.
      if (typeof src[key] !== 'function' && (!dest[key] || overwrite))
        dest[key] = src[key];
    }

    return dest;
  };

  TheGraph.factories.createGroup = function(options, content) {
    var args = [options];

    if (Array.isArray(content)) {
      args = args.concat(content);
    }

    return React.DOM.g.apply(React.DOM.g, args);
  };

  TheGraph.factories.createRect = function(options) {
    return React.DOM.rect(options);
  };

  TheGraph.factories.createText = function(options) {
    return React.DOM.text(options);
  };

  TheGraph.factories.createCircle = function(options) {
    return React.DOM.circle(options);
  };

  TheGraph.factories.createPath = function(options) {
    return React.DOM.path(options);
  };

  TheGraph.factories.createImg = function(options) {
    return TheGraph.SVGImage(options);
  };

  TheGraph.factories.createCanvas = function(options) {
    return React.DOM.canvas(options);
  };

  TheGraph.factories.createSvg = function(options, content) {

    var args = [options];

    if (Array.isArray(content)) {
      args = args.concat(content);
    }

    return React.DOM.svg.apply(React.DOM.svg, args);
  };
  
  TheGraph.getOffset = function(domNode){
    var getElementOffset = function(element){
      var offset = { top: 0, left: 0},
          parentOffset;
      if(!element){
        return offset;
      }
      offset.top += (element.offsetTop || 0);
      offset.left += (element.offsetLeft || 0);
      parentOffset = getElementOffset(element.offsetParent);
      offset.top += parentOffset.top;
      offset.left += parentOffset.left;
      return offset;
    };
    try{
      return getElementOffset( domNode );
    }catch(e){
      return getElementOffset();
    }
  };

})(this);

},{}]},{},[1]);
