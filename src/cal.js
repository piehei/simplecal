


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
    vue: {}
}

var today = moment();

app.now.obj = today;
app.now.day = today.day();
app.now.week = today.week();
app.now.month = today.month() + 1;
app.now.date = today.date();
app.now.year = today.year();

console.log('today :' + app.now.obj.calendar())
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
            return app.weeks[2016]
        }
    }
})