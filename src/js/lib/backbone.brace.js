(function () {

    // node / browser imports, copied from here
    var root = this;
    var Brace;
    if (typeof exports !== 'undefined') {
        Brace = exports;
    } else {
        Brace = root.Brace = {};
    }

    var _ = root._;
    if (!_ && (typeof require !== 'undefined')){ _ = require('underscore'); }

    var Backbone = root.Backbone;
    if (!Backbone && (typeof require !== 'undefined')) { Backbone = require('backbone'); }

    // ## Brace.Mixins ##
    // Mixin utilities
    Brace.Mixins = {
        // Creates a camelCased method name
        createMethodName: function(prefix, suffix) {
            return prefix + suffix.charAt(0).toUpperCase() + suffix.substr(1);
        },

        // Applies a mixin to the given constructor's prototype.
        applyMixin: function(ctor, mixin) {
            _.forEach(_.keys(mixin), function(key) {
                var proto = ctor.prototype;

                // `initialize` is not mixed in - we compose the mixin's initialize with the existing initialize method (if it exists).
                if ("initialize" === key) {
                    var oldInitialize = proto.initialize;
                    proto.initialize = function() {
                        mixin.initialize.apply(this, arguments);
                        if (oldInitialize) {
                            oldInitialize.apply(this, arguments);
                        }
                    };
                    return;
                }
                // `validate` is not mixed in - we compose the mixin's validate with the existing validate method (if it exists).
                if ("validate" === key) {
                    var oldValidate = proto.validate;
                    proto.validate = function() {
                        var errors = mixin.validate.apply(this, arguments);
                        if (errors) {
                            return errors;
                        }
                        if (oldValidate) {
                            return oldValidate.apply(this, arguments);
                        }
                    };
                    return;
                }
                // `defaults` are not mixed in - we compose the mixin's defaults with existing defaults if they exist
                if ("defaults" === key) {
                    var defaults = proto.defaults || (proto.defaults = {});
                    var mixinDefaults = mixin[key];
                    for (var id in mixinDefaults) {
                        if (defaults.hasOwnProperty(id)) {
                            throw "Mixin error: class already has default '" + id + "' defined";
                        }
                        defaults[id] = mixinDefaults[id];
                    }
                    return;
                }
                // `namedAttributes` are added to the mixin, and we mixin in getters and setters for each attribute.
                if ("namedAttributes" === key) {
                    // `namedAttributes` must be an array
                    if (!_.isArray(mixin[key])) {
                        throw "Expects namedAttributes member on mixin to be an array";
                    }
                    if (!proto.namedAttributes) {
                        proto.namedAttributes = [];
                    }
                    proto.namedAttributes = proto.namedAttributes.concat(mixin[key]);
                    return;
                }

                // `namedEvents` are added to the mixin, and we mix in on and trigger methods for each event.
                if ("namedEvents" === key) {
                    // `events` must be an array
                    if (!_.isArray(mixin[key])) {
                        throw "Expects events member on mixin to be an array";
                    }
                    if (!proto.namedEvents) {
                        proto.namedEvents = [];
                    }
                    proto.namedEvents = proto.namedEvents.concat(mixin[key]);
                    return;
                }
                // Name collisions with other mixins or or the object we're mixing into result in violent and forceful disapproval.
                if (proto.hasOwnProperty(key)) {
                    throw "Mixin error: class already has property '" + key + "' defined";
                }
                proto[key] = mixin[key];
            }, this);
        }
    };

    // ## Brace.AttributesMixinCreator ##
    Brace.AttributesMixinCreator = {

        // Creates a mixin of getter and setter methods for each item in the given attribute list.
        // A getter and setter for `id` is always generated.
        create: function(attributes) {
            var methods = {};

            if (_.indexOf(attributes, "id") === -1) {
                attributes.unshift("id");
            }

            _.each(attributes, function (attribute) {
                // TODO: has, escape, unset
                var setter = Brace.Mixins.createMethodName("set", attribute);
                methods[setter] = function (val,options) {
                    var obj = {};
                    obj[attribute] = val;
                    this.set(obj,options);
                    return this;
                };
                var getter = Brace.Mixins.createMethodName("get", attribute);
                methods[getter] = function () {
                    return this.get(attribute);
                };
            });
            return methods;
        }
    };

    // ## Brace.EventsMixinCreator ##
    Brace.EventsMixinCreator = {

        // Creates a mixin of on and trigger methods for each item in the given list of events.
        create: function(events) {
            var eventMethods = {};
            var createEvent = function(eventName) {
                // TODO: off
                var binder = Brace.Mixins.createMethodName("on", eventName);
                eventMethods[binder] = function() {
                    return this.on.apply(this, [eventName].concat(_.toArray(arguments)));
                };
                var trigger = Brace.Mixins.createMethodName("trigger", eventName);
                eventMethods[trigger] = function() {
                    return this.trigger.apply(this, [eventName].concat(_.toArray(arguments)));
                };
            };
            _.each(events, _.bind(createEvent,this));

            return eventMethods;
        }
    };

     // Generates an `extend` method that overrides Backbone's default `extend`. The new extend calls Backbone's `extend`, then:
     //
     //   * Adds all mixins specified in the `mixins` array
     //   * Adds a `Brace.EventsMixinCreator` to mix in on and trigger methods for events specified in the `namedEvents` array
     //   * Adds a `Brace.AttributesMixinCreator` to mix in get and set methods for attributes specified in the `attributes` array
    function generateMixinExtend(oldExtend) {
        return function newExtend(protoProps, classProps) {
            var child;
            var cleanProtoProps = _.extend({}, protoProps);
            // Remove `mixins` - we don't want to see them on the created prototype. Note that we do want to see `namedAttributes` and `namedEvents` for debugging
            var mixins;
            if (protoProps && protoProps.mixins) {
                mixins = protoProps.mixins;
                delete cleanProtoProps.mixins;
            }
            child = oldExtend.call(this, cleanProtoProps, classProps);
            if (mixins) {
                _.each(protoProps.mixins, function(mixin) {
                    Brace.Mixins.applyMixin(child, mixin);
                });
            }
            if (child.prototype.namedEvents) {
                Brace.Mixins.applyMixin(child, Brace.EventsMixinCreator.create(child.prototype.namedEvents));
            }
            if (child.prototype.namedAttributes) {
                Brace.Mixins.applyMixin(child, Brace.AttributesMixinCreator.create(child.prototype.namedAttributes));
            }
            child.extend = newExtend;
            return child;
        };
    }

    // Overrides Backbone's `get` and `set` methods to validate that the attribute being get / set is a namedAttribute.
    function overrideSetGet(ctor, childCtor) {
        var proto = ctor.prototype;
        var childProto = childCtor.prototype;

        var oldSet = proto.set;
        childProto.set = function(key, value, options) {
            // TODO: has, escape, unset
            var attrs,
                attributes = this.namedAttributes;
            if (attributes) {
                if (_.isObject(key) || key == null) {
                    attrs = key;
                } else {
                    attrs = {};
                    attrs[key] = value;
                }
                for (var attr in attrs) {
                    if (_.indexOf(attributes, attr) < 0) {
                        throw "Attribute '" + attr + "' does not exist";
                    }
                }
            }
            return oldSet.apply(this, arguments);
        };

        var oldGet = proto.get;
        childProto.get = function(attr) {
            if (this.namedAttributes && _.indexOf(this.namedAttributes, attr) < 0) {
                throw "Attribute '" + attr + "' does not exist";
            }
            return oldGet.apply(this, arguments);
        };
    }

    // Applies extensions to the given constructor function. Sets `extend` to a method generated by `generateMixinExtend`
    function applyExtensions(ctor) {
        var child = ctor.extend();
        var oldExtend = ctor.extend;
        child.extend = generateMixinExtend(oldExtend);
        return child;
    }


    // Applies extensions to the given constructor function. Sets `extend` to a method generated by `generateMixinExtend`
    function applyModelExtensions(ctor) {
        var child = applyExtensions(ctor);
        overrideSetGet(ctor, child);
        return child;
    }

    // Extend base Backbone classes
    Brace.Model = applyModelExtensions(Backbone.Model);
    Brace.Collection = applyExtensions(Backbone.Collection);
    Brace.View = applyExtensions(Backbone.View);
    Brace.Router = applyExtensions(Backbone.Router);

}());
