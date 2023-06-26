import config from "./config";
export const validateDepths = function (array_info) {
  if (!Array.isArray(array_info)) return false;
  for (let i = 0, last_base = 0; i < array_info.length; i++) {
    if (!array_info[i].base_tvd) {
      return false;
    }
    if (array_info[i].base_tvd < last_base) {
      return false;
    }
    last_base = array_info[i].base_tvd;
  }
  return true;
};

export const map_range = function (value, low1, high1) {
  let low2 = config.remapMin
  let high2 = config.remapMax
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};
