let heading;

document.addEventListener("DOMContentLoaded", function() {
    heading = document.querySelector(".heading");

});

let animation_playing = false;

// Error flash animation
async function error_animation(element_id, times_to_flash, speed_ms) {

    if(animation_playing) {
        return;
    }

    if(speed_ms <= 0 || speed_ms === undefined) {
        speed_ms = 350;
    }

   // Try to find the element specified by the function

   try {
    element = document.getElementById(element_id);

    if(!element) {
        throw new Error("Could not find element by ID for flashing animation!");
    }
   } catch (error) {
    console.error(error.message);
    return;
   }

   // First, get the color of the element and the combine red color value!
   let element_color = window.getComputedStyle(element).color;
   let combine_red = window.getComputedStyle(element).getPropertyValue("--combine-red");

   // Now, play the flash animation

   let element_previousHTML = element.innerHTML;

   animation_playing = true;

   times_to_flash = Math.round(times_to_flash + 1);

   // Flash animation
   for(let i = 1; i <= times_to_flash; i++) {
    element.classList.add("fade");
    await sleep(speed_ms);

    element.classList.add("combine-red");
    element.innerHTML = "ERROR";

    if(i == times_to_flash) {
        // Set the element back to it's previous state for the final cycle
        element.innerHTML = element_previousHTML;
        element.classList.remove("combine-red");
    }

    element.classList.remove("fade");
    await sleep(speed_ms);
    element.classList.add("fadeIn");

   }

   animation_playing = false;
}
