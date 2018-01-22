import lock = require("xlock")

async function TestLock(n:number)
{
    console.log(`Test${n} Start`)
    if(!await lock.lock("test", 3000))
    {
        console.log(`Test${n} Timeout`);
        return;
    }
    console.log(`Test${n} GetLock`)
    await lock.wait(2000);
    console.log(`Test${n} End`)
    lock.unlock("test")
}

TestLock(1);
TestLock(2);
TestLock(3);