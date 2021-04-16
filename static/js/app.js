// build the metadata table 
function buildTable(sample){
    d3.json("data/samples.json").then(data =>{
        // console.log(data);
        // sample = 940;
        var metaData = data.metadata;
        var results = metaData.filter(d => d.id == sample);
        var finalResult = results[0];
        var demoData = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            demoData.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

// initalize function drop down menu
function init(){
    var dropDown = d3.select("#selDataset");
    d3.json("data/samples.json").then(data =>{
        var names = data.names;
        // console.log(names)
        names.forEach(sample => {
            dropDown.append("option")
            .text(sample)
            .property("value",sample);
        });
        var firstSample = names[0];
        console.log(firstSample);
        buildTable(firstSample);
    });
}

// builds horizontal bar chart and bubble chart
function buildCharts(sample){
    d3.json("data/samples.json").then(data =>{
        var samples = data.samples;
        var results = samples.filter(d => d.id == sample);
        var finalResult = results[0];
        console.log(finalResult);

        // variables for the graph info
        var otuIds = finalResult.otu_ids;
        var sampleValues = finalResult.sample_values;
        var otuLabels = finalResult.otu_labels;

        // sliced Top 10 variables for bar/bubble
        var sliceIds = otuIds.slice(0,10);
        var sliceValues = sampleValues.slice(0,10);
        var sliceLabels = otuLabelss.slice(0,10);


        // slice data for the bar/bubble TRACE1
        var trace1 = {
            x: sliceIds.reverse(),
            y: sliceValues.reverse(),
            text: sliceLabels.reverse(),
            type: "bar",
            orientation: "h",
        };
        var barChart = [trace1];

        var layout = {
            title: "Top 10 OTUs",
            height: 600,
            width: 1000,
        };

        // barchart!
        Plotly.plotBar("bar", barChart, layout);

}


function optionChanged(name){
    buildTable(name);
};

init();