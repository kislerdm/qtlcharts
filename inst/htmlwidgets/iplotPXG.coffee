# iplotPXG: (just barely) interactive plot of phenotype vs genotype
# Karl W Broman

HTMLWidgets.widget({

    name: "iplotPXG",
    type: "output",

    initialize: (widgetdiv, width, height) ->
        d3.select(widgetdiv).append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "qtlcharts")

    renderValue: (widgetdiv, x) ->

        svg = d3.select(widgetdiv).select("svg")
        svg.selectAll("*").remove() # clear svg

        chartOpts = x.chartOpts ? [ ]
        chartOpts.width = chartOpts?.width ? svg.attr("width")
        chartOpts.height = chartOpts?.height ? svg.attr("height")

        svg.attr("width", chartOpts.width)
        svg.attr("height", chartOpts.height)

        iplotPXG(widgetdiv, x.data, chartOpts)

    resize: (widgetdiv, width, height) ->
        d3.select(widgetdiv).select("svg")
          .attr("width", width)
          .attr("height", height)

})
