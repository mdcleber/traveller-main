import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { CitiesService } from './CitiesService'
import type { City } from './model/City'
import type { CityFilter } from './model/CityFilter'
import { SearchResults } from './SearchResults'

interface CitiesTableFilter {
  filter: CityFilter
}

export const CitiesTableFilter: FC<CitiesTableFilter> = (props: CitiesTableFilter) => {
  const [cities, setCities] = useState<City[] | null>(null)

  useEffect(() => {
    CitiesService.get(props.filter)
      .then(data => {
        setCities(data.cities)
      })
      .catch(error => {
        console.log(error)
        setCities([] as City[])
      })
  }, [])

  return <SearchResults cities={cities} onUpdateCity={() => void 0} checkBoxDisabled={true} />
}
