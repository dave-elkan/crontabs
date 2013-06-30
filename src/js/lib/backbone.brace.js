/*! 
 *  Backbone Brace - 2013-06-04 
 *  Copyright 2013 Atlassian Software Systems Pty Ltd
 *  Licensed under the Apache License, Version 2.0
 */ 
(function () {

    // node / browser imports, copied from here
    var root = this;

    // Store a reference to any other copies of Brace include (if any)
    var previousBrace = root.Brace;

    var Brace;
    if (typeof exports !== 'undefined') {
        Brace = exports;
    } else {
        Brace = root.Brace = {};
    }

    // noConflict will return this version of Brace and reset the global 
    // Brace variable to the previously loaded version of Brace (or undefined
    // if there was no previous version loaded).
    /**
     * Returns the current copy of Brace and sets the global Brace object to the
     * previous version (or undefined if there was no previous version loaded). 
     *
     * @returns Object A reference to this version of Brace.
     */
    Brace.noConflict = function() {
        root.Brace = previousBrace;
        return this;
    };    

    var _ = root._;
    if (!_ && (typeof require !== 'undefined')){ _ = require('underscore'); }

    var Backbone = root.Backbone;
    if (!Backbone && (typeof require !== 'undefined')) { Backbone = require('backbone'); }

    // ## Helper functions

    // Given an array, this function will return an object where each
    //     property name is an element of the original array. The value
    //     of each property will be null.
    // Given anything else, this function will return the object untouched.
    /**
     * This function is used to ensure a consistent shape for the namedAttributes property.
     * namedAttributes accepts two formats:
     * - An array like ['attr1', 'attr2'] if you don't care about the type of any attribute.
     * - An object like { attr1 : type1, attr2 : type2 } to specify an expected type.
     *
     * @param maybeArray {*} thing to transform into an object
     */
    function asObject(maybeArray) {
        if (_.isArray(maybeArray)) {
            return _.reduce(maybeArray, function(obj, prop) {
                obj[prop] =  null;
                return obj;
            }, {});
        }
        return maybeArray;
    }

    // Return a value of the specified type, generated from the value parameter.
    // If type conversion is necessary, this function will generate a new object using
    // `new type(value)`
    //
    // `value` Any value. null and undefined values will be untouched.
    //
    // `type` When given:
    //
    // * a falsy value: this function will do no type conversion.
    // * a string: this function will throw if `typeof value !== type`, and return value otherwise.
    // * an Array: this function will be recursively called for each element in value using
    //   type's first element as the type. E.g.,
    //         `ensureType([ Number ], [ 1 ])` will recursively call `ensureType(Number, 1)`
    //   It will return a new array consisting of the result of each recursive call.
    // * a Backbone.Collection constructor: this function may be recursively called for each element in 
    //     value using type.model as the type. E.g.,
    //         `ensureType({ model : Number, __proto__ : Backbone.Collection.prototype }, [ 1 ])` will
    //         recursively call `ensureType(Number, 1)`
    //     It will return a Backbone.Collection via new type({array of recursive results})
    // * a function: This will check value instanceof type, and if false, will return `new type(value)`
    //     Otherwise it will return value directly
    /**
     * @param value {*}
     * @param type {Array|function(new:*, *)|string|false|null|undefined}
     */
    function ensureType(type, value) {
        /*jshint newcap: false */
        if (!type || value == null) {
            return value;
        }

        if (type === String && _.isString(value)) {
            return value;
        }
        if (type === Number && _.isNumber(value)) {
            return value;
        }
        if (type === Boolean && _.isBoolean(value)) {
            return value;
        }

        if (typeof type === 'string' || type instanceof String) {
            if (typeof value !== ""+type) {
                throw "The typeof " + value + " is " + typeof value + " but expected it to be " + type;
            }
            return value;
        }

        if (_.isArray(type) || type === Array) {
            if (!isArrayLike(value)) {
                throw "Array type expected, but nonnull, non-Array value provided.";
            }
            return type === Array || !type[0] ?
                value :
                _.map(value, _.bind(ensureType, null, type[0]));
        }

        if (typeof type !== 'function') {
            throw "Invalid expected type " + type +
            '. Should be falsy, String, Array, Backbone.Collection constructor, or function.';
        }

        if (value instanceof type) {
            return value;
        }

        if (isCollectionConstructor(type)) {
            return new type(ensureType([ type.model ], value));
        }

        return new type(value);
    }

    // Returns true if obj is extend()'ed from Backbone.Collection (or from another collection)
    /**
     * @param obj {*} object to check
     * @param rootConstructor {?function(new:Backbone.Collection)} optional constructor that inherits from
     *        Backbone.Collection. Will check that obj is extend()'ed from this instead of Backbone.Collection.
     */
    function isCollectionConstructor(obj, rootConstructor) {
        return  obj && (
            // obj *distantly* extends Backbone.Collection (most likely case)
            obj.__super__ instanceof (rootConstructor || Backbone.Collection) ||

            // obj *directly* extends Backbone.Collection (e.g., Brace.Collection)
            // !(fn.prototype instanceof fn), so the above check doesn't catch this case.
            obj.__super__ === (rootConstructor || Backbone.Collection).prototype ||

            // obj *is* Backbone.Collection
            obj === (rootConstructor || Backbone.Collection)
        );
    }

    // array-like is currently defined by "has a length property, and is not a string or
    // function or Backbone.Collection."
    // Backbone.Collections are excluded because you can't do collection[0] to access models.
    function isArrayLike(value) {
        return _.has(value,'length') && !(
            value instanceof String ||
            _.has({'string':1, 'function':1}, typeof value) ||
            value instanceof Backbone.Collection
        );
    }

    // With namedAttributes, we want to allow both the mixin, and the extender to define types.
    // We want to take the stricter of the two types where possible.
    // Where the types conflict, throw an error.
    function nonConflictedTypes(obj, refObj) {
        var newObj = {};
        _.each(obj, function(val, key) {
            if (!refObj[key] || assumes(val, refObj[key])) {
                newObj[key] = val;
            } else if (!val || assumes(refObj[key], val)) {
                return;
            } else {
                throw key + " has conflicted type descriptors.";
            }
        });
        return newObj;
    }

    // One type *assumes* another when the conditions for meeting its
    // type-check are a super set of the assumed type's conditions.
    // E.g., `[ 'string' ]` assumes `Array` because you can't have an array of strings without an array.
    function assumes(assumer, assumed) {
        if (!assumed || assumed === assumer) {
            return true;
        }
        // if it's a string, only the previous strict equality check would have sufficed.
        if (!assumer || typeof assumer === 'string') {
            return false;
        }
        if (assumer instanceof Array) {
            return assumed === Array ||
                (assumed instanceof Array && assumes(assumer[0], assumed[0]));
        }
        if (typeof assumed !== 'function') {
            return false;
        }
        if (isCollectionConstructor(assumed)) {
            return isCollectionConstructor(assumer, assumed);
        }
        return assumer.prototype instanceof assumed;
    }

    /**
     * @param {Object?} object
     * @return {Object} plain object
     */
    function nestedToJSON(object) {
        if (_.isObject(object)) {
            return _.reduce(object, function(memo, value, key) {
                if (value && _.isFunction(value.toJSON)) {
                    memo[key] = value.toJSON();
                } else if (_.isArray(value)) {
                    memo[key] = _.map(value, function(el) {
                        if (el && _.isFunction(el.toJSON)) {
                            return el.toJSON();
                        } else {
                            return el;
                        }
                    });
                }
                return memo;
            }, object);
        } else {
            return object;
        }
    }

    function createToJSON(previousToJSON) {
        return function toJSON() {
            var json = previousToJSON.call(this);
            return nestedToJSON(json);
        };
    }

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
                        if (oldInitialize) {
                            oldInitialize.apply(this, arguments);
                        }
                        mixin.initialize.apply(this, arguments);
                    };
                    return;
                }
                // `validate` is not mixed in - we compose the mixin's validate with the existing validate method (if it exists).
                if ("validate" === key) {
                    var oldValidate = proto.validate;
                    proto.validate = function() {
                        if (oldValidate) {
                            var errors = oldValidate.apply(this, arguments);
                            if (errors) {
                                return errors;
                            }
                        }
                        return mixin.validate.apply(this, arguments);
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
                    var protoAttrs = asObject(proto.namedAttributes) || {};
                    var mixinAttrs = asObject(mixin[key]);
                    proto.namedAttributes = _.extend(protoAttrs, nonConflictedTypes(mixinAttrs, protoAttrs));
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
                    proto.namedEvents = _.uniq(proto.namedEvents.concat(mixin[key]));
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

            if (!attributes) {
                attributes = {};
            }

            if (!_.has(attributes, "id")) {
                attributes.id = null;
            }

            _.each(attributes, function (expectedType, attrName) {
                // TODO: has, escape, unset
                var setter = Brace.Mixins.createMethodName("set", attrName);
                methods[setter] = function (val,options) {
                    return this.set(attrName, val, options);
                };
                var getter = Brace.Mixins.createMethodName("get", attrName);
                methods[getter] = function () {
                    return this.get(attrName);
                };
            });

            return methods;
        },
        /**
         * See JSDoc for this function in the backbone.brace file.
         *
         * Expose the ensureType function for people with custom constructors that don't call
         * .set() to initialize attributes. Hopefully this is rarely used, as I would
         * consider not calling .set() to be a code smell.
         *
         * @param type
         * @param value
         */
        ensureType : ensureType
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

            if (this.prototype.namedEvents) {
                Brace.Mixins.applyMixin(child, { namedEvents : this.prototype.namedEvents });
            }
            if (this.prototype.namedAttributes) {
                Brace.Mixins.applyMixin(child, { namedAttributes : this.prototype.namedAttributes });
            }

            if (mixins) {
                _.each(protoProps.mixins, function(mixin) {
                    Brace.Mixins.applyMixin(child, mixin);
                });
            }
            if (child.prototype.namedEvents) {
                Brace.Mixins.applyMixin(child, Brace.EventsMixinCreator.create(child.prototype.namedEvents));
            }
            if (child.prototype.namedAttributes) {
                child.prototype.namedAttributes = asObject(child.prototype.namedAttributes);
                Brace.Mixins.applyMixin(child, Brace.AttributesMixinCreator.create(child.prototype.namedAttributes));
            }

            if (child.prototype.toJSON) {
                child.prototype.toJSON = createToJSON(child.prototype.toJSON);
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
            
            if (!attributes || key == null) {
                return oldSet.apply(this, arguments);    
            }

            if (_.isObject(key)) {
                attrs = _.clone(key);
                options = value;
            } else {
                attrs = {};
                attrs[key] = value;
            }

            for (var attr in attrs) {
                if (!_.has(attrs, attr)) {
                    continue;
                }
                if (!_.has(attributes, attr)) {
                    throw "Attribute '" + attr + "' does not exist";
                }
                attrs[attr] = ensureType(attributes[attr], attrs[attr]);
            }

            return oldSet.call(this, attrs, options);    
        };

        var oldGet = proto.get;
        childProto.get = function(attr) {
            if (this.namedAttributes && !_.has(this.namedAttributes, attr)) {
                throw "Attribute '" + attr + "' does not exist";
            }
            return oldGet.apply(this, arguments);
        };
    }

    // Overrides Backbone's `parse` method to parse only namedAttributes
    function overrideParse(ctor, childCtor) {
        var proto = ctor.prototype;
        var childProto = childCtor.prototype;

        var oldParse = proto.parse;
        childProto.parse = function(response, options) {
            return _.pick(oldParse(response, options), _.keys(this.namedAttributes));
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
        overrideParse(ctor, child);
        return child;
    }

    // Extend base Backbone classes
    Brace.Model = applyModelExtensions(Backbone.Model);
    Brace.Collection = applyExtensions(Backbone.Collection);
    Brace.View = applyExtensions(Backbone.View);
    Brace.Router = applyExtensions(Backbone.Router);
    var Evented = function() {
        this.initialize.apply(this, arguments);
    };
    _.extend(Evented.prototype, Backbone.Events, {
        initialize: function() {}
    });
    Evented.extend = Backbone.Model.extend;
    Brace.Evented = applyExtensions(Evented);

}());
