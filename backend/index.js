const zmq = require('zeromq');
const log = require('../backend/helpers/log');

const socket = new zmq.Pull();
const dataSock = new zmq.Reply();
const statusSock = new zmq.Push();

statusMessages = [
    {"type": "general", "message": "testing"},
    {"type": "taskStatus", "message": "task 1 started"},
    {"type": "taskStatus", "message": "task 2 stopped"}
]

async function mainSocket(){
    log('Started main socket');

    await socket.bind('tcp://*:7777');

    for await (const [msg] of socket) {
        const messageData = JSON.parse(msg.toString());
        log(messageData);
    }
}

async function dataSocket(){
    log('Started data socket');

    await dataSock.bind('tcp://*:7778');

    for await (const [msg] of dataSock) {
        const messageData = JSON.parse(msg.toString());
        log(messageData);

        dataSock.send(JSON.stringify({ dataReceived: messageData }));
    }
}

async function statusSocket(){
    log('Started status socket');

    await statusSock.bind('tcp://*:7779');

    setInterval(async() => {
        await statusSock.send(JSON.stringify({ type: 'testing'}));
    }, 5000);
}

(async() => {
    log('Starting backend');
    mainSocket();
    dataSocket();
    statusSocket();
})();
