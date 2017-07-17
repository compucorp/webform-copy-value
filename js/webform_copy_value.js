jQuery(document).ready(function ($) {

  var sourceTargetMap = Drupal.settings.sourceTargetMap;

  $("input[type=text]").focusout(function() {
    copyValueToTarget(this, sourceTargetMap);
  });

   $("input[type=file]").change(function() {
    copyValueToTargetFileField(this, sourceTargetMap);
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
    var sourceValue = $(fieldObj).val()
    if(stArray) {
      $.each(stArray, function (key, value) {
        if($.isArray(sourceValue)){
          $('[name="' + value + '[]"]').val(sourceValue).trigger('change');
        } else {
          $('[name="' + value + '"]').val(sourceValue).trigger('change');
        }
      });
    }
  }

  function copyValueToTargetCheckbox (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;

    fieldObj = $(fieldObj);
    var isChecked = fieldObj.is(':checked');
    var checkboxVal = fieldObj.val();
    var parentDivID = fieldID.replace(new RegExp('-' + checkboxVal + '$'), '');

    if(sourceTargetMap[parentDivID]) {
      var stArray = sourceTargetMap[parentDivID];
      $.each(stArray, function (key, value) {
        value += '[' + checkboxVal + ']';
        $('[name="' + value + '"]').prop('checked', isChecked);
      });
    }
  }

  function copyValueToTargetRadio (fieldObj, sourceTargetMap) {
    var fieldID = fieldObj.id;
    fieldObj = $(fieldObj);
    var radioVal = fieldObj.val();
    var parentDivID = fieldID.replace(new RegExp('-' + radioVal + '$'), '');
    if(sourceTargetMap[parentDivID]) {
      var stArray = sourceTargetMap[parentDivID];
      $.each(stArray, function (key, value) {
        $('input:radio[name="' + value + '"]' + '[value=' + radioVal + ']').prop('checked', 'checked');
      });
    }
  }
});
