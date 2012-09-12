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

  $('#topNavAccount a').click(function (e) {
    e.preventDefault();
    $('#accountNavBtn').trigger('click')
  });

  $('#topNavSocial a').click(function (e) {
    e.preventDefault();
    $('#socialNavBtn').trigger('click')
  });


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
  $('.currentSocialStreamBtns').live('click', toggleCurrentSocialSettings);
  $('.editSocialStream').live('click', showSocialStreams);


  // Edit Listing > Cancel

  $('#editListingCancel').live('click', cancelEditListing);
  $('#currentSocialModal .close').live('click', closeSocialContent);
  $('#currentSocialModal .closeModal').live('click', closeSocialContent);
  $('#currentSocialModal .saveEdits').live('click', saveSocialContent);

  $('#editListing .pubSaveListing').live('click', saveListingChanges);


  //--- New Listing View --- 'partials/_createListing.erb'
  
  $('.editNewSocialStream').live('click', showSocialStreams);
  $('#sideTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
})
  $('.pubSaveNewListing').live('click', pubSaveNewListing);
  $('.newSocialStreamBtns').live('click', toggleNewSocialSettings);


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

  function saveListingChanges(e) {
    //Save all of the user's changes - social context, input changes, etc.
    $(e.target).button('loading');
    $('.validateMsg').text('Validation message shown here if there are errors. Otherwise, this element is normally hidden.');
    
    //Time delay to fake saving of data, validation showing, etc.
    setTimeout(function() {
      //Ajax calls for submit/or save as draft depending on user selection. 
      
      //Reset the button state from loading to 'normal'
      $(e.target).button('reset');

      if(e.target.id == 'publishEdits')
        $('.listingStatus').text('Published');
      else
        $('.listingStatus').text('Draft');

      //On success, the user returns to the main listing view.
      $('#editListing').addClass('hide');
      $('#listing_ID').fadeIn();

      $('.individualBC').addClass('active').html('Individual listing title');
      $('.editBC').remove();
    }, 4000);
  }

  //--- New Listing View --- 'partials/_createListing.erb'

  function pubSaveNewListing(e) {
    e.preventDefault();

    //Loading state, validating state, etc
    $(e.target).button('loading');
    $('.pubSaveNewListing').die('click', pubSaveNewListing);
    $('.validateMsg').text('Validation message shown here if there are errors. Otherwise, this element is normally hidden.');
    
    //Time delay to fake saving of data, validation showing, etc.
    setTimeout(function() {
      //Ajax calls for submit/or save as draft depending on user selection. 
      
      //Reset the button state from loading to 'normal'
      $(e.target).button('reset');
      $('.pubSaveNewListing').live('click', pubSaveNewListing)

      //On success, the user stays on the same view - allows them to add more to their new listing/edit/etc.
      
    }, 4000);
  }

  function toggleCurrentSocialSettings(e) {
    e.preventDefault();

    if($(e.target).hasClass('btn-primary')) {
      $(e.target).parent().find('.editSocialStream').remove();
      $(e.target).removeClass('btn-primary');
      $(e.target).find('i').addClass('icon-ban-circle').removeClass('icon-ok icon-white');
    }
    else {
      $(e.target).parent().append('<button type="button" class="editSocialStream btn span3 pull-right">edit</button>');
      $(e.target).addClass('btn-primary');
      $(e.target).find('i').addClass('icon-ok icon-white').removeClass('icon-ban-circle');
    }
  }

  function toggleNewSocialSettings(e) {
    e.preventDefault();

    if($(e.target).hasClass('btn-primary')) {
      $(e.target).parent().find('.editNewSocialStream').remove();
      $(e.target).removeClass('btn-primary');
      $(e.target).find('i').addClass('icon-ban-circle').removeClass('icon-ok icon-white');
    }
    else {
      $(e.target).parent().append('<button type="button" class="editNewSocialStream btn span3 pull-right">edit</button>');
      $(e.target).addClass('btn-primary');
      $(e.target).find('i').addClass('icon-ok icon-white').removeClass('icon-ban-circle');
    }
  }

  //Side frame is shown, allowing the user to review their listing info, social stream specific
  function showSocialStreams(e) {
    e.preventDefault();

    $('#newStreamPanel').show();

    var newWidth = $('#rightSocialContent').width() + 'px';
    //var yPos = $('#createNew').offset().top;
    //var xPos = $('#rightSocialContent').offset().left;
    var newHeight = $(window).height() - 120;
    console.log(newHeight)
    $('#newStreamPanel').width(newWidth)
    $('#newStreamPanel').height(newHeight);
    $('#newStreamPanel').offset({ top: yPos, left: xPos })
    //$('#newStreamPanel').css('top: 200px');
    //$('#newStreamPanel').css('left:' + xPos);

    /*if($(e.target).hasClass('editNewSocialStream')) {
      //$('#newSocialModal').modal('show');
    }
    else {
      //$('#currentSocialModal').modal('show');
    }*/
  }

});