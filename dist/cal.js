


console.log('cal.js');


var app = {
    now: {
        day: '',
        week: '',
        date: '',
        year: '',
        obj: {}
    },
    weeks: {},
    vue: {},
    ui: { showWeeks: 8, firstWeek: 0, controlWeek: 0 }
}


function initVariables() {
    console.log('FUNC: initVariables');

    var today = moment().hours(00).minutes(00);

    app.now.obj = today;
    app.now.day = today.day();
    app.now.week = today.week();
    app.now.month = today.month() + 1;
    app.now.date = today.date();
    app.now.year = today.year();

    app.now.firstDayOfCurrentMObject = moment(today).subtract(today.date() - 1, 'day');

    app.ui.controlObj = moment(app.now.firstDayOfCurrentMObject.year() + "W" + app.now.firstDayOfCurrentMObject.week())
                            .subtract(3, 'week');
    app.ui.controlWeek = app.ui.controlObj.week();
    app.ui.controlYear = app.ui.controlObj.year();

    app.ui.firstWeekOffset = 0;

    console.log(app);

    initVue();
}

initVariables();


// returns an array that consists of seven moments (one week)
function returnWeekArray(controlObj, offset) {
    // console.log('returnWeekArr: ' + controlObj.week() + " " + offset);
    var arr = [];

    var first = moment(controlObj).add(offset, 'week');

    var last = moment(first).add(6, 'day');

//    if (first.month() === last.month()) {
        for (var i = 0; i < 7; i += 1) {

            arr.push(moment(first).add(i, 'day'));
        }

    // } else {
    //
    //     var endingArr = [];
    //     var startingArr = [];
    //
    //     for (var i = 0; i < 7; i += 1)
    //     {
    //
    //         endingArr.push(moment(first).add(i, 'day'));
    //         startingArr.push('');
    //
    //         if ()
    //
    //
    //     }
    //
    //
    // }


    return arr;
}


function initVue() {
    console.log('FUNC: initVue');
    console.log(app);

    app.vue = new Vue({
        el: '#app',
        data: {
            today: app.now,
            ui: app.ui,
            locale: {
                days: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
            }
        },
        computed: {
            weeks: function () {

                var arr = [];

                for (var i = 0; i < this.ui.showWeeks; i += 1) {
                    var newArr = returnWeekArray(this.ui.controlObj, this.ui.firstWeekOffset + i);
                    arr.push(newArr);
                }

                return arr;
            }
        },
        methods: {

            more: function (par) {
                var moar = parseInt(par);
               // console.log('MOAR ' + moar);
                this.ui.firstWeekOffset += moar;
            }

        }
    })
}