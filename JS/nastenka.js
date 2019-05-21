"use strict";

let tbody_nas = document.getElementById("tbody_nas");
let zamestnanci_pole = window.localStorage.getItem("Zamestnanci");

let count_zamestnanci = document.getElementById("zamestnanci");
let count_projekty = document.getElementById("projekty");

let graf_project = document.getElementById("graf_project_number");
let graf_zam = document.getElementById("graf_zam_number");


let Zamestnanci;

if (zamestnanci_pole === null)
{
    Zamestnanci = [];
}
else
{
    Zamestnanci = JSON.parse(zamestnanci_pole);
    
}

console.log(Zamestnanci.length);

let projekty_pole = window.localStorage.getItem("Projekty");
let Projekty;

if (projekty_pole === null)
{
    Projekty = [];
}
else
{
    Projekty = JSON.parse(projekty_pole);
    
}
console.log(Projekty);

let Zaznam_pole = window.localStorage.getItem("Zaznam");
let Zaznam;

if (Zaznam_pole === null)
{
    Zaznam = [];
} else
{
    Zaznam = JSON.parse(Zaznam_pole);
}
function get_zam_project()
{
    count_zamestnanci.innerHTML = "Počet zaměstanců:  " + Zamestnanci.length;
    count_projekty.innerHTML = "Počet projektů: " + Projekty.length;
}
get_zam_project();



function add_data_nas(pole, index)
{      
    let NewTR = tbody_nas.insertRow();
    let td_Zam = NewTR.insertCell();
    let td_name_project = NewTR.insertCell();
    let td_work_hour = NewTR.insertCell();
    let td_date = NewTR.insertCell();
    
    td_Zam.innerHTML = Zamestnanci[pole.id_zamestanace].name + " " + Zamestnanci[pole.id_zamestanace].surname;
    td_name_project.innerHTML = Projekty[pole.id_Project].name_project;
    td_work_hour.innerHTML = Zaznam[index].minutes;
    td_date.innerHTML = moment(pole.add_time, moment.ISO_8601).fromNow();

}

function Pender_Projects()
{
    tbody_nas.innerHTML = "";
    for (var i in Zaznam)
    {
        let p = Zaznam[i];
        
        add_data_nas(p, i);
    }
}
Pender_Projects();



let ZamChartCanvas = document.querySelector("#ZamChart").getContext('2d');
ZamChartCanvas.width = 100;
ZamChartCanvas.height = 100;
let ZamChart =
    new Chart(ZamChartCanvas,
        {
        type: 'doughnut',
        data: {
            labels: ["Zaměstnanci", "Volných míst"],
            datasets: [{
                data: [Zamestnanci.length, 10 - Zamestnanci.length],
                backgroundColor: ["red", "gray"]
        }]
        },
        options: {
            responsive: false,
            legend: {
            display: false
        }
    }
});

let ProjectChartCanvas = document.querySelector("#ProjectChart").getContext('2d');
ProjectChartCanvas.width = 100;
ProjectChartCanvas.height = 100;
let ProjectChart =
    new Chart(ProjectChartCanvas,
        {
        type: 'doughnut',
        data: {
            labels: ["Projekty", "Volných míst"],
            datasets: [{
                data: [Projekty.length, 10 - Projekty.length],
                backgroundColor: ["red", "gray"]
        }]
        },
        options: {
            responsive: false,
            legend: {
            display: false
        }
    }
});


graf_zam.innerHTML = "Zaměstnanců" + " " + Zamestnanci.length + "/10";
graf_project.innerHTML = "Projektů" + " " + Projekty.length + "/10";


