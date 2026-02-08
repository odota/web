# redux-responsive

[![Build Status](https://travis-ci.org/AlecAivazis/redux-responsive.svg?branch=master)](https://travis-ci.org/AlecAivazis/redux-responsive)
[![Coverage Status](https://coveralls.io/repos/github/AlecAivazis/redux-responsive/badge.svg?branch=master)](https://coveralls.io/github/AlecAivazis/redux-responsive?branch=master)
[![npm](https://img.shields.io/npm/v/redux-responsive.svg)](https://www.npmjs.com/package/redux-responsive)

A redux reducer for managing the responsive state of your application.

## Example

```js
// MyComponent.js

import React from 'react'
import {connect} from 'react-redux'

// grab only the responsive state from the store
// (assuming you have put the `responsiveStateReducer` under
//  the key `browser` in your state tree)
function browserSelector({browser}) {
    return {browser}
}

@connect(browserSelector)
class MyComponent extends React.Component {
    render() {
        // grab the responsive state off of props
        const {browser} = this.props

        let message = `The viewport's current media type is: ${browser.mediaType}.`

        if (browser.lessThan.small) {
            message += 'Secret message for viewports smaller than than the "small" breakpoint!'
        } else if (browser.lessThan.medium) {
            message += 'Secret message for viewports between the "small" and "medium" breakpoints!'
        } else {
            message += 'Message for viewports greater than the "medium" breakpoint.'
        }

        return (
            <p>
                {message}
            </p>
        )
    }
}
```

## Why Store Responsive State in Redux?

redux-responsive **does not require that you use React as your view library**.  However, since that is what is commonly used alongside redux, this documentation employs common React patterns.

There are many solutions for cleanly handling responsive designs in React applications. One common approach is to wrap a component in another component which is responsible for handling the behavior and passing the information down as a prop. While this at first seems good and the "react way", as the behavior gets more complicated, this quickly leads to a lot of boilerplate code in a single component. Also, depending on the implementation, it is possible that many copies of the responsive wrapper would create many different resize handlers.

Using a specialized store not only reduces the overall noise in a component, but also guarantees that only a single event listener is listening for resize.


## Setup

First, add the reducer to the root of your reducer tree (you can name it whatever you want).

```js
// reducer.js
import {combineReducers} from 'redux'
import {responsiveStateReducer} from 'redux-responsive'

export default combineReducers({
    browser: responsiveStateReducer,
})
```

Second, you must add required event handlers to keep the responsive state up to date. `redux-responsive` uses
[MediaQueryList](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)s to efficiently update the
store only when required. To do this, use the provided store enhancer.

```js
// store.js

import {createStore} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(reducer, responsiveStoreEnhancer)

// or, if you have an initial state for the store
const store = createStore(reducer, initialState, responsiveStoreEnhancer)

export default store
```

Note that if you are also using some [middlewares](http://redux.js.org/docs/advanced/Middleware.html), the call will look more like this:

```js
import {createStore, applyMiddleware, compose} from 'redux'
import {responsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(
    reducer,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(middleware1, middleware2)
    )
)

// or, if you have an initial state for the store
const store = createStore(
    reducer,
    initialState,
    compose(
        responsiveStoreEnhancer,
        applyMiddleware(middleware1, middleware2)
    )
)

export default store
```

Now your store is ready to use. The store's default breakpoints match common device sizes and are accessible by the following names in your view:

```js
const defaultBreakpoints = {
    extraSmall: 480,
    small: 768,
    medium: 992,
    large: 1200,
}
```

# The Responsive State

The `responsiveStateReducer` (and the reducer returned by `createResponsiveStateReducer`) adds an object with the following keys to the store:


- `mediaType`: (*string*) The largest breakpoint category that the browser satisfies.
- `orientation`: (*string*) The browser orientation. Has three possible values: "portrait", "landscape", or `null`.
- `lessThan`: (*object*) An object of booleans that indicate whether the browser is currently less than a particular breakpoint.
- `greaterThan`: (*object*) An object of booleans that indicate whether the browser is currently greater than a particular breakpoint.
- `is`: (*object*) An object of booleans that indicate whether the browser is current that particular breakpoint.

For example, if you put the responsive state under the key `browser` (as is done in the examples above) then you can access the browser's width and current media type, and determine if the browser is wider than the medium breakpoint like so

```js
// get the current state from the store
const state = store.getState()

// browser media type (e.g. "large")
state.browser.mediaType
// browser orientation (takes a null value on desktops)
state.browser.orientation
// true if browser width is greater than the "medium" breakpoint
state.browser.greaterThan.medium
// true if browser.mediaType === 'small'
state.browser.is.small
```


## Using Custom Breakpoints

You can also create your own reducer based on custom breakpoints:

```js
// reducer.js

import {combineReducers} from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'

export default combineReducers({
    browser: createResponsiveStateReducer({
        extraSmall: 500,
        small: 700,
        medium: 1000,
        large: 1280,
        extraLarge: 1400,
    }),
})
```



### The Infinity Media Type

When the browser is wider than the largest breakpoint, it's `mediaType` value is `infinity`. In order to
change this value, add the `infinity` field to the object pass as a second argument to `createResponsiveStateReducer`:

```es6
// reducer.js

import {combineReducers} from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'

export default combineReducers({
    // passing null to the reducer factory uses the default breakpoints
    browser: createResponsiveStateReducer(null, {
        infinity: "veryBig"
    })
})
```



## Adding custom/computed fields to the responsive state

In some cases, you may want to add computed fields to the responsive state. For example,
an application may frequently need to know when the browser is `greaterThanOrEqual` to
a particular breakpoint. In order to support this, `redux-responsive` lets you pass a
function and to `createResponsiveStateReducer` arguments as the `extraFields` key.
This function will recieve an object with the responsive state and returns an object
with the new keys to be injected into the state whenever it is recalculated:

```es6
// reducer.js

import {combineReducers} from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'
import {transform} from 'lodash'

export default combineReducers({
    browser: createResponsiveStateReducer(null, {
        extraFields: ({ greaterThan, is }) => ({
            // greaterThanOrEqual is built by transforming greaterThan
            greaterThanOrEqual: transform(greaterThan, (result, value, mediaType) => {
                // and combining the value with the `is` field
                result[mediaType] = value || is[mediaType]
            }, {})
        }),
    })
})
```

### Tracking window attributes

In some cases, you may want to have a `window` attributes tracked in your responsive state (for example, `width`).
To accomplish this, the first step is to add the custom field as described above.

```es6
// reducer.js

import {combineReducers} from 'redux'
import {createResponsiveStateReducer} from 'redux-responsive'
import {transform} from 'lodash'

export default combineReducers({
    browser: createResponsiveStateReducer(null, {
        extraFields: () => ({
            width: window.innerWidth
        }),
    })
})
```


When doing this, keep in mind that the responsive state enhancer only causes the
responsive state to be recalculated when the browser actually transitions between
states. **It does not recalculate on every resize**. Therefore, you might also need
to add an event handler that recalculates the state at another time:

```es6
// store.js

import {calculateResponsiveState} from 'redux-responsive'

const store = ...

window.addEventListener('resize', () => store.dispatch(calculateResponsiveState(window)))
```


## Server-side Rendering

Isomorphic applications must make sure that the sever-rendered markup matches the
DOM rendered by the client. Setting the `calculateInitialState` option in the
`createResponsiveStoreEnhancer` factory method to `false` tells the reducer
to skip the initial responsive state calculation. The responsive state will
contain the default values on both the server and the client side.

```js
// store/configureStore.js

import {createStore} from 'redux'
import {createResponsiveStoreEnhancer} from 'redux-responsive'
import reducer from './reducer'

const store = createStore(
                    reducer,
                    createResponsiveStoreEnhancer({calculateInitialState: false}))

export default store
```

The application should explicitly dispatch the action to recalculate the responsive
state when the application is rendered by the client.


```jsx
// client.js

// external imports
import ReactDOM from 'react-dom'
import {calculateResponsiveState} from 'redux-responsive'
// local imports
import store from 'path/to/store'

// render the application
ReactDOM.render(
    <Provider store={store}>
        // ...
    </Provider>,
    document.getElementById('app')
)

// calculate the initial state
store.dispatch(calculateResponsiveState(window))
```

### Setting the initial media type

If you know the initial media type for your application (by doing something like looking at
the user-agent) you can set the initial media type with the `initialMediaType` key to the
reducer factory:

```es6
const reducer = createResponsiveStateReducer(null, {initialMediaType: 'small'})
```

## Higher-Order Components

When building responsive applications in react, it's common to
implement styles for each breakpoint and then apply them like so:

```jsx
const commonStyle = {...}

const styles = {
    element: {
        ...commonStyle,
        color: 'blue',
    },
    elementThin: {
        ...commonStyle,
        color: 'black',
    }
}

// somewhere in your component...

<div style={browser.lessThan.medium ? styles.elementThin : styles.element} />
```

However this becomes very repetitive rather quickly. To help, redux-responsive
provides a higher-order component for managing these styles. The `StyleSheet`
higher-order component takes a function of two arguments, the current state of the
responsive reducer, and any props passed to the component. The follow is
equivalent to the logic above:

```jsx
import {StyleSheet} from 'redux-responsive/react'

const stylesheet = (browser, props) => ({
    element: {
        color: 'blue',
        _lessThan_medium: {
            color: 'black',
        }
    }
})

const component = StyleSheet(stylesheet)(({styles}) => (
    <div style={styles.element} />
))
```


## redux-immutable
This library supports using [redux-immutable](https://www.npmjs.com/package/redux-immutable) to make the **root** of your state an Immutable.js Map or Record.

However, transforming the branch of state managed by `redux-responsive` into Immutable data is not supported, because the `redux-responsive` reducer expects vanilla JS. Please keep this in mind if you're using SSR and transforming your state before hydrating.

## FAQ

redux-responsive is returning the wrong breakpoint on mobile devices, what may be causing this?
> This may be caused by not having the `<meta name="viewport">` tag in the head of your HTML. Adding this code may resolve your issue: `<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0">`. Read more [here](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) on how it works.

## Versioning

[Semver](http://semver.org/) is followed as closely as possible. For updates and migration instructions, see the [changelog](https://github.com/AlecAivazis/redux-responsive/wiki/Changelog).
