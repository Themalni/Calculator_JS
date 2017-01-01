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

for(i = 0; i < buttons.length; i++){
  var clickedBtn = buttons[i];

      clickedBtn.addEventListener("click", function(e){
          buttonVal = e.target.dataset.button;
          if(buttonVal == "C"){
            clearData();
          }else if(buttonVal == "step-back"){
            removeOneDigit();
          }else{
            displayDigits(e);
          }
      });
}

  // clear display
    function clearData(e){
      digits = "";
      displayTopRow.value = "0";
      displayBottomRow.value = "";
      decimal = false;
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

   // display digits
   function displayDigits(e){
     buttonVal = e.target.dataset.key;
     var operator = e.target.dataset.operator;
     var lastChar = digits.charAt(digits.length -1);

     // reset display for new operation
     if(reset){
         digits = "";
         displayTopRow.value = "0";
         displayBottomRow.value = "";
         reset = false;
         decimal = false;
     }

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
            if(digits !== "" && lastChar !== operator){
              digits += operator;
              displayTopRow.value = digits;
            }else{
              displayTopRow.value = "0";
            }
            // allow operator to replace each other
            // not working!!!

            if(lastChar == operator){
              var replaced = digits.slice(0, -1) + operator;

              /*digits = digits.slice(0, lastChar);
              var replaced = digits.replace(/.$/, "b");*/

              displayTopRow.value = replaced;
            }
            // allow minus in front of string
            if(digits == "" && operator == "-"){
              digits += operator;
              displayTopRow.value = digits;
            }


        }else if(operator == "="){
          result = eval(digits);
          displayBottomRow.style.fontSize = "1.4em";
            if(decimal){
              var round = result.toFixed(5);
              displayBottomRow.value = "=" + round;
              reset = true;
              decimal = true;
            }else{
              displayBottomRow.value = "=" + result;
              reset = true;
              decimal = false;
            }

        }

}

// don't allow operators to chain is not working
// don't allow new operations after result is displayed
