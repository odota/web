function pad(n, width, z)
{
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function format(input)
{
    input = Number(input);
    if (input === 0 || Number.isNaN(input))
    {
        return "-";
    }
    return (Math.abs(input) < 1000 ? ~~(input) : window.numeral(input).format('0.0a'));
}

function formatSeconds(input)
{
    var absTime = Math.abs(input);
    var minutes = ~~(absTime / 60);
    var seconds = window.pad(~~(absTime % 60), 2);
    var time = ((input < 0) ? "-" : "");
    time += minutes + ":" + seconds;
    return time;
}
module.exports = {
    pad, format, formatSeconds
};
