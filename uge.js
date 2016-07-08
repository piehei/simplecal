


function dr () {

    var start = new Date(2012, 0, 15);
    var end   = new Date(2012, 4, 23);
    var dr = moment.range(start, end);

    console.log(dr);

    dr.by('days', function(moment) {
        console.log(moment);
    });

}