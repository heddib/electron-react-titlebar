/* eslint-disable indent */
import React, { Component } from 'react'
import Popup from 'react-popup'

/** The prompt content component */
export class Settings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.defaultValue,
        }

        this.onChange = (e) => this._onChange(e)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value)
        }
    }

    _onChange(e) {
        const value = e.target.value

        this.setState({value: value})
    }

    render() {
        return <input type="text" placeholder={this.props.placeholder} className="mm-popup__input" value={this.state.value} onChange={this.onChange} />
    }

    show() {
        /** Call the plugin */
        Popup.plugins().prompt('', 'Type your name', function (value) {
            Popup.alert('You typed: ' + value)
        })
    }
}

/** Prompt plugin */
Popup.registerPlugin('prompt', function (defaultValue, placeholder, callback) {
    let promptValue = null
    const promptChange = function (value) {
        promptValue = value
    }

    this.create({
        title: 'What\'s your name?',
        content: <Settings onChange={promptChange} placeholder={placeholder} value={defaultValue} />,
        buttons: {
            left: ['cancel'],
            right: [{
                text: 'Save',
                key: '⌘+s',
                className: 'success',
                action: function () {
                    callback(promptValue)
                    Popup.close()
                },
            }],
        },
    })
})