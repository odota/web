import React from 'react'
import expect from 'expect'
import { shallow, mount } from 'enzyme'

import ReactStripeCheckout from './StripeCheckout.js'

const noop = () => {}

const props = {
  stripeKey: 'foo',
  token: noop,
  name: 'foo',
  description: 'foo',
  image: 'foo',
  ComponentClass: 'div',
  panelLabel: 'foo',
  amount: 100,
  currency: 'USD',
  locale: 'en',
  email: 'foo@bar.com',
  shippingAddress: false,
  billingAddress: false,
  zipCode: false,
  alipay: false,
  bitcoin: false,
  allowRememberMe: false,
  reconfigureOnUpdate: false,
  triggerEvent: 'onClick',
  className: 'StripeCheckout'
}

const mockStripeHandler = {
  open() {}
}

global.StripeCheckout = {
  configure() {
    return mockStripeHandler
  }
}

const openSpy = expect.spyOn(mockStripeHandler, 'open')
const configureSpy = expect.spyOn(StripeCheckout, 'configure').andCallThrough()

describe('<ReactStripeCheckout />', () => {
  after(() => {
    /* Deleting so we don't pollute global */
    delete global.StripeCheckout
  })
  beforeEach(() => {
    /* Removing function calls from previous tests */
    openSpy.reset()
    configureSpy.reset()
  })

  it('should render', () => {
    const renderedComponent = shallow(
      <ReactStripeCheckout {...props} />
    )
    expect(renderedComponent.is('button')).toEqual(true)
  })
  it('should render the component class it receives as children', () => {
    const renderedComponent = shallow(
      <ReactStripeCheckout {...props}>
        <div>foo</div>
      </ReactStripeCheckout>
    )
    expect(renderedComponent.is('div')).toEqual(true)
  })
  it('should pass the `stripeKey` to Stripe and configure', () => {
    const renderedComponent = shallow(
      <ReactStripeCheckout {...props} />
    )
    renderedComponent.instance().onScriptLoaded()
    console.log(configureSpy.calls.length)
    expect(configureSpy).toHaveBeenCalledWith({key: props.stripeKey})
  })
  it('should pass the `token` function to Stripe', () => {
    const renderedComponent = shallow(
      <ReactStripeCheckout {...props} />
    )
    renderedComponent.instance().onScriptLoaded()
    renderedComponent.instance().showStripeDialog()
    expect(openSpy).toHaveBeenCalled()
    expect(openSpy.calls[0].arguments[0].token).toEqual(props.token)
  })
})
