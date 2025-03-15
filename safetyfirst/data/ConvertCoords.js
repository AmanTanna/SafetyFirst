/**
 * Utility functions for geocoding operations
 */

/**
 * Convert an address string to geographic coordinates
 * @param {string} address - The address to convert
 * @param {string} api_key - API key for the geocoding service
 * @returns {Promise} - Promise resolving to an array of matching locations with lat/lon
 */
export async function AddressToCoords(address, api_key) {
  // Format address for URL by replacing spaces with plus signs
  const addr = address.replace(/ /g, "+");

  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${addr}&api_key=${api_key}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in AddressToCoords:", error);
    throw error;
  }
}

/**
 * Convert geographic coordinates to an address
 * @param {number} latitude - The latitude coordinate
 * @param {number} longitude - The longitude coordinate
 * @param {string} api_key - API key for the geocoding service
 * @returns {Promise} - Promise resolving to address information
 */
export async function CoordsToAddress(latitude, longitude, api_key) {
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${api_key}`
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in CoordsToAddress:", error);
    throw error;
  }
}
