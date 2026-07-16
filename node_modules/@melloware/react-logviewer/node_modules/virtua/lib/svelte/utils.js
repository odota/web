const styleToString = (obj) => {
    return Object.keys(obj).reduce((acc, k) => {
        const value = obj[k];
        if (value == null) {
            return acc;
        }
        return acc + `${k}:${value};`;
    }, "");
};
const defaultGetKey = (_data, i) => "_" + i;

export { defaultGetKey, styleToString };
//# sourceMappingURL=utils.js.map
