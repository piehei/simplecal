/**
 * Created by pate on 23.9.2015.
 */


var op = new Date();

var ppp = op.getDate();
var kkk = op.getMonth();
var vvv = op.getFullYear();

//https://stackoverflow.com/questions/3387427/remove-element-by-id
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


// https://stackoverflow.com/questions/1184334/get-number-days-in-a-specified-month-using-javascript
//Month is 1 based
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
// July
// daysInMonth(7,2009); //31


// https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
// get weeknumber
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

function viisi_viikkoa (kknro,vvnro) {

    //console.log(document.getElementById("w1").hasChildNodes())

    if (document.getElementById("w1").hasChildNodes() === true) {
        console.log("fire");
        document.getElementsByClassName("pv").remove();
        document.getElementsByClassName("wk").remove();
            }

    var pvlista = ["su", "ma", "ti", "ke", "to", "pe", "la"];

    var tn = new Date(vvnro,kknro,4);
    var nyt = tn.getDate();
    var kk_nyt = tn.getMonth();
    var yy_nyt = tn.getFullYear();

    var kk_eka_pv = new Date(yy_nyt, kk_nyt, 1);
    var kk_eka_pv_nro = kk_eka_pv.getDay();
    if (kk_eka_pv_nro === 0) { kk_eka_pv_nro = 7};
    console.log("kk_eka_pv = " + kk_eka_pv);
    console.log("kk_eka_pv_nro = " + kk_eka_pv_nro);

    var viikot = [];

    for (i=0; i<5; i++) {
        console.log("kierros: " + i);
        viikot[i] = new Array(6);
    }

    viikot[0][kk_eka_pv_nro-1] = 1;
    var flagi = false;
    var juokseva = 1;
    var kk_vika = tn.getLastDay();
        console.log("kk_vika" + kk_vika);
    for (i=0; i<5; i++) {
        console.log("viikko: " + i);
            for (j=0;j<7;j++) {
            console.log("pv: " + j + " ja sisältö: " + viikot[i][j]);


                if (flagi === true) {
                    juokseva++;
                    viikot[i][j] = juokseva;

                }

                if (viikot[i][j] === 1) {
                    flagi = true;
                }

            }
    }

    var ed_kk_vik_pv = new Date(yy_nyt, kk_nyt-1, 1);
    ed_kk_vik_pv = ed_kk_vik_pv.getLastDay();
    console.log("LAST DAY ED MONTH: " + ed_kk_vik_pv);

    juoksu = ed_kk_vik_pv;
    for (i=kk_eka_pv_nro-2; 0<=i; i--) {
        viikot[0][i] = juoksu;
        juoksu--;
    }



    juokseva2 = 1;
    for (i=0;i<7;i++) {

        console.log(kk_vika<viikot[4][i]);
        if (kk_vika < viikot[4][i]) {
            viikot[4][i] = juokseva2;
            juokseva2++;
        }
    }

    console.log("vika viikko: ");
    for (i=0;i<7;i++) {
        console.log(viikot[4][i]);
    }


    rivilista = [document.getElementById("w1"),document.getElementById("w2"),document.getElementById("w3"),
        document.getElementById("w4"),document.getElementById("w5")];

    var eka_viikko_nro = kk_eka_pv.getWeekNumber();
    var vuoden_vika_pv = new Date(vvv,11,31);
    var vuoden_vika_viikko = vuoden_vika_pv.getWeekNumber();

    for (i=0;i<5;i++) {

        if (eka_viikko_nro <= vuoden_vika_viikko) {

        var vk = document.createElement("div");
        vk.setAttribute("class", "wk");
        vk.appendChild(document.createTextNode(eka_viikko_nro));
        rivilista[i].appendChild(vk);
        eka_viikko_nro++;

        } else {
            eka_viikko_nro = 1;
            var vk = document.createElement("div");
            vk.setAttribute("class", "wk");
            vk.appendChild(document.createTextNode(eka_viikko_nro));
            rivilista[i].appendChild(vk);
            eka_viikko_nro++;

        }



        for (j=0;j<7;j++) {
            var el = document.createElement("div");
            el.setAttribute("class", "pv");
            var elcont = document.createTextNode(viikot[i][j]);
            el.appendChild(elcont);
            if (viikot[i][j] === ppp) {
                el.setAttribute("class", "pv_t");
            }
            rivilista[i].appendChild(el);
        }
    }


};


document.addEventListener("DOMContentLoaded", function(event) {

    document.getElementById("cal").textContent = ppp + "." + (kkk+1) +  "." + vvv;

    viisi_viikkoa(kkk,vvv);
});


document.getElementById("prev").addEventListener("click", function() {
    eteen_tai_taakse("t");
});

document.getElementById("next").addEventListener("click", function() {
    eteen_tai_taakse("e");
});



function eteen_tai_taakse(param) {
    if (param === "t") {

        if (kkk > 1) {
            kkk--;
        } else {
            kkk = 12;
            vvv--;
        }
                        viisi_viikkoa(kkk, vvv);
    } else if (param === "e") {

        if (kkk < 12 ) {
            kkk++;
        } else {
            kkk = 1;
            vvv++;
        }
                        viisi_viikkoa(kkk, vvv);
    }


}


