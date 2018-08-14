$('p,div,span,label,table').bind('mousedown', function (e) {
  var e = e || window.event;
  if (e.button == 1) {
    e.stopPropagation();
    e.preventDefault();
    zoom.to({element:e.target,duration:400});
  }
});
