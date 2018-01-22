import lock = require("xlock")

async function TestReadLock(n:number)
{
    console.log(`TestRead${n} Start`);
    await lock.read_lock("testrw");
    console.log(`TestRead${n} GetReadLock`);
    await lock.wait(2000);
    console.log(`TestRead${n} End`);
    lock.unlock("testrw");
}

async function TestWriteLock(n:number)
{
    console.log(`TestWrite${n} Start`);
    await lock.write_lock("testrw");
    console.log(`TestWrite${n} GetWriteLock`);
    await lock.wait(5000);
    console.log(`TestWrite${n} End`);
    lock.unlock("testrw");
}

TestWriteLock(1);
TestWriteLock(2);
TestWriteLock(3);
TestReadLock(1);
TestReadLock(2);
TestReadLock(3);