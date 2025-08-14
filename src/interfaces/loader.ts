export interface DataLoader<T> {
	load(): Promise<T[]>;
	loadById(id: number): Promise<T | null>;
	loadByFilter(filter: Partial<T>): Promise<T[]>;
}
