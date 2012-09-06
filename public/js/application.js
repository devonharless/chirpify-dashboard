$(document).ready(function() {

  //Global click events

  $('.editSocialStream').live('click', showSocialStreams);

  $('#mainTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('.subNav a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');

    if($(this).attr('href') != '#listings') {
      $('.details-container').hide();
    }
    else {
      $('.details-container').show();
    }
  })


  // Application Modals

  //Individual modal
  $('.individualListing').click(function (e) {
    e.preventDefault();
    $('#receiptModal').modal('show');
  })

  function showSocialStreams(e) {
    e.preventDefault();

    $('#socialListingModal').modal('show')
  }

});