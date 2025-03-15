/**
 * Service for handling route calculations and safety ratings
 */

const SAFETY_THRESHOLD = 0.5; // In kilometers - distance to consider a location unsafe for routing

/**
 * Calculate distance between two points in km using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} - Distance in kilometers
 */
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

/**
 * Convert degrees to radians
 * @param {number} deg - Degrees
 * @returns {number} - Radians
 */
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Check if a route point is near any unsafe locations
 * @param {Object} point - Route point {latitude, longitude}
 * @param {Array} unsafeLocations - Array of unsafe location objects
 * @returns {Object} - Safety assessment {safe: boolean, nearestUnsafeLocation: Object}
 */
function checkPointSafety(point, unsafeLocations) {
  let minDistance = Number.MAX_VALUE;
  let nearestUnsafeLocation = null;

  for (const location of unsafeLocations) {
    const distance = getDistanceFromLatLonInKm(
      point.latitude,
      point.longitude,
      location.latitude,
      location.longitude
    );

    if (distance < minDistance) {
      minDistance = distance;
      nearestUnsafeLocation = location;
    }
  }

  const safe = minDistance > SAFETY_THRESHOLD;

  return {
    safe,
    distance: minDistance,
    nearestUnsafeLocation: safe ? null : nearestUnsafeLocation
  };
}

/**
 * Assess the safety of a complete route
 * @param {Array} routePoints - Array of route coordinate points
 * @param {Array} unsafeLocations - Array of unsafe location objects
 * @returns {Object} - Route safety assessment
 */
export function assessRouteSafety(routePoints, unsafeLocations) {
  const assessments = routePoints.map(point => checkPointSafety(point, unsafeLocations));

  const unsafePoints = assessments.filter(assessment => !assessment.safe);
  const safetyPercentage = ((routePoints.length - unsafePoints.length) / routePoints.length) * 100;

  return {
    safe: unsafePoints.length === 0,
    safetyPercentage,
    unsafePoints,
    routeLength: routePoints.length
  };
}

/**
 * Find a safer alternative route by avoiding unsafe areas
 * Note: This is a simplified version. In a real app, you'd use Google Directions API
 * with waypoints to avoid unsafe areas.
 *
 * @param {Object} origin - Starting point {latitude, longitude}
 * @param {Object} destination - End point {latitude, longitude}
 * @param {Array} unsafeLocations - Array of unsafe location objects
 * @returns {Array} - Array of coordinate points for the safer route
 */
export function calculateSaferRoute(origin, destination, unsafeLocations) {
  // This is a placeholder implementation
  // In a real app, you would:
  // 1. Get route options from Google Directions API
  // 2. Assess each route for proximity to unsafe locations
  // 3. Choose the safest route or add waypoints to avoid unsafe areas

  // For now, just return a direct route
  const latDiff = destination.latitude - origin.latitude;
  const lngDiff = destination.longitude - origin.longitude;
  const steps = 10; // Number of points in the route

  const route = [];
  for (let i = 0; i <= steps; i++) {
    route.push({
      latitude: origin.latitude + (latDiff * i / steps),
      longitude: origin.longitude + (lngDiff * i / steps)
    });
  }

  return route;
}
