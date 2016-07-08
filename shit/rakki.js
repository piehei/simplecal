var datu = {
    "viikot": {
        "47": {
            "nro": 47,
            "paivat": ["16", "17", "18", "19", "20", "21", "22"]
        },
        "48": {
            "nro": 48,
            "paivat": ["23", "24", "25", "26", "27", "28", "29"]
        }
    }

};


var rakki = new Ractive({
    el: "#root",
    template: "#template_calendar",
    data: datu
});