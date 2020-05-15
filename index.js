'use strict'

// let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let event_element;
let aim_div = document.getElementsByClassName("content-center")[0]
let nav_bar_buttons = document.getElementsByClassName("nav-bar-buttons")[0]

function open_connections() {
    let request = new XMLHttpRequest()
    let url = `https://jsonplaceholder.typicode.com/${event_element}`
    console.log(url)
    request.open("GET", url, true)
    request.send()
    request.onload = function () {
        if (request.responseText !== "") {
            visualization(event_element, JSON.parse(request.responseText))
        }
    }
}

function user_commands() {
    event_element = event.target.value
    aim_div.innerHTML = ""
    open_connections()

}

function visualization(command, data) {
    if (command === "users") {
        posts_info(data, event_element, "name")
    } else if (command === "posts") {
        posts_info(data, event_element, "userId")
    } else {
        handle_photos(data)
    }
}


function posts_info(data, event_value, x) {
    let dl = document.createElement("dl")
    let dt;
    for (let i = 0; i < data.length; i++) {
        if (event_value !== data[i][x]) {
            event_value = data[i]["userId"]
            dt = document.createElement("dt")
            if (x === "name") {
                dt.innerHTML += `${data[i][x]}`
            } else {
                dt.innerHTML += `User ID: ${data[i][x]}`
            }
            dl.appendChild(dt)
            dt.appendChild(document.createElement("br"))
            dt.appendChild(document.createElement("br"))
        }
        let dd = document.createElement("dd")
        for (let key in data[i]) {
            if (typeof data[i][key] !== "object") {
                dd.innerHTML += `${key} : ${JSON.stringify(data[i][key])}`
                dd.appendChild(document.createElement("br"))
            }
        }
        dl.appendChild(dd)
        dl.appendChild(document.createElement('hr'))
    }
    aim_div.appendChild(dl)
}

function handle_photos(data) {
    let dl = document.createElement("dl")
    for (let i = 0; i < data.length; i++) {
        let dt = document.createElement('dt')
        dt.innerHTML += `${data[i]["title"]}`
        dl.appendChild(dt)
        dt.appendChild(document.createElement("br"))
        dt.appendChild(document.createElement("br"))
        let dd = document.createElement("dd")
        let url = data[i]["url"]
        let thumbnailUrl = data[i]["thumbnailUrl"]
        let img_1 = document.createElement("img")
        let img_2 = document.createElement("img")
        img_1.setAttribute("src", url)
        img_2.setAttribute("src", thumbnailUrl)
        dl.appendChild(img_1)
        dl.appendChild(img_2)
        dl.appendChild(document.createElement('hr'))
    }
    aim_div.appendChild(dl)
}

(function create_events() {
    for (let i = 0; i < nav_bar_buttons.children.length; i++) {
        nav_bar_buttons.children[i].addEventListener("click", user_commands)
    }
})()

