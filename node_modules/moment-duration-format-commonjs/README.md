# Moment Duration Format CommonJS
### CommonJS (Node.js) specific version

**Format plugin for the Moment Duration object.**

This is a plugin to the Moment.js JavaScript date library to add comprehensive formatting to Moment Durations.

Format template grammar is patterned on the existing Moment Date format template grammar, with a few modifications because durations are fundamentally different from dates.

This plugin does not have any dependencies beyond Moment.js itself, and may be used in the browser and in Node.js.

---

## Formatting Numbers and Testing

Where it is available and functional, this plugin uses `Number#toLocaleString` to render formatted numerical output. Unfortunately, many environments do not fully implement the full suite of options in the `toLocaleString` spec, and some provide a buggy implementation.

This plugin runs a feature test for `toLocaleString`, and will revert to a fallback function to render formatted numerical output if the feature test fails. To force this plugin to always use the fallback number format function, set `useToLocaleString` to `false`. The fallback number format function output can be localized using options detailed at the bottom of this page. You should, in general, specify the fallback number formatting options if the default `"en"` locale formatting would be unacceptable on some devices or in some environments.

---

## Installation

The plugin depends on moment.js, which is not specified as a package dependency in the currently published version.

**Node.js**

`npm install moment-duration-format-commonjs`

---

## Usage

To use this plugin as a module, use the `require` function.

```javascript
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
```

The plugin exports the init function so that duration format can be initialized on other moment instances.

Call the exported setup function to install the plugin into the desired package.

```javascript
var moment = require("moment-timezone");
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);
typeof moment.duration.fn.format === "function";
// true
typeof moment.duration.format === "function";
// true
```

### Basics

#### Formatting a Single Duration

```javascript
moment.duration.fn.format
```

The `duration.fn.format` method can format any moment duration. If no template or other arguments are provided, the default template function will generate a template string based on the duration's value.

```javascript
moment.duration(123, "minutes").format();
// "2:03:00"

moment.duration(123, "months").format();
// "10 years, 3 months"
```

The duration format method may be called with three optional arguments, and returns a formatted string.

```javascript
moment.duration(value, units).format([template] [, precision] [, settings])
// formattedString
```

#### Formatting Multiple Durations

```javascript
moment.duration.format
```

The `duration.format` method allows coordinated formatting of multiple moment durations at once. This function accepts an array of durations as its first argument, then the same three optional arguments as the `duration.fn.format` function. This function returns an array of formatted strings.

```javascript
moment.duration.format(durationsArray, [template] [, precision] [, settings]);
// formattedStringsArray
```

All of the options that are available to the single duration format function can be used with the multiple duration format function. A single settings object is used to format each of the individual durations.

```javascript
moment.duration.format([
    moment.duration(1, "second"),
    moment.duration(1, "minute"),
    moment.duration(1, "hour")
], "d [days] hh:mm:ss");
// ["0:00:01", "0:01:00", "1:00:00"]
```

##### Invalid Durations

Invalid durations are treated as having a value of `0` for formatting.

```javascript
var invalidDuration = moment.duration(NaN, "second");

invalidDuration.isValid();
// false

invalidDuration.format();
// "0 seconds"
```

### Template

`template` (string|function) is the string used to create the formatted output, or a function that returns the string to be used as the format template.

#### Template String

```javascript
moment.duration(123, "minutes").format("h:mm");
// "2:03"
```

The template string is parsed for moment token characters, which are replaced with the duration's value for each unit type. The moment tokens are:

```
years:   Y or y
months:  M
weeks:   W or w
days:    D or d
hours:   H or h
minutes: m
seconds: s
ms:      S
```

Escape token characters within the template string using square brackets.
```javascript
moment.duration(123, "minutes").format("h [hrs], m [min]");
// "2 hrs, 3 mins"
```

#### Token Length

For some time duration formats, a zero-padded value is required. Use multiple token  characters together to create the correct amount of padding.

```javascript
moment.duration(3661, "seconds").format("h:mm:ss");
// "1:01:01"

moment.duration(15, "seconds").format("sss [s]");
// "015 s"
```

When the format template is trimmed, token length on the largest-magnitude rendered token can be trimmed as well. See sections **trim** and **forceLength** below for more details.

```javascript
moment.duration(123, "seconds").format("h:mm:ss");
// "2:03"
```

##### Milliseconds Token Length

Token length of `2` for milliseconds is a special case, most likely used to render milliseconds as part of a timer output, such as `mm:ss:SS`. In this case, the milliseconds value is padded to three digits then truncated from the left to render a two digit output.

```javascript
moment.duration(9, "milliseconds").format("mm:ss:SS", {
    trim: false
});
// "00:00:00"

moment.duration(10, "milliseconds").format("mm:ss:SS", {
    trim: false
});
// "00:00:01"

moment.duration(999, "milliseconds").format("mm:ss:SS", {
    trim: false
});
// "00:00:99"

moment.duration(1011, "milliseconds").format("mm:ss:SS", {
    trim: false
});
// "00:01:01"
```

#### Multiple Token Instances

Tokens can appear multiple times in the format template, but all instances must share the same length. If they do not, all instances will be rendered at the length of the first token of that type.

```javascript
moment.duration(15, "seconds").format("ssss sss ss s");
// "0015 0015 0015 0015"

moment.duration(15, "seconds").format("s ss sss ssss");
// "15 15 15 15"
```

#### Default Template Function

The default template function attempts to format a duration based on its magnitude. The larger the duration value, the larger the units of the formatted output will be.

For some duration values, the default template function will default `trim` to `"both"` if that option is not set in the settings object (more on that below).

The default template function uses auto-localized unit labels (more on that below, also).

```javascript
moment.duration(100, "milliseconds").format();
// "100 milliseconds"

moment.duration(100, "seconds").format();
// "1:40"

moment.duration(100, "days").format();
// "3 months, 9 days"

moment.duration(100, "weeks").format();
// "1 year, 10 months, 30 days"

moment.duration(100, "months").format();
// "8 years, 4 months"
```

#### Custom Template Function

Use a custom template function if you need runtime control over the template string. Template functions are executed with a `this` binding of the settings object, and have access to the underlying duration object via `this.duration`. Any of the settings may be accessed or modified by the template function.

This custom template function uses a different template based on the value of the duration:

```javascript
function customTemplate() {
    return this.duration.asSeconds() >= 86400 ? "w [weeks], d [days]" : "hh:mm:ss";
}

moment.duration(65, 'seconds').format(customTemplate, {
    trim: false
});
// "00:01:05"

moment.duration(1347840, 'seconds').format(customTemplate, {
    trim: false
});
// "2 weeks, 2 days"
```

#### Punctuation Trimming

To ensure user-friendly formatted output, punctuation characters are trimmed from the beginning and end of the formatted output. Specifically, leading and trailing period `.`, comma `,`, colon `:`, and space ` ` characters are removed.

### Precision

`precision` (number) defines the number of decimal fraction or integer digits to display for the final value.

The default precision value is `0`.

```javascript
moment.duration(123, "minutes").format("h [hrs]");
// "2 hrs"
```

Positive precision defines the number of decimal fraction digits to display.
```javascript
moment.duration(123, "minutes").format("h [hrs]", 2);
// "2.05 hrs"
```

Negative precision defines the number of integer digits to truncate to zero.
```javascript
moment.duration(223, "minutes").format("m [min]", -2);
// "200 mins"
```

### Settings

`settings` is an object that can override any of the default moment duration format options.

Both the `template` and `precision` arguments may be specified as properties of a single `settings` object argument, or they may be passed separately along with an optional settings object.

```javascript
moment.duration(123, "minutes").format({
    template: "h [hrs]",
    precision: 2
});
// "2.05 hrs"
```

#### trim

The default `trim` behaviour is `"large"`.

Largest-magnitude tokens are automatically trimmed when they have no value.
```javascript
moment.duration(123, "minutes").format("d[d] h:mm:ss");
// "2:03:00"
```

Trimming also functions when the format string is oriented with token magnitude increasing from left to right.
```javascript
moment.duration(123, "minutes").format("s [seconds], m [minutes], h [hours], d [days]");
// "0 seconds, 3 minutes, 2 hours"
```

To stop trimming altogether, set `{ trim: false }`.
```javascript
moment.duration(123, "minutes").format("d[d] h:mm:ss", {
    trim: false
});
// "0d 2:03:00"
```

When formatting multiple durations using `moment.duration.format`, trimming for all of the durations is coordinated on the union of the set of durations.

```javascript
moment.duration.format([
    moment.duration(1, "minute"),
    moment.duration(1, "hour"),
    moment.duration(1, "day")
], "y [years], w [weeks], d [days], h [hours], m [minutes]");
// [
//    "0 days, 0 hours, 1 minute",
//    "0 days, 1 hour, 0 minutes",
//    "1 day, 0 hours, 0 minutes"
// ]
```

`trim` can be a string, a delimited list of strings, an array of strings, or a boolean. Accepted values are as follows:

- ##### `"large"`

Trim largest-magnitude zero-value tokens until finding a token with a value, a token identified as `stopTrim`, or the final token of the format string. This is the default `trim` value.

```javascript
moment.duration(123, "minutes").format("d[d] h:mm:ss");
// "2:03:00"

moment.duration(123, "minutes").format("d[d] h:mm:ss", {
    trim: "large"
});
// "2:03:00"

moment.duration(0, "minutes").format("d[d] h:mm:ss", {
    trim: "large"
});
// "0"
```

- ##### `"small"`

Trim smallest-magnitude zero-value tokens until finding a token with a value, a token identified as `stopTrim`, or the final token of the format string.

```javascript
moment.duration(123, "minutes").format("d[d] h:mm:ss", {
    trim: "small"
});
// "0d 2:03"

moment.duration(0, "minutes").format("d[d] h:mm:ss", {
    trim: "small"
});
// "0d"
```

- ##### `"both"`

Execute `"large"` trim then `"small"` trim.

```javascript
moment.duration(123, "minutes").format("d[d] h[h] m[m] s[s]", {
    trim: "both"
});
// "2h 3m"

moment.duration(0, "minutes").format("d[d] h[h] m[m] s[s]", {
    trim: "both"
});
// "0s"
```

- ##### `"mid"`

Trim any zero-value tokens that are not the first or last tokens. Usually used in conjunction with `"large"` or `"both"`. e.g. `"large mid"` or `"both mid"`.

```javascript
moment.duration(1441, "minutes").format("w[w] d[d] h[h] m[m] s[s]", {
    trim: "mid"
});
// "0w 1d 1m 0s"

moment.duration(1441, "minutes").format("w[w] d[d] h[h] m[m] s[s]", {
    trim: "large mid"
});
// "1d 1m 0s"

moment.duration(1441, "minutes").format("w[w] d[d] h[h] m[m] s[s]", {
    trim: "small mid"
});
// "0w 1d 1m"

moment.duration(1441, "minutes").format("w[w] d[d] h[h] m[m] s[s]", {
    trim: "both mid"
});
// "1d 1m"

moment.duration(0, "minutes").format("w[w] d[d] h[h] m[m] s[s]", {
    trim: "both mid"
});
// "0s"
```

- ##### `"final"`

Trim the final token if it is zero-value. Use this option with `"large"` or `"both"` to output an empty string when formatting a zero-value duration. e.g. `"large final"` or `"both final"`.

```javascript
moment.duration(0, "minutes").format("d[d] h:mm:ss", {
    trim: "large final"
});
// ""

moment.duration(0, "minutes").format("d[d] h:mm:ss", {
    trim: "small final"
});
// ""

moment.duration(0, "minutes").format("d[d] h[h] m[m] s[s]", {
    trim: "both final"
});
// ""
```

- ##### `"all"`

Trim all zero-value tokens. Shorthand for `"both mid final"`.

```javascript
moment.duration(0, "minutes").format("d[d] h[h] m[m] s[s]", {
    trim: "all"
});
// ""
```

- ##### `"left"`

Maps to `"large"` to support this plugin's version 1 API.

- ##### `"right"`

Maps to `"large"` to support this plugin's version 1 API.

- ##### `true`

Maps to `"large"`.

- ##### `null`

Maps to `"large"`.

- ##### `false`

Disables trimming.

#### largest

Set `largest` to a positive integer to output only the `n` largest-magnitude moment tokens, starting with the largest-magnitude token that has a value.

**Using the `largest` option defaults `trim` to `"all"`.**

```javascript
moment.duration(7322, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    largest: 2
});
// "2 hours, 2 minutes"

moment.duration(1216800, "seconds").format("y [years], w [weeks], d [days], h [hours], m [minutes], s [seconds]", {
    largest: 3
});
// "2 weeks, 2 hours"
```

Setting `trim` to a different value, or using `stopTrim` can change the starting token as well as the remaining output.

```javascript
moment.duration(1216800, "seconds").format("y [years], w [weeks], d [days], h [hours], m [minutes], s [seconds]", {
    largest: 3,
    trim: "both"
});
// "2 weeks, 0 days, 2 hours"

moment.duration(1216800, "seconds").format("y [years], w [weeks], d [days], h [hours], m [minutes], s [seconds]", {
    largest: 3,
    trim: "both",
    stopTrim: "m"
});
// "2 weeks, 0 days, 2 hours"

moment.duration(1216800, "seconds").format("y [years], w [weeks], d [days], h [hours], m [minutes], s [seconds]", {
    largest: 4,
    trim: false
});
// "2 weeks, 0 days, 2 hours, 0 minutes"

moment.duration(2, "hours").format("y [years], d [days], h [hours], m [minutes], s [seconds]", {
    trim: "both",
    stopTrim: "d m",
    largest: 2
});
// "0 days 2 hours"
```

#### stopTrim

Trimming will stop when a token listed in this option is reached.

Option value may be a moment token string, a delimited set of moment token strings, or an array of moment token strings. Alternatively, set `stopTrim` on tokens in the format template string directly using a `*` character before the moment token.

```javascript
moment.duration(23, "minutes").format("d[d] h:mm:ss", {
    stopTrim: "h"
});
// "0:23:00"

moment.duration(23, "minutes").format("d[d] *h:mm:ss");
// "0:23:00"
```

This option affects all trimming modes: `"large"`, `"small"`, `"mid"`, and `"final"`.

```javascript
moment.duration(2, "hours").format("y [years], d [days], h [hours], m [minutes], s [seconds]", {
    trim: "both",
    stopTrim: "d m"
});
// "0 days, 2 hours, 0 minutes"

moment.duration(2, "hours").format("y [years], *d [days], h [hours], *m [minutes], s [seconds]", {
    trim: "both"
});
// "0 days, 2 hours, 0 minutes"
```

#### trunc

Default behavior rounds the final token value.

```javascript
moment.duration(179, "seconds").format("m [minutes]");
// "3 minutes"

moment.duration(3780, "seconds").format("h [hours]", 1);
// "1.1 hours"
```

Set `trunc` to `true` to truncate final token value. This was the default behavior in version 1 of this plugin.

```javascript
moment.duration(179, "seconds").format("m [minutes]", {
    trunc: true
});
// "2 minutes"

moment.duration(3780, "seconds").format("h [hours]", 1, {
    trunc: true
});
// "1.0 hours"
```

Using `trunc` can affect the operation of `trim` and `largest`.

```javascript
moment.duration(59, "seconds").format("d [days], h [hours], m [minutes]", {
    trunc: true,
    trim: "both"
});
// "0 minutes"

moment.duration(59, "seconds").format("d [days], h [hours], m [minutes]", {
    trunc: true,
    trim: "all"
});
// ""

moment.duration(59, "seconds").format("d [days], h [hours], m [minutes]", {
    trunc: true,
    largest: 1
});
// ""
```

#### minValue

Use `minValue` to render generalized output for small duration values, e.g. `"< 5 minutes"`. `minValue` must be a positive number and is applied to the least-magnitude moment token in the format template.

```javascript
moment.duration(59, "seconds").format("h [hours], m [minutes]", {
    minValue: 1
});
// "< 1 minute"
```

The minimum value will bubble up to larger-magnitude units if they are present in the format template.

```javascript
moment.duration(59, "seconds").format("m:ss", {
    minValue: 60
});
// "< 1:00"
```

This option can be used in conjunction with `trim`, and is not affected by `trunc`.

``` javascript
moment.duration(59, "seconds").format("h [hours], m [minutes]", {
    minValue: 1,
    trim: "both"
});
// "< 1 minute"

moment.duration(59, "seconds").format("h [hours], m [minutes]", {
    minValue: 1,
    trunc: true,
    trim: "both"
});
// "< 1 minute"

moment.duration(59, "seconds").format("h [hours], m [minutes]", {
    minValue: 1,
    trim: false
});
// "< 0 hours, 1 minute"
```

`minValue` can be used with negative durations, where it has the same effect on the least-magnitude moment token's absolute value.

```javascript
moment.duration(-59, "seconds").format("h [hours], m [minutes]", {
    minValue: 1
});
// "> -1 minute"
```

If `minValue` is a non-integer number, `precision` should be set as well so that the formatted output makes sense.

```javascript
moment.duration(89, "seconds").format("m", {
    minValue: 1.5,
    precision: 1
});
// "< 1.5"

moment.duration(90, "seconds").format("m", {
    minValue: 1.5,
    precision: 1
});
// "1.5"
```

#### maxValue

Use `maxValue` to render generalized output for large duration values, e.g. `"> 60 days"`. `maxValue` must be a positive number and is applied to the greatest-magnitude moment token in the format template. As with `minValue`, this option can be used in conjunction with `trim`, is not affected by `trunc`, and can be used with negative durations.

**Using the `maxValue` option defaults `trim` to `"all"`.**

```javascript
moment.duration(15, "days").format("w [weeks]", {
    maxValue: 2
});
// "> 2 weeks"

moment.duration(-15, "days").format("w [weeks]]", {
    maxValue: 2
});
// "< -2 weeks"
```

`maxValue` can be used with `trim` and `largest`, but when the maximum value is reached, all lesser-magnitude token values are forced to `0`.

```javascript
moment.duration(15.5, "days").format("w [weeks], d [days], h [hours]", {
    maxValue: 2,
    trim: false,
    largest: 2
});
// "> 2 weeks, 0 days"
```

If `maxValue` is a non-integer number, `precision` should be set as well so that the formatted output makes sense.

```javascript
moment.duration(89, "seconds").format("m", {
    minValue: 1.5,
    precision: 1
});
// "< 1.5"

moment.duration(90, "seconds").format("m", {
    minValue: 1.5,
    precision: 1
});
// "1.5"
```

#### forceLength

Force the first moment token with a value to render at full length, even when the template is trimmed and the first moment token has a length of `1`. Sounds more complicated than it is.

```javascript
moment.duration(123, "seconds").format("h:mm:ss");
// "2:03"
```

If you want minutes to always be rendered with two digits, you can use a first token with a length greater than 1 (this stops the automatic token length trimming for the first token that has a value).

```javascript
moment.duration(123, "seconds").format("hh:mm:ss");
// "02:03"
```

Or you can use `{ forceLength: true }`.

```javascript
moment.duration(123, "seconds").format("h:mm:ss", {
    forceLength: true
});
// "02:03"
```

#### useSignificantDigits

When `useSignificantDigits` is set to `true`, the `precision` option determines the maximum significant digits to be rendered. Precision must be a positive integer. Significant digits extend across unit types, e.g. `"6 hours 37.5 minutes"` represents `4` significant digits. Enabling this option causes token length to be ignored.

**Using the `useSignificantDigits` option defaults `trim` to `"all"`.**

Setting `trunc` affects the operation of `useSignificantDigits`.

See the documentation for [toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) for more information on significant digits.

```javascript
moment.duration(99999, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    useSignificantDigits: true,
    precision: 3
});
// "1 day, 3 hours, 50 minutes"

moment.duration(99999, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    useSignificantDigits: true,
    precision: 3,
    trunc: true
});
// "1 day, 3 hours, 40 minutes"

moment.duration(99999, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    useSignificantDigits: true,
    precision: 5
});
// "1 day, 3 hours, 46 minutes, 40 seconds"

moment.duration(99999, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    useSignificantDigits: true,
    trunc: true,
    precision: 5
});
// "1 day, 3 hours, 46 minutes, 30 seconds"

moment.duration(99999, "seconds").format("d [days], h [hours], m [minutes], s [seconds]", {
    useSignificantDigits: true,
    precision: 6
});
// "1 day, 3 hours, 46 minutes, 39 seconds"
```

`useSignificantDigits` can be used together with `trim`.

```javascript
moment.duration(12.55, "hours").format("h:mm", {
    precision: 2,
    useSignificantDigits: true,
    trim: false
});
// "13:00"

moment.duration(12.55, "hours").format("h:mm", {
    precision: 2,
    useSignificantDigits: true,
    trim: false,
    trunc: true
});
// "12:00"
```

### Localization

Formatted numerical output is rendered using [`toLocaleString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) if that built-in function is available and passes a feature test on plugin initialization. If the feature test fails, a fallback format function is used. See below for details on localizing output from the fallback format function.

Unit labels are automatically localized and pluralized. Unit labels are detected using the [locale set in moment.js](https://momentjs.com/docs/#/i18n/), which can be different from the locale of user's environment. This plugin uses custom extensions to the moment.js locale object, which can be easily added for any locale (see below).

It's likely that the options below do not address every i18n requirement for duration formatting (the plugin hasn't been tested on languages that are written from right to left, for instance), but they are a significant step in the right direction and support languages with [multiple forms of plural](https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals)).

#### userLocale

Numerical output is rendered using the locale set in moment.js, retrieved via `moment.locale()`. Set the `userLocale` option to render numerical output using a different locale.

```javascript
moment.duration(1234567, "seconds").format("m [minutes]", 3);
// "20,576.117 minutes"

moment.duration(1234567, "seconds").format("m [minutes]", 3, {
    userLocale: "de-DE"
});
// "20.576,117 minutes"
```

#### Auto-Localized Unit Labels

The `_` character can be used to generate auto-localized unit labels in the formatted output.

A single underscore `_` will be replaced with the short duration unit label for its associated moment token.

A double underscore `__` will be replaced with the standard duration unit label for its associated moment token.

```javascript
moment.duration(2, "minutes").format("m _");
// "2 mins"

moment.duration(2, "minutes").format("m __");
// "2 minutes"
```

These are the default `"en"` locale options for unit labels. Unit label types and even the `"_"` character usage can be customized in the locale object extensions (see below).

#### Auto-Localized Time Notation

Durations can also be formatted with a localized time notation.

The string `_HMS_` is replaced with a localized `hour/minute/second` time notation, e.g. `h:mm:ss`.

The string `_HM_` is replaced with a localized `hour/minute` time notation, e.g. `h:mm`.

The string `_MS_` is replaced with a localized `minute/second` time notation, e.g. `m:ss`.

```javascript
moment.duration(3661, "seconds").format("_HMS_");
// "1:01:01"

moment.duration(3661, "seconds").format("_HM_");
// "1:01"

moment.duration(61, "seconds").format("_MS_");
// "1:01"
```

These are the default `"en"` locale options for duration time notation templates. Additional templates may be created in the locale object extensions (see below).

#### usePlural

Unit label pluralization is automatically corrected when unit labels appear in the text associated with each moment token. The default `"en"` locale extension includes long and short unit labels, and a basic pluralization function. Unit labels, unit label types, and the pluralization function can be customized for a locale (see below).

```javascript
moment.duration(1, "minutes").format("m [minutes]");
// "1 minute"

moment.duration(1, "minutes").format("m [mins]");
// "1 min"

moment.duration(2, "minutes").format("m [minute]");
// "2 minutes"

moment.duration(2, "minutes").format("m [min]");
// "2 mins"
```

Set `usePlural` to `false` to disable auto-correction of pluralization.

```javascript
moment.duration(1, "minutes").format("m [minutes]", {
    usePlural: false
});
// "1 minutes"

moment.duration(1, "minutes").format("m [mins]", {
    usePlural: false
});
// "1 mins"

moment.duration(2, "minutes").format("m [minute]", {
    usePlural: false
});
// "2 minute"

moment.duration(2, "minutes").format("m [min]", {
    usePlural: false
});
// "2 min"
```

The default pluralization function for the `"en"` locale outputs a plural unit name when a value is rendered with decimal precision.

```javascript
moment.duration(1, "minutes").format("m [minutes]", 2);
// "1.00 minutes"
```

#### useLeftUnits

The text to the right of each moment token in a template string is treated as that token's units for the purposes of trimming, pluralizing, and localizing. To properly process a template string where the token/unit association is reversed, set `useLeftUnits` to `true`.

```javascript
moment.duration(7322, "seconds").format("_ h, _ m, _ s", {
    useLeftUnits: true
});
// "hrs 2, mins 2, secs 2"
```

#### useGrouping

Formatted numerical output is rendered using `toLocaleString` with the option `useGrouping` enabled. Set `useGrouping` to `false` to disable digit grouping.

```javascript
moment.duration(1234, "seconds").format("s [seconds]");
// "1,234 seconds"

moment.duration(1234, "seconds").format("s [seconds]", {
    useGrouping: false
});
// "1234 seconds"
```

#### Extending Moment's `locale` object

This plugin now extends the moment.js `locale` object with duration labels, duration label types, duration time-notation templates, and a pluralization function. The `"en"` locale is included with this plugin. Other locales may be  defined using the moment.js locale API to provide auto-pluralized and auto-localized unit labels in different languages. If the plugin cannot find the duration locale extensions for the active moment locale, the plugin will fall back to the `"en"` locale.

Below is the default `"en"` locale extension.

```javascript
moment.updateLocale('en', {
    durationLabelsStandard: {
        S: 'millisecond',
        SS: 'milliseconds',
        s: 'second',
        ss: 'seconds',
        m: 'minute',
        mm: 'minutes',
        h: 'hour',
        hh: 'hours',
        d: 'day',
        dd: 'days',
        w: 'week',
        ww: 'weeks',
        M: 'month',
        MM: 'months',
        y: 'year',
        yy: 'years'
    },
    durationLabelsShort: {
        S: 'msec',
        SS: 'msecs',
        s: 'sec',
        ss: 'secs',
        m: 'min',
        mm: 'mins',
        h: 'hr',
        hh: 'hrs',
        d: 'dy',
        dd: 'dys',
        w: 'wk',
        ww: 'wks',
        M: 'mo',
        MM: 'mos',
        y: 'yr',
        yy: 'yrs'
    },
    durationTimeTemplates: {
        HMS: 'h:mm:ss',
        HM: 'h:mm',
        MS: 'm:ss'
    },
    durationLabelTypes: [
        { type: "standard", string: "__" },
        { type: "short", string: "_" }
    ],
    durationPluralKey: function (token, integerValue, decimalValue) {
        // Singular for a value of `1`, but not for `1.0`.
        if (integerValue === 1 && decimalValue === null) {
            return token;
        }

        return token + token;
    }
});
```

##### Creating a new Moment `locale` extension

The duration extensions for a new locale might look something like the following example, which includes an additional unit label type, a custom time-notation template, and an additional form of plural.

This example provides new values for all of the duration locale extensions. In a new locale, you can include updates for one or more of the duration locale extensions, and any that you do not include will automatically fall back to the `"en"` versions in this plugin. e.g. your locale could update only the `durationLabelsShort` object, or only the `durationPluralKey` function, if those were the only differences from the default `"en"` locale configuration.

New types of duration labels must have a key that begins with `durationLabels` and must be enumerated in `durationLabelTypes`.

This locale uses a single token `"s"` for the singular label, a double token `"ss"` for the plural label when the value is `2`, and a triple token `"sss"` for the plural label for values greater than `3`. For brevity, only labels for the `seconds` type are included.

Unit labels are replaced after the format template string is tokenized, so they need not be escaped. Time-notation templates are replaced before the format template string is tokenized, so they must be escaped.

```javascript
moment.updateLocale('sample', {
    durationLabelsLong: {
        s: 'singular long second',
        ss: 'first long plural seconds',
        sss: 'next long plural seconds'
        // ...
    },
    durationLabelsStandard: {
        s: 'singular second',
        ss: 'first plural seconds',
        sss: 'next plural seconds'
        // ...
    },
    durationLabelsShort: {
        s: 'singular sec',
        ss: 'first plural secs',
        sss: 'next plural secs'
        // ...
    },
    durationTimeTemplates: {
        HS: 'hh[h].ssss[s]'
        // ...
    },
    durationLabelTypes: [
        { type: "long", string: "___" },
        { type: "standard", string: "__" },
        { type: "short", string: "_" }
    ],
    durationPluralKey: function (token, integerValue, decimalValue) {
        // Decimal value does not affect unit label for this locale.

        // "xxx" for > 2.
        if (integerValue > 2) {
            return token + token + token;
        }

        // "x" for === 1.
        if (integerValue === 1) {
            return token;
        }

        // "xx" for others.
        return token + token;
    }
});
```

###### `durationPluralKey`

The function for `durationPluralKey` is passed three arguments:

- `token`

String. A single character representing the unit type.

```
years:   y
months:  M
weeks:   w
days:    d
hours:   h
minutes: m
seconds: s
ms:      S
```

- `integerValue`

Number. The integer portion of the token's value.

- `decimalValue`

Number. The decimal fraction portion of the token's value.

### Localization and the Fallback Number Format Function

You can (and likely should) set the localization options for the fallback number format function if the default `"en"` locale formatting is not acceptable on some devices or in some environments.

#### `useToLocaleString`

Set this option to `false` to ignore the `toLocaleString` feature test and force the use of the `formatNumber` fallback function included in this plugin.

The fallback number format options will have no effect when `toLocaleString` is used. The grouping separator, decimal separator, and integer digit grouping will be determined by the user locale.

```javascript
moment.duration(100000.1, "seconds").format("s", {
    userLocale: "de-DE",
    precision: 2,
    decimalSeparator: ",",
    groupingSeparator: "."
});
// "100.000,10" on all devices and in all environemnts.
```

#### `groupingSeparator`

The integer digit grouping separator used when using the fallback number format function. Default value is a `,` character.

#### `decimalSeparator`

The decimal separator used when using the fallback number format function. Default value is a `.` character.

#### `grouping`

The integer digit grouping used when using the fallback number format function. Must be an array. The default value of `[3]` gives the standard 3-digit thousand/million/billion digit groupings for the "en" locale. Setting this option to `[3, 2]` would generate the thousand/lakh/crore digit groupings used in the "en-IN" locale.

```javascript
// Force the use of the fallback number format function. Do not use toLocaleString.
// We're in some sort of strange hybrid french-indian locale...
moment.duration(100000000000, "seconds").format("m", {
    useToLocaleString: false,
    precision: 2,
    decimalSeparator: ",",
    groupingSeparator: " ",
    grouping: [3, 2]
});
// "1 66 66 66 666,67");
```
