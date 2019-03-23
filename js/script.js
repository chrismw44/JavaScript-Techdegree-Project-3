const regexActivity = /^\s.+\s.\s([A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]).\s\$\d+$/;
const regexDayTime = /[A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]/;
const regexActivityCost = /\d{3}/;
const regexEmail = /^[^@]+@[^@.]+\.[a-z]{2}\.?[a-z]+$/i;
let totalCost = 0;
const $totalCostHTML = $('<p></p>');
const $submit = $('button[type="submit"]');
const $name = $('#name');
const $email = $('#mail');
const $activities = $('.activities');
const $cardNumber = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
//Validation messages
const $nameErrorMsg = $('<span class="error-span">Name field cannot be blank</span>');
const $emailErrorMsg1 = $('<span class="error-span">Must be valid email</span>');
const $emailErrorMsg2 = $('<span class="realtime-error">Not a valid email</span>');
const $checkboxErrorMsg = $('<span class="error-span">At least one activity must be selected</span>');
const $cardNumberErrorMsg1 = $('<span class="error-span">Please enter a credit card number</span>');
const $cardNumberErrorMsg2 = $('<span class="error-span">Card number must be between 13 and 16 digits long</span>');
const $zipCodeErrorMsg = $('<span class="error-span">Zip code must be a 5 digit number</span>');
const $cvvErrorMsg = $('<span class="error-span">CVV must be a 3 digit number</span>');

//Focus on name field on page load
$('#name').focus();

//Add class to email input and label elements and wrap them in a div
$('label[for="mail"]').addClass('email');
$($email).addClass('email');
$('.email').wrapAll('<div class="email-div" />');

//Add and hide realtime email validation message
$($email).before($emailErrorMsg2);
$($email).prev('span').hide();


//Hide 'Your Job Role' field on page load
$('#other-title').hide();

//Hide tshirt color field on page load
$('#colors-js-puns').hide();

//Append $totalCostHTML element on page load
$('.activities').append($totalCostHTML);

//Remove "select payment method" from payment option list on page load
$('#payment option[value="select_method"]').remove();

//Hide the Paypal and Bitcoin information on page load
$('div #credit-card').next().hide();
$('div #credit-card').next().next().hide();

//Show 'Your Job Role' field only if 'other' is selected in 'Job Role' field
$('#title').on('click', function() {
  if ($(this).val() === 'other') {
    $('#other-title').show();
  } else {
    $('#other-title').hide();
  }
});

//Display only the color options that match the tshirt design
$('#design').on('change', function() {
  $('#colors-js-puns').show();
  $('#color option').hide();
  if ($(this).val() === 'js puns') {
    $('#color option:contains("JS Puns shirt only")').show();
    $('#color option[value="cornflowerblue"]').prop('selected', 'selected');
  } else if ($(this).val() === 'heart js') {
    $('#color option:contains("JS shirt only")').show();
    $('#color option[value="tomato"]').prop('selected', 'selected');
  } else {
    $('#colors-js-puns').hide();
  }
});


//Disable activities that compete with those already checked
$('.activities input').on('change', function(event) {
  const $selectedActivity = $(event.target);
  const $selectedText = $($selectedActivity).parent().text();

  if (regexActivity.test($selectedText)) {
    const selectedDayTime = $selectedText.match(regexDayTime);

    if ($selectedActivity.prop('checked')) {

      $("input[type='checkbox']:not(:checked)").each(function(){
        const $uncheckedActivity = $(this);
        const $uncheckedText = $($uncheckedActivity).parent().text();
        if (regexActivity.test($uncheckedText)) {
          const uncheckedDayTime = $uncheckedText.match(regexDayTime);
          if (selectedDayTime[0] === uncheckedDayTime[0]) {
            $uncheckedActivity.prop('disabled', true).parent().css({color: 'grey'});
          }
        }
     });
   }
     if (!$selectedActivity.prop('checked')) {

       $("input[type='checkbox']:not(:checked)").each(function(){
         const $uncheckedActivity = $(this);
         const $uncheckedText = $($uncheckedActivity).parent().text();
         if (regexActivity.test($uncheckedText)) {
           const uncheckedDayTime = $uncheckedText.match(regexDayTime);
           if (selectedDayTime[0] === uncheckedDayTime[0]) {
             $uncheckedActivity.prop('disabled', false).parent().css({color: 'initial'});
           }
         }
      });
    }
  }

//Calculate total cost
  totalCost = 0;
  $($totalCostHTML).hide();
  $("input[type='checkbox']:checked").each(function(){
    const $activityText = $(this).parent().text();
    const activityCostString = $activityText.match(regexActivityCost);
    const activityCostInt = parseInt(activityCostString[0]);
    totalCost = totalCost + activityCostInt;
    $($totalCostHTML).text(`Total: \$${totalCost}`);
    $($totalCostHTML).show();
  });
});

//Display payment sections based on selected payment option
$('#payment').on('click', function(){
  if ($('#payment option[value="credit card"]').is(':selected')) {
    $('div #credit-card').show();
    $('div #credit-card').next().hide();
    $('div #credit-card').next().next().hide();
  } else if ($('#payment option[value="paypal"]').is(':selected')) {
    $('div #credit-card').hide();
    $('div #credit-card').next().show();
    $('div #credit-card').next().next().hide();
  } else if ($('#payment option[value="bitcoin"]').is(':selected')) {
    $('div #credit-card').hide();
    $('div #credit-card').next().hide();
    $('div #credit-card').next().next().show();
  }
});

//Validation
//Name field is blank
function nameValid(name) {
  return /^\s*$/.test(name) === false;
}

//Valid email
function emailValid(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

//At least one checkbox selected
function $checkedValid(activities) {
    return $("input[type='checkbox']:checked").length !== 0;
}

//Card number is blank
function cardNumberBlank(cardNumber) {
  return /^\s*$/.test(cardNumber) === false;
}

//Credit card field should be a number 13-16 digits long
function cardNumberValid(cardNumber) {
  return /^\d{13,16}$/.test(cardNumber);
}

//Zip code should be a 5 digit number
function zipCodeValid(zip) {
  return /^\d{5}$/.test(zip);
}

//CVV should be a 3 digit number
function cvvValid(cvv) {
  return /^\d{3}/.test(cvv);
}

function validate(validator, element, message) {
  const valid = validator(element.val());
  if (valid) {
    $(element).removeClass('error');
    $(element).next('span').remove();
  } else {
    $(element).addClass('error');
    $(element).after(message);
    event.preventDefault();
  }
}



//Form validation
$submit.on('click', function(event){
  validate(nameValid, $name, $nameErrorMsg);
  validate(emailValid, $email, $emailErrorMsg1);
  validate($checkedValid, $activities, $checkboxErrorMsg);
  if ($('#payment option[value="credit card"]').is(':selected')) {
    if ((cardNumberBlank($cardNumber.val())) === false) {
      $($cardNumber).next('span').remove();
      validate(cardNumberBlank, $cardNumber, $cardNumberErrorMsg1);
    } else {
      $($cardNumber).next('span').remove();
      validate(cardNumberValid, $cardNumber, $cardNumberErrorMsg2);
    }
    validate(zipCodeValid, $zipCode, $zipCodeErrorMsg);
    validate(cvvValid, $cvv, $cvvErrorMsg);
  }
});

//Realtime validation of email field
$email.on('input', function(){
  const text = $(this).val();
  if (emailValid(text) === false && /^\s*$/.test(text) === false) {
    $(this).prev('span').show();
  } else {
    $(this).prev('span').hide();
  }
});
