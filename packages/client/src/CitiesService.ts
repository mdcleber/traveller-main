import type { City } from './model/City'
import type { CityData } from './model/CityData'
import type { CityFilter } from './model/CityFilter'

export class CitiesService {
  static baseUrl = 'http://localhost:4000/rest/cities'

  public static async get(filter: CityFilter): Promise<CityData> {
    const params = new URLSearchParams(filter as Record<string, string>).toString()
    const endPoint = `${this.baseUrl}?${params}`
    const response = await fetch(endPoint)

    return await response.json()
  }

  public static async update(id: number, updatedFields: Partial<City>): Promise<City> {
    const endPoint = `${this.baseUrl}/${id}`

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(updatedFields),
    }

    const response = await fetch(endPoint, requestOptions)

    return await response.json()
  }
}
