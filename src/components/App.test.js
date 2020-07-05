import React from 'react'
import { mount } from 'enzyme'
import App from './App'

let wrapper

beforeEach(() => {
  wrapper = mount(<App />)
})

describe('[App]', () => {
  it('Should render comming soon!', () => {
    expect(wrapper.find('MessageBox').text()).toContain('Coming soon!')
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
