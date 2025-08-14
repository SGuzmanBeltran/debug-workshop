import { Vehicle } from '../interfaces/vehicle'

export class VehicleUtils {
  /**
   * Sort vehicles by a specific property
   */
  static sortBy<T extends keyof Vehicle>(
    vehicles: Vehicle[],
    property: T,
    order: 'asc' | 'desc' = 'asc'
  ): Vehicle[] {
    return [...vehicles].sort((a, b) => {
      const aValue = a[property]
      const bValue = b[property]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue)
        return order === 'asc' ? comparison : -comparison
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return order === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })
  }

  /**
   * Group vehicles by a specific property
   */
  static groupBy<T extends keyof Vehicle>(
    vehicles: Vehicle[],
    property: T
  ): Record<string, Vehicle[]> {
    return vehicles.reduce((groups, vehicle) => {
      const key = String(vehicle[property])
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(vehicle)
      return groups
    }, {} as Record<string, Vehicle[]>)
  }

  /**
   * Get unique values for a specific property
   */
  static getUniqueValues<T extends keyof Vehicle>(
    vehicles: Vehicle[],
    property: T
  ): Array<Vehicle[T]> {
    const values = vehicles.map(vehicle => vehicle[property])
    return [...new Set(values)]
  }

  /**
   * Search vehicles by text in multiple fields
   */
  static search(vehicles: Vehicle[], query: string): Vehicle[] {
    const searchTerm = query.toLowerCase()
    
    return vehicles.filter(vehicle => {
      return (
        vehicle.make.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.plate.toLowerCase().includes(searchTerm) ||
        vehicle.color.toLowerCase().includes(searchTerm) ||
        vehicle.condition.toLowerCase().includes(searchTerm) ||
        vehicle.transmission.toLowerCase().includes(searchTerm) ||
        vehicle.fuel_type.toLowerCase().includes(searchTerm)
      )
    })
  }
}
