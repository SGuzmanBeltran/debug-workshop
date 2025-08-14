import { Vehicle } from './interfaces/vehicle'
import { VehicleLoader } from './loaders/vehicle-loader'

/**
 * Main application class for the workshop
 */
class VehicleApp {
  private loader: VehicleLoader

  constructor() {
    this.loader = new VehicleLoader('../assets/vehicles.json')
  }

  /**
   * Run the main application
   */
  async run(): Promise<Vehicle[]> {
    return await this.loader.load()
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  const app = new VehicleApp()
  await app.run()
}

// Run the application if this file is executed directly
main()

export { VehicleApp, main }
