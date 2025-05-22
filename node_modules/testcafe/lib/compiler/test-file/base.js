"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
class TestFileCompilerBase {
    constructor() {
        const escapedExt = lodash_1.flatten([this.getSupportedExtension()])
            .map(ext => lodash_1.escapeRegExp(ext))
            .join('|');
        this.supportedExtensionRe = new RegExp(`(${escapedExt})$`);
    }
    _hasTests( /* code */) {
        throw new Error('Not implemented');
    }
    getSupportedExtension() {
        throw new Error('Not implemented');
    }
    async precompile( /* testFilesInfo */) {
        throw new Error('Not implemented');
    }
    async compile( /* code, filename */) {
        throw new Error('Not implemented');
    }
    async execute( /* compiledCode, filename */) {
        throw new Error('Not implemented');
    }
    canCompile(code, filename) {
        return this.supportedExtensionRe.test(filename);
    }
    get canPrecompile() {
        return false;
    }
    cleanUp() {
        // NOTE: Optional. Do nothing by default.
    }
}
exports.default = TestFileCompilerBase;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21waWxlci90ZXN0LWZpbGUvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUEyRDtBQUUzRCxNQUFxQixvQkFBb0I7SUFDckM7UUFDSSxNQUFNLFVBQVUsR0FBRyxnQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQzthQUNyRCxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELFNBQVMsRUFBRSxVQUFVO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQscUJBQXFCO1FBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsRUFBRSxtQkFBbUI7UUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxFQUFFLG9CQUFvQjtRQUMvQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLEVBQUUsNEJBQTRCO1FBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsVUFBVSxDQUFFLElBQUksRUFBRSxRQUFRO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsSUFBSSxhQUFhO1FBQ2IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVELE9BQU87UUFDSCx5Q0FBeUM7SUFDN0MsQ0FBQztDQUNKO0FBeENELHVDQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVzY2FwZVJlZ0V4cCBhcyBlc2NhcGVSZSwgZmxhdHRlbiB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlc3RGaWxlQ29tcGlsZXJCYXNlIHtcbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIGNvbnN0IGVzY2FwZWRFeHQgPSBmbGF0dGVuKFt0aGlzLmdldFN1cHBvcnRlZEV4dGVuc2lvbigpXSlcbiAgICAgICAgICAgIC5tYXAoZXh0ID0+IGVzY2FwZVJlKGV4dCkpXG4gICAgICAgICAgICAuam9pbignfCcpO1xuXG4gICAgICAgIHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9uUmUgPSBuZXcgUmVnRXhwKGAoJHtlc2NhcGVkRXh0fSkkYCk7XG4gICAgfVxuXG4gICAgX2hhc1Rlc3RzICgvKiBjb2RlICovKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgZ2V0U3VwcG9ydGVkRXh0ZW5zaW9uICgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cbiAgICBhc3luYyBwcmVjb21waWxlICgvKiB0ZXN0RmlsZXNJbmZvICovKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgYXN5bmMgY29tcGlsZSAoLyogY29kZSwgZmlsZW5hbWUgKi8pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcbiAgICB9XG5cbiAgICBhc3luYyBleGVjdXRlICgvKiBjb21waWxlZENvZGUsIGZpbGVuYW1lICovKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG4gICAgfVxuXG4gICAgY2FuQ29tcGlsZSAoY29kZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3VwcG9ydGVkRXh0ZW5zaW9uUmUudGVzdChmaWxlbmFtZSk7XG4gICAgfVxuXG4gICAgZ2V0IGNhblByZWNvbXBpbGUgKCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY2xlYW5VcCAoKSB7XG4gICAgICAgIC8vIE5PVEU6IE9wdGlvbmFsLiBEbyBub3RoaW5nIGJ5IGRlZmF1bHQuXG4gICAgfVxufVxuIl19