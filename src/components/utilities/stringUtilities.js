const unitTokens = {
  // Volume.
  tsp: {
    short: 'tsp',
    full: 'teaspoon',
    type: 'volume',
  },
  tbsp: {
    short: 'tbsp',
    full: 'tablespoon',
    type: 'volume',
  },
  floz: {
    short: 'fl oz',
    full: 'fluid ounce',
    type: 'volume',
  },
  // Mass and Weight.
  lb: {
    short: 'lb',
    full: 'pound',
    type: 'mass',
  },
  oz: {
    short: 'oz',
    full: 'ounce',
    type: 'mass',
  },
  mg: {
    short: 'mg',
    full: 'milligram',
    type: 'mass',
  },
  // Length.
  mm: {
    short: 'mm',
    full: 'millimeter',
    type: 'length',
  },
  cm: {
    short: 'mm',
    full: 'centimeter',
    type: 'length',
  },
  in: {
    short: 'in',
    full: 'inch',
    type: 'length',
  },
};

/**
 * Converts a unit shorthand into the full name, or returns token if token does
 * not match any existing units.
 * @param {String} token - Token of unit to be converted to full name.
 * @returns {*}
 */
export const unitNameFromToken = (token) => {
  if (token && Object.prototype.hasOwnProperty.call(unitTokens, token)) {
    return unitTokens[token].full;
  }
  return token;
};

/*
<Select
  options={this.unitOptions}
  placeholder="Units"
  onChange={(event, value) =>
    this.onFieldChange({ unit: value.value })
  }
/>
*/
