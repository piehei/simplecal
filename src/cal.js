


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
    ui: { showWeeks: 8 }
}

var today = moment();

app.now.obj = today;
app.now.day = today.day();
app.now.week = today.week();
app.now.month = today.month() + 1;
app.now.date = today.date();
app.now.year = today.year();


app.now.firstWeekOfNowMonth = moment(today).subtract(today.date() - 1, 'day').week();

console.log('today :' + app.now.obj.calendar());
app.weeks[app.now.obj.year()] = {};
app.weeks[app.now.obj.year()][app.now.week] = [moment(app.now.obj).subtract(app.now.day === 1 ? app.now.day : app.now.day - 1, 'days')];


for (var i = 0; i < 10; i += 1) {

    var newWeekStart = moment(app.weeks[app.now.obj.year()][app.now.week][0]);
    newWeekStart.add(i-5, 'week');
    console.log(newWeekStart);

    if (newWeekStart.week() === 1 && typeof app.weeks[newWeekStart.year()] === 'undefined') {
        app.weeks[newWeekStart.year()] = {};
    }

    app.weeks[newWeekStart.year()][newWeekStart.week()] = [newWeekStart];

    for (var n = 1; n < 7; n += 1) {
        var un = moment(newWeekStart);
        un.add(n, 'day');
        app.weeks[newWeekStart.year()][newWeekStart.week()].push(un);
    }


}

console.dir(app.weeks);


app.vue = new Vue({
    el: '#app',
    data: {
        today: app.now,
    },
    computed: {
        weeks: function () {

            var first = app.now.firstWeekOfNowMonth - 2;
            var startYear = first > 0 ? app.now.year : app.now.year - 1;


            var arri = [];

            for (var i = 0; i < app.ui.showWeeks; i += 1) {



                arri.push( app.weeks[startYear][first + i] );
            }

            console.log(arri)
            return arri;
        }
    },
    methods: {

        more: function (par) {
            par = parseInt(par);
            console.log('more ' + par);
        }

    }
})