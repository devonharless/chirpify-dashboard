$(document).ready(function() {

  //Global vars

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
    $('#receiptModal').modal('show')
  })

  $('.editSocialStream').live('click', showSocialStreams);

  function showSocialStreams(e) {
    e.preventDefault();
    console.log('hi there!');

    $('#socialListingModal').modal('show')
  }


});