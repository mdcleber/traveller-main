import { fireEvent, getByTestId, render, screen } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { CitiesService } from './CitiesService'
import { Home } from './Home'

describe('<Home /> component', () => {
  beforeEach(() => {
    const moskow = {
      id: 0,
      name: 'Moscow',
      country: 'Russia',
      visited: true,
      wishlist: false,
    }

    const getMock = jest.fn().mockResolvedValue({
      cities: [
        moskow,
        {
          id: 1,
          name: 'London',
          country: 'United Kingdom',
          visited: false,
          wishlist: true,
        },
      ],
    })

    const updateMock = jest.fn().mockResolvedValue(moskow)

    CitiesService.get = getMock
    CitiesService.update = updateMock
  })

  it('renders header content', async () => {
    const { getByText } = render(<Home />)

    const header = getByText('Smart traveller')
    expect(header).toBeInTheDocument()
  })

  it('renders  content with mocked data', async () => {
    const spy = jest.spyOn(CitiesService, 'get')
    render(<Home />)

    const searchInput = (await screen.findByTestId('search-input')) as HTMLInputElement
    const searchButton = await screen.findByTestId('search-button')

    searchInput.value = 'London'
    const event = {
      currentTarget: searchInput,
    }

    await act(async () => {
      fireEvent.change(searchInput, event)
    })

    await act(async () => {
      fireEvent.click(searchButton)
    })

    const table = await screen.findByTestId('cities-table')
    expect(table).toBeInTheDocument()
    expect(spy).toBeCalled()
  })

  it('calls service to update city', async () => {
    const spy = jest.spyOn(CitiesService, 'update')
    const { container } = render(<Home />)

    const searchInput = (await screen.findByTestId('search-input')) as HTMLInputElement
    const searchButton = await screen.findByTestId('search-button')

    searchInput.value = 'London'
    const event = {
      currentTarget: searchInput,
    }

    await act(async () => {
      fireEvent.change(searchInput, event)
    })

    await act(async () => {
      fireEvent.click(searchButton)
    })

    const rows = container.getElementsByTagName('table')[0].rows

    const visitedRow1 = getByTestId(rows[1], 'visited')
    const wishlistRow1 = getByTestId(rows[1], 'wishlist')

    fireEvent.click(visitedRow1)
    fireEvent.click(wishlistRow1)

    expect(spy).toBeCalledTimes(2)
  })
})
