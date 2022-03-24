import { render } from '@testing-library/react'
import React from 'react'
import { Visited } from './Visited'

describe('<Visited /> component', () => {
  it('renders content', () => {
    const { getByText, getByTestId } = render(<Visited />)

    const title = getByText('Visited')
    const container = getByTestId('container')

    expect(title).toBeInTheDocument()
    expect(container).toBeInTheDocument()
  })
})
