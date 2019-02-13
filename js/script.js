const regexActivity = /^\s.+\s.\s([A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]).\s\$\d+$/;
const regexDayTime = /[A-Za-z]+\s\d+[a,p][m].\d+[a,p][m]/;
const regexActivityCost = /\d{3}/;
let totalCost = 0;
const $totalCostHTML = $('<p></p>');

//Focus on name field on page load
$('#name').focus();

//Hide 'Your Job Role' field on page load
$('#other-title').hide();

//Hide tshirt color field on page load
$('#colors-js-puns').hide();

//Append $totalCostHTML element on page load
$('.activities').append($totalCostHTML);

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
  //Listen for an activity to be checked
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
