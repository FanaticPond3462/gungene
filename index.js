require.config({ paths: { vs: "./node_modules/monaco-editor/min/vs" } });
var myEditor;
require(["vs/editor/editor.main"], function () {
  const value = /* set from `myEditor.getModel()`: */ `{
    "sight":""
}`;

  // Hover on each property to see its docs!
  myEditor = monaco.editor.create(document.getElementById("container"), {
    value,
    language: "json",
    automaticLayout: false,
    theme: "vs-dark",
  });
});

const longPress = {
  //プロパティ
  el: "",
  count: 0,
  second: 1,
  interval: 2,
  timerId: 0,
  num: 1,
  parent: document,
  //メソッド
  init: function (param) {
    var button = param.parent.querySelectorAll(param.el)[0];
    button.addEventListener("mousedown", function () {
      let c = 0;
      param.parent.querySelectorAll("#number")[0].children[0].value =
        parseFloat(
          param.parent.querySelectorAll("#number")[0].children[0].value
        ) +
        1 * parseFloat(param.num, 10);
      this.timerId = setInterval(() => {
        if (c > 5) {
          param.parent.querySelectorAll("#number")[0].children[0].value =
            parseFloat(
              param.parent.querySelectorAll("#number")[0].children[0].value
            ) +
            1 * parseFloat(param.num, 10);
        }
        c++;
      }, 100);
    });
    button.addEventListener("mouseup", function () {
      clearInterval(this.timerId);
    });
    button.addEventListener("mouseout", function () {
      clearInterval(this.timerId);
    });
  },
};
let file = document.createElement("input");
file.type = "file";
file.addEventListener("change", inputChange);
function inputChange(event) {
  var textfile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsText(textfile);
  reader.onload = () => {
    var text = reader.result;
    input_text = text.split("").slice(text.indexOf("{")).join("");
    var nbt_json = _load_nbt(input_text);
    if (nbt_json["item"] != undefined) nbt_json["toisgun"] = old_load(nbt_json);
    console.log(nbt_json);
    load(nbt_json["toisgun"]);
  };
}
window.addEventListener("load", async function () {
  //初期化
  seisuu_array = document.querySelectorAll("#seisuu");
  syousuu_array = document.querySelectorAll("#syousuu");
  for (const elem of seisuu_array) {
    init(elem, 1);
  }
  for (const elem of syousuu_array) {
    init(elem, 0.1);
  }
  this.document.getElementById("read").onclick = () => {
    file.click();
  };
  this.document.getElementById("save").onclick = () => {
    save();
  };
});
function init(element, num) {
  number = [0.0];
  longPress.init({
    el: "#plus", //長押しの判定を取りたい要素のセレクタを指定する
    num: num,
    parent: element,
  });
  longPress.init({
    el: "#minus", //長押しの判定を取りたい要素のセレクタを指定する
    num: -num,
    parent: element,
  });
}
function old_load(input) {
  result = {};
  result["ammo"] = {};
  result["power"] = {};
  result["rate"] = {};
  result["distance"] = {};
  result["accuracy"] = {};
  result["recoilc"] = {};
  result["timings"] = {};
  result["textures"] = {};
  result["sounds"] = {};
  result["mobility"] = {};
  result["operability"] = {};
  result["type"] = ["gun", "String"];
  result["slot"] = ["main", "String"];
  if (input["reload"]["single"] != undefined) {
    result["single_reload"] = [true, "Boolean"];
  } else {
    result["single_reload"] = [false, "Boolean"];
  }
  result["displayname"] = [input["gundisplay"][0], "String"];
  result["gun_id"] = [input["gun"][0], "String"];
  result["ammo"]["spa"] = [0, "int"];
  result["ammo"]["max"] = [input["max_ammo"][0], "int"];
  result["ammo"]["rem"] = [0, "int"];
  result["ammo"]["type"] = ["normal", "String"];
  result["ammo"]["amount"] = [0, "int"];
  result["ammo"]["reload_time"] = [
    input["reload"]["time"][0],
    input["reload"]["time"][1],
  ];
  result["ammo"]["reload_s_time"] = [0, "int"];
  result["power"]["damage"] = [0, "int"];
  result["power"]["damage_h"] = [0, "int"];
  result["power"]["bullet"] = [input["bullet"][0], "String"];
  result["rate"]["rate"] = [input["rate"][0], input["rate"][1]];
  result["rate"]["shotrecoil_time"] = [0, "int"];
  result["rate"]["cooldown"] = [input["cooldown"][0], input["cooldown"][1]];
  result["rate"]["swapspeed"] = [0, "int"];
  result["distance"]["range"] = [input["range"][0], "int"];
  result["distance"]["speed"] = [input["range"][0], "int"];
  result["accuracy"]["ver_accuracy"] = [0, "int"];
  result["accuracy"]["hor_accuracy"] = [0, "int"];
  result["recoilc"]["aim_stability"] = [0, "int"];
  result["recoilc"]["hip_stability"] = [0, "int"];
  result["recoilc"]["jump_stability"] = [0, "int"];
  result["timings"]["cooldown_sound"] = [0, "int"];
  for (let i = 1; i < 9; i++) {
    if (input["reload"][`reload${i}`] != null)
      result["timings"][`reload_${i}`] = [
        input["reload"][`reload${i}`][0],
        input["reload"][`reload${i}`][1],
      ];
    else result["timings"][`reload_${i}`] = [0, "int"];
  }
  result["timings"]["reload_s"] = [0, "int"];

  for (const key of [
    "hip",
    "peep",
    "run",
    "noammo_hip",
    "noammo_peep",
    "noammo_run",
    "cooldown_hip",
    "cooldown_peep",
    "flash",
  ]) {
    result["textures"][key] = [0, "int"];
  }
  for (let i = 1; i < 9; i++) {
    result["textures"][`reload_${i}`] = [0, "int"];
  }
  for (let i = 1; i < 9; i++) {
    if (input["sound"][`reload${i}`] != null)
      result["sounds"][`reload_${i}`] = [
        input["sound"][`reload${i}`][0],
        input["sound"][`reload${i}`][1],
      ];
    else result["sounds"][`reload_${i}`] = ["", "String"];
  }
  result["sounds"]["shot"] = [
    input["sound"][`shot`][0],
    input["sound"][`shot`][1],
  ];
  result["sounds"]["cooldown"] = ["", "String"];
  result["sounds"]["reload_s"] = ["", "String"];
  result["mobility"]["move_speed"] = [0, "int"];
  result["mobility"]["aim_move_speed"] = [0, "int"];
  result["operability"]["aim_speed"] = [0, "int"];
  result["operability"]["dashshootspeed"] = [0, "int"];
  result["attachment"] = { sight: ["", "String"] };
  return result;
}
function load(input) {
  var element_array = document.querySelectorAll(".input");
  for (const elem of element_array) {
    if (elem.children.length == 0) continue;
    if (elem.children[1].children[0].type == "button") {
      if (elem.parentNode.children[0].innerText == "root") {
        if (input[elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[1].children[0].value =
            input[elem.children[1].children[0].name][0];
        }
      } else {
        if (input[elem.parentNode.children[0].innerText][elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[1].children[0].value =
            input[elem.parentNode.children[0].innerText][
              elem.children[1].children[0].name
            ][0];
        }
      }
    } else if (elem.children[1].children[0].type == "checkbox") {
      if (elem.parentNode.children[0].innerText == "root") {
        if (input[elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[0].checked =
            input[elem.children[1].children[0].name][0];
        }
      } else {
        if (input[elem.parentNode.children[0].innerText][elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[0].checked =
            input[elem.parentNode.children[0].innerText][
              elem.children[1].children[0].name
            ][0];
        }
      }
    } else {
      if (elem.parentNode.children[0].innerText == "root") {
        if (input[elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[0].value =
            input[elem.children[1].children[0].name][0];
        }
      } else {
        if (input[elem.parentNode.children[0].innerText][elem.children[1].children[0].name] != undefined) {
          elem.children[1].children[0].value =
            input[elem.parentNode.children[0].innerText][
              elem.children[1].children[0].name
            ][0];
        }
      }
    }
  }
  var attachment = {};
  if (input["attachment"] != undefined) {
    for (const key of Object.keys(input["attachment"])) {
      attachment[key] = input["attachment"][key][0];
    }
    myEditor.setValue(JSON.stringify(attachment));
  }
}
function save() {
  var element_array = document.querySelectorAll(".input");
  var result = {};
  for (const elem of element_array) {
    var value;
    if (elem.children.length == 0) continue;
    if (elem.children[1].children[0].type == "button") {
      value = elem.children[1].children[1].children[0].value;
    } else if (elem.children[1].children[0].type == "checkbox") {
      value = elem.children[1].children[0].checked;
    } else {
      value = elem.children[1].children[0].value;
    }
    if (elem.parentNode.children[0].innerText == "root") {
      result[elem.children[1].children[0].name] = _value_typer(value);
    } else {
      if (result[elem.parentNode.children[0].innerText] == undefined)
        result[elem.parentNode.children[0].innerText] = {};
      result[elem.parentNode.children[0].innerText][
        elem.children[1].children[0].name
      ] = _value_typer(value);
    }
  }
  tmp = JSON.parse(myEditor.getValue());
  result["attachment"] = {};
  for (const key of Object.keys(tmp)) {
    result["attachment"][key] = _value_typer(tmp[key]);
  }
  var output = "/give @s carrot_on_a_stick" + _nbt_dump(result);
  const a = document.createElement("a");
  a.href = "data:text/plain," + encodeURIComponent(output);
  a.download = result["gun_id"][0] + ".mcfunction";

  a.style.display = "none";
  document.body.appendChild(a); // ※ DOM が構築されてからでないとエラーになる
  a.click();
  document.body.removeChild(a);
}
setInterval(() => {
  update();
}, 1000);
function update() {
  var rate = document.querySelector(".rate").children[0].value;
  var damage = parseInt(document.querySelector(".damage").children[0].value);
  var damage_h = parseInt(
    document.querySelector(".damage_h").children[0].value
  );
  var dps = 0;
  var dps_h = 0;
  var cooldown = parseInt(
    document.querySelector(".cooldown").children[0].value
  );
  var count = database(rate);
  var current_cooldown = 0;
  var queue_of_count = [];
  var result;
  if (count[0] === -1) {
    result = `DPS - -1dps headshot DPS - -1dps`;
    document.querySelector(".dps").innerText = result;
    return;
  }
  for (let i = 0; i < 20; i++) {
    if (current_cooldown == 0) {
      current_cooldown = cooldown;
      for (let c = 0; c < count.length; c++) {
        if (queue_of_count.length > i + c) queue_of_count[i] += count[c];
        else queue_of_count.push(count[c]);
        if (queue_of_count.length == 20) break;
      }
    } else {
      if (queue_of_count.length <= i) {
        queue_of_count.push(0);
      }
      current_cooldown -= 1;
    }
  }
  for (const count of queue_of_count) {
    dps += count * damage;
  }
  for (const count of queue_of_count) {
    dps_h += count * damage_h;
  }
  if (!result) {
    result = `DPS - ${dps}dps headshot DPS - ${dps_h}dps`;
  }
  document.querySelector(".dps").innerText = result;
}
function database(rate) {
  switch (rate) {
    case "-1":
      return [2, 2, 2, 2];
    case "-0.1":
      return [2, 2, 1, 2];
    case "0":
      return [1, 1, 1, 1];
    case "0.1":
      return [0, 1, 1, 1];
    case "1":
      return [0, 1, 0, 1];
    case "1.2":
      return [0, 1, 0, 0, 1, 0, 1, 0];
    case "2":
      return [0, 0, 0, 1];
    case "2.3":
      return [2, 2, 2, 2, 2, 2, 2, 2];
    case "3":
      return [0, 0, 0, 0, 0, 0, 0, 0];
    case "4":
      return [0, 0, 0, 0, 0, 0, 0, 1];
    case "12col":
      return [0, 0, 0, 12];
    default:
      return [-1];
  }
}
