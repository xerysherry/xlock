import util = require("util");
const _timeout = util.promisify(setTimeout);
const _interval = util.promisify(setInterval);
const _immediate = util.promisify(setImmediate);

export enum Mode
{
    None = 0,
    Normal = 1, 
    Read = 2,
    Write = 3,
}

class Info
{
    lock(mode: Mode): boolean {
        if(this.mode == Mode.None)
            this.mode = mode;
        switch(mode)
        {
        case Mode.Normal:
            if( this.mode != Mode.Normal ||
                this.value > 0)
                return false;
            this.value = 1;
            return true;
        case Mode.Read:
            if(this.mode != Mode.Read)
                return false;
            this.value += 1;
            return true;
        case Mode.Write:
            if(this.mode != Mode.Write ||
                this.value != 0)
                return false;
            this.value = 1;
            return true;
        default:
            return false;
        }
    }
    unlock()
    {
        switch(this.mode)
        {
        case Mode.Normal:
            this.value = 0;
            return;
        case Mode.Read:
            this.value -= 1;
            if(this.value == 0)
            {
                this.mode = Mode.None;
                this.value = 0;
            }
            return;
        case Mode.Write:
            this.mode = Mode.None;
            this.value = 0;
            return;
        }
    }
    mode: Mode = Mode.None;
    value: number = 0;
}

type LockMap = {[key: string]: Info};
let _locks:LockMap = {}

export const wait = _timeout;
export async function until(test:()=>boolean) {
    while(!test())
        await wait(1);
}
export async function lock(name:string, 
                        timeout:number = 0, 
                        mode: Mode = Mode.Normal):Promise<boolean> {
    let _lock: Info = null;
    await _immediate().then(()=>{
        _lock = _locks[name];
        if(_lock == null) {
            _lock = new Info();
            _locks[name] = _lock;
        }
    })

    let uptime = process.uptime();
    let get_lock = false;
    if(timeout <= 0)
        timeout = Number.MAX_VALUE;
    else
        timeout = timeout/1000;
    do {
        await _immediate().then(() => {
            get_lock = _lock.lock(mode);
        });
        if (get_lock)
            return true;
        if (process.uptime() - uptime > timeout)
            return false;
        await wait(1);
    } while (true);
}
export function unlock(name: string) {
    let lock = _locks[name];
    if(lock != null)
        lock.unlock();
}

export async function read_lock(name:string, timeout:number = 0) {
    return await lock(name, timeout, Mode.Read);
}
export const read_unlock = unlock;

export async function write_lock(name:string, timeout:number = 0) {
    return await lock(name, timeout, Mode.Write);
}
export const write_unlock = unlock;

export async function Lock(name: string, dofunc: ()=>void, 
                            timeout:number = 0, 
                            mode: Mode = Mode.Normal)
{
    let locked = false;
    try
    {
        locked = await lock(name, timeout);
        if(locked)
            await dofunc();
        return locked;
    }
    finally
    {
        if(locked)
            unlock(name);
    }
}
export async function ReadLock(name: string, dofunc: ()=>void, 
                            timeout:number = 0){
     return await Lock(name, dofunc, timeout, Mode.Read);
}
export async function WriteLock(name: string, dofunc: ()=>void, 
                            timeout:number = 0){
     return await Lock(name, dofunc, timeout, Mode.Write);
}