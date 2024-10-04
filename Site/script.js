function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = async function() {
    // Look for the an element with a fade class
    let fade_element = document.querySelector(".fade");

    if(fade_element != null) {
        fade_element.classList.remove("fade");
       fade_element.classList.add("fadeIn");

    }
}

let sidebar_opened;
let sidebar;

document.addEventListener("DOMContentLoaded", function() {
    fetch("navbar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementsByTagName("nav")[0].innerHTML = data;

        sidebar_opened = false;
        sidebar = document.getElementsByClassName("sidebar")[0];

        // Highlight the link that the user is on
        let link_name = document.querySelector("title").innerHTML.toUpperCase();

        let links = document.getElementsByTagName("a");
        let num_o_links = links.length;

        for(let i = 0; i < num_o_links; i++) {
            let link = links[i];

            if(link.innerHTML.toUpperCase() == link_name) {
                link.classList.add("link-highlighted");
            }
        }

        // Add the envent listener to listen for clicks on the hamburger button
        document.addEventListener('click', sidebarClickListener);
    });

});


function closeSidebar() {
    // Do the fade out animation
    sidebar.classList.remove("fadeIn");
    sidebar.classList.add("fade");
    sidebar_opened = !sidebar_opened;
}

async function showSidebar(sidebar_class) {
  // Do the fade in animation!
  sidebar.classList.remove("fade");
  sidebar.classList.add("fadeIn");
  sidebar_opened = !sidebar_opened;
}

function sidebarClickListener(event) {
    // If the thing pressed is a the hamburge button OR an outside element with the sidebar opened
    if(event.target.parentNode.classList.contains("hamburger") || (sidebar_opened && !sidebar.contains(event.target))) {
        if(!sidebar_opened)
        {
            showSidebar();
        }

        else
        {
            closeSidebar();
        }

    }
}
