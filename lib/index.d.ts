declare namespace xlock
{
    export enum Mode { Normal, Read, Write }

    export function wait(ms: number);
    export function until(test: ()=>boolean): Promise<boolean>;
    export function lock(name:string, timeout?:number, mode?: Mode):Promise<boolean>
    export function unlock(name: string): void;
    export function read_lock(name:string, timeout?:number):Promise<boolean>;
    export function read_unlock(name: string): void;
    export function write_lock(name:string, timeout?:number):Promise<boolean>;
    export function write_unlock(name: string): void;

    export function Lock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
    export function ReadLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
    export function WriteLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
}
