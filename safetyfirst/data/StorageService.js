import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATIONS_STORAGE_KEY = '@safety_first_locations';

/**
 * Service for handling local storage operations for safety locations
 */
export default class StorageService {
  /**
   * Save locations to local storage
   * @param {Array} locations - Array of location objects to save
   */
  static async saveLocations(locations) {
    try {
      const jsonValue = JSON.stringify(locations);
      await AsyncStorage.setItem(LOCATIONS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving locations:', error);
      throw error;
    }
  }

  /**
   * Load saved locations from local storage
   * @returns {Array} - Array of location objects
   */
  static async getLocations() {
    try {
      const jsonValue = await AsyncStorage.getItem(LOCATIONS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading locations:', error);
      return [];
    }
  }

  /**
   * Add a new location to storage
   * @param {Object} location - Location object to add
   */
  static async addLocation(location) {
    try {
      const locations = await this.getLocations();
      locations.push(location);
      await this.saveLocations(locations);
    } catch (error) {
      console.error('Error adding location:', error);
      throw error;
    }
  }

  /**
   * Remove a location from storage
   * @param {string} locationId - ID of location to remove
   */
  static async removeLocation(locationId) {
    try {
      const locations = await this.getLocations();
      const filteredLocations = locations.filter(location => location.id !== locationId);
      await this.saveLocations(filteredLocations);
    } catch (error) {
      console.error('Error removing location:', error);
      throw error;
    }
  }
}
