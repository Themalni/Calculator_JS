var buttons = document.querySelectorAll(".calc-button");
var displayTopRow = document.querySelector("textarea");
var displayBottomRow = document.querySelector(".calc-display__digits-bottom");

displayTopRow.value = "0";
displayBottomRow.value = "";
var buttonVal = "";
var digits = "";
var result = "";
var reset = false;
var decimal = false;
var i;
var buttonsLength = buttons.length;

// listening for a button click
for(i = 0; i < buttonsLength; i++){
  var clickedBtn = buttons[i];

      clickedBtn.addEventListener("click", function(e){
          buttonVal = e.target.dataset.button;
          if(buttonVal == "C"){
            resetValues();
          }else if(buttonVal == "step-back"){
            removeOneDigit();
          }else if(reset){
            resetValues();
          }else{
            displayDigits(e);
          }
      });
}

  // one step back
    function removeOneDigit(e){
      digits = digits.slice(0, -1);
      displayTopRow.value = digits;

        if(digits.length === 0){
          displayTopRow.value = "0";
          displayBottomRow.value = "";
        }
    }

  // reset all values and clear display
  function resetValues(e){
    digits = "";
    displayTopRow.value = "0";
    displayBottomRow.value = "";
    reset = false;
    decimal = false;
  }

   // display digits
   function displayDigits(e){
     buttonVal = e.target.dataset.key;
     var operator = e.target.dataset.operator;
     var lastChar = digits.charAt(digits.length -1);

     // add new values to string
       if(buttonVal && digits.length < 38){
         if(buttonVal !== "."){
           digits += buttonVal;
              // display message when crossing the limit of digits
            if(digits.length >= 38){
              displayBottomRow.style.fontSize = "0.8em";
              displayBottomRow.value = "Maximum number is reached";
            }
            displayTopRow.value = digits;
          }else if(digits !== "" && buttonVal == "."){
            // check string for dots
            if(!decimal){
              digits += buttonVal;
              displayTopRow.value = digits;
              decimal = true;
            }
          }
        }
        if(operator == "+" ||
           operator == "-" ||
           operator == "*" ||
           operator == "/"
          ){
            decimal = false;

            // don't allow operators to start a string
            if(digits !== ""){
              digits += operator;
              displayTopRow.value = digits;
            }

            // don't allow operators to chain
            if(lastChar == "+" || lastChar == "*" || lastChar == "/" || lastChar == "-"){
              digits = digits.slice(0, -1);
              displayTopRow.value = digits;
            }

            // allow minus in to start a string
            if(digits == "" && operator == "-"){
              digits += operator;
              displayTopRow.value = digits;
            }
        // display result
        }else if(operator == "="){
          result = eval(digits);
          displayBottomRow.style.fontSize = "1.4em";

            if(result % 1 != 0 || decimal == true){
              var round = result.toFixed(2);
              displayBottomRow.value = "=" + round;
            }else{
              displayBottomRow.value = "=" + result;
            }
          reset = true;
          decimal = true;
        }

}
