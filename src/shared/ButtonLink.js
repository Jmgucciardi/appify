import React from 'react';
import {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';

export default class FlatLinkButton extends Component {

    static propTypes = {
        ...FlatButton.propTypes,
        to: PropTypes.string.isRequired,
        link: PropTypes.func.isRequired,
        label: PropTypes.node.isRequired,
    };

    render() {
        const style = Object.assign({
            color: 'white',
            marginTop: '7px'
        }, this.props.style)

        const props = {
            ...this.props,
            style,
        }

        delete props.to;
        delete props.link;

        const Link = this.props.link;

        return (
            <Link to={this.props.to}>
                <FlatButton {...props}/>
            </Link>
        )
    }
}