/* Copyright xerysherry 2018
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

declare namespace xlock
{
    export enum Mode { Normal, Read, Write }

    /**
     * Wait a moment.
     * @param ms wait time. microsecond.
     */
    export function wait(ms: number);
    /**
     * Sleep a moment. Same as wait.
     * @param ms sleep time. microsecond.
     */
    export function sleep(ms: number);
    /**
     * Until test() return a true, otherwise wait.
     * @param test test function.
     */
    export function until(test: ()=>boolean): Promise<boolean>;
    /**
     * Lock
     * @param lock Lock Name
     * @param timeout Time. some time pass, if not get lock, it will be timeout and return false. default timeout disable.
     * @param mode Lock Mode. (Normal, Read, Write)
     */
    export function lock(name:string, timeout?:number, mode?: Mode):Promise<boolean>
    /**
     * Unlock
     * @param name Unlock Name
     */
    export function unlock(name: string): void;
    /**
     * Check Lock. If unlock, return false. If lock, return true.
     * @param name Lock name
     * @param mode Lock Mode. (Normal, Read, Write)
     */
    export function check(name: string, mode?:Mode): boolean;
    /**
     * Read Lock
     * @param name Lock Name
     * @param timeout see lock api
     */
    export function read_lock(name:string, timeout?:number):Promise<boolean>;
    /**
     * Read Unlock
     * @param name Unlock Name
     */
    export function read_unlock(name: string): void;
    /**
     * Check ReadLock
     * @param name Lock Name
     */
    export function check_read_lock(name:string): boolean;
    /**
     * Write Lock
     * @param name Lock Name
     * @param timeout see lock api
     */
    export function write_lock(name:string, timeout?:number):Promise<boolean>;
    /**
     * Write Unlock
     * @param name Unlock Name
     */
    export function write_unlock(name: string): void;
    /**
     * Check WriteLock
     * @param name Lock Name
     */
    export function check_write_lock(name:string): boolean;

    export function Lock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
    export function ReadLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
    export function WriteLock(name: string, dofunc: ()=>void, timeout?:number, mode?: Mode):Promise<boolean>;
}
export = xlock;
