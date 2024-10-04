let new_old;
let state = "NEW";
let announcements;
let time_frame = 75;

document.addEventListener("DOMContentLoaded", function() {
    new_old = document.querySelector('.new-old');
    announcements = document.querySelector('.announcements');
});

async function changeOrder(state1, state2) {
    new_old.classList.add("fade");

    await sleep(time_frame);

    announcements.classList.add("fade");

    await sleep(time_frame);

    if(new_old.innerHTML == state1) {
        new_old.innerHTML = state2;
        announcements.style.flexDirection = "column-reverse";

    }

    else {
        new_old.innerHTML = state1;
        announcements.style.flexDirection = "column";

    }

    announcements.classList.remove("fade");
    announcements.classList.add("fadeIn");


    new_old.classList.remove("fade");
    new_old.classList.add("fadeIn");
}
