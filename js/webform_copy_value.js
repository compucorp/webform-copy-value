jQuery(document).ready(function ($) {

  var sourceTargetMap = Drupal.settings.sourceTargetMap;

  $("input[type=text]").focusout(function() {
    copyValueToTarget(this, sourceTargetMap);
  });
  
  $("select").change(function() {
    copyValueToTarget(this, sourceTargetMap);
  });
  
  function copyValueToTarget (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;
    var stArray = sourceTargetMap[fieldID];

    $.each(stArray, function (key, value) {
      $('#' + value).val($(fieldObj).val());
    });
  }
});
