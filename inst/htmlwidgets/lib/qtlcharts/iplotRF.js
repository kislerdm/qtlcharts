// Generated by CoffeeScript 1.9.0
var iplotRF;

iplotRF = function(el, rf_data, geno, chartOpts) {
  var axispos, bordercolor, cellHeight, cellPad, cellWidth, cells, celltip, chartdivid, chrGap, chrtype, col, colors, create_crosstab, create_scan, crosstab_height, crosstab_width, crosstab_xpos, crosstab_ypos, darkrect, fontsize, g_crosstab, g_heatmap, g_scans, hbot, heatmap_height, heatmap_width, hilitcolor, htop, lightrect, lodlim, margin, max_ngeno, mychrheatmap, nullcolor, oneAtTop, pixelPerCell, pointcolor, pointsize, pointstroke, row, svg, totalh, totalw, totmar, w, wbot, _i, _j, _k, _l, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref2, _ref20, _ref21, _ref22, _ref23, _ref24, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9;
  pixelPerCell = (_ref = chartOpts != null ? chartOpts.pixelPerCell : void 0) != null ? _ref : null;
  chrGap = (_ref1 = chartOpts != null ? chartOpts.chrGap : void 0) != null ? _ref1 : 2;
  cellHeight = (_ref2 = chartOpts != null ? chartOpts.cellHeight : void 0) != null ? _ref2 : 30;
  cellWidth = (_ref3 = chartOpts != null ? chartOpts.cellWidth : void 0) != null ? _ref3 : 80;
  cellPad = (_ref4 = chartOpts != null ? chartOpts.cellPad : void 0) != null ? _ref4 : 20;
  hbot = (_ref5 = chartOpts != null ? chartOpts.hbot : void 0) != null ? _ref5 : 300;
  fontsize = (_ref6 = chartOpts != null ? chartOpts.fontsize : void 0) != null ? _ref6 : cellHeight * 0.7;
  margin = (_ref7 = chartOpts != null ? chartOpts.margin : void 0) != null ? _ref7 : {
    left: 60,
    top: 30,
    right: 10,
    bottom: 40,
    inner: 5
  };
  axispos = (_ref8 = chartOpts != null ? chartOpts.axispos : void 0) != null ? _ref8 : {
    xtitle: 25,
    ytitle: 30,
    xlabel: 5,
    ylabel: 5
  };
  lightrect = (_ref9 = chartOpts != null ? chartOpts.lightrect : void 0) != null ? _ref9 : "#e6e6e6";
  darkrect = (_ref10 = chartOpts != null ? chartOpts.darkrect : void 0) != null ? _ref10 : "#c8c8c8";
  hilitcolor = (_ref11 = chartOpts != null ? chartOpts.hilitcolor : void 0) != null ? _ref11 : "#e9cfec";
  nullcolor = (_ref12 = chartOpts != null ? chartOpts.nullcolor : void 0) != null ? _ref12 : "#e6e6e6";
  bordercolor = (_ref13 = chartOpts != null ? chartOpts.bordercolor : void 0) != null ? _ref13 : "black";
  pointsize = (_ref14 = chartOpts != null ? chartOpts.pointsize : void 0) != null ? _ref14 : 2;
  pointcolor = (_ref15 = chartOpts != null ? chartOpts.pointcolor : void 0) != null ? _ref15 : "slateblue";
  pointstroke = (_ref16 = chartOpts != null ? chartOpts.pointstroke : void 0) != null ? _ref16 : "black";
  colors = (_ref17 = chartOpts != null ? chartOpts.colors : void 0) != null ? _ref17 : ["crimson", "white", "slateblue"];
  lodlim = (_ref18 = chartOpts != null ? chartOpts.lodlim : void 0) != null ? _ref18 : [0, 12];
  oneAtTop = (_ref19 = chartOpts != null ? chartOpts.oneAtTop : void 0) != null ? _ref19 : false;
  chartdivid = (_ref20 = chartOpts != null ? chartOpts.chartdivid : void 0) != null ? _ref20 : 'chart';
  totmar = sumArray(rf_data.nmar);
  if (pixelPerCell == null) {
    pixelPerCell = d3.max([2, Math.floor(600 / totmar)]);
  }
  w = chrGap * rf_data.chrnames.length + pixelPerCell * totmar;
  heatmap_width = w + margin.left + margin.right;
  heatmap_height = w + margin.top + margin.bottom;
  max_ngeno = d3.max((function() {
    var _results;
    _results = [];
    for (chrtype in geno.genocat) {
      _results.push(geno.genocat[chrtype].length);
    }
    return _results;
  })());
  crosstab_width = cellWidth * (max_ngeno + 2) + margin.left + margin.right;
  crosstab_height = cellHeight * (max_ngeno + 3) + margin.top + margin.bottom;
  crosstab_xpos = heatmap_width;
  crosstab_ypos = (heatmap_height - crosstab_height) / 2 - margin.top;
  if (crosstab_ypos < 0) {
    crosstab_ypos = 0;
  }
  wbot = (heatmap_width + crosstab_width) / 2;
  totalw = heatmap_width + crosstab_width;
  htop = d3.max([heatmap_height, crosstab_height]);
  totalh = htop + hbot;
  console.log("width: " + totalw + ", height: " + totalh);
  d3.select(el).style("height", totalh + "px").style("width", totalw + "px");
  console.log(el);
  svg = d3.select(el).select("svg").attr("height", totalh).attr("width", totalw);
  if (d3.min(lodlim) < 0) {
    displayError("lodlim values must be non-negative; ignored", "error_" + chartdivid);
    lodlim = [2, 12];
  }
  if (lodlim[0] >= lodlim[1]) {
    displayError("lodlim[0] must be < lodlim[1]; ignored", "error_" + chartdivid);
    lodlim = [2, 12];
  }
  rf_data.z = rf_data.rf.map(function(d) {
    return d.map(function(dd) {
      return dd;
    });
  });
  for (row = _i = 0, _ref21 = rf_data.z.length; 0 <= _ref21 ? _i < _ref21 : _i > _ref21; row = 0 <= _ref21 ? ++_i : --_i) {
    for (col = _j = 0, _ref22 = rf_data.z.length; 0 <= _ref22 ? _j < _ref22 : _j > _ref22; col = 0 <= _ref22 ? ++_j : --_j) {
      if (row > col) {
        rf_data.z[row][col] = rf_data.z[col][row];
      }
    }
  }
  for (row = _k = 0, _ref23 = rf_data.z.length; 0 <= _ref23 ? _k < _ref23 : _k > _ref23; row = 0 <= _ref23 ? ++_k : --_k) {
    for (col = _l = 0, _ref24 = rf_data.z.length; 0 <= _ref24 ? _l < _ref24 : _l > _ref24; col = 0 <= _ref24 ? ++_l : --_l) {
      if (row === col || ((rf_data.z[row][col] != null) && rf_data.z[row][col] > lodlim[1])) {
        rf_data.z[row][col] = lodlim[1];
      }
      if (row > col && rf_data.rf[row][col] > 0.5) {
        rf_data.z[row][col] = -rf_data.z[row][col];
      }
      if (col > row && rf_data.rf[col][row] > 0.5) {
        rf_data.z[row][col] = -rf_data.z[row][col];
      }
    }
  }
  mychrheatmap = chrheatmap().pixelPerCell(pixelPerCell).chrGap(chrGap).axispos(axispos).rectcolor(lightrect).nullcolor(nullcolor).bordercolor(bordercolor).colors(colors).zthresh(lodlim[0]).oneAtTop(oneAtTop).hover(false);
  g_heatmap = svg.append("g").attr("id", "chrheatmap").datum(rf_data).call(mychrheatmap);
  g_crosstab = null;
  g_scans = [null, null];
  create_crosstab = function(marker1, marker2) {
    var data, mycrosstab;
    data = {
      x: geno.geno[marker1],
      y: geno.geno[marker2],
      xcat: geno.genocat[geno.chrtype[marker1]],
      ycat: geno.genocat[geno.chrtype[marker2]],
      xlabel: marker1,
      ylabel: marker2
    };
    if (g_crosstab != null) {
      g_crosstab.remove();
    }
    mycrosstab = crosstab().cellHeight(cellHeight).cellWidth(cellWidth).cellPad(cellPad).margin(margin).fontsize(fontsize).rectcolor(lightrect).hilitcolor(hilitcolor).bordercolor(bordercolor);
    return g_crosstab = svg.append("g").attr("id", "crosstab").attr("transform", "translate(" + crosstab_xpos + ", " + crosstab_ypos + ")").datum(data).call(mycrosstab);
  };
  create_scan = function(markerindex, panelindex) {
    var data, i, mylodchart, _m, _ref25;
    data = {
      chrnames: rf_data.chrnames,
      lodnames: ["lod"],
      chr: rf_data.chr,
      pos: rf_data.pos,
      lod: (function() {
        var _results;
        _results = [];
        for (i in rf_data.pos) {
          _results.push(i);
        }
        return _results;
      })(),
      markernames: rf_data.labels
    };
    for (row = _m = 0, _ref25 = rf_data.rf.length; 0 <= _ref25 ? _m < _ref25 : _m > _ref25; row = 0 <= _ref25 ? ++_m : --_m) {
      if (row > markerindex) {
        data.lod[row] = rf_data.rf[markerindex][row];
      } else if (row < markerindex) {
        data.lod[row] = rf_data.rf[row][markerindex];
      }
    }
    data.lod[markerindex] = null;
    if (g_scans[panelindex] != null) {
      g_scans[panelindex].remove();
    }
    mylodchart = lodchart().height(hbot - margin.top - margin.bottom).width(wbot - margin.left - margin.right).margin(margin).axispos(axispos).ylim([0.0, d3.max(data.lod)]).lightrect(lightrect).darkrect(darkrect).linewidth(0).linecolor("").pointsize(pointsize).pointcolor(pointcolor).pointstroke(pointstroke).lodvarname("lod").title(data.markernames[markerindex]);
    g_scans[panelindex] = svg.append("g").attr("id", "lod_rf_" + (panelindex + 1)).attr("transform", "translate(" + (wbot * panelindex) + ", " + htop + ")").datum(data).call(mylodchart);
    return mylodchart.markerSelect().on("click", function(d) {
      var newmarker;
      newmarker = d.name;
      if (panelindex === 0) {
        create_crosstab(rf_data.labels[markerindex], newmarker);
      } else {
        create_crosstab(newmarker, rf_data.labels[markerindex]);
      }
      return create_scan(rf_data.labels.indexOf(newmarker), 1 - panelindex);
    });
  };
  celltip = d3.tip().attr('class', 'd3-tip').html(function(d) {
    var lod, mari, marj, rf;
    mari = rf_data.labels[d.i];
    marj = rf_data.labels[d.j];
    if (+d.i > +d.j) {
      rf = rf_data.rf[d.i][d.j];
      lod = rf_data.rf[d.j][d.i];
    } else if (+d.j > +d.i) {
      rf = rf_data.rf[d.j][d.i];
      lod = rf_data.rf[d.i][d.j];
    } else {
      return mari;
    }
    rf = rf >= 0.1 ? d3.format(".2f")(rf) : d3.format(".3f")(rf);
    if (d.i === d.j) {
      return mari;
    }
    return "(" + mari + " " + marj + "), LOD = " + (d3.format(".1f")(lod)) + ", rf = " + rf;
  }).direction('e').offset([0, 10]);
  svg.call(celltip);
  cells = mychrheatmap.cellSelect();
  return cells.on("mouseover", function(d) {
    return celltip.show(d);
  }).on("mouseout", function() {
    return celltip.hide();
  }).on("click", function(d) {
    create_crosstab(rf_data.labels[d.j], rf_data.labels[d.i]);
    create_scan(d.i, 0);
    if (d.i !== d.j) {
      return create_scan(d.j, 1);
    } else {
      g_scans[1].remove();
      return g_scans[1] = null;
    }
  });
};
