/**
 * Created by pate on 4.12.2015.
 */

function vueta(datu, data_now) {

    console.log("datu")
    console.log(datu)
    console.log("data_now")
    console.log(data_now)

    var vueApp = new Vue({
        el: "#root",
        data: {
            general_data: datu, today_data: data_now
        }
    })


}

















Date.prototype.getWeekNumber = function () {
    var d = new Date(+this);
    d.setHours(0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    return Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
};
Date.prototype.getLastDay = function () {
    var nyt_str = new Date(this.getFullYear(), this.getMonth()+1, 0);
    return nyt_str.getDate();
};

function getISOWeeks(y) {
    var d,
        isLeap;

    d = new Date(y, 0, 1);
    isLeap = new Date(y, 1, 29).getMonth() === 1;

    //check for a Jan 1 that's a Thursday or a leap year that has a
    //Wednesday jan 1. Otherwise it's 52
    return d.getDay() === 4 || isLeap && d.getDay() === 3 ? 53 : 52
}

function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
};
function raktivoi(datu, data_now) {
    var rakki = new Ractive({
        el: "#root",
        template: "#template_calendar",
        data: {general_data: datu, today_data: data_now}
    });
};

function give (given_date, week_ref) {


    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var today = given_date;
    var this_month_first_day = new Date(today.getFullYear(), today.getMonth(), 1);
    var this_month_last_day = new Date(today.getFullYear(), today.getMonth(), today.getLastDay());
    var this_month = today.getMonth();

    var this_month_last_day_object = new Date(today.getFullYear(), today.getMonth(), this_month_last_day.getDate());
    var this_month_last_day_position = this_month_last_day_object.getDay();
    var this_month_last_day_week = this_month_last_day_object.getWeekNumber();


    var this_month_first_day_object = new Date(today.getFullYear(), today.getMonth(), this_month_first_day.getDate());
    var this_month_first_day_position = this_month_first_day_object.getDay();
    var this_month_first_day_week = this_month_first_day_object.getWeekNumber();

    console.log("First of this month: ", this_month_first_day, " + position: ", this_month_first_day_position);
    console.log("Last of this month: ", this_month_last_day, " + position: ", this_month_last_day_position);
    console.log("This month: ", this_month);

    var objects_inner = {};
    var rolling_day = 1;
    var this_week = today.getWeekNumber();
    var first_of_month_week = new Date(today.getFullYear(), today.getMonth(), 1);
    var cal_week_start = first_of_month_week.getWeekNumber() + week_ref;
    var cal_week_end = cal_week_start + 5;
    var cal_week_year = today.getFullYear();
    var cal_week_year_total_weeks = getISOWeeks(cal_week_year);

    var objects = {};
    objects["weeks"] = {};
    var bg_color = 1;
    var object_roller = 0;
    for (var i = cal_week_start; i < cal_week_end; i += 1) {

        var loop_week_first_day;
        var loop_week_number;
        var loop_year;

        if (i < cal_week_year_total_weeks + 1) {
            loop_week_number = i;
            loop_year = cal_week_year;
            loop_week_first_day = getDateOfISOWeek(loop_week_number, loop_year);
        }
        else {
            loop_week_number = i - cal_week_year_total_weeks;
            loop_year = cal_week_year + 1;
            loop_week_first_day = getDateOfISOWeek(loop_week_number, loop_year);
        }
        console.log("loop week: ", loop_week_number);
        console.log("loop week first day: ", loop_week_first_day);

        var loop_obj = {};
        var loop_array = [];
        var latest = 0;
        var loop_month_name = "";
        for (var d = 0; d < 7; d += 1) {
            var next_day = getDateOfISOWeek(loop_week_number, loop_year);
            next_day.setDate(next_day.getDate() + d);
            if (latest < next_day.getDate()) {
                latest = next_day.getDate();
            } else {
                loop_month_name = monthNames[next_day.getMonth()];
            }
            bg_color = next_day.getMonth() % 2;

            loop_array.push({"date": next_day.getDate(), "class": bg_color});
            console.log(bg_color);
        }

        objects["weeks"][object_roller] = { "week_number": loop_week_number,
                                            "days": loop_array,
                                            "month_name": loop_month_name
                                            };
        object_roller += 1;
    }


    console.log(objects);
    return objects;

    }

(function start_app () {

    var gog = new Date();
    var ob_week_ref = 0;
    var ob = give(gog, ob_week_ref);
    ob_now = {
                "week_number_now" : gog.getWeekNumber(),
                "today_now": gog.getDate(),
                "today_month": gog.getMonth(),
                "today_year": gog.getFullYear()
    };
    vueta(ob, ob_now);


    document.getElementById("button_up").addEventListener("click", function() {
        ob_week_ref -= 1;
        ob = give(gog, ob_week_ref);
        vueta(ob, ob_now);
    });

    document.getElementById("button_down").addEventListener("click", function() {
        ob_week_ref += 1;
        ob = give(gog, ob_week_ref);
        vueta(ob, ob_now);
    });

}());