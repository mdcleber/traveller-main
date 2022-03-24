import { act, queryByTestId, render, screen } from '@testing-library/react'
import React from 'react'
import { CitiesService } from './CitiesService'
import { CitiesTableFilter } from './CitiesTableFilter'

describe('<CitiesTableFilter /> component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('renders  content with mocked data', async () => {
    const mock = jest.fn().mockResolvedValue({
      cities: [
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
      ],
    })

    CitiesService.get = mock

    const spy = jest.spyOn(CitiesService, 'get')
    await act(async () => {
      const { container } = render(<CitiesTableFilter filter={{}} />)
      const table = await screen.findByTestId('cities-table')
      expect(container).toBeTruthy()
      expect(spy).toBeCalled()
      expect(table).toBeInTheDocument()
    })
  })

  it('renders  content with no table', async () => {
    const mock = jest.fn().mockResolvedValue({
      cities: null,
    })
    CitiesService.get = mock

    await act(async () => {
      const { container } = render(<CitiesTableFilter filter={{}} />)

      expect(container).toBeTruthy()
      expect(queryByTestId(container, 'cities-table')).not.toBeInTheDocument()
    })
  })
})
