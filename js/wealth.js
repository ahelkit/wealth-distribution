Raphael.fn.pieChart = function (cx, cy, r, values, labels, stroke, initialState) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            if (!initialState) {
                var color = Raphael.hsb(start, .75, 1);
                var bcolor = Raphael.hsb(start, 1, 1);
            } else { 
                var color = Raphael.hsb(start, 0, .84);
                var bcolor = Raphael.hsb(start, 0, .84);
            }
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                ms = 500,
                delta = 30,
                p = sector(cx, cy, r, angle, angle + angleplus, {fill: "90-" + bcolor + "-" + color, stroke: stroke, "stroke-width": 3}),
                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");
                txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};

$(function () {
  $("input").change(function() {
    var values = [0,0,0,0,0],
    labels = [];
    $("#page-"+wealth.page+" input[type=text]").each(function (i) {
      if ($(this).val() !== "") {
        values[i] = parseInt($(this).val());
      } 
      labels.push($(this).attr("id"));
    });
    $("#pie-chart-"+wealth.page).empty();
    Raphael("pie-chart-"+wealth.page, 700, 700).pieChart(350, 350, 200, values, labels, "#fff", false);
  });
  $("button.submit-cont").click(wealth.submitPage);
  $(".goback").click(wealth.goBack);
  Raphael("pie-chart-0", 700, 700).pieChart(350, 350, 200, [100, .01], ["",""], "#fff", true);
  Raphael("pie-chart-1", 700, 700).pieChart(350, 350, 200, [100, .01], ["",""], "#fff", true);
  //Raphael("pie-chart-2", 700, 700).pieChart(350, 350, 200, [100, .01], ["",""], "#fff", true);



});

var wealth = {
  page:0,
  wealthPercentages: {},
  submitPage : function(ev){
    // once the page is submitted move on to the next page
    ev.preventDefault();
    $("#page-"+wealth.page).fadeOut("fast",function(){
      wealth.page++;
      $("#page-"+wealth.page).fadeIn();
    });


  },
  goBack: function(ev){
    // go back to the previous page.
    ev.preventDefault();
    $("#page-"+wealth.page).fadeOut("fast",function(){
      wealth.page--;
      $("#page-"+wealth.page).fadeIn("fast");
    });


  },
  sendData: function(){
    // Now that we collected all the data, send it to the server

  }

};

