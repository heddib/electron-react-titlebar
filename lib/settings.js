'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Settings = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPopup = require('react-popup');

var _reactPopup2 = _interopRequireDefault(_reactPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** The prompt content component */
/* eslint-disable indent */
class Settings extends _react.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue
        };

        this.onChange = e => this._onChange(e);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value);
        }
    }

    _onChange(e) {
        const value = e.target.value;

        this.setState({ value: value });
    }

    render() {
        return _react2.default.createElement('input', { type: 'text', placeholder: this.props.placeholder, className: 'mm-popup__input', value: this.state.value, onChange: this.onChange });
    }

    show() {
        /** Call the plugin */
        _reactPopup2.default.plugins().prompt('', 'Type your name', function (value) {
            _reactPopup2.default.alert('You typed: ' + value);
        });
    }
}

exports.Settings = Settings; /** Prompt plugin */

_reactPopup2.default.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null;
    const promptChange = function (value) {
        promptValue = value;
    };

    this.create({
        title: 'What\'s your name?',
        content: _react2.default.createElement(Settings, { onChange: promptChange, placeholder: placeholder, value: defaultValue }),
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                key: '⌘+s',
                className: 'success',
                action: function () {
                    callback(promptValue);
                    _reactPopup2.default.close();
                }
            }]
        }
    });
});