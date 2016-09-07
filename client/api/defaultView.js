Template.view.onRendered (function() {
  //$('select').material_select('destroy');
  $('.dropdown-button').dropdown({
           inDuration: 300,
           outDuration: 225,
           constrain_width: true,
           hover: false,
           gutter: 0,
           belowOrigin: false
           }
      );
      $('#member').dropdown({
               inDuration: 300,
               outDuration: 225,
               constrain_width: true,
               hover: false,
               gutter: 0,
               belowOrigin: false
               }
          );
          $('#about').dropdown({
                   inDuration: 300,
                   outDuration: 225,
                   constrain_width: true,
                   hover: false,
                   gutter: 0,
                   belowOrigin: false
                   }
              );
            
              $(".button-collapse").sideNav();
$('.collapsible').collapsible();
});
