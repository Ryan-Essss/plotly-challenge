// build the metadata table
function buildTable(sample){
    d3.json("../data/samples.json").then(data =>{
        // console.log(data);
        // sample = 940;
        var metaData = data.metadata;
        var results = metaData.filter(d => d.id === sample);
        var finalResult = results[0];
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(finalResult).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`)
        });
        console.log(finalResult);
    })
};

// initalize the demographics table
function init(){
    var dropDown = d3.select("#selDataset");
    d3.json("../data/samples.json").then(data =>{
        var names = data.names;
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

function optionChanged(name){
    buildTable(name);
};

init();