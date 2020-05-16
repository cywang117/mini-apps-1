/**
 * Converts a JSON obj to a newline separated CSV string
 * @param {Object} json
 * @returns {string}
 */
const convertJSONToCSV = (json, filterVal) => {
  let keys = Object.keys(json).filter(key => key !== 'children');
  keys.unshift('id', 'parentId');
  let csvHeaders = keys.join(',') + '\n';

  return csvHeaders + _convertSingleJSONToCSVRecur(json, keys, filterVal);
};

/**
   * Recursively converts one object unit in JSON into csv string
   * @param {Object} obj
   * @param {Array} keys: for ensuring same order in each object call
   * @returns {string}
   */
const _convertSingleJSONToCSVRecur = (obj, keys, filterVal = null, idObj = { id: 0 }, parentId = '') => {
  let csvStr = '';
  let filterValPresent = filterVal && filterVal.length && Object.values(obj).some(val => val.toString().includes(filterVal));

  if (!filterValPresent) {
    let currentId = idObj.id;

    keys.forEach((key, idx) => {
      if (key === 'id') {
        csvStr += `${currentId},`;
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
    obj.children && obj.children.forEach(childObj => {
      idObj.id++;
      csvStr += _convertSingleJSONToCSVRecur(childObj, keys, filterVal, idObj, currentId);
    });
  } else {
    idObj.id--;
  }

  return csvStr;
};

module.exports = { convertJSONToCSV };