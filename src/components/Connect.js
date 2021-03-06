import React, { Component } from 'react';
import {Input, Button, Card, message} from 'antd';


class Connect extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            prefix: 'test',
            server: 'localhost:8080/v1',
            canReconnect: true
        }
        this.connect = this.connect.bind(this)
        this.handlePrefixChange = this.handlePrefixChange.bind(this)
        this.handleServerChange = this.handleServerChange.bind(this)
    }

    connect() {
        const address = `ws://${this.state.server}`
        
        if (this.props.client.isConnected() === 0) {
            message.warning("The connection is already estabilished")
            return
        }

        message.loading(`Connecting to ${address}`, 2.5)
                .then(() => {
                    this.props.client.init(this.state.prefix, address, address)
                    message.success('Connection successful', 2.5)
                    setTimeout(this.props.onConnect, 1000)
                }).catch(e => {
                    setTimeout(this.props.onFail, 1000)
                    message.error(e.message);
                });
        this.setState({
            canReconnect: false
        })
    }

    handleServerChange(e) {
        this.setState({
            server: e.target.value,
            canReconnect: true
        })
    }

    handlePrefixChange(e) {
        this.setState({
            prefix: e.target.value,
            canReconnect: true
        })
    }

    render() {
        return (
            <Card title="Connect">
                <label htmlFor="prefix">the prefix as in VPROC_SIGNPREFIX</label>
                <Input name="prefix" defaultValue={this.state.prefix} onChange={this.handlePrefixChange}/>
                <br/>
                <br/>
                <label htmlFor="server">WebSocket server url</label>
                <Input name="server" addonBefore="ws://" defaultValue={this.state.server} onChange={this.handleServerChange}/>
                <br/>
                <br/>
                <Button disabled={!this.state.canReconnect} onClick={this.connect} type="primary">Connect</Button>
            </Card>
        )
    }
}

export default Connect;