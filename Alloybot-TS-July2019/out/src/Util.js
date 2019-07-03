"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Util {
    static GetMinutes(Time) {
        // Hours, minutes and seconds
        var hrs = ~~(Time / 3600);
        var mins = ~~((Time % 3600) / 60);
        var secs = ~~Time % 60;
        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
}
exports.Util = Util;
//# sourceMappingURL=Util.js.map