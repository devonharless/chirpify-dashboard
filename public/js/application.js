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
  })


  //--- Main Listing View --- 'index.erb' & partials/_receipt.erb' & 'partials/_listingFilters.erb'

  // Show an individual listing after user selection of a receipt
  $('.individualListing').click(function (e) {
    e.preventDefault();

    //show an individual listing & hide the main receipt/listing
    $('#receiptModal').modal('show');
    
  })

  // Individual Listing > Edit Listing

  $('#editListingBtn').live('click', editIndividualListing);
  $('.individualBC').live('click', cancelEditListing);


  // Edit Listing > Cancel

  $('#editListingCancel').live('click', cancelEditListing);
  $('#currentSocialModal .close').live('click', closeSocialContent);
  $('#currentSocialModal .closeModal').live('click', closeSocialContent);
  $('#currentSocialModal .saveEdits').live('click', saveSocialContent);


  //--- New Listing View --- 'partials/_createListing.erb'
  
  $('.editSocialStream').live('click', showSocialStreams);
  $('.pubSaveNewListing').live('click', pubSaveNewLisiting);



  /*------------------------------------------------------------------
  [3. View-specific functions ]
  */


  //--- Individual Listing View --- 'modals/individualListing.erb'

  function editIndividualListing(e) {
    e.preventDefault();

    //User intends to edit their pre-existing listing after reviewing their receipt info
    //View swaps to a view similars to 'partials/creatListing.erb', content in inputs, form, etc.
    
    $('#listing_ID').fadeOut();
    $('#editListing').removeClass('hide');

    $('.individualBC').removeClass('active').html('<li><a href="#">Individual listing title</a> <span class="divider">/</span></li>');
    $('.modal-header .breadcrumb').append('<li class="editBC active">Edit listing</li>');
  }

  function saveSocialContent(e) {
    //Save the user's edits to their pre-existing social content for their listing
    $('#currentSocialModal').modal('hide');
  }

  function closeSocialContent(e) {
    e.preventDefault();

    //No changes are saved
    $('#currentSocialModal').modal('hide');
  }

  //--- Edit Individual Listing View / Cancel --- 'modals/individualListing.erb'

  function cancelEditListing(e) {
    //Cancel editing an individual listing - return to the individual listing in passive viewing mode
    $('#editListing').addClass('hide');
    $('#listing_ID').fadeIn();

    $('.individualBC').addClass('active').html('Individual listing title');
    $('.editBC').remove();
  }

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

    console.log('e.target >> ', e.target.id)

    if(e.target.id == 'editNewChirpify') {
      $('#newSocialModal').modal('show');
    }
    else {
      $('#currentSocialModal').modal('show');
    }
  }

});