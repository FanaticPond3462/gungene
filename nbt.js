//import itertools
const itertools = {
  count: function* (index = 0) {
    while (true) {
      yield index++;
    }
  },
};

function _load_nbt(nbt, counter = itertools.count(1)) {
  var result = {};
  var charlen = nbt.length;
  var key_str = "";
  var value_str = "";

  while (true) {
    var num = counter.next().value;
    if (charlen <= num + 1) {
      return result;
    }
    if (nbt[num] == "}") {
      return result;
    }
    else if (key_str == "") {
      while (true) {
        if (nbt[num] != ":") {
          key_str += nbt[num];
          num = counter.next().value;
        } else {
          break;
        }
      }
    } else if (key_str != "" && nbt[num - 1] == ":") {
      while (true) {
        if (charlen <= num) {
          return result;
        }
        if (nbt[num] == "{") {
          result[key_str] = _load_nbt(nbt, counter);
          num = counter.next().value;
          key_str = "";
          continue;
        } else if (nbt[num] == "}") {
          return result;
        } else if (nbt[num] != ",") {
          while (nbt[num] != ",") {
            value_str += nbt[num];
            num = counter.next().value;
            if (nbt[num] == "}") {
              break;
            }
          }
          result[key_str] = _value_typer(value_str);
        } else {
          result[key_str] = _value_typer(value_str);
          key_str = "";
          value_str = "";
          break;
        }
      }
    }
  }
}

function _value_typer(value) {
  if (value == "") {
    return [value, "String"];
  } else if (String(value) == "true") {
    return [true, "Boolean"];
  } else if (String(value) == "false") {
    return [false, "Boolean"];
  } else if (is_num(value.split("").slice(0, -1).join("")) || is_num(value)) {
    if (value[value.length - 1] == "b") {
      return [parseFloat(value.split("").slice(0, -1).join("")), "byte"];
    } else if (value[value.length - 1] == "d") {
      return [parseFloat(value.split("").slice(0, -1).join("")), "double"];
    } else if (value[value.length - 1] == "f") {
      return [parseFloat(value.split("").slice(0, -1).join("")), "float"];
    } else if (value[value.length - 1] == "s") {
      return [parseInt(value.split("").slice(0, -1).join("")), "short"];
    } else if (value[value.length - 1] == "L") {
      return [parseInt(value.split("").slice(0, -1).join("")), "long"];
    } else {
      if (value.includes(".")) {
        return [parseFloat(value), "double"];
      } else {
        return [parseInt(value), "int"];
      }
    }
  } else {
    return [value, "String"];
  }
}
function _nbt_dump(json) {
  //これで勝つる
  var element = [];
  for (const key of Object.keys(json)) {
    if (key == "") {
      continue;
    }else if (json[key][0] === "") {
      element.push(`${key}:""`);
    } else if (json[key] instanceof Array) {
      if (json[key][1] == "String") {
        element.push(`${key}:${String(json[key][0])}`);
      } else if (json[key][1] == "Boolean") {
        element.push(`${key}:${String(json[key][0])}`);
      } else if (json[key][1] == "byte") {
        element.push(`${key}:${String(json[key][0])}b`);
      } else if (json[key][1] == "double") {
        element.push(`${key}:${String(json[key][0])}d`);
      } else if (json[key][1] == "float") {
        element.push(`${key}:${String(json[key][0])}f`);
      } else if (json[key][1] == "short") {
        element.push(`${key}:${String(json[key][0])}s`);
      } else if (json[key][1] == "long") {
        element.push(`${key}:${String(json[key][0])}L`);
      } else if (json[key][1] == "int") {
        element.push(`${key}:${String(json[key][0])}`);
      }else{
        element.push(`${key}:[${json[key].join(",")}]`);
      }
    }else{
        element.push(`${key}:${_nbt_dump(json[key])}`)
    }
  }
  return "{" + element.join(",") + "}";
}
function is_num(s) {
  var result = String(Number(s));
  if (result === "NaN") {
    return false;
  } else {
    return true;
  }
}
