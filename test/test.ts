import lock = require("xlock")

async function TestLock(n:number)
{
    console.log(`Test${n} Start`)
    await lock.lock("test");
    console.log(`Test${n} GetLock`)
    await lock.wait(2000);
    console.log(`Test${n} End`)
    lock.unlock("test")
}

TestLock(1);
TestLock(2);
TestLock(3);
