/**
* Created by twi18192 on 28/10/15.
*/

(function() {

    require('./getAllJavascriptFiles');

    console.log("inside theGraphHTMLRewrittenInJS");
    console.log(window.TheGraph);

    //var theGraphReference = document.getElementById('graph');
    //console.log(theGraphReference);

    //var testDiv = document.createElement('div');
    //testDiv.id = "testdiv";
    //document.body.appendChild(testDiv);

    //console.log(document);

    var addTemplateElement = document.createElement('template');
    //console.log(addTemplateElement);

    /* For internet explorer, will need to use createStylesheet instead of createElement('link')*/
    var theGraphDarkStylesheet = document.createElement('link');
    theGraphDarkStylesheet.setAttribute('rel', 'stylesheet');
    theGraphDarkStylesheet.setAttribute('type', 'css');
    theGraphDarkStylesheet.setAttribute('href', '../themes/the-graph-dark.css');
    addTemplateElement.appendChild(theGraphDarkStylesheet);

    var theGraphLightStylesheet = document.createElement('link');
    theGraphLightStylesheet.setAttribute('rel', 'stylesheet');
    theGraphLightStylesheet.setAttribute('type', 'css');
    theGraphLightStylesheet.setAttribute('href', '../themes/the-graph-light.css');
    addTemplateElement.appendChild(theGraphLightStylesheet);

    var addSVGDivContainer = document.createElement('div');
    addSVGDivContainer.id = "svgcontainer";
    addTemplateElement.appendChild(addSVGDivContainer);
    //console.log(addTemplateElement);

    //document.body.appendChild(addTemplateElement);

    /* Now creating the <div> equivalent in javascript of what was the custom Polymer element <the-graph> */

    var theGraphHTMLElement = document.createElement('div');

    var theGraphHTMLRewrittenAsJSObject = {

        checkFunction: function () {

            console.log(this.properties);
            console.log(this);
        },

        changeGraphProperty: function(){
          this.properties.graph = window.editor.properties.nofloGraph;
        },

        properties: {
            graph: null,
            library: null,
            menus: null,
            width: 800,
            height: 600,
            scale: 1,
            appView: null,
            graphView: null,
            editable: true,
            autolayout: false,
            grid: 72,
            snap: 36,
            theme: "light",
            selectedNodes: [],
            selectedNodesHash: {},
            errorNodes: {},
            selectedEdges: [],
            animatedEdges: [],
            autolayouter: null,
            displaySelectionGroup: true,
            forceSelection: false,
            offsetY: null,
            offsetX: null,
            //pan: [0, 0]
        },

        created: function () {
            console.log("inside the created fucntion of theGraphHTMLRewrittenInJS, here's this.properties.autolayouter:");
            console.log(this.properties.autolayouter);
            this.properties.library = {};
            // Default pan
            this.properties.pan = [0, 0]; /* properties enevr had a 'pan' porperty in it, just did this to prevent an error */
            // Initializes the autolayouter
            this.properties.autolayouter = klayNoflo.init({
                onSuccess: this.applyAutolayout.bind(this), /* I think that the 'this' in the bind fucntion is referring to the window, so it may be a good idea to pass it window or something */
                workerScript: "../bower_components/klayjs/klay.js"
            });
            console.log(this.properties.autolayouter);
        },

        ready: function () {
            //console.log("here's the this inside inside graphHTMLRewrittenInJS:");
            //console.log(this);
            this.themeChanged();
        },

        themeChanged: function () {
            console.log("here's window.svgcontainer");
            console.log(window.svgcontainer);
            window.svgcontainer.className = "the-graph-" + this.properties.theme;
        },

        graphChanged: function (oldGraph, newGraph) {
            console.log("inside graphChanged in graphRewritten");
            if (oldGraph && oldGraph.removeListener) {
                oldGraph.removeListener("endTransaction", this.fireChanged);
            }
            // Listen for graph changes
            this.properties.graph.on("endTransaction", this.fireChanged.bind(this));

            // Listen for autolayout changes
            if (this.properties.autolayout) {
                console.log("inside graphChanged in graphRewritten");
                this.properties.graph.on('addNode', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeNode', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addInport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeInport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addOutport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeOutport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addEdge', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeEdge', this.triggerAutolayout.bind(this));
            }

            if (this.properties.appView) {
                // Remove previous instance
                React.unmountComponentAtNode(window.svgcontainer);
            }

            // Setup app
            //console.log("here's the this inside graphHTMLRewrittenInJS:");
            //console.log(this);
            //console.log("here's window.TheGraph.App:");
            //console.log(window.TheGraph.App);
            //
            //console.log("here's this.properties.library in graphRewritten:");
            //console.log(this.properties.library)

            //var TESTDIVREFERENCE = document.getElementById('TESTDIV');
            //console.log("here's the TESTDIVREFERENCE:");
            //console.log(TESTDIVREFERENCE);

            //addSVGDivContainer.innerHTML = "";

            window.editor.passingPropertiesToGraph();


            console.log("here's this.properties.height and this.properties.width right before React.render:");
            console.log(this.properties.height);
            console.log(this.properties.width);

            window.svgcontainer.innerHTML = "";
            this.properties.appView = React.render(
                window.TheGraph.App({
                    graph: this.properties.graph,
                    width: this.properties.width,
                    height: this.properties.height,
                    library: this.properties.library,
                    menus: this.properties.menus,
                    editable: this.properties.editable,
                    onEdgeSelection: this.onEdgeSelection.bind(this), /* I think any .bind(this) needs to be .bind(window), since 'this' in the previous html files referred to the window? */
                    onNodeSelection: this.onNodeSelection.bind(this),
                    onPanScale: this.onPanScale.bind(this),
                    getMenuDef: window.editor.getMenuDef,
                    displaySelectionGroup: this.properties.displaySelectionGroup,
                    forceSelection: this.properties.forceSelection,
                    offsetY: this.properties.offsetY,
                    offsetX: this.properties.offsetX
                }),
                window.svgcontainer
            );
            console.log("here's this.proeprties.graphView in graphRewritten just before it is set to React.render:");
            console.log(this.properties.graphView);
            this.properties.graphView = this.properties.appView.refs.graph;
            console.log("here's this.proeprties.graphView in graphRewritten just after it is set to React.render:");
            console.log(this.properties.graphView);
            console.log("here's this.properties.appView in graphRewritten too:");
            console.log(this.properties.appView);

            window.dispatchEvent(customGraphWidthChanged);
            window.dispatchEvent(customGraphHeightChanged);

            //alert("caller is " + arguments.callee.caller.toString());


        },

        onPanScale: function (x, y, scale) {
            this.properties.pan[0] = x;
            this.properties.pan[1] = y;
            this.properties.scale = scale;
        },
        onEdgeSelection: function (itemKey, item, toggle) {
            if (itemKey === undefined) {
                if (this.properties.selectedEdges.length > 0) {
                    this.properties.selectedEdges = [];
                }
                //this.fire('edges', this.properties.selectedEdges);
                /* Not sure what 'this' should be referring to here?*/
                return;
            }
            if (toggle) {
                var index = this.properties.selectedEdges.indexOf(item);
                var isSelected = (index !== -1);
                var shallowClone = this.properties.selectedEdges.slice();
                if (isSelected) {
                    shallowClone.splice(index, 1);
                    this.properties.selectedEdges = shallowClone;
                } else {
                    shallowClone.push(item);
                    this.properties.selectedEdges = shallowClone;
                }
            } else {
                this.properties.selectedEdges = [item];
            }
            //this.fire('edges', this.properties.selectedEdges);
        },
        onNodeSelection: function (itemKey, item, toggle) {
            if (itemKey === undefined) {
                this.properties.selectedNodes = [];
            } else if (toggle) {
                var index = this.properties.selectedNodes.indexOf(item);
                var isSelected = (index !== -1);
                if (isSelected) {
                    this.properties.selectedNodes.splice(index, 1);
                } else {
                    this.properties.selectedNodes.push(item);
                }
            } else {
                this.properties.selectedNodes = [item];
            }
            //this.fire('nodes', this.properties.selectedNodes);
        },
        selectedNodesChanged: function () {
            var selectedNodesHash = {};
            for (var i = 0, len = this.properties.selectedNodes.length; i < len; i++) {
                selectedNodesHash[this.properties.selectedNodes[i].id] = true;
            }
            this.properties.selectedNodesHash = selectedNodesHash;
            //this.fire('nodes', this.properties.selectedNodes);
        },
        selectedNodesHashChanged: function () {
            console.log("inside selectedNodesHashed in graphgRewritten");
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setSelectedNodes(this.properties.selectedNodesHash);
        },
        errorNodesChanged: function () {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setErrorNodes(this.properties.errorNodes);
        },
        selectedEdgesChanged: function () {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setSelectedEdges(this.properties.selectedEdges);
            //this.fire('edges', this.properties.selectedEdges);
        },
        animatedEdgesChanged: function () {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setAnimatedEdges(this.properties.animatedEdges);
        },
        fireChanged: function (event) {
            //this.fire("changed", this);
            dispatchEvent(firChangedEvent);
        },
        autolayoutChanged: function () {
            if (!this.properties.graph) {
                return;
            }
            // Only listen to changes that affect layout
            if (this.properties.autolayout) {
                console.log("inside autoLayoutChanged");
                this.properties.graph.on('addNode', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeNode', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addInport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeInport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addOutport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeOutport', this.triggerAutolayout.bind(this));
                this.properties.graph.on('addEdge', this.triggerAutolayout.bind(this));
                this.properties.graph.on('removeEdge', this.triggerAutolayout.bind(this));
            } else {
                this.properties.graph.removeListener('addNode', this.triggerAutolayout);
                this.properties.graph.removeListener('removeNode', this.triggerAutolayout);
                this.properties.graph.removeListener('addInport', this.triggerAutolayout);
                this.properties.graph.removeListener('removeInport', this.triggerAutolayout);
                this.properties.graph.removeListener('addOutport', this.triggerAutolayout);
                this.properties.graph.removeListener('removeOutport', this.triggerAutolayout);
                this.properties.graph.removeListener('addEdge', this.triggerAutolayout);
                this.properties.graph.removeListener('removeEdge', this.triggerAutolayout);
            }
        },
        triggerAutolayout: function (event) {
            console.log("here's the event input of triggerAutoLayout:");
            console.log(event);
            console.log("inside triggerAutoLayout in graphRewritten");
            var graph = this.properties.graph;

            console.log("here's this.properties.graphView.portInfo");
            console.log(this.properties.graphView.portInfo);

            var portInfo = this.properties.graphView ? this.properties.graphView.portInfo : null;
            // Calls the autolayouter
            this.properties.autolayouter.layout({
                "graph": graph,
                "portInfo": portInfo,
                "direction": "RIGHT",
                "options": {
                    "intCoordinates": true,
                    "algorithm": "de.cau.cs.kieler.klay.layered",
                    "layoutHierarchy": true,
                    "spacing": 36,
                    "borderSpacing": 20,
                    "edgeSpacingFactor": 0.2,
                    "inLayerSpacingFactor": 2.0,
                    "nodePlace": "BRANDES_KOEPF",
                    "nodeLayering": "NETWORK_SIMPLEX",
                    "edgeRouting": "POLYLINE",
                    "crossMin": "LAYER_SWEEP",
                    "direction": "RIGHT"
                }
            });
        },
        applyAutolayout: function (layoutedKGraph) {
            console.log("here's this.properties.graph once inside applyAutoLayout:");
            console.log(this.properties.graph);
            this.properties.graph.startTransaction("autolayout");

            // Update original graph nodes with the new coordinates from KIELER graph
            var children = layoutedKGraph.children.slice();

            var i, len;
            for (i = 0, len = children.length; i < len; i++) {
                var klayNode = children[i];
                var nofloNode = this.properties.graph.getNode(klayNode.id);

                // Encode nodes inside groups
                if (klayNode.children) {
                    var klayChildren = klayNode.children;
                    var idx;
                    for (idx in klayChildren) {
                        var klayChild = klayChildren[idx];
                        if (klayChild.id) {
                            this.properties.graph.setNodeMetadata(klayChild.id, {
                                x: Math.round((klayNode.x + klayChild.x) / this.snap) * this.properties.snap,
                                y: Math.round((klayNode.y + klayChild.y) / this.snap) * this.properties.snap
                            });
                        }
                    }
                }

                // Encode nodes outside groups
                if (nofloNode) {
                    this.properties.graph.setNodeMetadata(klayNode.id, {
                        x: Math.round(klayNode.x / this.properties.snap) * this.properties.snap,
                        y: Math.round(klayNode.y / this.properties.snap) * this.properties.snap
                    });
                } else {
                    // Find inport or outport
                    var idSplit = klayNode.id.split(":::");
                    var expDirection = idSplit[0];
                    var expKey = idSplit[1];
                    if (expDirection === "inport" && this.properties.graph.inports[expKey]) {
                        this.properties.graph.setInportMetadata(expKey, {
                            x: Math.round(klayNode.x / this.properties.snap) * this.properties.snap,
                            y: Math.round(klayNode.y / this.properties.snap) * this.properties.snap
                        });
                    } else if (expDirection === "outport" && this.properties.graph.outports[expKey]) {
                        this.properties.graph.setOutportMetadata(expKey, {
                            x: Math.round(klayNode.x / this.properties.snap) * this.properties.snap,
                            y: Math.round(klayNode.y / this.properties.snap) * this.properties.snap
                        });
                    }
                }
            }

            this.properties.graph.endTransaction("autolayout");

            // Fit to window
            this.triggerFit();

        },
        triggerFit: function () {
            if (this.properties.appView) {
                this.properties.appView.triggerFit();
            }
        },
        widthChanged: function () {
            console.log("inside widthChanged in graphRewritten     gvlwuh eg GH;EWKHGHE GG");
            console.log(arguments);
            console.log(this.properties);
            //console.log(this);
            if (!this.properties.appView) {
                return;
            }
            console.log("here's this.properties.width:");
            console.log(this.properties.width);
            this.properties.appView.setState({
                width: this.properties.width
            });
        },
        heightChanged: function () {
            console.log("inside heightChanged in graphEdited");
            if (!this.properties.appView) {
                return;
            }
            this.properties.appView.setState({
                height: this.properties.height
            });
        },
        updateIcon: function (nodeId, icon) {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.updateIcon(nodeId, icon);
        },
        rerender: function (options) {
            // This is throttled with rAF internally
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.markDirty(options);
        },
        addNode: function (id, component, metadata) {
            if (!this.properties.graph) {
                return;
            }
            this.properties.graph.addNode(id, component, metadata);
        },
        getPan: function () {
            if (!this.properties.appView) {
                return [0, 0];
            }
            return [this.properties.appView.state.x, this.properties.appView.state.y];
        },
        panChanged: function () {
            // Send pan back to React
            if (!this.properties.appView) {
                return;
            }
            this.properties.appView.setState({
                x: this.properties.pan[0],
                y: this.properties.pan[1]
            });
        },
        getScale: function () {
            if (!this.properties.appView) {
                return 1;
            }
            return this.properties.appView.state.scale;
        },
        displaySelectionGroupChanged: function () {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setState({
                displaySelectionGroup: this.properties.displaySelectionGroup
            });
        },
        forceSelectionChanged: function () {
            if (!this.properties.graphView) {
                return;
            }
            this.properties.graphView.setState({
                forceSelection: this.properties.forceSelection
            });
        },
        focusNode: function (node) {
            this.properties.appView.focusNode(node);
        },
        menusChanged: function () {
            // Only if the object itself changes,
            // otherwise builds menu from reference every time menu shown
            if (!this.properties.appView) {
                return;
            }
            this.properties.appView.setProps({menus: this.properties.menus});
        },
        debounceLibraryRefeshTimer: null,
        debounceLibraryRefesh: function () {
            // Breaking the "no debounce" rule, this fixes #76 for subgraphs
            if (this.debounceLibraryRefeshTimer) {
                clearTimeout(this.debounceLibraryRefeshTimer);
            }
            this.debounceLibraryRefeshTimer = setTimeout(function () {
                this.rerender({libraryDirty: true});
            }.bind(this), 200);
        },
        mergeComponentDefinition: function (component, definition) {
            // In cases where a component / subgraph ports change,
            // we don't want the connections hanging in middle of node
            // TODO visually indicate that port is a ghost
            if (component === definition) {
                return definition;
            }
            var _i, _j, _len, _len1, exists;
            var cInports = component.inports;
            var dInports = definition.inports;

            if (cInports !== dInports) {
                for (_i = 0, _len = cInports.length; _i < _len; _i++) {
                    var cInport = cInports[_i];
                    exists = false;
                    for (_j = 0, _len1 = dInports.length; _j < _len1; _j++) {
                        var dInport = dInports[_j];
                        if (cInport.name === dInport.name) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        dInports.push(cInport);
                    }
                }
            }

            var cOutports = component.outports;
            var dOutports = definition.outports;

            if (cOutports !== dOutports) {
                for (_i = 0, _len = cOutports.length; _i < _len; _i++) {
                    var cOutport = cOutports[_i];
                    exists = false;
                    for (_j = 0, _len1 = dOutports.length; _j < _len1; _j++) {
                        var dOutport = dOutports[_j];
                        if (cOutport.name === dOutport.name) {
                            exists = true;
                        }
                    }
                    if (!exists) {
                        dOutports.push(cOutport);
                    }
                }
            }

            // we should use the icon from the library
            definition.icon = component.icon;
            // a component could also define a svg icon
            definition.iconsvg = component.iconsvg;

            return definition;
        },
        registerComponent: function (definition, generated) {
            console.log("inside registerComponent");
            var component = this.properties.library[definition.name];
            var def = definition;
            if (component) {
                def = this.mergeComponentDefinition(component, definition);
            }
            this.properties.library[definition.name] = def;
            // So changes are rendered
            this.debounceLibraryRefesh();
        },
        getComponent: function (name) {
            return this.properties.library[name];
        },
        toJSON: function () {
            if (!this.properties.graph) {
                return {};
            }
            return this.properties.graph.toJSON();

        }
    };

    window.graph = theGraphHTMLRewrittenAsJSObject;

    //window.graph.created(); /* Replacing with the appropriate event firing */
    window.addEventListener('GraphCreated', window.graph.created.bind(window.graph));
    window.dispatchEvent(customGraphCreated);

    window.addEventListener('GraphReady', window.graph.ready.bind(window.graph));
    window.dispatchEvent(customGraphReady); /* Gets run after the klay init function, which gets called in created */

    //theGraphHTMLRewrittenAsJSObject.checkFunction();
    //theGraphHTMLRewrittenAsJSObject.themeChanged();
    //theGraphHTMLRewrittenAsJSObject.checkFunction();

    window.addEventListener('GraphWidthChanged', window.graph.widthChanged.bind(window.graph));
    window.addEventListener('GraphHeightChanged', window.graph.heightChanged.bind(window.graph));
    window.addEventListener('GraphGraphChanged', window.graph.graphChanged.bind(window.graph));

    window.addEventListener('EditorAttachedHasRan', window.graph.themeChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.selectedNodesChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.errorNodesChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.selectedEdgesChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.animatedEdgesChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.panChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.menusChanged.bind(window.graph));
    window.addEventListener('EditorAttachedHasRan', window.graph.selectedNodesHashChanged.bind(window.graph));

    /* Replacement for 'graphInitialised' event */
    window.addEventListener('GraphPropertyGraph', window.graph.changeGraphProperty.bind(window.graph));






    console.log("at the end of the IIFE in graphHTMLEditedInJS");
    //console.log("here's theGraphHTMLEditedObject:");
    //console.log(theGraphHTMLRewrittenAsJSObject);

    //(function () {
    //
    //    console.log("inside the self executing function in graph");
    //    console.log("here's the this inside graphHTMLRewrittenInJS:");
    //    console.log(this);
    //    "use strict";
    //
    //    var object = {
    //        graph: null,
    //        library: null,
    //        menus: null,
    //        width: 800,
    //        height: 600,
    //        scale: 1,
    //        appView: null,
    //        graphView: null,
    //        editable: true,
    //        autolayout: false,
    //        grid: 72,
    //        snap: 36,
    //        theme: "dark",
    //        selectedNodes: [],
    //        selectedNodesHash: {},
    //        errorNodes: {},
    //        selectedEdges: [],
    //        animatedEdges: [],
    //        autolayouter: null,
    //        displaySelectionGroup: true,
    //        forceSelection: false,
    //        offsetY: null,
    //        offsetX: null,
    //        created: function () {
    //            this.library = {};
    //            // Default pan
    //            this.pan = [0, 0];
    //            // Initializes the autolayouter
    //            this.autolayouter = klayNoflo.init({
    //                onSuccess: this.applyAutolayout.bind(this),
    //                workerScript: "../bower_components/klayjs/klay.js"
    //            });
    //        },
    //        ready: function () {
    //            console.log("here's the this inside inside graphHTMLRewrittenInJS:");
    //            console.log(this);
    //            this.themeChanged();
    //        },
    //        themeChanged: function () {
    //            this.$.svgcontainer.className = "the-graph-" + this.theme;
    //        },
    //        graphChanged: function (oldGraph, newGraph) {
    //            if (oldGraph && oldGraph.removeListener) {
    //                oldGraph.removeListener("endTransaction", this.fireChanged);
    //            }
    //            // Listen for graph changes
    //            this.graph.on("endTransaction", this.fireChanged.bind(this));
    //
    //            // Listen for autolayout changes
    //            if (this.autolayout) {
    //                this.graph.on('addNode', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeNode', this.triggerAutolayout.bind(this));
    //                this.graph.on('addInport', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeInport', this.triggerAutolayout.bind(this));
    //                this.graph.on('addOutport', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeOutport', this.triggerAutolayout.bind(this));
    //                this.graph.on('addEdge', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeEdge', this.triggerAutolayout.bind(this));
    //            }
    //
    //            if (this.appView) {
    //                // Remove previous instance
    //                React.unmountComponentAtNode(this.$.svgcontainer);
    //            }
    //
    //            // Setup app
    //            console.log("here's the this inside graphHTMLRewrittenInJS:")
    //            console.log(this);
    //            this.$.svgcontainer.innerHTML = "";
    //            this.appView = React.render(
    //                window.TheGraph.App({
    //                    graph: this.graph,
    //                    width: this.width,
    //                    height: this.height,
    //                    library: this.library,
    //                    menus: this.menus,
    //                    editable: this.editable,
    //                    onEdgeSelection: this.onEdgeSelection.bind(this),
    //                    onNodeSelection: this.onNodeSelection.bind(this),
    //                    onPanScale: this.onPanScale.bind(this),
    //                    getMenuDef: this.getMenuDef,
    //                    displaySelectionGroup: this.displaySelectionGroup,
    //                    forceSelection: this.forceSelection,
    //                    offsetY: this.offsetY,
    //                    offsetX: this.offsetX
    //                }),
    //                this.$.svgcontainer
    //            );
    //            this.graphView = this.appView.refs.graph;
    //        },
    //        onPanScale: function (x, y, scale) {
    //            this.pan[0] = x;
    //            this.pan[1] = y;
    //            this.scale = scale;
    //        },
    //        onEdgeSelection: function (itemKey, item, toggle) {
    //            if (itemKey === undefined) {
    //                if (this.selectedEdges.length > 0) {
    //                    this.selectedEdges = [];
    //                }
    //                this.fire('edges', this.selectedEdges);
    //                return;
    //            }
    //            if (toggle) {
    //                var index = this.selectedEdges.indexOf(item);
    //                var isSelected = (index !== -1);
    //                var shallowClone = this.selectedEdges.slice();
    //                if (isSelected) {
    //                    shallowClone.splice(index, 1);
    //                    this.selectedEdges = shallowClone;
    //                } else {
    //                    shallowClone.push(item);
    //                    this.selectedEdges = shallowClone;
    //                }
    //            } else {
    //                this.selectedEdges = [item];
    //            }
    //            this.fire('edges', this.selectedEdges);
    //        },
    //        onNodeSelection: function (itemKey, item, toggle) {
    //            if (itemKey === undefined) {
    //                this.selectedNodes = [];
    //            } else if (toggle) {
    //                var index = this.selectedNodes.indexOf(item);
    //                var isSelected = (index !== -1);
    //                if (isSelected) {
    //                    this.selectedNodes.splice(index, 1);
    //                } else {
    //                    this.selectedNodes.push(item);
    //                }
    //            } else {
    //                this.selectedNodes = [item];
    //            }
    //            this.fire('nodes', this.selectedNodes);
    //        },
    //        selectedNodesChanged: function () {
    //            var selectedNodesHash = {};
    //            for (var i = 0, len = this.selectedNodes.length; i < len; i++) {
    //                selectedNodesHash[this.selectedNodes[i].id] = true;
    //            }
    //            this.selectedNodesHash = selectedNodesHash;
    //            this.fire('nodes', this.selectedNodes);
    //        },
    //        selectedNodesHashChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setSelectedNodes(this.selectedNodesHash);
    //        },
    //        errorNodesChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setErrorNodes(this.errorNodes);
    //        },
    //        selectedEdgesChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setSelectedEdges(this.selectedEdges);
    //            this.fire('edges', this.selectedEdges);
    //        },
    //        animatedEdgesChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setAnimatedEdges(this.animatedEdges);
    //        },
    //        fireChanged: function (event) {
    //            this.fire("changed", this);
    //        },
    //        autolayoutChanged: function () {
    //            if (!this.graph) {
    //                return;
    //            }
    //            // Only listen to changes that affect layout
    //            if (this.autolayout) {
    //                this.graph.on('addNode', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeNode', this.triggerAutolayout.bind(this));
    //                this.graph.on('addInport', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeInport', this.triggerAutolayout.bind(this));
    //                this.graph.on('addOutport', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeOutport', this.triggerAutolayout.bind(this));
    //                this.graph.on('addEdge', this.triggerAutolayout.bind(this));
    //                this.graph.on('removeEdge', this.triggerAutolayout.bind(this));
    //            } else {
    //                this.graph.removeListener('addNode', this.triggerAutolayout);
    //                this.graph.removeListener('removeNode', this.triggerAutolayout);
    //                this.graph.removeListener('addInport', this.triggerAutolayout);
    //                this.graph.removeListener('removeInport', this.triggerAutolayout);
    //                this.graph.removeListener('addOutport', this.triggerAutolayout);
    //                this.graph.removeListener('removeOutport', this.triggerAutolayout);
    //                this.graph.removeListener('addEdge', this.triggerAutolayout);
    //                this.graph.removeListener('removeEdge', this.triggerAutolayout);
    //            }
    //        },
    //        triggerAutolayout: function (event) {
    //            var graph = this.graph;
    //            var portInfo = this.graphView ? this.graphView.portInfo : null;
    //            // Calls the autolayouter
    //            this.autolayouter.layout({
    //                "graph": graph,
    //                "portInfo": portInfo,
    //                "direction": "RIGHT",
    //                "options": {
    //                    "intCoordinates": true,
    //                    "algorithm": "de.cau.cs.kieler.klay.layered",
    //                    "layoutHierarchy": true,
    //                    "spacing": 36,
    //                    "borderSpacing": 20,
    //                    "edgeSpacingFactor": 0.2,
    //                    "inLayerSpacingFactor": 2.0,
    //                    "nodePlace": "BRANDES_KOEPF",
    //                    "nodeLayering": "NETWORK_SIMPLEX",
    //                    "edgeRouting": "POLYLINE",
    //                    "crossMin": "LAYER_SWEEP",
    //                    "direction": "RIGHT"
    //                }
    //            });
    //        },
    //        applyAutolayout: function (layoutedKGraph) {
    //            this.graph.startTransaction("autolayout");
    //
    //            // Update original graph nodes with the new coordinates from KIELER graph
    //            var children = layoutedKGraph.children.slice();
    //
    //            var i, len;
    //            for (i = 0, len = children.length; i < len; i++) {
    //                var klayNode = children[i];
    //                var nofloNode = this.graph.getNode(klayNode.id);
    //
    //                // Encode nodes inside groups
    //                if (klayNode.children) {
    //                    var klayChildren = klayNode.children;
    //                    var idx;
    //                    for (idx in klayChildren) {
    //                        var klayChild = klayChildren[idx];
    //                        if (klayChild.id) {
    //                            this.graph.setNodeMetadata(klayChild.id, {
    //                                x: Math.round((klayNode.x + klayChild.x) / this.snap) * this.snap,
    //                                y: Math.round((klayNode.y + klayChild.y) / this.snap) * this.snap
    //                            });
    //                        }
    //                    }
    //                }
    //
    //                // Encode nodes outside groups
    //                if (nofloNode) {
    //                    this.graph.setNodeMetadata(klayNode.id, {
    //                        x: Math.round(klayNode.x / this.snap) * this.snap,
    //                        y: Math.round(klayNode.y / this.snap) * this.snap
    //                    });
    //                } else {
    //                    // Find inport or outport
    //                    var idSplit = klayNode.id.split(":::");
    //                    var expDirection = idSplit[0];
    //                    var expKey = idSplit[1];
    //                    if (expDirection === "inport" && this.graph.inports[expKey]) {
    //                        this.graph.setInportMetadata(expKey, {
    //                            x: Math.round(klayNode.x / this.snap) * this.snap,
    //                            y: Math.round(klayNode.y / this.snap) * this.snap
    //                        });
    //                    } else if (expDirection === "outport" && this.graph.outports[expKey]) {
    //                        this.graph.setOutportMetadata(expKey, {
    //                            x: Math.round(klayNode.x / this.snap) * this.snap,
    //                            y: Math.round(klayNode.y / this.snap) * this.snap
    //                        });
    //                    }
    //                }
    //            }
    //
    //            this.graph.endTransaction("autolayout");
    //
    //            // Fit to window
    //            this.triggerFit();
    //
    //        },
    //        triggerFit: function () {
    //            if (this.appView) {
    //                this.appView.triggerFit();
    //            }
    //        },
    //        widthChanged: function () {
    //            if (!this.appView) {
    //                return;
    //            }
    //            this.appView.setState({
    //                width: this.width
    //            });
    //        },
    //        heightChanged: function () {
    //            if (!this.appView) {
    //                return;
    //            }
    //            this.appView.setState({
    //                height: this.height
    //            });
    //        },
    //        updateIcon: function (nodeId, icon) {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.updateIcon(nodeId, icon);
    //        },
    //        rerender: function (options) {
    //            // This is throttled with rAF internally
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.markDirty(options);
    //        },
    //        addNode: function (id, component, metadata) {
    //            if (!this.graph) {
    //                return;
    //            }
    //            this.graph.addNode(id, component, metadata);
    //        },
    //        getPan: function () {
    //            if (!this.appView) {
    //                return [0, 0];
    //            }
    //            return [this.appView.state.x, this.appView.state.y];
    //        },
    //        panChanged: function () {
    //            // Send pan back to React
    //            if (!this.appView) {
    //                return;
    //            }
    //            this.appView.setState({
    //                x: this.pan[0],
    //                y: this.pan[1]
    //            });
    //        },
    //        getScale: function () {
    //            if (!this.appView) {
    //                return 1;
    //            }
    //            return this.appView.state.scale;
    //        },
    //        displaySelectionGroupChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setState({
    //                displaySelectionGroup: this.displaySelectionGroup
    //            });
    //        },
    //        forceSelectionChanged: function () {
    //            if (!this.graphView) {
    //                return;
    //            }
    //            this.graphView.setState({
    //                forceSelection: this.forceSelection
    //            });
    //        },
    //        focusNode: function (node) {
    //            this.appView.focusNode(node);
    //        },
    //        menusChanged: function () {
    //            // Only if the object itself changes,
    //            // otherwise builds menu from reference every time menu shown
    //            if (!this.appView) {
    //                return;
    //            }
    //            this.appView.setProps({menus: this.menus});
    //        },
    //        debounceLibraryRefeshTimer: null,
    //        debounceLibraryRefesh: function () {
    //            // Breaking the "no debounce" rule, this fixes #76 for subgraphs
    //            if (this.debounceLibraryRefeshTimer) {
    //                clearTimeout(this.debounceLibraryRefeshTimer);
    //            }
    //            this.debounceLibraryRefeshTimer = setTimeout(function () {
    //                this.rerender({libraryDirty: true});
    //            }.bind(this), 200);
    //        },
    //        mergeComponentDefinition: function (component, definition) {
    //            // In cases where a component / subgraph ports change,
    //            // we don't want the connections hanging in middle of node
    //            // TODO visually indicate that port is a ghost
    //            if (component === definition) {
    //                return definition;
    //            }
    //            var _i, _j, _len, _len1, exists;
    //            var cInports = component.inports;
    //            var dInports = definition.inports;
    //
    //            if (cInports !== dInports) {
    //                for (_i = 0, _len = cInports.length; _i < _len; _i++) {
    //                    var cInport = cInports[_i];
    //                    exists = false;
    //                    for (_j = 0, _len1 = dInports.length; _j < _len1; _j++) {
    //                        var dInport = dInports[_j];
    //                        if (cInport.name === dInport.name) {
    //                            exists = true;
    //                        }
    //                    }
    //                    if (!exists) {
    //                        dInports.push(cInport);
    //                    }
    //                }
    //            }
    //
    //            var cOutports = component.outports;
    //            var dOutports = definition.outports;
    //
    //            if (cOutports !== dOutports) {
    //                for (_i = 0, _len = cOutports.length; _i < _len; _i++) {
    //                    var cOutport = cOutports[_i];
    //                    exists = false;
    //                    for (_j = 0, _len1 = dOutports.length; _j < _len1; _j++) {
    //                        var dOutport = dOutports[_j];
    //                        if (cOutport.name === dOutport.name) {
    //                            exists = true;
    //                        }
    //                    }
    //                    if (!exists) {
    //                        dOutports.push(cOutport);
    //                    }
    //                }
    //            }
    //
    //            // we should use the icon from the library
    //            definition.icon = component.icon;
    //            // a component could also define a svg icon
    //            definition.iconsvg = component.iconsvg;
    //
    //            return definition;
    //        },
    //        registerComponent: function (definition, generated) {
    //            console.log("inside registerComponent")
    //            var component = this.library[definition.name];
    //            var def = definition;
    //            if (component) {
    //                def = this.mergeComponentDefinition(component, definition);
    //            }
    //            this.library[definition.name] = def;
    //            // So changes are rendered
    //            this.debounceLibraryRefesh();
    //        },
    //        getComponent: function (name) {
    //            return this.library[name];
    //        },
    //        toJSON: function () {
    //            if (!this.graph) {
    //                return {};
    //            }
    //            return this.graph.toJSON();
    //        }
    //    };
    //
    //    console.log("at the end of the IIFE in graphHTMLEditedInJS");
    //    console.log("here's theGraphHTMLEditedObject:");
    //    console.log(theGraphHTMLRewrittenAsJSObject);
    //
    //})()

})();


