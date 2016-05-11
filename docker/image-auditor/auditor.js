const dgram = require('dgram');
var moment = require('moment');


var musicianMap = new Map();
var lastSeenMap = new Map();

var instMap = new Map();
instMap.set('ti-ta-ti', 'piano');
instMap.set('pouet', 'trumpet');
instMap.set('trulu', 'flute');
instMap.set('gzi-gzi', 'violin');
instMap.set('boum-boum', 'drum');


/**
 * Server UDP
 */
const server = dgram.createSocket('udp4');

server.on('message', function(msg, source) {
  const str = JSON.parse(msg);
  musician = {uuid: str.uuid, instrument: instMap.get(str.sound), activeSince: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')};

  console.log(musician.instrument, musician.uuid);

  if (!musicianMap.has(musician.uuid))
  {
    musicianMap.set(musician.uuid, musician);
  }

  if (!lastSeenMap.has(musician.uuid))
  {
    lastSeenMap.set(musician.uuid, moment().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]'));
  }
  else
  {
    lastSeenMap.delete(musician.uuid);
    lastSeenMap.set(musician.uuid, moment());
  }

  console.log("Data has arrived: " + msg + ". Source port: " + source.port);
  console.log(musicianMap);
});

server.bind(2205, function() {
  console.log("Joining multicast group");
  server.addMembership('239.255.22.5');
});

/**
 * remove old musician
 */
function rmOldM() {

  function testTime(valeur, cle, map) {
    if (moment().diff(moment(valeur)) > 10000)
    {
      musicianMap.delete(cle);
      lastSeenMap.delete(cle);
    }

  }

  lastSeenMap.forEach(testTime)

}

setInterval(rmOldM, 1000);

/**
 * Serveur TCP
 */
var net = require('net');

var serverTCP = net.createServer();

serverTCP.listen('2205');

serverTCP.on('connection', function(sock) {

  var tmp = new Array()

  function add(valeur, clé, map) {

    tmp.push(valeur)
  }

  musicianMap.forEach(add)

  
  sock.write(JSON.stringify(tmp));
  sock.destroy();

});