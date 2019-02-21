import 'jquery';
import PropertyBase from './PropertyBase';
let DraggableNumber = require('draggable-number.js');

let tpl_property = require('../templates/propertyMmd.tpl.html');

export default class PropertyMmd extends PropertyBase {
    constructor(instance_property, lineData, editor, key_val = false) {
        super(instance_property, lineData, editor, key_val);
        this.onInputChange = this.onInputChange.bind(this);
        this.$input = this.$el.find('input');
    }

    render() {
        super.render();
        // By default assign the property default value
        var val = this.getCurrentVal();

        var data = {
            id: {
                translate: {
                    x: this.instance_property.name + "TranslateX",
                    y: this.instance_property.name + "TranslateY",
                }
            }, // "circleRadius" instead of "circle radius"
            label: this.instance_property.label || this.instance_property.name,
            val: {
                translate: {
                    x: 100,
                    y: 100
                }
            }
        };

        var view = tpl_property(data);
        this.$el = $(view);

        var $input = this.$el.find('input');

        var onChangeEnd = () => {
            this.editor.undoManager.addState();
        };

        var draggableOptions = {
            changeCallback: () => this.onInputChange(),
            endCallback: () => onChangeEnd()
        };
        draggableOptions.min = 0;
        // Set min & max if they are defined.
        if ('min' in this.instance_property) {
            draggableOptions.min = this.instance_property.min;
        }
        if ('max' in this.instance_property) {
            draggableOptions.max = this.instance_property.max;
        }

        var draggable = new DraggableNumber($input.get(0), draggableOptions);
        $input.data('draggable', draggable);

        $input.change(this.onInputChange);
    }

    remove() {
        super.remove();
        if (this.$input.data('draggable')) {
            this.$input.data('draggable').destroy();
        }
        delete this.$el;
        delete this.$input;
    }

    update() {
        super.update();
        // super.render();
        var val = this.getCurrentVal();

        var draggable = this.$input.data('draggable');

        if (draggable) {
            draggable.set(val.toFixed(3));
        }
        else {
            this.$input.val(val.toFixed(3));
        }
    }
}
