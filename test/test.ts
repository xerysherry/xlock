import xulogger = require("xulogger")
import lock = require("../lib/lock")

let log = new xulogger.Logger();
log.AddLog(new xulogger.ConsoleLog(xulogger.Level.All));
log.Debug("start")

async function TestLock(n:number)
{
    log.Debug(`Lock Test${n} Start`)
    if(!await lock.lock("test", 3000))
    {
        log.Warning(`Test${n} timeout`);
        return;
    }
    log.Debug(`Lock Test${n} Running`)
    await lock.wait(2000);
    log.Debug(`Lock Test${n} End`)
    lock.unlock("test")
}

TestLock(1);
TestLock(2);
TestLock(3);

async function TestReadLock(n:number)
{
    log.Debug(`Lock TestRead${n} Start`)
    if(!await lock.read_lock("testrw"))
    {
        log.Warning(`TestRead${n} timeout`);
        return;
    }
    log.Debug(`Lock TestRead${n} Running`)
    await lock.wait(2000);
    log.Debug(`Lock TestRead${n} End`)
    lock.unlock("testrw")
}

async function TestWriteLock(n:number)
{
    log.Debug(`Lock TestWrite${n} Start`)
    if(!await lock.write_lock("testrw"))
    {
        log.Warning(`TestWrite${n} timeout`);
        return;
    }
    log.Debug(`Lock TestWrite${n} Running`)
    await lock.wait(5000);
    log.Debug(`Lock TestWrite${n} End`)
    lock.unlock("testrw")
}

TestWriteLock(1);
TestWriteLock(2);
TestWriteLock(3);
TestReadLock(1);
TestReadLock(2);
TestReadLock(3);


// lock.Lock("testv", async ()=>{
//     log.Info("test1 start");
//     await lock.wait(3000);
//     log.Info("test1 end");
// })
// lock.Lock("testv", async ()=>{
//     log.Info("test2 start");
//     await lock.wait(3000);
//     log.Info("test2 end");
// })
// lock.Lock("testv", async ()=>{
//     log.Info("test3 start");
//     await lock.wait(1000);
//     log.Info("test3 end");
// }, 2000)