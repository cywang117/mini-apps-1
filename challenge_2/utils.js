/**
 * Converts a JSON obj to a newline separated CSV string
 * @param {Object} json
 * @returns {string}
 */
const convertJSONToCSV = (json) => {
  let keys = Object.keys(json).filter(key => key !== 'children');
  keys.unshift('id', 'parentId');
  let csvHeaders = keys.join(',') + '\n';

  return csvHeaders + _convertSingleJSONToCSVRecur(json, keys);
};

/**
   * Recursively converts one object unit in JSON into csv string
   * @param {Object} obj
   * @param {Array} keys: for ensuring same order in each object call
   * @returns {string}
   */
const _convertSingleJSONToCSVRecur = (obj, keys, id = 0, parentId = '') => {
  let csvStr = '';
  let objId = id;
  keys.forEach((key, idx) => {
    if (key === 'id') {
      csvStr += `${objId},`;
    } else if (key === 'parentId') {
      csvStr += `${parentId},`;
    } else {
      csvStr += obj[key];
      if (idx !== keys.length - 1) {
        csvStr += ',';
      }
    }
  });
  csvStr += '\n';
  obj.children.forEach(childObj => {
    csvStr += _convertSingleJSONToCSVRecur(childObj, keys, ++id, objId);
  });
  return csvStr;
};

module.exports = { convertJSONToCSV };