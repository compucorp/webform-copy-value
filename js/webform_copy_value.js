jQuery(document).ready(function ($) {
  //console.log();
  var sourceTargetMap = Drupal.settings.sourceTargetMap;
  var cid = "";
  var source = "";
  var target = "";

  console.log(sourceTargetMap);
  $.each(sourceTargetMap, function (key, value) {
    source = key;
    
    $('[id*="'+source+'"]').focusout(function(){
      $.each(value, function(id, target){
        $('[id*="'+target+'"]').val($('[id*="'+source+'"]').val());
      });
    })
  });
});
