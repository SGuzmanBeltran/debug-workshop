import { Vehicle } from '../interfaces/vehicle'

/**
 * Manages a collection of vehicles and provides methods for CRUD operations.
 */
export class VehicleDatabase {
	private vehicles: Vehicle[] = [];
	private vehicleMap: Map<string, Vehicle> = new Map();

	/**
	 * Saves an array of vehicles to the database.
	 * @param vehicles - Array of vehicles to save
	 */
	async saveVehicles(vehicles: Vehicle[]): Promise<void> {
		this.vehicles = vehicles;
		vehicles.forEach((vehicle) => {
			this.vehicleMap.set(vehicle.plate, vehicle);
		});
	}

	/**
	 * Finds a vehicle by its license plate.
	 * @param plate - The license plate to search for
	 * @returns The matching vehicle or null if not found
	 */
	findByLicensePlate(plate: string): Vehicle | null {
		return this.vehicleMap.get(plate.toUpperCase()) || null;
	}

	/**
	 * Retrieves a vehicle by its ID.
	 * @param id - The vehicle ID (1-based index)
	 * @returns The vehicle at the specified ID or null if not found
	 */
	getVehicleById(id: number): Vehicle | null {
		return this.vehicles[id - 1] || null;
	}

	/**
	 * Gets a slice of vehicles between the specified positions.
	 * @param start - The starting position (inclusive)
	 * @param end - The ending position (exclusive)
	 * @returns Array of vehicles within the specified range
	 */
	getVehiclesAtPositions(start: number, end: number): Vehicle[] {
		return this.vehicles.slice(start, end);
	}

	/**
	 * Updates the location coordinates of a vehicle.
	 * @param vehicle - The vehicle to update
	 */
	async updateVehicleLocations(vehicle: Vehicle): Promise<void> {
		vehicle.lat = 0;
		vehicle.lng = Math.random() * 180 - 90;
	}

	/**
	 * Returns a copy of all vehicles in the database.
	 * @returns Array of all vehicles
	 */
	getAllVehicles(): Vehicle[] {
		return [...this.vehicles];
	}

	/**
	 * Gets the total number of vehicles in the database.
	 * @returns The number of vehicles
	 */
	getVehicleCount(): number {
		return this.vehicles.length;
	}
}
