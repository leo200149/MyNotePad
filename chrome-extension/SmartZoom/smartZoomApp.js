$(document).ready(function () {
  var currentZoomElement;
  var body = $(document.body);
  $('p,div,span,label,table').bind('mousedown', function (e) {
    var e = e || window.event;
    if (e.button == 1) {
      e.stopPropagation();
      e.preventDefault();
      console.log(currentZoomElement);
      if (currentZoomElement != null) {
        currentZoomElement.zoomTo({ targetsize: 1, scalemode: 'width', duration: 100, closeclick: true });
        currentZoomElement = null;
      } else {
        var element = $(this);
        console.log(element);
        if(element!=null && element.text().length>0 &&element.context != body.context){
          element.zoomTo({ targetsize: 1, scalemode: 'width', duration: 100, closeclick: true, root: $(document.body) });
          currentZoomElement = body;
        }
      }
      $('.noScroll').removeClass('noScroll');
    }
  });
});
