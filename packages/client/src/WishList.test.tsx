import { render } from '@testing-library/react'
import React from 'react'
import { WishList } from './WishList'

describe('<WishList /> component', () => {
  it('renders content', () => {
    const { getByText, getByTestId } = render(<WishList />)

    const title = getByText('Wish list')
    const container = getByTestId('container')

    expect(title).toBeInTheDocument()
    expect(container).toBeInTheDocument()
  })
})
