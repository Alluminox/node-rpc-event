const { EventEmitter } = require('events')

class BaseEvent extends EventEmitter {
    constructor(conn, options) {
        super(options)
        this.conn = conn;
    }

    parseMessage(msg) {
        const data = msg.content;
        return  JSON.parse(typeof data === 'object' ? data.toString('utf-8') :data.toString('utf-8'))
    }

    parseData(data) {
        return Buffer.from(JSON.stringify(data))
    }

    sendToQueue(ch, queue, data, props) {
        ch.sendToQueue(queue, this.parseData(data), props)
    }
}

module.exports = BaseEvent