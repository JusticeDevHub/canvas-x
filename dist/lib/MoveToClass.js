var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MoveToClass_timestamp;
export class MoveToClass {
    constructor() {
        this.startX = 0;
        this.startY = 0;
        this.targetX = 0;
        this.targetY = 0;
        this.speed = 0;
        this.method = "linear";
        _MoveToClass_timestamp.set(this, null);
        this.setMoveTo = (currentX, currentY, targetX, targetY, method, speed) => {
            this.startX = currentX;
            this.startY = currentY;
            this.targetX = targetX;
            this.targetY = targetY;
            this.method = method;
            this.speed = speed;
            __classPrivateFieldSet(this, _MoveToClass_timestamp, Date.now(), "f");
        };
        this.getMoveToData = () => {
            return {
                startX: this.startX,
                startY: this.startY,
                targetX: this.targetX,
                targetY: this.targetY,
                speed: this.speed,
                method: this.method,
                timestamp: __classPrivateFieldGet(this, _MoveToClass_timestamp, "f"),
            };
        };
    }
}
_MoveToClass_timestamp = new WeakMap();
//# sourceMappingURL=MoveToClass.js.map