import { Vehicle } from '../interfaces/vehicle'

/**
 * Service class for analyzing vehicle data and maintaining statistics.
 * Processes vehicles and tracks analytics about the vehicle fleet.
 */
export class VehicleAnalyzer {
	/** Store of vehicles that have been processed through the analyzer */
	private processedVehicles: Vehicle[] = [];

	/**
	 * Processes a batch of vehicles by adding analysis metadata.
	 * Marks each vehicle as processed and stores processing timestamp.
	 * @param {Vehicle[]} vehicles - Array of vehicles to process
	 * @returns {Promise<void>} Promise that resolves when processing is complete
	 */
	async processVehicles(vehicles: Vehicle[]): Promise<void> {
		vehicles.forEach((vehicle) => {
			(vehicle as any).analysisDate = new Date().toISOString();
			(vehicle as any).isProcessed = true;
			this.processedVehicles.push(vehicle);
		});
	}

	/**
	 * Calculates statistical information about the processed vehicles.
	 * Groups vehicles by make and manufacturing year.
	 * @returns {Object} Statistics object containing total count and groupings
	 * @property {number} total - Total number of processed vehicles
	 * @property {Record<string, number>} byMake - Count of vehicles grouped by make (sorted alphabetically)
	 * @property {Record<number, number>} byYear - Count of vehicles grouped by year (sorted ascending)
	 */
	getVehicleStatistics(): {
		total: number;
		byMake: {
			make: string;
			quantity: number;
		};
		byYear: {
			year: number;
			quantity: number;
		};
	} {
		const vehicles = this.processedVehicles;

		// Count vehicles by make and year
		const byMake: Record<string, number> = {};
		const byYear: Record<number, number> = {};

		vehicles.forEach((vehicle) => {
			byMake[vehicle.make] = (byMake[vehicle.make] || 0) + 1;
			byYear[vehicle.year] = (byYear[vehicle.year] || 0) + 1;
		});

		// Find make with most vehicles
		const mostByMake = Object.entries(byMake).reduce(
			(max, [make, count]) =>
				count > max.quantity ? { make, quantity: count } : max,
			{ make: "", quantity: 0 }
		);

		// Find year with most vehicles
		const mostByYear = Object.entries(byYear).reduce(
			(max, [year, count]) =>
				count > max.quantity ? { year: Number(year), quantity: count } : max,
			{ year: 0, quantity: 0 }
		);

		return {
			total: vehicles.length,
			byMake: mostByMake,
			byYear: mostByYear,
		};
	}

	/**
	 * Returns the number of vehicles that have been processed.
	 * @returns {number} Count of processed vehicles
	 */
	getProcessedCount(): number {
		return this.processedVehicles.length;
	}

	/**
	 * Clears all processed vehicles from the analyzer's storage.
	 * Useful for resetting the analyzer state.
	 */
	clearProcessedVehicles(): void {
		this.processedVehicles = [];
	}
}
