# jQuery Object Identification
 
Provides a function that checks if the given object is a jQuery object.
 
## Usage
 
```js
const isJQueryObj = require('is-jquery-obj');
 
if(isJQueryObj($('#element')))
    console.log('$ is a jQuery object.');
    
if(!isJQueryObj({ foo: 'bar' }))    
    console.log('A regular JavaScript object is not a jQuery object.');
```
