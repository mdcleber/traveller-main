import { Search2Icon } from '@chakra-ui/icons'
import { Container, Heading, IconButton, Input, InputGroup, InputRightElement, Spinner, VStack } from '@chakra-ui/react'
import type { FC } from 'react'
import React, { useState } from 'react'
import { CitiesService } from './CitiesService'
import type { City } from './model/City'
import type { CityData } from './model/CityData'
import { SearchResults } from './SearchResults'

export const Home: FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [cities, setCities] = useState<City[] | null>(null)

  let loading = false

  const handleChangeSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const handleSearch = () => {
    loading = true
    CitiesService.get({ name: searchTerm.trim() })
      .then((data: CityData) => {
        setCities(data.cities)
      })
      .catch(error => {
        console.log(error)
        setCities([] as City[])
      })
      .finally(() => {
        loading = false
      })
  }

  const handleCityUpdate = (id: number, propName: string, checked: boolean): void => {
    updateCity(id, {
      [propName]: checked,
    })
  }

  const updateCity = (id: number, updatedFields: Partial<City>): void => {
    loading = true
    CitiesService.update(id, updatedFields)
      .then()
      .catch()
      .finally(() => {
        loading = false
      })
  }

  return (
    <VStack spacing="8">
      <Heading as="h1">Smart traveller</Heading>
      <Container maxW="container.md">
        <VStack spacing="30">
          {loading ? (
            <Spinner data-test-id="spinner" />
          ) : (
            <>
              <InputGroup>
                <Input value={searchTerm} onChange={handleChangeSearchTerm} data-testid="search-input" />
                <InputRightElement
                  children={<IconButton aria-label="Search" icon={<Search2Icon />} />}
                  onClick={handleSearch}
                  data-testid="search-button"
                />
              </InputGroup>
              <SearchResults cities={cities} onUpdateCity={handleCityUpdate}></SearchResults>
            </>
          )}
        </VStack>
      </Container>
    </VStack>
  )
}
