;
const jQuery = $;

jQuery(function ($) {
  const amenities = {};

  // 0: Deals with the Amenities dropdown checkboxes section
  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities[id] = name;
    } else {
      delete amenities[id];
    }

    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(Object.values(amenities).join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  }); /* end 0: */

  // 1: Deals with the API status indicator
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (status === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
        return;
      }
    }
    $('#api_status').removeClass('available');
  }); /* end 1: */


});
