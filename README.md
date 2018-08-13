xlock
=====

a easy and useful lock for NodeJS

![npm](https://nodei.co/npm/xlock.png)

How to Install?
---------------

```
npm install xlock
```

How to Use?
-----------

Import it and use it, like this

```TypeScript
import xlock = require("xlock");
async function TestLock()
{
    // Lock
    await xlock.lock("test");
    DoSomething();
    // Unlock. NOTICE, ONE LOCK ONE UNLOCK, it must be match!
    xlock.unlock("test");
}
```

API
---

```TypeScript
/**
 * Wait a moment.
 * @param ms wait time. microsecond.
 */
async function wait(ms: number);
/**
 * Sleep a moment. Same as wait.
 * @param ms sleep time. microsecond.
 */
async function sleep(ms: number);
/**
 * Until test() return a true, otherwise wait.
 * @param test test function.
 */
async function until(test: ()=>boolean): Promise<boolean>;
/**
 * Lock
 * @param lock Lock Name
 * @param timeout Time. some time pass, if not get lock, it will be timeout and return false. default timeout disable.
 * @param mode Lock Mode. (Normal, Read, Write)
 */
async function lock(name:string, timeout?:number, mode?: Mode):Promise<boolean>
/**
 * Unlock
 * @param name Unlock Name
 */
function unlock(name: string): void;
/**
 * Check Lock. If unlock, return false. If lock, return true.
 * @param name Lock name
 * @param mode Lock Mode. (Normal, Read, Write)
 */
function check(name: string, mode?:Mode): boolean;
/**
 * Read Lock
 * @param name Lock Name
 * @param timeout see lock api
 */
async function read_lock(name:string, timeout?:number):Promise<boolean>;
/**
 * Read Unlock
 * @param name Unlock Name
 */
function read_unlock(name: string): void;
/**
 * Check ReadLock
 * @param name Lock Name
 */
function check_read_lock(name:string): boolean;
/**
 * Write Lock
 * @param name Lock Name
 * @param timeout see lock api
 */
async function write_lock(name:string, timeout?:number):Promise<boolean>;
/**
 * Write Unlock
 * @param name Unlock Name
 */
function write_unlock(name: string): void;
/**
 * Check WriteLock
 * @param name Lock Name
 */
function check_write_lock(name:string): boolean;

async function Lock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
async function ReadLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
async function WriteLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
```

Sample
------

In /test dir, you will find sample and test.

Thank you for using. Enjoy it!

xlock
=====

一个简单有用的锁

![npm](https://nodei.co/npm/xlock.png)

如何安装？
---------

```
npm install xlock
```

如何使用？
---------

引用它并使用它, 像这样

```TypeScript
import xlock = require("xlock");
async function TestLock()
{
    // 锁
    await xlock.lock("test");
    DoSomething();
    // 解锁. 注意，一次锁，一次解锁，必须匹配。
    xlock.unlock("test");
}
```

API
---

```TypeScript
/**
 * 等待一段时间。
 * @param ms 等待时间。毫秒。
 */
async function wait(ms: number);
/**
 * 睡眠一段时间。与wait功能相同。
 * @param ms 睡眠时间. 毫秒.
 */
async function sleep(ms: number);
/**
 * 持续等待，直到test()返回true
 * @param test 测试函数.
 */
async function until(test: ()=>boolean): Promise<boolean>;
/**
 * 锁
 * @param lock 锁名
 * @param timeout 超时时间. 经过设置的时间，如果仍然无法获取锁，则超时并返回false。默认超时未禁用
 * @param mode 锁模式。 (Normal 普通互斥锁, Read 读锁, Write 写锁)
 */
async function lock(name:string, timeout?:number, mode?: Mode):Promise<boolean>
/**
 * 解锁
 * @param name 解锁的锁名
 */
function unlock(name: string): void;
/**
 * 检查锁状态，如果上锁，返回true。如果未上锁，返回false。
 * @param name 锁名
 * @param mode 锁模式。 (Normal 普通互斥锁, Read 读锁, Write 写锁)
 */
function check(name: string, mode?:Mode): boolean;
/**
 * 读锁
 * @param name 锁名
 * @param timeout 参看lock
 */
async function read_lock(name:string, timeout?:number):Promise<boolean>;
/**
 * 读锁解锁
 * @param name 解锁的锁名
 */
function read_unlock(name: string): void;
/**
 * 检测读锁状态
 * @param name 锁名
 */
function check_read_lock(name:string): boolean;
/**
 * 写锁
 * @param name 锁名
 * @param timeout 参看lock
 */
async function write_lock(name:string, timeout?:number):Promise<boolean>;
/**
 * 写锁解锁
 * @param name 解锁的锁名
 */
function write_unlock(name: string): void;
/**
 * 检测写锁状态
 * @param name 锁名
 */
function check_write_lock(name:string): boolean;

async function Lock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
async function ReadLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
async function WriteLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
```

例子
------

在test文件夹下，你可以找到例子。

感谢使用。希望你们喜欢！