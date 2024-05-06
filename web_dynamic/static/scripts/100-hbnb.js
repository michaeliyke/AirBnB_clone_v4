;
const jQuery = $;

jQuery(function ($) {
  const amenities = {};
  const states = {};
  const cities = {};

  // 0: Deals with the Amenities dropdown checkboxes section
  $('input[type="checkbox"]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');
    const isAmenity = $(this).data("src") === "amenity";
    const isState = $(this).data("src") === "state";
    const isCity = $(this).data("src") === "city";

    if ($(this).is(':checked')) {
      if (isState) {
        states[id] = name;
      } else if (isCity) {
        cities[id] = name;
      } else if (isAmenity) {
        amenities[id] = name;
      }
    } else {
      if (isState) {
        delete states[id];
      } else if (isCity) {
        delete cities[id];
      } if (isAmenity) {
        delete amenities[id];
      }
    }

    if (isAmenity) {
      if (Object.values(amenities).length > 0) {
        $('.amenities h4').text(Object.values(amenities).join(', '));
      } else {
        $('.amenities h4').html('&nbsp;');
      }
    }

    if (isState) {
      if (Object.values(states).length > 0) {
        $('.locations h4').text(Object.values(states).join(', '));
      } else {
        $('.locations h4').html('&nbsp;');
      }
    }

    if (isCity) {
      if (Object.values(cities).length > 0) {
        $('.locations h4').text(Object.values(cities).join(', '));
      } else {
        $('.locations h4').html('&nbsp;');
      }
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

  // 3: Deals with the search button
  $('.filters button').click(function () {

    $('.places').empty();
    const data = {
      amenities: Object.keys(amenities),
      cities: Object.keys(cities),
      states: Object.keys(states),
    };

    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
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
    });
  }); // end 3:

});
