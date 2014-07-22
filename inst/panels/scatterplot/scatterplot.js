// Generated by CoffeeScript 1.7.1
var scatterplot;

scatterplot = function() {
  var axispos, chart, dataByInd, height, margin, nxticks, nyticks, pointcolor, pointsSelect, pointsize, pointstroke, rectcolor, rotate_ylab, title, titlepos, width, xNA, xlab, xlim, xscale, xticks, xvar, yNA, ylab, ylim, yscale, yticks, yvar;
  width = 800;
  height = 500;
  margin = {
    left: 60,
    top: 40,
    right: 40,
    bottom: 40,
    inner: 5
  };
  axispos = {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  titlepos = 20;
  xNA = {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  yNA = {
    handle: true,
    force: false,
    width: 15,
    gap: 10
  };
  xlim = null;
  ylim = null;
  nxticks = 5;
  xticks = null;
  nyticks = 5;
  yticks = null;
  rectcolor = "#e6e6e6";
  pointcolor = null;
  pointstroke = "black";
  pointsize = 3;
  title = "";
  xlab = "X";
  ylab = "Y";
  rotate_ylab = null;
  yscale = d3.scale.linear();
  xscale = d3.scale.linear();
  xvar = 0;
  yvar = 1;
  pointsSelect = null;
  dataByInd = true;
  chart = function(selection) {
    return selection.each(function(data) {
      var g, gEnter, group, i, indID, indtip, na_value, ngroup, panelheight, paneloffset, panelwidth, points, svg, titlegrp, x, xaxis, xrange, xs, y, yaxis, yrange, ys, _i, _ref, _ref1, _ref2, _results;
      if (dataByInd) {
        x = data.data.map(function(d) {
          return d[xvar];
        });
        y = data.data.map(function(d) {
          return d[yvar];
        });
      } else {
        x = data.data[xvar];
        y = data.data[yvar];
      }
      x = missing2null(x, ["NA", ""]);
      y = missing2null(y, ["NA", ""]);
      indID = (_ref = data != null ? data.indID : void 0) != null ? _ref : null;
      indID = indID != null ? indID : (function() {
        _results = [];
        for (var _i = 1, _ref1 = x.length; 1 <= _ref1 ? _i <= _ref1 : _i >= _ref1; 1 <= _ref1 ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this);
      group = (_ref2 = data != null ? data.group : void 0) != null ? _ref2 : (function() {
        var _j, _len, _results1;
        _results1 = [];
        for (_j = 0, _len = x.length; _j < _len; _j++) {
          i = x[_j];
          _results1.push(1);
        }
        return _results1;
      })();
      ngroup = d3.max(group);
      group = (function() {
        var _j, _len, _results1;
        _results1 = [];
        for (_j = 0, _len = group.length; _j < _len; _j++) {
          g = group[_j];
          _results1.push(g - 1);
        }
        return _results1;
      })();
      pointcolor = pointcolor != null ? pointcolor : selectGroupColors(ngroup, "dark");
      pointcolor = expand2vector(pointcolor, ngroup);
      if (x.every(function(v) {
        return (v != null) && !xNA.force;
      })) {
        xNA.handle = false;
      }
      if (y.every(function(v) {
        return (v != null) && !yNA.force;
      })) {
        yNA.handle = false;
      }
      if (xNA.handle) {
        paneloffset = xNA.width + xNA.gap;
        panelwidth = width - paneloffset;
      } else {
        paneloffset = 0;
        panelwidth = width;
      }
      if (yNA.handle) {
        panelheight = height - (yNA.width + yNA.gap);
      } else {
        panelheight = height;
      }
      xlim = xlim != null ? xlim : d3.extent(x);
      ylim = ylim != null ? ylim : d3.extent(y);
      na_value = d3.min(x.concat(y)) - 100;
      svg = d3.select(this).selectAll("svg").data([data]);
      gEnter = svg.enter().append("svg").append("g");
      svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
      g = svg.select("g");
      g.append("rect").attr("x", paneloffset + margin.left).attr("y", margin.top).attr("height", panelheight).attr("width", panelwidth).attr("fill", rectcolor).attr("stroke", "none");
      if (xNA.handle) {
        g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", panelheight).attr("width", xNA.width).attr("fill", rectcolor).attr("stroke", "none");
      }
      if (xNA.handle && yNA.handle) {
        g.append("rect").attr("x", margin.left).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", xNA.width).attr("fill", rectcolor).attr("stroke", "none");
      }
      if (yNA.handle) {
        g.append("rect").attr("x", margin.left + paneloffset).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", panelwidth).attr("fill", rectcolor).attr("stroke", "none");
      }
      xrange = [margin.left + paneloffset + margin.inner, margin.left + paneloffset + panelwidth - margin.inner];
      yrange = [margin.top + panelheight - margin.inner, margin.top + margin.inner];
      xscale.domain(xlim).range(xrange);
      yscale.domain(ylim).range(yrange);
      xs = d3.scale.linear().domain(xlim).range(xrange);
      ys = d3.scale.linear().domain(ylim).range(yrange);
      if (xNA.handle) {
        xscale.domain([na_value].concat(xlim)).range([margin.left + xNA.width / 2].concat(xrange));
        x = x.map(function(e) {
          if (e != null) {
            return e;
          } else {
            return na_value;
          }
        });
      }
      if (yNA.handle) {
        yscale.domain([na_value].concat(ylim)).range([height + margin.top - yNA.width / 2].concat(yrange));
        y = y.map(function(e) {
          if (e != null) {
            return e;
          } else {
            return na_value;
          }
        });
      }
      yticks = yticks != null ? yticks : ys.ticks(nyticks);
      xticks = xticks != null ? xticks : xs.ticks(nxticks);
      titlegrp = g.append("g").attr("class", "title").append("text").attr("x", margin.left + width / 2).attr("y", margin.top - titlepos).text(title);
      xaxis = g.append("g").attr("class", "x axis");
      xaxis.selectAll("empty").data(xticks).enter().append("line").attr("x1", function(d) {
        return xscale(d);
      }).attr("x2", function(d) {
        return xscale(d);
      }).attr("y1", margin.top).attr("y2", margin.top + height).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
      xaxis.selectAll("empty").data(xticks).enter().append("text").attr("x", function(d) {
        return xscale(d);
      }).attr("y", margin.top + height + axispos.xlabel).text(function(d) {
        return formatAxis(xticks)(d);
      });
      xaxis.append("text").attr("class", "title").attr("x", margin.left + width / 2).attr("y", margin.top + height + axispos.xtitle).text(xlab);
      if (xNA.handle) {
        xaxis.append("text").attr("x", margin.left + xNA.width / 2).attr("y", margin.top + height + axispos.xlabel).text("N/A");
      }
      rotate_ylab = rotate_ylab != null ? rotate_ylab : ylab.length > 1;
      yaxis = g.append("g").attr("class", "y axis");
      yaxis.selectAll("empty").data(yticks).enter().append("line").attr("y1", function(d) {
        return yscale(d);
      }).attr("y2", function(d) {
        return yscale(d);
      }).attr("x1", margin.left).attr("x2", margin.left + width).attr("fill", "none").attr("stroke", "white").attr("stroke-width", 1).style("pointer-events", "none");
      yaxis.selectAll("empty").data(yticks).enter().append("text").attr("y", function(d) {
        return yscale(d);
      }).attr("x", margin.left - axispos.ylabel).text(function(d) {
        return formatAxis(yticks)(d);
      });
      yaxis.append("text").attr("class", "title").attr("y", margin.top + height / 2).attr("x", margin.left - axispos.ytitle).text(ylab).attr("transform", rotate_ylab ? "rotate(270," + (margin.left - axispos.ytitle) + "," + (margin.top + height / 2) + ")" : "");
      if (yNA.handle) {
        yaxis.append("text").attr("x", margin.left - axispos.ylabel).attr("y", margin.top + height - yNA.width / 2).text("N/A");
      }
      indtip = d3.tip().attr('class', 'd3-tip').html(function(d, i) {
        return indID[i];
      }).direction('e').offset([0, 10]);
      svg.call(indtip);
      points = g.append("g").attr("id", "points");
      pointsSelect = points.selectAll("empty").data(d3.range(x.length)).enter().append("circle").attr("cx", function(d, i) {
        return xscale(x[i]);
      }).attr("cy", function(d, i) {
        return yscale(y[i]);
      }).attr("class", function(d, i) {
        return "pt" + i;
      }).attr("r", pointsize).attr("fill", function(d, i) {
        return pointcolor[group[i]];
      }).attr("stroke", pointstroke).attr("stroke-width", "1").attr("opacity", function(d, i) {
        if (((x[i] != null) || xNA.handle) && ((y[i] != null) || yNA.handle)) {
          return 1;
        }
        return 0;
      }).on("mouseover.paneltip", indtip.show).on("mouseout.paneltip", indtip.hide);
      g.append("rect").attr("x", margin.left + paneloffset).attr("y", margin.top).attr("height", panelheight).attr("width", panelwidth).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      if (xNA.handle) {
        g.append("rect").attr("x", margin.left).attr("y", margin.top).attr("height", panelheight).attr("width", xNA.width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      }
      if (xNA.handle && yNA.handle) {
        g.append("rect").attr("x", margin.left).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", xNA.width).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      }
      if (yNA.handle) {
        return g.append("rect").attr("x", margin.left + paneloffset).attr("y", margin.top + height - yNA.width).attr("height", yNA.width).attr("width", panelwidth).attr("fill", "none").attr("stroke", "black").attr("stroke-width", "none");
      }
    });
  };
  chart.width = function(value) {
    if (!arguments.length) {
      return width;
    }
    width = value;
    return chart;
  };
  chart.height = function(value) {
    if (!arguments.length) {
      return height;
    }
    height = value;
    return chart;
  };
  chart.margin = function(value) {
    if (!arguments.length) {
      return margin;
    }
    margin = value;
    return chart;
  };
  chart.axispos = function(value) {
    if (!arguments.length) {
      return axispos;
    }
    axispos = value;
    return chart;
  };
  chart.titlepos = function(value) {
    if (!arguments.length) {
      return titlepos;
    }
    titlepos;
    return chart;
  };
  chart.xlim = function(value) {
    if (!arguments.length) {
      return xlim;
    }
    xlim = value;
    return chart;
  };
  chart.nxticks = function(value) {
    if (!arguments.length) {
      return nxticks;
    }
    nxticks = value;
    return chart;
  };
  chart.xticks = function(value) {
    if (!arguments.length) {
      return xticks;
    }
    xticks = value;
    return chart;
  };
  chart.ylim = function(value) {
    if (!arguments.length) {
      return ylim;
    }
    ylim = value;
    return chart;
  };
  chart.nyticks = function(value) {
    if (!arguments.length) {
      return nyticks;
    }
    nyticks = value;
    return chart;
  };
  chart.yticks = function(value) {
    if (!arguments.length) {
      return yticks;
    }
    yticks = value;
    return chart;
  };
  chart.rectcolor = function(value) {
    if (!arguments.length) {
      return rectcolor;
    }
    rectcolor = value;
    return chart;
  };
  chart.pointcolor = function(value) {
    if (!arguments.length) {
      return pointcolor;
    }
    pointcolor = value;
    return chart;
  };
  chart.pointsize = function(value) {
    if (!arguments.length) {
      return pointsize;
    }
    pointsize = value;
    return chart;
  };
  chart.pointstroke = function(value) {
    if (!arguments.length) {
      return pointstroke;
    }
    pointstroke = value;
    return chart;
  };
  chart.dataByInd = function(value) {
    if (!arguments.length) {
      return dataByInd;
    }
    dataByInd = value;
    return chart;
  };
  chart.title = function(value) {
    if (!arguments.length) {
      return title;
    }
    title = value;
    return chart;
  };
  chart.xlab = function(value) {
    if (!arguments.length) {
      return xlab;
    }
    xlab = value;
    return chart;
  };
  chart.ylab = function(value) {
    if (!arguments.length) {
      return ylab;
    }
    ylab = value;
    return chart;
  };
  chart.rotate_ylab = function(value) {
    if (!arguments.length) {
      return rotate_ylab;
    }
    rotate_ylab = value;
    return chart;
  };
  chart.xvar = function(value) {
    if (!arguments.length) {
      return xvar;
    }
    xvar = value;
    return chart;
  };
  chart.yvar = function(value) {
    if (!arguments.length) {
      return yvar;
    }
    yvar = value;
    return chart;
  };
  chart.xNA = function(value) {
    if (!arguments.length) {
      return xNA;
    }
    xNA = value;
    return chart;
  };
  chart.yNA = function(value) {
    if (!arguments.length) {
      return yNA;
    }
    yNA = value;
    return chart;
  };
  chart.yscale = function() {
    return yscale;
  };
  chart.xscale = function() {
    return xscale;
  };
  chart.pointsSelect = function() {
    return pointsSelect;
  };
  return chart;
};
