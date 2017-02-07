// Copy to clipboard uses clipboard.js (https://clipboardjs.com/)
// and parts of Primer for tooltip support
var copyCode = {
  init: function() {
    $('.highlight pre').each(function() {
      var code = $(this);
      code.after('<span class="copy-to-clipboard">Copy</span>');
      code.on('mouseenter', function() {
        var copyBlock = $(this).next('.copy-to-clipboard');
        copyBlock.addClass('copy-active');
      });
      code.on('mouseleave', function() {
        var copyBlock = $(this).next('.copy-to-clipboard');
        copyBlock.removeClass('copy-active');
        copyBlock.html("Copy");
      });
    });
    var text, clip = new Clipboard('.copy-to-clipboard', {
        text: function(trigger) {
          return $(trigger).prev('pre').text();
        }
      });

      clip.on('success', function(e) {
        e.clearSelection();
        console.log("copied!");
        $(e.trigger).html("Copied!");
      });

      clip.on('error', function(e) {
        console.log("error: " + e);
      });
  },

  showTooltip: function(elem, msg) {
    $(elem).addClass('tooltipped tooltipped-nw');
    $(elem).attr('aria-label', msg);
  },

  fallbackMessage: function() {
    var actionMsg = '';
    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
      actionMsg = 'Press ⌘-C to copy';
    } else {
      actionMsg = 'Press Ctrl-C to copy';
    }
    return actionMsg;
  }
};

$(document).ready(copyCode.init);
