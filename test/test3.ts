import lock = require("xlock")

function Test(n:number, timeout?:number)
{
    console.log(`test${n} start`)
    lock.Lock("test", async ()=>{
        console.log(`test${n} getlock`);
        await lock.wait(1000);
        console.log(`test${n} end`);
    }, timeout)
    .then(result=>{
        if(!result)
            console.log(`test${n} timeout`);
    })
}
for(let i=0; i<5; ++i)
    Test(i);
for(let i=0; i<5; ++i)
    Test(i+5, 5000);