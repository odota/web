"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __importDefault(require("../../cli/log"));
class Logger {
    constructor() {
        this.watching = true;
        this.MESSAGES = {
            intro: `Live mode is enabled.
TestCafe now watches source files and reruns
the tests once the changes are saved.
                    
You can use the following keys in the terminal:
'Ctrl+S' - stops the test run;
'Ctrl+R' - restarts the test run;
'Ctrl+W' - enables/disables watching files;
'Ctrl+C' - quits live mode and closes the browsers.
`,
            sourceChanged: 'The sources have changed. A test run is starting...',
            testRunStarting: 'A test run is starting...',
            testRunStopping: 'The test run is stopping...',
            testRunFinishedWatching: 'Make changes to the source files or press Ctrl+R to restart the test run.',
            testRunFinishedNotWatching: 'Press Ctrl+R to restart the test run.',
            fileWatchingEnabled: 'TestCafe is watching the source files. Save the changes to run tests.',
            fileWatchingDisabled: 'TestCafe is not watching the source files.',
            nothingToStop: 'There are no tests running at the moment.',
            testCafeStopping: 'Stopping TestCafe live mode...',
            watchingFiles: 'Watching the following files:',
        };
    }
    _write(msg, prefix = '\n') {
        log_1.default.write(`${prefix}${msg}`);
    }
    writeIntroMessage(files) {
        this._write(this.MESSAGES.intro);
        if (!Array.isArray(files))
            return;
        this._write(this.MESSAGES.watchingFiles);
        files.forEach(file => {
            this._write(file, '  ');
        });
    }
    writeRunTestsMessage(sourcesChanged) {
        const statusMessage = sourcesChanged ? this.MESSAGES.sourceChanged : this.MESSAGES.testRunStarting;
        this._write(statusMessage);
    }
    writeTestsFinishedMessage() {
        const statusMessage = this.watching ? this.MESSAGES.testRunFinishedWatching : this.MESSAGES.testRunFinishedNotWatching;
        this._write(statusMessage);
    }
    writeStopRunningMessage() {
        this._write(this.MESSAGES.testRunStopping);
    }
    writeNothingToStopMessage() {
        this._write(this.MESSAGES.nothingToStop);
    }
    writeToggleWatchingMessage(enable) {
        this.watching = enable;
        const statusMessage = enable ? this.MESSAGES.fileWatchingEnabled : this.MESSAGES.fileWatchingDisabled;
        this._write(statusMessage);
    }
    writeExitMessage() {
        this._write(this.MESSAGES.testCafeStopping);
    }
    err(err) {
        /* eslint-disable no-console */
        console.log(err);
        /* eslint-enable no-console */
    }
}
exports.default = Logger;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGl2ZS9sb2dnZXIvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx3REFBZ0M7QUFFaEMsTUFBcUIsTUFBTTtJQUN2QjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDWixLQUFLLEVBQUU7Ozs7Ozs7OztDQVNsQjtZQUVXLGFBQWEsRUFBZSxxREFBcUQ7WUFDakYsZUFBZSxFQUFhLDJCQUEyQjtZQUN2RCxlQUFlLEVBQWEsNkJBQTZCO1lBQ3pELHVCQUF1QixFQUFLLDJFQUEyRTtZQUN2RywwQkFBMEIsRUFBRSx1Q0FBdUM7WUFDbkUsbUJBQW1CLEVBQVMsdUVBQXVFO1lBQ25HLG9CQUFvQixFQUFRLDRDQUE0QztZQUN4RSxhQUFhLEVBQWUsMkNBQTJDO1lBQ3ZFLGdCQUFnQixFQUFZLGdDQUFnQztZQUM1RCxhQUFhLEVBQWUsK0JBQStCO1NBQzlELENBQUM7SUFDTixDQUFDO0lBRUQsTUFBTSxDQUFFLEdBQUcsRUFBRSxNQUFNLEdBQUcsSUFBSTtRQUN0QixhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlCQUFpQixDQUFFLEtBQUs7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNyQixPQUFPO1FBRVgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXpDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0JBQW9CLENBQUUsY0FBYztRQUNoQyxNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQztRQUVuRyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx5QkFBeUI7UUFDckIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQztRQUV2SCxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1QkFBdUI7UUFDbkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCx5QkFBeUI7UUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCwwQkFBMEIsQ0FBRSxNQUFNO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBRXZCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztRQUV0RyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0I7UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsR0FBRyxDQUFFLEdBQUc7UUFDSiwrQkFBK0I7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQiw4QkFBOEI7SUFDbEMsQ0FBQztDQUdKO0FBckZELHlCQXFGQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBsb2cgZnJvbSAnLi4vLi4vY2xpL2xvZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvZ2dlciB7XG4gICAgY29uc3RydWN0b3IgKCkge1xuICAgICAgICB0aGlzLndhdGNoaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLk1FU1NBR0VTID0ge1xuICAgICAgICAgICAgaW50cm86IGBMaXZlIG1vZGUgaXMgZW5hYmxlZC5cblRlc3RDYWZlIG5vdyB3YXRjaGVzIHNvdXJjZSBmaWxlcyBhbmQgcmVydW5zXG50aGUgdGVzdHMgb25jZSB0aGUgY2hhbmdlcyBhcmUgc2F2ZWQuXG4gICAgICAgICAgICAgICAgICAgIFxuWW91IGNhbiB1c2UgdGhlIGZvbGxvd2luZyBrZXlzIGluIHRoZSB0ZXJtaW5hbDpcbidDdHJsK1MnIC0gc3RvcHMgdGhlIHRlc3QgcnVuO1xuJ0N0cmwrUicgLSByZXN0YXJ0cyB0aGUgdGVzdCBydW47XG4nQ3RybCtXJyAtIGVuYWJsZXMvZGlzYWJsZXMgd2F0Y2hpbmcgZmlsZXM7XG4nQ3RybCtDJyAtIHF1aXRzIGxpdmUgbW9kZSBhbmQgY2xvc2VzIHRoZSBicm93c2Vycy5cbmAsXG5cbiAgICAgICAgICAgIHNvdXJjZUNoYW5nZWQ6ICAgICAgICAgICAgICAnVGhlIHNvdXJjZXMgaGF2ZSBjaGFuZ2VkLiBBIHRlc3QgcnVuIGlzIHN0YXJ0aW5nLi4uJyxcbiAgICAgICAgICAgIHRlc3RSdW5TdGFydGluZzogICAgICAgICAgICAnQSB0ZXN0IHJ1biBpcyBzdGFydGluZy4uLicsXG4gICAgICAgICAgICB0ZXN0UnVuU3RvcHBpbmc6ICAgICAgICAgICAgJ1RoZSB0ZXN0IHJ1biBpcyBzdG9wcGluZy4uLicsXG4gICAgICAgICAgICB0ZXN0UnVuRmluaXNoZWRXYXRjaGluZzogICAgJ01ha2UgY2hhbmdlcyB0byB0aGUgc291cmNlIGZpbGVzIG9yIHByZXNzIEN0cmwrUiB0byByZXN0YXJ0IHRoZSB0ZXN0IHJ1bi4nLFxuICAgICAgICAgICAgdGVzdFJ1bkZpbmlzaGVkTm90V2F0Y2hpbmc6ICdQcmVzcyBDdHJsK1IgdG8gcmVzdGFydCB0aGUgdGVzdCBydW4uJyxcbiAgICAgICAgICAgIGZpbGVXYXRjaGluZ0VuYWJsZWQ6ICAgICAgICAnVGVzdENhZmUgaXMgd2F0Y2hpbmcgdGhlIHNvdXJjZSBmaWxlcy4gU2F2ZSB0aGUgY2hhbmdlcyB0byBydW4gdGVzdHMuJyxcbiAgICAgICAgICAgIGZpbGVXYXRjaGluZ0Rpc2FibGVkOiAgICAgICAnVGVzdENhZmUgaXMgbm90IHdhdGNoaW5nIHRoZSBzb3VyY2UgZmlsZXMuJyxcbiAgICAgICAgICAgIG5vdGhpbmdUb1N0b3A6ICAgICAgICAgICAgICAnVGhlcmUgYXJlIG5vIHRlc3RzIHJ1bm5pbmcgYXQgdGhlIG1vbWVudC4nLFxuICAgICAgICAgICAgdGVzdENhZmVTdG9wcGluZzogICAgICAgICAgICdTdG9wcGluZyBUZXN0Q2FmZSBsaXZlIG1vZGUuLi4nLFxuICAgICAgICAgICAgd2F0Y2hpbmdGaWxlczogICAgICAgICAgICAgICdXYXRjaGluZyB0aGUgZm9sbG93aW5nIGZpbGVzOicsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgX3dyaXRlIChtc2csIHByZWZpeCA9ICdcXG4nKSB7XG4gICAgICAgIGxvZy53cml0ZShgJHtwcmVmaXh9JHttc2d9YCk7XG4gICAgfVxuXG4gICAgd3JpdGVJbnRyb01lc3NhZ2UgKGZpbGVzKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlKHRoaXMuTUVTU0FHRVMuaW50cm8pO1xuXG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShmaWxlcykpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdGhpcy5fd3JpdGUodGhpcy5NRVNTQUdFUy53YXRjaGluZ0ZpbGVzKTtcblxuICAgICAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgICAgICAgdGhpcy5fd3JpdGUoZmlsZSwgJyAgJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlUnVuVGVzdHNNZXNzYWdlIChzb3VyY2VzQ2hhbmdlZCkge1xuICAgICAgICBjb25zdCBzdGF0dXNNZXNzYWdlID0gc291cmNlc0NoYW5nZWQgPyB0aGlzLk1FU1NBR0VTLnNvdXJjZUNoYW5nZWQgOiB0aGlzLk1FU1NBR0VTLnRlc3RSdW5TdGFydGluZztcblxuICAgICAgICB0aGlzLl93cml0ZShzdGF0dXNNZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3cml0ZVRlc3RzRmluaXNoZWRNZXNzYWdlICgpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IHRoaXMud2F0Y2hpbmcgPyB0aGlzLk1FU1NBR0VTLnRlc3RSdW5GaW5pc2hlZFdhdGNoaW5nIDogdGhpcy5NRVNTQUdFUy50ZXN0UnVuRmluaXNoZWROb3RXYXRjaGluZztcblxuICAgICAgICB0aGlzLl93cml0ZShzdGF0dXNNZXNzYWdlKTtcbiAgICB9XG5cbiAgICB3cml0ZVN0b3BSdW5uaW5nTWVzc2FnZSAoKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlKHRoaXMuTUVTU0FHRVMudGVzdFJ1blN0b3BwaW5nKTtcbiAgICB9XG5cbiAgICB3cml0ZU5vdGhpbmdUb1N0b3BNZXNzYWdlICgpIHtcbiAgICAgICAgdGhpcy5fd3JpdGUodGhpcy5NRVNTQUdFUy5ub3RoaW5nVG9TdG9wKTtcbiAgICB9XG5cbiAgICB3cml0ZVRvZ2dsZVdhdGNoaW5nTWVzc2FnZSAoZW5hYmxlKSB7XG4gICAgICAgIHRoaXMud2F0Y2hpbmcgPSBlbmFibGU7XG5cbiAgICAgICAgY29uc3Qgc3RhdHVzTWVzc2FnZSA9IGVuYWJsZSA/IHRoaXMuTUVTU0FHRVMuZmlsZVdhdGNoaW5nRW5hYmxlZCA6IHRoaXMuTUVTU0FHRVMuZmlsZVdhdGNoaW5nRGlzYWJsZWQ7XG5cbiAgICAgICAgdGhpcy5fd3JpdGUoc3RhdHVzTWVzc2FnZSk7XG4gICAgfVxuXG4gICAgd3JpdGVFeGl0TWVzc2FnZSAoKSB7XG4gICAgICAgIHRoaXMuX3dyaXRlKHRoaXMuTUVTU0FHRVMudGVzdENhZmVTdG9wcGluZyk7XG4gICAgfVxuXG4gICAgZXJyIChlcnIpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgICB9XG5cblxufVxuIl19