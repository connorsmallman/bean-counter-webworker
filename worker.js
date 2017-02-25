var counters = {};
var id = 0;
var total = 0;

function getNextId() {
  return id++;
}

onconnect = function(event) {
  var id = getNextId();

  counters[id] = { port: event.ports[0], id: id };

  event.ports[0].postMessage({message: 'cfg', id: id, total: total });
  event.ports[0].onmessage = getMessage;
};

function getMessage(event) {
  switch (event.data.message) {
    case 'merge':
      total = Math.max(total + 1, total);

      for (var count in counters) {
        counters[count].port.postMessage({ message: 'merge', total: total });
      }
  }
}
