### Simple Node RPC with RabbitMQ and EventEmitter

#### Sample to simple use
```javascript

const { Publisher, Subscriber } = require('node-rpc-event');

const conn = // get RabbitMQ connection


// Creating a subscriber
const sub = new Subscriber(conn)

sub.subscribe('eventKey');
sub.on('message', (product) => {
    // .. your logic here
    sub.emit('result', { ...product, _id: Math.ceil(Math.random() * (10000 - 5000) + 1) })
});


// Creating a Publisher

const payload = {
    title: 'Product 1',
    price: 50.47
}

const pub = new Publisher(conn);
pub.publish('eventKey', payload)
pub.on('message', (data) => {   
    // Your logic Here
    console.log("RESULT TO RPC", data)
});


```