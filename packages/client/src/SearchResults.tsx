import { Checkbox, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { FC } from 'react'
import React from 'react'
import type { City } from './model/City'

interface SearchResultsProps {
  cities: City[] | null
  onUpdateCity: (id: number, propName: string, checked: boolean) => void
  checkBoxDisabled?: boolean
}
export const SearchResults: FC<SearchResultsProps> = (props: SearchResultsProps) => {
  if (!props.cities) {
    return null
  }

  return (
    <Table variant="simple" data-testid="cities-table">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Country</Th>
          <Th>Visited</Th>
          <Th>Wishlist</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.cities.map((city: City) => (
          <Tr key={city.id}>
            <Td>{city.name}</Td>
            <Td>{city.country}</Td>
            <Td>
              <Checkbox
                data-testid="visited"
                defaultChecked={city.visited}
                isDisabled={props.checkBoxDisabled}
                onChange={e => props.onUpdateCity(city.id, 'visited', e.target.checked)}
              />
            </Td>
            <Td>
              <Checkbox
                data-testid="wishlist"
                defaultChecked={city.wishlist}
                isDisabled={props.checkBoxDisabled}
                onChange={e => props.onUpdateCity(city.id, 'wishlist', e.target.checked)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
