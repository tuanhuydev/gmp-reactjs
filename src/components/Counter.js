import { Component, createElement } from 'react';

export default class Counter extends Component {
    state = {
        count: 0
    }

    click(amount = 1, _event) {
        this.setState({ count: this.state.count + amount });
    }

    render() {
        const EMPTY_ATTRIBUTES = {};
        const headerEl = createElement('h1', EMPTY_ATTRIBUTES, `${this.state.count}`);
        const decreaseBtn = createElement('button', {
            id: 'decrease',
            onClick: this.click.bind(this, -1)
        }, '-');
        const increaseBtn = createElement('button', {
            id: 'decrease',
            onClick: this.click.bind(this, 1)
        }, '+');
        return createElement('div', EMPTY_ATTRIBUTES, headerEl, decreaseBtn, increaseBtn);
    }
}