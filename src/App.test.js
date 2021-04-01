import React from 'react'
import { shallow } from 'enzyme/build'
import App from './App'
import ChartLineSimple from './coreui_template/views/charts/ChartLineSimple'
import Dashboard from './coreui_template/views/dashboard/Dashboard.js'


it('mounts App without crashing', () => {
  const wrapper = shallow(<App/>)
  wrapper.unmount()
})

it('mounts Dashboard without crashing', () => {
  const wrapper = shallow(<Dashboard/>)
  wrapper.unmount()
})

it('mounts Charts without crashing', () => {
  const wrapper = shallow(<ChartLineSimple/> )
  wrapper.unmount()
})
