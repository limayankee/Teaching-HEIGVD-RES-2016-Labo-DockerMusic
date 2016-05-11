const uuid = require('uuid');
const dgram = require('dgram');

const arg = process.argv[2]

const client = dgram.createSocket('udp4');


var instMap = new Map();
instMap.set('piano', 'ti-ta-ti');
instMap.set('trumpet', 'pouet');
instMap.set('flute', 'trulu');
instMap.set('violin', 'gzi-gzi');
instMap.set('drum', 'boum-boum');


send = function (musician) {
    const toStr = JSON.stringify(musician);
    console.log(toStr);
    client.send(toStr, 0 , toStr.length, 2205, '239.255.22.5');
}

setInterval(send, 1000, {sound: instMap.get(arg), uuid: uuid.v1()} );

