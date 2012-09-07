$(document).ready(function() {

  /*------------------------------------------------------------------
  Application JS
  -------------------------------------------------------------------*/

  /*------------------------------------------------------------------
  [Table of contents]

  1. Defaults & Global
  2. Event Assignment
  3. View specific functions

  -------------------------------------------------------------------*/

  /*------------------------------------------------------------------
  [1. Defaults & Global ]
  */

  //Bootstrap JS defaults
  $('.nav-tabs').button();


  /*------------------------------------------------------------------
  [2. Event Assignment ]
  */


  //--- Navigation, Tabs --- 'index.erb' & 'partials/_topnav.erb'

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


  //--- Main Listing View --- 'index.erb' & partials/_receipt.erb' & 'partials/_listingFilters.erb'

  //individual modal
  $('.individualListing').click(function (e) {
    e.preventDefault();
    $('#receiptModal').modal('show');
  })


  //--- New Listing View --- 'partials/_createListing.erb'
  $('.editSocialStream').live('click', showSocialStreams);
  $('.pubSaveNewListing').live('click', pubSaveNewLisiting);




  /*------------------------------------------------------------------
  [3. iew specific functions ]
  */

  //--- New Listing View --- 'partials/_createListing.erb'

  function pubSaveNewLisiting(e) {
    e.preventDefault();

    //Loading state, validating state, etc
    $(e.target).button('loading');
    $('.validateMsg').text('Validation message shown here if there are errors. Otherwise, this element is normally hidden.');
    
    //Time delay to fake saving of data, validation showing, etc.
    setTimeout(function() {
      //Ajax calls for submit/or save as draft depending on user selection. 
      
      //Reset the button state from loading to 'normal'
      $(e.target).button('reset');

      //On success, the user returns to the main listing view.
      $('#subNavListings').trigger('click');
    }, 4000);
  }

  //Side frame is shown, allowing the user to review their listing info, social stream specific
  function showSocialStreams(e) {
    e.preventDefault();

    $('#socialListingModal').modal('show')
  }

});