


console.log("cal.js");



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


// returns an array of size 7
function returnWeekArray(controlObj, offset) {
    console.log('returnWeekArr: ' + controlObj.week() + " " + offset);

    var first = moment(controlObj).add(offset, 'week');

    var arr = [];

    for (var i = 0; i < 7; i += 1) {

        arr.push(moment(first).add(i, 'day'));
    }

    return arr;
}


function initVue() {
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
                console.log('MOAR ' + moar);
                this.ui.firstWeekOffset += moar;
            }

        }
    })
}