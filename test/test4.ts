import xlock = require("xlock")
import cluster = require("cluster")
import os = require("os")
const num_cpus = os.cpus().length;

async function test(id: number) 
{
    console.log(`Test ${id}`);
    await xlock.lock("Test");
    console.log(`Test ${id} Start`);
    await xlock.wait(3000);
    console.log(`Test ${id} End`);
    xlock.unlock("Test");
}

if(cluster.isMaster)
{
    cluster.on("fork", (worker) => {
        test(worker.process.pid);
    })
    cluster.on("exit", (worker, code, signal) => {
        console.log("end");
    })

    for(let i=0; i<num_cpus; ++i)
        cluster.fork();
}