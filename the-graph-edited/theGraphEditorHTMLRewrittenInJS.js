/**
* Created by twi18192 on 28/10/15.
*/

(function () {

    var graph = require('./theGraphHTMLRewrittenInJS.js');

    console.log("inside the self executing function in editor");
    //"use strict";
    console.log("here's 'this' outisde the Polymer function, but inside graph-editor.html:");
    console.log(this);

    var theGraphEditorHTMLRewrittenAsJSObject = {

        //graph: (function(){
        //
        //    require('./theGraphHTMLRewrittenInJS.js');
        //    console.log("testing if IIFE's work inside objects, editor rewritten in html")
        //
        //})(),


        checkFunction: function () {

            console.log(this.properties);
            console.log(this);
        },

        passingPropertiesToGraph: function(){
            window.graph.properties.width = this.properties.width;
            window.graph.properties.height = this.properties.height;
            window.graph.properties.menus = this.properties.menus;
            window.graph.properties.scale = this.properties.scale;
            window.graph.properties.autolayout = this.properties.autolayout;
            window.graph.properties.theme = this.properties.theme;
            window.graph.properties.selectedNodes = this.properties.selectedNodes;
            window.graph.properties.errorNodes = this.properties.errorNodes;
            window.graph.properties.selectedEdges = this.properties.selectedEdges;
            window.graph.properties.animatedEdges = this.properties.animatedEdges;
            window.graph.properties.displaySelectionGroup = this.properties.displaySelectionGroup;
            window.graph.properties.forceSelection = this.properties.forceSelection;
            //window.graph['getMenuDef'] = window.editor.getMenuDef.bind(window.graph);
        },

        properties: {
            graph: null,
            grid: 72,
            snap: 36,
            width: 800,
            height: 600,
            scale: 1,
            plugins: {},
            nofloGraph: null,
            menus: null,
            autolayout: false,
            theme: "dark",
            selectedNodes: [],
            copyNodes: [],
            errorNodes: {},
            selectedEdges: [],
            animatedEdges: [],
            displaySelectionGroup: true,
            forceSelection: false
        },

        created: function () {
            console.log("inside the created function in editor");
            this.pan = [0, 0]; /* Hmm, pan isn't in properties, what is this referring to then? */
            var pasteAction = function (graph, itemKey, item) {
                console.log("inside pasteAction");
                console.log(graph);
                console.log(itemKey);
                console.log(item);
                var pasted = TheGraph.Clipboard.paste(graph);
                this.properties.selectedNodes = pasted.nodes;
                console.log(this.properties.selectedNodes);
                this.properties.selectedEdges = [];
                console.log(this.properties.selectedEdges)
            }.bind(this); /* Similar to the bind(this) in graph.html, they refer to the <the-graph-editor> custom element here, so I'm gonna have to change this to something else, I just don't know what... */
            var pasteMenu = {
                icon: "paste",
                iconLabel: "paste",
                action: pasteAction
            };
            // Default context menu defs
            this.properties.menus = {
                main: {
                    icon: "sitemap",
                    e4: pasteMenu
                },
                edge: {
                    icon: "long-arrow-right",
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
                            // Remove selection
                            var newSelection = [];
                            for (var i = 0, len = this.properties.selectedEdges.length; i < len; i++) {
                                var selected = this.properties.selectedEdges[i];
                                if (selected !== item) {
                                    console.log(item);
                                    newSelection.push(selected);
                                }
                            }
                            this.properties.selectedEdges = newSelection;
                        }.bind(this)
                    }
                },
                node: {
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeNode(itemKey);
                            // Remove selection
                            var newSelection = [];
                            for (var i = 0, len = this.properties.selectedNodes.length; i < len; i++) {
                                var selected = this.properties.selectedNodes[i];
                                if (selected !== item) {
                                    newSelection.push(selected);
                                }
                            }
                            this.properties.selectedNodes = newSelection;
                        }.bind(this)
                    },
                    w4: {
                        icon: "copy",
                        iconLabel: "copy",
                        action: function (graph, itemKey, item) {
                            TheGraph.Clipboard.copy(graph, [itemKey]);
                        }
                    }
                },
                nodeInport: {
                    w4: {
                        icon: "sign-in",
                        iconLabel: "export",
                        action: function (graph, itemKey, item) {
                            console.log("here is the item for nodeInport");
                            console.log(item);
                            console.log(graph);
                            console.log(itemKey);
                            console.log(item.port);
                            console.log(item.process);
                            console.log(graph.inports);
                            var pub = item.port;
                            if (pub === 'start') {
                                pub = 'start1';
                            }
                            if (pub === 'graph') {
                                pub = 'graph1';
                            }
                            var count = 0;
                            // Make sure public is unique
                            while (graph.inports[pub]) {
                                count++;
                                pub = item.port + count;
                            }
                            var priNode = graph.getNode(item.process);
                            var metadata = {x: priNode.metadata.x - 144, y: priNode.metadata.y};
                            graph.addInport(pub, item.process, item.port, metadata);
                        }
                    }
                },
                nodeOutport: {
                    e4: {
                        icon: "sign-out",
                        iconLabel: "export",
                        action: function (graph, itemKey, item) {
                            var pub = item.port;
                            var count = 0;
                            // Make sure public is unique
                            while (graph.outports[pub]) {
                                count++;
                                pub = item.port + count;
                            }
                            var priNode = graph.getNode(item.process);
                            var metadata = {x: priNode.metadata.x + 144, y: priNode.metadata.y};
                            graph.addOutport(pub, item.process, item.port, metadata);
                        }
                    }
                },
                graphInport: {
                    icon: "sign-in",
                    iconColor: 2,
                    n4: {
                        label: "inport"
                    },
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeInport(itemKey);
                        }
                    }
                },
                graphOutport: {
                    icon: "sign-out",
                    iconColor: 5,
                    n4: {
                        label: "outport"
                    },
                    s4: {
                        icon: "trash-o",
                        iconLabel: "delete",
                        action: function (graph, itemKey, item) {
                            graph.removeOutport(itemKey);
                        }
                    }
                },
                group: {
                    icon: "th",
                    s4: {
                        icon: "trash-o",
                        iconLabel: "ungroup",
                        action: function (graph, itemKey, item) {
                            graph.removeGroup(itemKey);
                        }
                    },
                    // TODO copy group?
                    e4: pasteMenu
                },
                selection: {
                    icon: "th",
                    w4: {
                        icon: "copy",
                        iconLabel: "copy",
                        action: function (graph, itemKey, item) {
                            TheGraph.Clipboard.copy(graph, item.nodes);
                        }
                    },
                    e4: pasteMenu
                }
            };
        },

        ready: function () {
            console.log("inside the ready function in editor")
        },
        attached: function () {
            console.log("inside the attached function in editor");
            //window.dispatchEvent(customEditorAttached);
            /* So in here are all the event fires that run when editor's attached function runs */
            window.dispatchEvent(customEditorAttachedHasRan)
        },
        detached: function () {
            for (var name in this.properties.plugins) {
                console.log("inside detached fucntion in editor");
                this.properties.plugins[name].unregister(this);
                delete this.properties.plugins[name];
            }
        },
        addPlugin: function (name, plugin) {
            this.properties.plugins[name] = plugin;
            plugin.register(this);
        },
        addMenu: function (type, options) {
            // options: icon, label
            this.properties.menus[type] = options;
        },
        addMenuCallback: function (type, callback) {
            if (!this.properties.menus[type]) {
                return;
            }
            this.properties.menus[type].callback = callback;
        },
        addMenuAction: function (type, direction, options) {
            if (!this.properties.menus[type]) {
                this.properties.menus[type] = {};
            }
            var menu = this.properties.menus[type];
            menu[direction] = options;
        },
        getMenuDef: function (options) {
            console.log("inside getMenuDef:");
            console.log(options);
            console.log(typeof options.type);
            // Options: type, graph, itemKey, item
            console.log(this);
            console.log(window.graph);
            if (options.type && this.properties.menus[options.type]) {
                console.log(this);
                var defaultMenu = this.properties.menus[options.type];
                if (defaultMenu.callback) {
                    return defaultMenu.callback(defaultMenu, options);
                }
                return defaultMenu;
            }
            return null;
        },
        widthChanged: function () {
            console.log("inside width changed in editor");
            //console.log("here's TESTDIV's style:");
            //console.log(TESTDIV.style);
            //window.TESTDIV.style.width = this.properties.width + "px";
            //window.graph.widthChanged();
            //console.log(TESTDIV.style);
            console.log("here's the editor html element's style attribute:");
            console.log(window.editorMockDOMNode.style);

            //alert("caller is " + arguments.callee.caller.toString());

            window.editorMockDOMNode.style.width = this.properties.width + "px";
            console.log(window.editorMockDOMNode);

            //this.style.width = this.properties.width + "px";

        },
        heightChanged: function () {
            console.log("inside heightChanged in editor");
            //this.style.height = this.properties.height + "px";
            window.editorMockDOMNode.style.height = this.properties.height + "px";

        },

        graphChanged: function () {
            console.log("inside graphChanged in editor");
            if (typeof this.properties.graph.addNode === 'function') {
                console.log("inside the if statement of graphChanged");
                //this.buildInitialLibrary(this.properties.graph);
                this.properties.nofloGraph = this.properties.graph;
                return;
            }
            else{
                console.log("typeof this.properties.graph.addNode !== function")
            }
            var noflo;
            if ('noflo' in window) {
                noflo = window.noflo;
            }
            if (!noflo && 'require' in window) {
                noflo = require('noflo');
            }
            if (!noflo) {
                console.warn('Missing noflo dependency! Should be built with Component.io or Browserify to require it.');
                return;
            }
            noflo.graph.loadJSON(this.properties.graph, function (nofloGraph) {
                console.log("inside noflo.graph.loadJSON in editor");
                //this.buildInitialLibrary(nofloGraph);
                console.log("here's the input nofloGraph:");
                console.log(nofloGraph);
                console.log("here's nofloGraph before:");
                console.log(this.properties.nofloGraph);
                this.properties.nofloGraph = nofloGraph;
                console.log("here's nofloGraph after:");
                console.log(this.properties.nofloGraph);

                /* Setting 'this.properties.graph' in graphRewritten as the same as nofloGraph here as a temporary fix, when I've gotten eevrything working I'll begin to properly place everything */

                console.log(window.graph.properties.graph);
                //window.graph.properties.graph = nofloGraph;

                //console.log(window.testingDiv);
                //window.testingDiv.fire('graphInitialised', this);
                window.dispatchEvent(customGraphPropertyGraph);
                console.log(window.graph.properties.graph);


            }.bind(this));
        },

        buildInitialLibrary: function (nofloGraph) {
            console.log("inside buildInitialLibrary")
            /*if (Object.keys(this.$.graph.library).length !== 0) {
             // We already have a library, skip
             // TODO what about loading a new graph? Are we making a new editor?
             return;
             }*/
            nofloGraph.nodes.forEach(function (node) {
                console.log("inside the nofloGraph.forEach command in editor")
                var component = {
                    name: node.component,
                    icon: 'cog',
                    description: '',
                    inports: [],
                    outports: []
                };
                Object.keys(nofloGraph.inports).forEach(function (pub) {
                    var exported = nofloGraph.inports[pub];
                    if (exported.process === node.id) {
                        for (var i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === exported.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: exported.port,
                            type: 'all'
                        });
                    }
                });
                Object.keys(nofloGraph.outports).forEach(function (pub) {
                    var exported = nofloGraph.outports[pub];
                    if (exported.process === node.id) {
                        for (var i = 0; i < component.outports.length; i++) {
                            if (component.outports[i].name === exported.port) {
                                return;
                            }
                        }
                        component.outports.push({
                            name: exported.port,
                            type: 'all'
                        });
                    }
                });
                nofloGraph.initializers.forEach(function (iip) {
                    if (iip.to.node === node.id) {
                        for (var i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === iip.to.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: iip.to.port,
                            type: 'all'
                        });
                    }
                });
                nofloGraph.edges.forEach(function (edge) {
                    var i;
                    if (edge.from.node === node.id) {
                        for (i = 0; i < component.outports.length; i++) {
                            if (component.outports[i].name === edge.from.port) {
                                return;
                            }
                        }
                        component.outports.push({
                            name: edge.from.port,
                            type: 'all'
                        });
                    }
                    if (edge.to.node === node.id) {
                        for (i = 0; i < component.inports.length; i++) {
                            if (component.inports[i].name === edge.to.port) {
                                return;
                            }
                        }
                        component.inports.push({
                            name: edge.to.port,
                            type: 'all'
                        });
                    }
                });
                this.registerComponent(component, true);
            }.bind(this));
        },

        /* Gap where buildInitialLibrary was */

        registerComponent: function (definition, generated) {
            console.log("inisde registerComponent in editor");
            window.graph.registerComponent(definition, generated);
        },
        libraryRefresh: function () {
            window.graph.debounceLibraryRefesh();
        },
        updateIcon: function (nodeId, icon) {
            window.graph.updateIcon(nodeId, icon);
        },
        rerender: function () {
            //console.log("here's this.$.graph:");
            //console.log(window.graph);
            //console.log("checking if theGraphHTMLRewrittenAsJSObject exists in editor.html:");
            //console.log(window.graph);
            //console.log("here's 'this.$' in editor.html:");
            //console.log(this.$);
            window.graph.rerender();
        },
        triggerAutolayout: function () {
            window.graph.triggerAutolayout();
        },
        triggerFit: function () {
            window.graph.triggerFit();
        },
        animateEdge: function (edge) {
            // Make sure unique
            var index = this.properties.animatedEdges.indexOf(edge);
            if (index === -1) {
                this.properties.animatedEdges.push(edge);
            }
        },
        unanimateEdge: function (edge) {
            var index = this.properties.animatedEdges.indexOf(edge);
            if (index >= 0) {
                this.properties.animatedEdges.splice(index, 1);
            }
        },
        addErrorNode: function (id) {
            this.properties.errorNodes[id] = true;
            this.updateErrorNodes();
        },
        removeErrorNode: function (id) {
            this.properties.errorNodes[id] = false;
            this.updateErrorNodes();
        },
        clearErrorNodes: function () {
            this.properties.errorNodes = {};
            this.updateErrorNodes();
        },
        updateErrorNodes: function () {
            window.graph.errorNodesChanged();
        },
        focusNode: function (node) {
            window.graph.focusNode(node);
        },
        getComponent: function (name) {
            return window.graph.getComponent(name);
        },
        getLibrary: function () {
            return window.graph.library;
        },
        toJSON: function () {
            return this.properties.nofloGraph.toJSON();
        }

    };

    window.editor = theGraphEditorHTMLRewrittenAsJSObject;
    //theGraphEditorHTMLRewrittenAsJSObject.graphChanged();

    /* Add the event listeners here? (Also, do you add the event listener to the window, or something else?)*/

    window.addEventListener('EditorCreated', window.editor.created.bind(window.editor));
    window.dispatchEvent(customEditorCreated);

    window.addEventListener('EditorReady', window.editor.ready.bind(window.editor));
    window.dispatchEvent(customEditorReady);

    window.addEventListener('EditorAttached', window.editor.attached.bind(window.editor));
    window.dispatchEvent(customEditorAttached);

    window.addEventListener('EditorWidthChanged', window.editor.widthChanged.bind(window.editor));
    window.addEventListener('EditorHeightChanged', window.editor.heightChanged.bind(window.editor));
    window.addEventListener('EditorGraphChanged', window.editor.graphChanged.bind(window.editor));


    //console.log("here's just after theGraphEditorHTMLRewrittenAsJSObject is defined in editorHTMLRewritten");

//    (function() {
//
//        var object = {
//
//            graph: null,
//            grid: 72,
//            snap: 36,
//            width: 800,
//            height: 600,
//            scale: 1,
//            plugins: {},
//            nofloGraph: null,
//            menus: null,
//            autolayout: false,
//            theme: "dark",
//            selectedNodes: [],
//            copyNodes: [],
//            errorNodes: {},
//            selectedEdges: [],
//            animatedEdges: [],
//            displaySelectionGroup: true,
//            forceSelection: false,
//            created: function () {
//                console.log("inside the created function in editor");
//                console.log("here's the value of this inside the Polymer function:");
//                console.log(this);
//                this.pan = [0, 0];
//                var pasteAction = function (graph, itemKey, item) {
//                    console.log("inside pasteAction");
//                    console.log(graph)
//                    console.log(itemKey);
//                    console.log(item)
//                    var pasted = TheGraph.Clipboard.paste(graph);
//                    this.selectedNodes = pasted.nodes;
//                    console.log(this.selectedNodes)
//                    this.selectedEdges = [];
//                    console.log(this.selectedEdges)
//                }.bind(this);
//                var pasteMenu = {
//                    icon: "paste",
//                    iconLabel: "paste",
//                    action: pasteAction
//                };
//                // Default context menu defs
//                this.menus = {
//                    main: {
//                        icon: "sitemap",
//                        e4: pasteMenu
//                    },
//                    edge: {
//                        icon: "long-arrow-right",
//                        s4: {
//                            icon: "trash-o",
//                            iconLabel: "delete",
//                            action: function (graph, itemKey, item) {
//                                graph.removeEdge(item.from.node, item.from.port, item.to.node, item.to.port);
//                                // Remove selection
//                                var newSelection = [];
//                                for (var i = 0, len = this.selectedEdges.length; i < len; i++) {
//                                    var selected = this.selectedEdges[i];
//                                    if (selected !== item) {
//                                        console.log(item)
//                                        newSelection.push(selected);
//                                    }
//                                }
//                                this.selectedEdges = newSelection;
//                            }.bind(this)
//                        }
//                    },
//                    node: {
//                        s4: {
//                            icon: "trash-o",
//                            iconLabel: "delete",
//                            action: function (graph, itemKey, item) {
//                                graph.removeNode(itemKey);
//                                // Remove selection
//                                var newSelection = [];
//                                for (var i = 0, len = this.selectedNodes.length; i < len; i++) {
//                                    var selected = this.selectedNodes[i];
//                                    if (selected !== item) {
//                                        newSelection.push(selected);
//                                    }
//                                }
//                                this.selectedNodes = newSelection;
//                            }.bind(this)
//                        },
//                        w4: {
//                            icon: "copy",
//                            iconLabel: "copy",
//                            action: function (graph, itemKey, item) {
//                                TheGraph.Clipboard.copy(graph, [itemKey]);
//                            }
//                        }
//                    },
//                    nodeInport: {
//                        w4: {
//                            icon: "sign-in",
//                            iconLabel: "export",
//                            action: function (graph, itemKey, item) {
//                                console.log("here is the item for nodeInport")
//                                console.log(item)
//                                console.log(graph)
//                                console.log(itemKey)
//                                console.log(item.port)
//                                console.log(item.process)
//                                console.log(graph.inports)
//                                var pub = item.port;
//                                if (pub === 'start') {
//                                    pub = 'start1';
//                                }
//                                if (pub === 'graph') {
//                                    pub = 'graph1';
//                                }
//                                var count = 0;
//                                // Make sure public is unique
//                                while (graph.inports[pub]) {
//                                    count++;
//                                    pub = item.port + count;
//                                }
//                                var priNode = graph.getNode(item.process);
//                                var metadata = {x: priNode.metadata.x - 144, y: priNode.metadata.y};
//                                graph.addInport(pub, item.process, item.port, metadata);
//                            }
//                        }
//                    },
//                    nodeOutport: {
//                        e4: {
//                            icon: "sign-out",
//                            iconLabel: "export",
//                            action: function (graph, itemKey, item) {
//                                var pub = item.port;
//                                var count = 0;
//                                // Make sure public is unique
//                                while (graph.outports[pub]) {
//                                    count++;
//                                    pub = item.port + count;
//                                }
//                                var priNode = graph.getNode(item.process);
//                                var metadata = {x: priNode.metadata.x + 144, y: priNode.metadata.y};
//                                graph.addOutport(pub, item.process, item.port, metadata);
//                            }
//                        }
//                    },
//                    graphInport: {
//                        icon: "sign-in",
//                        iconColor: 2,
//                        n4: {
//                            label: "inport"
//                        },
//                        s4: {
//                            icon: "trash-o",
//                            iconLabel: "delete",
//                            action: function (graph, itemKey, item) {
//                                graph.removeInport(itemKey);
//                            }
//                        }
//                    },
//                    graphOutport: {
//                        icon: "sign-out",
//                        iconColor: 5,
//                        n4: {
//                            label: "outport"
//                        },
//                        s4: {
//                            icon: "trash-o",
//                            iconLabel: "delete",
//                            action: function (graph, itemKey, item) {
//                                graph.removeOutport(itemKey);
//                            }
//                        }
//                    },
//                    group: {
//                        icon: "th",
//                        s4: {
//                            icon: "trash-o",
//                            iconLabel: "ungroup",
//                            action: function (graph, itemKey, item) {
//                                graph.removeGroup(itemKey);
//                            }
//                        },
//                        // TODO copy group?
//                        e4: pasteMenu
//                    },
//                    selection: {
//                        icon: "th",
//                        w4: {
//                            icon: "copy",
//                            iconLabel: "copy",
//                            action: function (graph, itemKey, item) {
//                                TheGraph.Clipboard.copy(graph, item.nodes);
//                            }
//                        },
//                        e4: pasteMenu
//                    }
//                };
//            },
//            ready: function () {
//                console.log("inside the ready function in editor")
//            },
//            attached: function () {
//                console.log("inside the attached function in editor")
//            },
//            detached: function () {
//                for (var name in this.plugins) {
//                    console.log("inside detached fucntion in editor")
//                    this.plugins[name].unregister(this);
//                    delete this.plugins[name];
//                }
//            },
//            addPlugin: function (name, plugin) {
//                this.plugins[name] = plugin;
//                plugin.register(this);
//            },
//            addMenu: function (type, options) {
//                // options: icon, label
//                this.menus[type] = options;
//            },
//            addMenuCallback: function (type, callback) {
//                if (!this.menus[type]) {
//                    return;
//                }
//                this.menus[type].callback = callback;
//            },
//            addMenuAction: function (type, direction, options) {
//                if (!this.menus[type]) {
//                    this.menus[type] = {};
//                }
//                var menu = this.menus[type];
//                menu[direction] = options;
//            },
//            getMenuDef: function (options) {
//                console.log("inside getMenuDef:")
//                console.log(options)
//                console.log(typeof options.type)
//                // Options: type, graph, itemKey, item
//                if (options.type && this.menus[options.type]) {
//                    var defaultMenu = this.menus[options.type];
//                    if (defaultMenu.callback) {
//                        return defaultMenu.callback(defaultMenu, options);
//                    }
//                    return defaultMenu;
//                }
//                return null;
//            },
//            widthChanged: function () {
////        console.log("inside width changed")
//                this.style.width = this.width + "px";
//            },
//            heightChanged: function () {
//                this.style.height = this.height + "px";
//            },
//            graphChanged: function () {
//                console.log("inside graphChanged in editor")
//                if (typeof this.graph.addNode === 'function') {
//                    console.log("inside the if statement of graphChanged")
//                    this.buildInitialLibrary(this.graph);
//                    this.nofloGraph = this.graph;
//                    return;
//                }
//                var noflo;
//                if ('noflo' in window) {
//                    noflo = window.noflo;
//                }
//                if (!noflo && 'require' in window) {
//                    noflo = require('noflo');
//                }
//                if (!noflo) {
//                    console.warn('Missing noflo dependency! Should be built with Component.io or Browserify to require it.');
//                    return;
//                }
//                noflo.graph.loadJSON(this.graph, function (nofloGraph) {
//                    console.log("inside noflo.graph.loadJSON in editor")
//                    this.buildInitialLibrary(nofloGraph);
//                    console.log("here's the input nofloGraph:")
//                    console.log(nofloGraph)
//                    console.log("here's nofloGraph before:")
//                    console.log(this.nofloGraph)
//                    this.nofloGraph = nofloGraph;
//                    console.log("here's nofloGraph after:")
//                    console.log(this.nofloGraph)
//                    this.fire('graphInitialised', this);
//                }.bind(this));
//            },
//            buildInitialLibrary: function (nofloGraph) {
//                console.log("inside buildInitialLibrary")
//                /*if (Object.keys(this.$.graph.library).length !== 0) {
//                 // We already have a library, skip
//                 // TODO what about loading a new graph? Are we making a new editor?
//                 return;
//                 }*/
//                nofloGraph.nodes.forEach(function (node) {
//                    console.log("inside the nofloGraph.forEach command in editor")
//                    var component = {
//                        name: node.component,
//                        icon: 'cog',
//                        description: '',
//                        inports: [],
//                        outports: []
//                    };
//                    Object.keys(nofloGraph.inports).forEach(function (pub) {
//                        var exported = nofloGraph.inports[pub];
//                        if (exported.process === node.id) {
//                            for (var i = 0; i < component.inports.length; i++) {
//                                if (component.inports[i].name === exported.port) {
//                                    return;
//                                }
//                            }
//                            component.inports.push({
//                                name: exported.port,
//                                type: 'all'
//                            });
//                        }
//                    });
//                    Object.keys(nofloGraph.outports).forEach(function (pub) {
//                        var exported = nofloGraph.outports[pub];
//                        if (exported.process === node.id) {
//                            for (var i = 0; i < component.outports.length; i++) {
//                                if (component.outports[i].name === exported.port) {
//                                    return;
//                                }
//                            }
//                            component.outports.push({
//                                name: exported.port,
//                                type: 'all'
//                            });
//                        }
//                    });
//                    nofloGraph.initializers.forEach(function (iip) {
//                        if (iip.to.node === node.id) {
//                            for (var i = 0; i < component.inports.length; i++) {
//                                if (component.inports[i].name === iip.to.port) {
//                                    return;
//                                }
//                            }
//                            component.inports.push({
//                                name: iip.to.port,
//                                type: 'all'
//                            });
//                        }
//                    });
//                    nofloGraph.edges.forEach(function (edge) {
//                        var i;
//                        if (edge.from.node === node.id) {
//                            for (i = 0; i < component.outports.length; i++) {
//                                if (component.outports[i].name === edge.from.port) {
//                                    return;
//                                }
//                            }
//                            component.outports.push({
//                                name: edge.from.port,
//                                type: 'all'
//                            });
//                        }
//                        if (edge.to.node === node.id) {
//                            for (i = 0; i < component.inports.length; i++) {
//                                if (component.inports[i].name === edge.to.port) {
//                                    return;
//                                }
//                            }
//                            component.inports.push({
//                                name: edge.to.port,
//                                type: 'all'
//                            });
//                        }
//                    });
//                    this.registerComponent(component, true);
//                }.bind(this));
//            },
//            registerComponent: function (definition, generated) {
//                console.log("inisde registerComponent in editor")
//                this.$.graph.registerComponent(definition, generated);
//            },
//            libraryRefresh: function () {
//                this.$.graph.debounceLibraryRefesh();
//            },
//            updateIcon: function (nodeId, icon) {
//                this.$.graph.updateIcon(nodeId, icon);
//            },
//            rerender: function () {
//                console.log("here's this.$.graph:");
//                console.log(this.$.graph);
//                console.log("checking if theGraphHTMLRewrittenAsJSObject exists in editor.html:");
//                console.log(theGraphHTMLRewrittenAsJSObject);
//                console.log("here's 'this.$' in editor.html:");
//                console.log(this.$);
//                this.$.graph.rerender();
//            },
//            triggerAutolayout: function () {
//                this.$.graph.triggerAutolayout();
//            },
//            triggerFit: function () {
//                this.$.graph.triggerFit();
//            },
//            animateEdge: function (edge) {
//                // Make sure unique
//                var index = this.animatedEdges.indexOf(edge);
//                if (index === -1) {
//                    this.animatedEdges.push(edge);
//                }
//            },
//            unanimateEdge: function (edge) {
//                var index = this.animatedEdges.indexOf(edge);
//                if (index >= 0) {
//                    this.animatedEdges.splice(index, 1);
//                }
//            },
//            addErrorNode: function (id) {
//                this.errorNodes[id] = true;
//                this.updateErrorNodes();
//            },
//            removeErrorNode: function (id) {
//                this.errorNodes[id] = false;
//                this.updateErrorNodes();
//            },
//            clearErrorNodes: function () {
//                this.errorNodes = {};
//                this.updateErrorNodes();
//            },
//            updateErrorNodes: function () {
//                this.$.graph.errorNodesChanged();
//            },
//            focusNode: function (node) {
//                this.$.graph.focusNode(node);
//            },
//            getComponent: function (name) {
//                return this.$.graph.getComponent(name);
//            },
//            getLibrary: function () {
//                return this.$.graph.library;
//            },
//            toJSON: function () {
//                return this.nofloGraph.toJSON();
//            }
//        }
//    })()

})();
