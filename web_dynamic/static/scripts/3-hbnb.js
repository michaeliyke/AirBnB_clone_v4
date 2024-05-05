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

  // 2: Automatically updates the list of places
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (places) {
      for (const place of places) {
        const article = [
          '<article>',
          '<div class="title_box">',
          `<h2>${place.name}</h2>`,
          '<div class="price_by_night">',
          `${place.price_by_night}`,
          '</div>',
          '</div>',
          '<div class="information">',
          `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
          `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
          `<div class="number_bathrooms">${place.number_bathrooms} Bathroom(s)</div>`,
          '</div>',
          '<div class="description">',
          `${place.description}`,
          '</div>',
          '</article>'
        ].join('');

        $('.places').append(article);
      }
    }
  }); // end 2:


});
