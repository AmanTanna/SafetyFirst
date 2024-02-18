// module.exports =
async function AddressToCoords(address, api_key) {
  /**
   * Take as input an address, then return a promise that can be resolved datawise, holding the lat and lon values
   * data[0].lat
   * data[0].lon
   */
  var addr = address.replace(/ /g, "+");

  try {
    const response = await fetch(
      `https://geocode.maps.co/search?q=${addr}&api_key=${api_key}`
    );

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error, could not attempt fetch of maps");
  }
}

async function CoordsToAddress(latitude, longitude, api_key) {
  /**
   * Take as input the coordinates of a place, then convert it to an address
   */
  try {
    const response = await fetch(
      `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}&api_key=${api_key}`
    );
    if (!response.ok) {
      throw new Error("Could not fetch address given lon lat");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error, lon lat attempt failed" + Error);
  }
}
/**
 *
 *
 *Test the code now
 *var key = "65d174a784a72523862703trh8e62ef";
 *var cds = AddressToCoords("University of Waterloo", key);
 *var addr = CoordsToAddress(43.71697314176533, -79.33889076504421, key);
 *console.log("Getting Coordinates for University of Waterloo");
 *cds.then((data) => {
 *  console.log(data);
 *});
 *console.log("Getting Address for Ontario Science Center");
 *addr.then((data) => {
 *  console.log(data);
 *});
 */
