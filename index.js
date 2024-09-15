import fetch from 'node-fetch';

const COLORS = 'https://nt-cdn.s3.amazonaws.com/colors.json';

/**
 * Fetches and filters colors from the COLORS endpoint.
 *
 * @param {Object} filters - Object containing filter criteria.
 * @param {string} [filters.name] - Filters colors by name (case insensitive).
 * @param {string} [filters.hex] - Filters colors by exact hex code (without '#').
 * @param {string} [filters.compName] - Filters colors whose complementary color's name contains this string (case insensitive).
 * @param {string} [filters.compHex] - Filters colors whose complementary color has this exact hex code (without '#').
 * @returns {Promise<Array>} - A promise that resolves to an array of filtered colors.
 */
const fetchColors = async ({ name, hex, compName, compHex }) => {
  try {
    // Fetch colors from the COLORS endpoint
    const response = await fetch(COLORS);
    const colors = await response.json();

    // 1. Filter by color name (case insensitive)
    if (name) {
      return colors.filter(color => color.name.toLowerCase().includes(name.toLowerCase()));
    }

    // 2. Filter by color hex code (without '#')
    if (hex) {
      return colors.filter(color => color.hex.toLowerCase() === hex.toLowerCase());
    }

    // 3. Filter by complementary color's name (case insensitive)
    if (compName) {
      return colors.filter(color =>
          color.comp &&
          color.comp.some(comp => comp.name.toLowerCase().includes(compName.toLowerCase()))
      );
    }

    // 4. Filter by complementary color's hex code (without '#')
    if (compHex) {
      return colors.filter(color =>
          color.comp &&
          color.comp.some(comp => comp.hex.toLowerCase() === compHex.toLowerCase())
      );
    }

    // Return an empty array if no valid filter is provided
    return [];
  } catch (error) {
    console.error('Error fetching colors:', error);
    throw error;
  }
};

// Leave this here
export default fetchColors;