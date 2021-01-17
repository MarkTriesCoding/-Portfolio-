import '../../../scss/fcc/calculator.scss';


$(document).ready(function() {
  //store input to calculate later;
  var inputs = [""];
  var currentInput;
  var operators1 = ["*", "/", "+", "-"];
  var operators2 = ["."];
  var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  //function to perform action after buttons are clicked.
  function getValue(input) {
    //where the input is a decimal and t
    if (operators2.includes(inputs[inputs.length - 1]) && input === ".") {
      console.log("error. too many @#$%^ng decimals");
    } else if (
      operators1.includes(inputs[inputs.length - 1]) &&
      operators1.includes(input)
    ) {
      //where there is no input and it is not an operand, push value to inputs
      console.log("too many operands");
    } else if (
      operators2.includes(inputs[inputs.length - 1]) &&
      operators1.includes(input)
    ) {
      //where last input is not an operator, push value to inputs
      if (nums.includes(inputs[inputs.length - 1])) {
        inputs.push(input);
      } else {
        console.log("operand after unassigned decimal.");
      }
    } else if (operators1.includes(input)) {
      // where operator is input and inputs is blank, can't start with operand to console, else if operator, then input.
      if (inputs[inputs.length - 1] == "") {
        console.log("cant start wit opr");
      } else {
        inputs.push(input);
      }
    }
    // else if number in input, push to inputs always
    else if (nums.includes(Number(input))) {
      inputs.push(input);
    } else if (operators2.includes(input)) {
      var str = inputs.join("");
      var regexp = /-?\d+\.\d*$/;

      if (regexp.test(str)) {
        console.log("Too many decimals");
      } else {
        inputs.push(input);
      }
    }
    //other cases, push to input
    else {
      inputs.push(input);
    }
    update();
  }

  //function to display inputs
  function update() {
    currentInput = inputs.join("");
    if (currentInput.length > 8) {
      $("#screenFeed").html(inputs.slice(0, 9));
    } else {
      $("#screenFeed").html(currentInput);
    }
  }

  //function to evaluate the inputs as a mathematical expression
  function getTotal() {
    currentInput = inputs.join("");
    var total = eval(currentInput);
    if (Number.isInteger(total) === false) {
      total = total.toPrecision(6);
      $("#screenFeed").html(total);
    } else {
      var log = Math.floor(Math.log10(total));
      console.log(log);
      if (log > 8) {
        console.log("2")
      }
      $("#screenFeed").html(total);
    }
  }

  $("a").on("click", function() {
    //when clearall button pressed, inputs is cleared and screen is updated
    if (this.id === "clearAll") {
      inputs = [""];
      update();
    } else if (this.id === "clearOne") {
      //else case if clearOne is pressed & there is more than one value in inputs, last value is removed and screen is updated
      if (inputs.length > 1) {
        inputs.pop();
        update();
      }
    } else if (this.id === "=") {
      // if equals is pressed, getTotal function calledl
      getTotal();
    } else {
      getValue(this.id);
    }
  });
  var keycodes = {
    96: "0",
    97: "1",
    98: "2",
    99: "3",
    100: "4",
    101: "5",
    102: "6",
    103: "7",
    104: "8",
    105: "9",
    106: "*",
    88: "*",
    107: "+",
    109: "-",
    189: "-",
    110: ".",
    111: "/",
    191: "/",
    13: "=",
    187: "=",
    67: "clearOne",
    65: "clearAll",

  }
  $(document).on("keydown", function(e) {
    var key = (e.keyCode ? e.keyCode : e.which);
    console.log(key, " ", keycodes[key])
    if (keycodes[key] == "=") {
      getTotal();

    } else if (keycodes[key] == "clearOne") {
      if (inputs.length > 1) {
        inputs.pop();
        update();
      }
    } else if (keycodes[key] == "clearAll") {
      inputs = [""];
      update();
    } else {
      getValue(keycodes[key])
    }


  })
});
