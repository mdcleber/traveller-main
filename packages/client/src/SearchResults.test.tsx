import { fireEvent, getByTestId } from '@testing-library/react'
import React from 'react'
import { SearchResults } from './SearchResults'
import { render } from './test-utils'

describe('<SearchResults /> component', () => {
  const cities = [
    {
      id: 0,
      name: 'Moscow',
      country: 'Russia',
      visited: true,
      wishlist: false,
    },
    {
      id: 1,
      name: 'London',
      country: 'United Kingdom',
      visited: false,
      wishlist: true,
    },
  ]

  it('renders an empty element', () => {
    const { container } = render(<SearchResults cities={null} onUpdateCity={() => void 0} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders table with 3 rows', () => {
    const { container } = render(<SearchResults cities={cities} onUpdateCity={() => void 0} />)
    const rows = container.querySelectorAll('table tr')

    expect(getByTestId(container, 'cities-table')).toBeInTheDocument()
    expect(rows).toHaveLength(3)
  })

  it('renders checkboxes with default values', () => {
    const { container } = render(<SearchResults cities={cities} onUpdateCity={() => void 0} />)
    const rows = container.getElementsByTagName('table')[0].rows

    const visitedRow1 = getByTestId(rows[1], 'visited')
    const wishlistRow1 = getByTestId(rows[1], 'wishlist')

    const visitedRow2 = getByTestId(rows[2], 'visited')
    const wishlistRow2 = getByTestId(rows[2], 'wishlist')

    const checkedAttr = 'data-checked'

    expect(visitedRow1.getAttributeNames()).toContain(checkedAttr)
    expect(wishlistRow1.getAttributeNames()).not.toContain(checkedAttr)

    expect(visitedRow2.getAttributeNames()).not.toContain(checkedAttr)
    expect(wishlistRow2.getAttributeNames()).toContain(checkedAttr)
  })

  it('renders checkboxes and call change event', () => {
    const events = { onUpdateCity: () => void 0 }
    const spy = jest.spyOn(events, 'onUpdateCity')
    const { container } = render(<SearchResults cities={cities} onUpdateCity={events.onUpdateCity} />)
    const rows = container.getElementsByTagName('table')[0].rows

    const visitedRow1 = getByTestId(rows[1], 'visited')
    const wishlistRow1 = getByTestId(rows[1], 'wishlist')

    fireEvent.click(visitedRow1)
    fireEvent.click(wishlistRow1)

    expect(spy).toHaveBeenCalledTimes(2)
  })
})
