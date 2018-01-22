"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util = require("util");
var _timeout = util.promisify(setTimeout);
var _interval = util.promisify(setInterval);
var _immediate = util.promisify(setImmediate);
var Mode;
(function (Mode) {
    Mode[Mode["None"] = 0] = "None";
    Mode[Mode["Normal"] = 1] = "Normal";
    Mode[Mode["Read"] = 2] = "Read";
    Mode[Mode["Write"] = 3] = "Write";
})(Mode = exports.Mode || (exports.Mode = {}));
var Info = (function () {
    function Info() {
        this.mode = Mode.None;
        this.value = 0;
    }
    Info.prototype.lock = function (mode) {
        if (this.mode == Mode.None)
            this.mode = mode;
        switch (mode) {
            case Mode.Normal:
                if (this.mode != Mode.Normal ||
                    this.value > 0)
                    return false;
                this.value = 1;
                return true;
            case Mode.Read:
                if (this.mode != Mode.Read)
                    return false;
                this.value += 1;
                return true;
            case Mode.Write:
                if (this.mode != Mode.Write ||
                    this.value != 0)
                    return false;
                this.value = 1;
                return true;
            default:
                return false;
        }
    };
    Info.prototype.unlock = function () {
        switch (this.mode) {
            case Mode.Normal:
                this.value = 0;
                return;
            case Mode.Read:
                this.value -= 1;
                if (this.value == 0) {
                    this.mode = Mode.None;
                    this.value = 0;
                }
                return;
            case Mode.Write:
                this.mode = Mode.None;
                this.value = 0;
                return;
        }
    };
    return Info;
}());
var _locks = {};
exports.wait = _timeout;
exports.sleep = _timeout;
function until(test) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!test()) return [3, 2];
                    return [4, exports.wait(1)];
                case 1:
                    _a.sent();
                    return [3, 0];
                case 2: return [2];
            }
        });
    });
}
exports.until = until;
function lock(name, timeout, mode) {
    if (timeout === void 0) { timeout = 0; }
    if (mode === void 0) { mode = Mode.Normal; }
    return __awaiter(this, void 0, void 0, function () {
        var _lock, uptime, get_lock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _lock = null;
                    return [4, _immediate().then(function () {
                            _lock = _locks[name];
                            if (_lock == null) {
                                _lock = new Info();
                                _locks[name] = _lock;
                            }
                        })];
                case 1:
                    _a.sent();
                    uptime = process.uptime();
                    get_lock = false;
                    if (timeout <= 0)
                        timeout = Number.MAX_VALUE;
                    else
                        timeout = timeout / 1000;
                    _a.label = 2;
                case 2: return [4, _immediate().then(function () {
                        get_lock = _lock.lock(mode);
                    })];
                case 3:
                    _a.sent();
                    if (get_lock)
                        return [2, true];
                    if (process.uptime() - uptime > timeout)
                        return [2, false];
                    return [4, exports.wait(1)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    if (true) return [3, 2];
                    _a.label = 6;
                case 6: return [2];
            }
        });
    });
}
exports.lock = lock;
function unlock(name) {
    var lock = _locks[name];
    if (lock != null)
        lock.unlock();
}
exports.unlock = unlock;
function read_lock(name, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, lock(name, timeout, Mode.Read)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.read_lock = read_lock;
exports.read_unlock = unlock;
function write_lock(name, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, lock(name, timeout, Mode.Write)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.write_lock = write_lock;
exports.write_unlock = unlock;
function Lock(name, dofunc, timeout, mode) {
    if (timeout === void 0) { timeout = 0; }
    if (mode === void 0) { mode = Mode.Normal; }
    return __awaiter(this, void 0, void 0, function () {
        var locked;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locked = false;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 5, 6]);
                    return [4, lock(name, timeout)];
                case 2:
                    locked = _a.sent();
                    if (!locked) return [3, 4];
                    return [4, dofunc()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2, locked];
                case 5:
                    if (locked)
                        unlock(name);
                    return [7];
                case 6: return [2];
            }
        });
    });
}
exports.Lock = Lock;
function ReadLock(name, dofunc, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Lock(name, dofunc, timeout, Mode.Read)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.ReadLock = ReadLock;
function WriteLock(name, dofunc, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Lock(name, dofunc, timeout, Mode.Write)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.WriteLock = WriteLock;
//# sourceMappingURL=lock.js.map