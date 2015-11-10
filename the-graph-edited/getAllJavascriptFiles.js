/**
 * Created by twi18192 on 27/10/15.
 */

require('./polymerGesturesDummy.js');

require('./the-graph-edited.js');
require('./font-awesome-unicode-map-edited.js');
require('./the-graph-app-edited.js');
require('./the-graph-graph-edited.js');
require('./the-graph-node-edited.js');
require('./the-graph-node-menu-edited.js');
require('./the-graph-node-menu-port-edited.js');
require('./the-graph-node-menu-ports-edited.js');
require('./the-graph-port-edited.js');
require('./the-graph-edge-edited.js');
require('./the-graph-iip-edited.js');
require('./the-graph-group-edited.js');
require('./the-graph-tooltip-edited.js');
require('./the-graph-menu-edited.js');
require('./the-graph-clipboard-edited.js');

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

//console.log("here's 'this' in 'getAllJSFiles:'");
//console.log(this);

/* 'this' inside this file refers to an empty object; binding 'window' to be 'this' allows
console.log(this) to return the window, thus changing the value of 'this' inside the defined function 'check()'
 */

//var check = function(){
//    console.log(this)
//}.bind(window);
//console.log("now 'this' should be window");
//check(this);

//var Test = require('./the-graph-edited.js');
//console.log(Test);
//var Test2 = require('./the-graph-app-edited.js');
//console.log(Test2);


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

/* Trying moduleify to see if that solves the problem

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

*/