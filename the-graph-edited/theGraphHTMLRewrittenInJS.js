/**
* Created by twi18192 on 28/10/15.
*/

(function() {

    require('./getAllJavascriptFiles');

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
            this.properties.library = {};
            // Default pan
            this.properties.pan = [0, 0];
            // Initializes the autolayouter
            this.properties.autolayouter = klayNoflo.init({
                onSuccess: this.applyAutolayout.bind(this), /* I think that the 'this' in the bind fucntion is referring to the window, so it may be a good idea to pass it window or something */
                workerScript: "../bower_components/klayjs/klay.js"
            });
        },

        ready: function () {
            this.themeChanged();
        },

        themeChanged: function () {
            window.svgcontainer.className = "the-graph-" + this.properties.theme;
        },

        graphChanged: function (oldGraph, newGraph) {
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

            window.editor.passingPropertiesToGraph();

            window.svgcontainer.innerHTML = "";
            this.properties.appView = React.render(
                window.TheGraph.App({
                    graph: this.properties.graph,
                    width: this.properties.width,
                    height: this.properties.height,
                    library: this.properties.library,
                    menus: this.properties.menus,
                    editable: this.properties.editable,
                    onEdgeSelection: this.onEdgeSelection.bind(this),
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
            this.properties.graphView = this.properties.appView.refs.graph;

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
            var graph = this.properties.graph;

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
            if (!this.properties.appView) {
                return;
            }
            this.properties.appView.setState({
                width: this.properties.width
            });
        },
        heightChanged: function () {
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

})();


