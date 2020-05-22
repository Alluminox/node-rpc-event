const BaseEvent = require('./base-event');

class Subscriber extends BaseEvent {

    _reply(ch) {
        return (msg) => {
            const data = this.parseMessage(msg)
            const waitProcessMessage = (result) => {
                this.sendToQueue(ch, msg.properties.replyTo, result, {
                     correlationId: msg.properties.correlationId
                });
 
                ch.ack(msg)
                this.removeAllListeners('result')
 //               this.removeListener('result', waitProcessMessage)
                
            }
 
            this.on('result', waitProcessMessage)
            this.emit('message', data);
            this.removeAllListeners('message')
 

            /*
                // Remover o listener de message
                this.removeListener(
                    this.currentListener
                )
            
            */

        }
    }

    async subscribe(key) {
        try {
            const ch = await this.conn.createChannel()
            await ch.assertQueue(key, { durable: false });
            ch.prefetch(1);

            console.log(`${Date.now()}:: Waiting for messages!`)
            ch.consume(key, this._reply(ch))
        } catch(err) {
            console.log(err)
        } 
    }
}


module.exports = Subscriber