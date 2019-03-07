import 'jquery';
import PropertyBase from './PropertyBase';
let DraggableNumber = require('draggable-number.js');

let tpl_property = require('../templates/PropertyVector4.tpl.html');

export default class PropertyVector4 extends PropertyBase {
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
                x: this.instance_property.name + "X",
                y: this.instance_property.name + "Y",
                z: this.instance_property.name + "Z",
                z: this.instance_property.name + "W"
            }, // "circleRadius" instead of "circle radius"
            label: this.instance_property.label || this.instance_property.name,
            val: val
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

        // Set min & max if they are defined.
        if ('min' in this.instance_property) {
            draggableOptions.min = this.instance_property.min;
        }
        if ('max' in this.instance_property) {
            draggableOptions.max = this.instance_property.max;
        }

        for (let i = 0; i < $input.length; i++) {
            var draggable = new DraggableNumber($input[i], draggableOptions);
            $($input[i]).data('draggable', draggable);
            $($input[i]).change(this.onInputChange);
        }
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

        var draggable = $(this.$input[0]).data('draggable');

        if (draggable) {
            draggable.set(val.x);
        }
        else {
            $(this.$input[0]).val(val.x);
        }

        var draggable = $(this.$input[1]).data('draggable');

        if (draggable) {
            draggable.set(val.y);
        }
        else {
            $(this.$input[1]).val(val.y);
        }

        var draggable = $(this.$input[2]).data('draggable');

        if (draggable) {
            draggable.set(val.z);
        }
        else {
            $(this.$input[2]).val(val.z);
        }

        var draggable = $(this.$input[3]).data('draggable');

        if (draggable) {
            draggable.set(val.w);
        }
        else {
            $(this.$input[3]).val(val.w);
        }
    }
}
