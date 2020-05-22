### Simple Node RPC with RabbitMQ and EventEmitter

#### Sample to simple use
```javascript

const { Publisher, Subscriber } = require('node-rpc-event');

const conn = // get RabbitMQ connection


// Creating a subscriber
const sub = new Subscriber(conn)

sub.subscribe('eventKey');
sub.on('message', (object) => {
    // .. your logic here
    sub.emit('result', { ...object, _id: Math.ceil(Math.random() * (10000 - 5000) + 1) })
});


// Creating a Publisher

const payload = {
    key: 'Object',
}

const pub = new Publisher(conn);
pub.publish('eventKey', payload)
pub.on('message', (data) => {   
    // Your logic Here
    console.log("RESULT TO RPC", data)
});


```