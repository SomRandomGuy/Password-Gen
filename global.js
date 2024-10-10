// Only used when the user-agent is detected as mobile
let mobile_style = " ";
let sleep_time_ms = 150;

function detect_browser() {
    let userAgent = navigator.userAgent;

    if (/Mobi|Android/i.test(userAgent)) {
        console.log("hi");
        mobile_style = document.createElement('style');
        mobile_style.innerHTML = '.button:hover { transform: none !important; fill: white !important;}'; // Override hover effect

        document.head.appendChild(mobile_style);
    }
}

// A sleep function!
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('click', async function() {
    let animation_class = "pressed";
    let element_pressed = event.target;
    let button_class = "button"
    let parent = element_pressed;

    while (parent != null) {
        if (parent.classList.contains(button_class)) {
            // Add the pressed button class to the button
            // Even if there is not mobile style present, there is no harm in trying to disable it!
            mobile_style.disabled = true;
            parent.classList.add(animation_class);
            // Now sleep!
            await sleep(sleep_time_ms);
            // And now remove it!
            parent.classList.remove(animation_class);
            mobile_style.disabled = false;
        }

        parent = parent.parentElement;
    }
});
