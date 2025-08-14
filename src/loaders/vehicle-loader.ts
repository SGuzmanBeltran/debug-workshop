import * as fs from "fs/promises";
import * as path from "path";

import { DataLoader } from "../interfaces/loader";
import { Vehicle } from "../interfaces/vehicle";

export class VehicleLoader implements DataLoader<Vehicle> {
	private readonly dataPath: string;

	constructor(dataPath: string = "../assets/vehicles.json") {
		this.dataPath = dataPath;
	}

	/**
	 * Load all vehicles from the JSON file
	 */
	async load(): Promise<Vehicle[]> {
		try {
			const filePath = path.resolve(__dirname.replace("src", ""), this.dataPath);
			const fileContent = await fs.readFile(filePath, "utf-8");
			const vehicles: Vehicle[] = JSON.parse(fileContent);

			// Validate the data structure
			this.validateVehicles(vehicles);

			return vehicles;
		} catch (error) {
			throw new Error(
				`Failed to load vehicles: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}

	/**
	 * Load a vehicle by its ID
	 */
	async loadById(id: number): Promise<Vehicle | null> {
		try {
			const vehicles = await this.load();
			return vehicles.find((vehicle) => vehicle.id === id) || null;
		} catch (error) {
			throw new Error(
				`Failed to load vehicle with ID ${id}: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}

	/**
	 * Load vehicles by applying a filter
	 */
	async loadByFilter(filter: Partial<Vehicle>): Promise<Vehicle[]> {
		try {
			const vehicles = await this.load();
			return vehicles.filter((vehicle) => {
				return Object.entries(filter).every(([key, value]) => {
					if (value === undefined || value === null) return true;
					return vehicle[key as keyof Vehicle] === value;
				});
			});
		} catch (error) {
			throw new Error(
				`Failed to filter vehicles: ${
					error instanceof Error ? error.message : "Unknown error"
				}`
			);
		}
	}

	/**
	 * Validate that the loaded data matches the Vehicle interface
	 */
	private validateVehicles(vehicles: any[]): void {
		if (!Array.isArray(vehicles)) {
			throw new Error("Invalid data format: expected an array");
		}

		for (const vehicle of vehicles) {
			if (!this.isValidVehicle(vehicle)) {
				throw new Error(`Invalid vehicle data: ${JSON.stringify(vehicle)}`);
			}
		}
	}

	/**
	 * Check if a vehicle object is valid
	 */
	private isValidVehicle(vehicle: any): vehicle is Vehicle {
		return (
			typeof vehicle === "object" &&
			vehicle !== null &&
			typeof vehicle.id === "number" &&
			typeof vehicle.plate === "string" &&
			typeof vehicle.make === "string" &&
			typeof vehicle.model === "string" &&
			typeof vehicle.year === "number" &&
			typeof vehicle.vin === "string" &&
			typeof vehicle.color === "string" &&
			typeof vehicle.price === "number" &&
			typeof vehicle.odometer === "number" &&
			typeof vehicle.condition === "string" &&
			typeof vehicle.transmission === "string" &&
			typeof vehicle.fuel_type === "string"
		);
	}
}
