import { Vehicle } from './interfaces/vehicle'
import { VehicleAnalyzer } from "./services/vehicle-analyzer";
import { VehicleDatabase } from "./services/vehicle-database";
import { VehicleLoader } from "./loaders/vehicle-loader";

/**
 * Main application class for managing vehicle operations.
 * Handles loading, saving, analyzing, and updating vehicle data.
 */
class VehicleApp {
	private loader: VehicleLoader;
	private database: VehicleDatabase;
	private analyzer: VehicleAnalyzer;

	/**
	 * Initializes a new instance of VehicleApp with required services.
	 * Sets up the vehicle loader, database, and analyzer.
	 */
	constructor() {
		this.loader = new VehicleLoader("../assets/vehicles.json");
		this.database = new VehicleDatabase();
		this.analyzer = new VehicleAnalyzer();
	}

	/**
	 * Executes the main application workflow.
	 * Loads vehicles, saves them to database, processes them through analyzer,
	 * and performs batch operations.
	 * @returns {Promise<void>} A promise that resolves when all operations are complete
	 */
	async run(): Promise<void> {
		const vehicles = await this.loader.load();

		await this.database.saveVehicles(vehicles);
		await this.analyzer.processVehicles(vehicles);
		this.analyzer.getVehicleStatistics();

		this.performOperations(vehicles);
	}

	/**
	 * Performs batch operations on vehicles, updating their locations in the database.
	 * Processes vehicles in batches to prevent overwhelming the database.
	 * @param {Vehicle[]} vehicles - Array of vehicles to process
	 * @returns {Promise<void>} A promise that resolves when all batch operations are complete
	 * @private
	 */
	private async performOperations(vehicles: Vehicle[]): Promise<void> {
		const ids = vehicles.map((v) => v.id);

		const batchSize = 3;
		for (let i = 0; i < ids.length; i += batchSize) {
			const batchIds = ids.slice(i, i + batchSize);
			const batchVehicles = vehicles.filter((v) => batchIds.includes(v.id));

			const updates = batchVehicles.map((vehicle) =>
				this.database.updateVehicleLocations(vehicle)
			);

			await Promise.all(updates);
		}
	}
}

/**
 * Entry point of the application.
 * Creates and runs an instance of VehicleApp.
 * @returns {Promise<void>} A promise that resolves when the application completes
 */
async function main(): Promise<void> {
	const app = new VehicleApp();
	await app.run();
}

main()

export { VehicleApp, main }
