jQuery(document).ready(function ($) {

  var sourceTargetMap = Drupal.settings.sourceTargetMap;

  $("input[type=text]").focusout(function() {
    copyValueToTarget(this, sourceTargetMap);
  });

  $("textarea").focusout(function() {
    copyValueToTarget(this, sourceTargetMap);
  });

  $("select").change(function() {
    copyValueToTarget(this, sourceTargetMap);
  });

  $("input[type=checkbox]").change(function() {
    copyValueToTargetCheckbox(this, sourceTargetMap);
  });
  
  $("input[type=radio]").change(function() {
    copyValueToTargetRadio(this, sourceTargetMap);
  });

  function copyValueToTarget (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;
    var stArray = sourceTargetMap[fieldID];

    $.each(stArray, function (key, value) {
      $('[name="' + value + '"]').val($(fieldObj).val());
    });
  }

  function copyValueToTargetCheckbox (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;

    fieldObj = $(fieldObj);
    var isChecked = fieldObj.is(':checked');
    var checkboxVal = fieldObj.val();
    var parentDivID = fieldID.replace('-' + checkboxVal, '');

    if(sourceTargetMap[parentDivID]) {
      var stArray = sourceTargetMap[parentDivID];
      $.each(stArray, function (key, value) {
        value += '[' + checkboxVal + ']';
        $('[name="' + value + '"]').attr('checked', isChecked);
      });
    }
  }

  function copyValueToTargetRadio (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;

    fieldObj = $(fieldObj);
    var radioVal = fieldObj.val();
    var parentDivID = fieldID.replace('-' + radioVal, '');

    if(sourceTargetMap[parentDivID]) {
      var stArray = sourceTargetMap[parentDivID];
      $.each(stArray, function (key, value) {
        $('[name="' + value + '"]' + '[value=' + radioVal + ']').attr('checked', 'checked');
      });
    }
  }
});
