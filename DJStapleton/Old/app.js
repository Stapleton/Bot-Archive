const Cluster = require('cluster');

if (Cluster.isMaster) {
  console.log(`[Master] Started.`);

  Cluster.fork();

  Cluster.on('exit', (worker, code, signal) => {
    console.log(`[Master] Music Bot crashed.`);
    Cluster.fork();
  });
} else {
  require('./index.js');

  console.log(`[Master] Music Bot started.`);
}
