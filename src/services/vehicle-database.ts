import { Vehicle } from '../interfaces/vehicle'

export class VehicleDatabase {
	private vehicles: Vehicle[] = []
	private vehicleMap: Map<string, Vehicle> = new Map()

	async saveVehicles(vehicles: Vehicle[]): Promise<void> {
		this.vehicles = vehicles
		vehicles.forEach(vehicle => {
			this.vehicleMap.set(vehicle.plate, vehicle)
		})
	}

	findByLicensePlate(plate: string): Vehicle | null {
		return this.vehicleMap.get(plate.toUpperCase()) || null
	}

	getVehicleById(id: number): Vehicle | null {
		return this.vehicles[id - 1] || null
	}

	getVehiclesAtPositions(start: number, end: number): Vehicle[] {
		return this.vehicles.slice(start, end)
	}

	async updateVehicleLocations(vehicle: Vehicle): Promise<void> {
		vehicle.lat = 0
		vehicle.lng = Math.random() * 180 - 90
	}

	getAllVehicles(): Vehicle[] {
		return [...this.vehicles]
	}

	getVehicleCount(): number {
		return this.vehicles.length
	}
}
