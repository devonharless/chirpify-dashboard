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

  $(document).click(function(e) {
    $('#receiptList .individualReceipt .receiptExtras .viewMore').popover('hide');
  });


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
    $('#socialNavBtn').trigger('click');
  });

  var receiptNameAddress = '<div class="controls"><address><strong>User Name</strong><br>795 Folsom Ave, Suite 600<br>San Francisco, CA 94107<br></address></div>';
  var receiptControls = '<div class="controls controls-row"><button type="button" class="downloadFile btn btn-success btn-small">Download file</button> <button type="button" class="deleteReceipt btn btn-small">Delete receipt</button></div>'
  var receiptContent = receiptNameAddress + receiptControls;
  //--- Listing View --- 'listingContent.erb' & partials/_listings.erb' & 'partials/_listingFilters.erb'
  $('#receiptList .individualReceipt .receiptExtras .viewMore').click(function(event){
       event.stopPropagation();
   });

  $('#receiptList .individualReceipt .receiptExtras .viewMore').popover({
    toggle: true,
    trigger: 'click',
    title: 'Purchased by <a href="#">UserName</a>',
    content: receiptContent,
    html: true,
    placement: 'top'
  });


  //--- Listing View --- 'listingContent.erb' & partials/_listings.erb' & 'partials/_listingFilters.erb'

  // Show an individual listing after user selection of a receipt
  $('#listingList .individualListing').click(function (e) {
    e.preventDefault();

    //show an individual listing & hide the main receipt/listing
    $('#listings').removeClass('active');
    $('#individualListingPage').addClass('active');
  
  });

  $('.returnToListings').click(function (e) {
    e.preventDefault();

    //show an individual listing & hide the main receipt/listing
    $('#listings').addClass('active');
    $('#individualListingPage').removeClass('active');

    $('#listing_ID').show();
    $('#editListing').hide();

    $('.individualBC').addClass('active').html('Individual listing title');
    $('.editBC').remove();
  
  });

  // Individual Listing > Edit Listing

  $('#editListingBtn').live('click', editIndividualListing);
  $('.individualBC').live('click', cancelEditListing);
  $('.currentSocialStreamBtns').live('click', toggleCurrentSocialSettings);
  $('.editSocialStream').live('click', showSocialStreams);
  
  $('.deleteListing').click(function (e) {
    e.preventDefault();
    $(e.target).button('loading');
    //delete listing and return to the main listing view
    setTimeout(function() {
      $('#listings').addClass('active');
      $('#individualListingPage').removeClass('active');
      $('#editListing').hide();
      $('#listing_ID').show();

      $('.individualBC').addClass('active').html('Individual listing title');
      $('.editBC').remove();
      //Reset the button state from loading to 'normal'
      $(e.target).button('reset');
      
    }, 4000);
  
  });


  // Edit Listing > Cancel

  $('#editListingCancel').live('click', cancelEditListing);
  $('#currentSocialModal .close').live('click', closeSocialContent);
  $('#currentSocialModal .closeModal').live('click', closeSocialContent);
  $('#currentSocialModal .saveEdits').live('click', saveSocialContent);

  $('#editListing .pubSaveListing').live('click', saveListingChanges);


  //--- New Listing View --- 'partials/_createListing.erb'
  
  $('#sideTabs a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  $('.editNewSocialStream').live('click', showSocialStreams);
  $('.closePanel').live('click', dismissStreamChanges);
  $('.savePanelChanges').live('click', saveStreamChanges);
  $('.pubSaveNewListing').live('click', pubSaveNewListing);

  $('.typeToggle').live('click', toggleUpload);
  $('.newSocialStreamBtns').live('click', toggleNewSocialSettings);


  /*------------------------------------------------------------------
  [3. View-specific functions ]
  */


  //--- Individual Listing View --- 'modals/individualListing.erb'

  function editIndividualListing(e) {
    e.preventDefault();

    //User intends to edit their pre-existing listing after reviewing their receipt info
    //View swaps to a view similars to 'partials/creatListing.erb', content in inputs, form, etc.
    
    $('#listing_ID').hide();
    $('#editListing').show();

    $('.individualBC').removeClass('active').html('<li><a href="#">Individual listing title</a> <span class="divider">/</span></li>');
    $('#individualListingPage .flowRef').append('<li class="editBC active">Edit listing</li>');
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

  //--- Edit Individual Listing View / Cancel --- 'shared/individualListing.erb'

  function cancelEditListing(e) {
    //Cancel editing an individual listing - return to the individual listing in passive viewing mode
    $('#editListing').hide();
    $('#listing_ID').show();

    $('.individualBC').addClass('active').html('Individual listing title');
    $('.editBC').hide();
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
      $('#editListing').hide();
      $('#listing_ID').show();

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
      $(e.target).parent().find('.editSocialStream').hide();
      $(e.target).removeClass('btn-primary');
      $(e.target).find('i').addClass('icon-ban-circle').removeClass('icon-ok icon-white');
    }
    else {
      //$(e.target).parent().append('<button type="button" class="editSocialStream btn span3 pull-right">edit</button>');
      $(e.target).addClass('btn-primary');
      $(e.target).find('i').addClass('icon-ok icon-white').removeClass('icon-ban-circle');
    }
  }

  function toggleNewSocialSettings(e) {
    e.preventDefault();

    if($(e.target).hasClass('btn-primary')) {
      $(e.target).parent().find('.editNewSocialStream').hide();
      $(e.target).removeClass('btn-primary');
      $(e.target).find('i').addClass('icon-ban-circle').removeClass('icon-ok icon-white');
    }
    else {
      $(e.target).parent().find('.editNewSocialStream').show();
      $(e.target).addClass('btn-primary');
      $(e.target).find('i').addClass('icon-ok icon-white').removeClass('icon-ban-circle');
    }
  }

  function toggleUpload(e) {
    e.preventDefault();

    if($(e.target).hasClass('typeDigital')) 
      $('.uploadFile').show();
    else
      $('.uploadFile').hide();
  }

  //Side frame is shown, allowing the user to review their listing info, social stream specific
  function showSocialStreams(e) {
    e.preventDefault();

    console.log('TEST')
    $('.socialStreamPanel').show();

    //Show the correct tab based on the which edit btn the user clicked
    var shownTabId = '#' + $(e.target).attr('id');
   
    $('#sideTabs').find('li a[href="'+shownTabId+'"]').parent().removeClass('hide');
    $('#sideTabs').find('li a[href="'+shownTabId+'"]').trigger('click');
  
    //var newWidth = $('#rightSocialContent').width() + 'px';
    if($(window).width() > 1200)
      var newWidth = $('.rightSocialContent').width() + 'px';
    else
      var newWidth = $(window).width() / 3 + 'px';

    $('.socialStreamPanel').width(newWidth)
  }

  function dismissStreamChanges(e) {
    $('.socialStreamPanel').hide();
  }

  function saveStreamChanges(e) {
    e.preventDefault();
    
    //Saving state, validating state, etc
    $(e.target).addClass('disabled');
    $('.validateMsg').text('Validation message shown here if there are errors. Otherwise, this element is normally hidden.');
    
    //Time delay to fake saving of data, validation showing, etc.
    setTimeout(function() {
      //Store user's social stream changes for their new listing
      
      //On success, the user returns to the edit view - social stream panel hides
      $(e.target).removeClass('disabled');
      $('.socialStreamPanel').hide();
    }, 4000);
  }

});