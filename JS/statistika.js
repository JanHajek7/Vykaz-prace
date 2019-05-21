"use strict";

let tbody_stat = document.getElementById("tbody_stat");

let sort_from = document.getElementById("od_datum");
let sort_to = document.getElementById("do_datum");

let select_zam = document.getElementById("sort_zam");
let select_project = document.getElementById("sort_project");

let button = document.getElementById("button");
let button_active = false;

let pole_zaznam = window.localStorage.getItem("Zaznam");
let Zaznams;

if (pole_zaznam !== null)
{
    Zaznams = JSON.parse(pole_zaznam);
}
else
{
    alert("Nejsou žadné záznamy k zobrazení");
}
let Stat_array = Zaznams.slice();

function save()
{
    Save_Stat = JSON.stringify(Stat_array);
    localStorage.setItem("Stat_array", Save_Stat);
}
save();

let projekty_pole = window.localStorage.getItem("Projekty");
let Projekty;

if (projekty_pole === null)
{
    Projekty = [];
}
else
{
    Projekty = JSON.parse(projekty_pole);
    //Select_add_Project();
}

let zamestnanci_pole = window.localStorage.getItem("Zamestnanci");
let Zamestnanci;

if (zamestnanci_pole === null)
{
    Zamestnanci = [];
}
else
{
    Zamestnanci = JSON.parse(zamestnanci_pole);
    //Select_add_Zam ();
}

function Pender_Projects()
{
    tbody_stat.innerHTML = "";
    for (var i in Stat_array)
    {
        let p = Stat_array[i];
        add_new_zam(p,i);
        
    }
}
Pender_Projects();


function add_new_zam(pole,index)
{
    let NewTR = tbody_stat.insertRow();
    let Td_name_project = NewTR.insertCell();
    let Td_zamestnanec = NewTR.insertCell();
    let Td_Termin = NewTR.insertCell();
    let Td_odprac_hod = NewTR.insertCell();
    let Td_castka = NewTR.insertCell();
    
    let hodiny = Zaznams[index].minutes / 60;
    
    Td_name_project.innerHTML = Projekty[pole.id_Project].name_project;
    Td_zamestnanec.innerHTML = Zamestnanci[pole.id_zamestanace].name + " " + Zamestnanci[pole.id_zamestanace].surname;
    Td_Termin.innerHTML = moment(Zaznams[index].start).format('MMMM Do YYYY, hh:mm:ss a') + " - " + moment(Zaznams[index].end).format('MMMM Do YYYY, hh:mm:ss a');
    Td_odprac_hod.innerHTML = Math.round(hodiny * 10) / 10 + " h";
    Td_castka.innerHTML = Math.ceil(Zaznams[index].minutes / 60 * Zamestnanci[pole.id_zamestanace].kc) + " - kč";
    
    
}
/*
function Select_add_Zam ()
{
    for (let i in Zamestnanci)
    {
        let item = Zamestnanci[i];
        let option = document.createElement("option");
        option.innerHTML = item.name + " " + item.surname;
        select_zam.appendChild(option);
        option.dataset.id = Zamestnanci[i].id;
    }
}

function Select_add_Project ()
{
    for (let i in Projekty)
    {
        let item = Projekty[i];
        let option = document.createElement("option");
        option.innerHTML = item.name_project;
        select_project.appendChild(option);
        option.dataset.id = Projekty[i].id;
    }
}

button.addEventListener("click", function()
{
    if (!button_active)
    {
        button_active = true;
        button.classList.add("active");
        
    }
    else if (button_active)
    {
       button_active = false;
       button.classList.remove("active");
        
    }
    console.log(button_active);
});

*/

