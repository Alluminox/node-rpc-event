const uuid = require("uuid");
const BaseEvent = require('./base-event')

class Publisher extends BaseEvent {

    async publish(key, data) {
        try {
            const ch = await this.conn.createChannel();
            const replyQueue = await ch.assertQueue('', { exclusive: true });

            const corr = uuid.v4();
            this.sendToQueue(ch, key, data, {
                correlationId: corr,
                replyTo: replyQueue.queue
            });

            ch.consume(replyQueue.queue, msg => {
                if (msg.properties.correlationId === corr) {
                    console.log(msg.content.toString())
                    this.emit('message', this.parseMessage(msg));
                    this.removeAllListeners('message')
                }
            }, { noAck: true })

        } catch(err) {
            console.log('ERROR -> ', err)
        }
    }
}

module.exports = Publisher;