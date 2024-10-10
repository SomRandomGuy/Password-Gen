let checkboxes;
let num_o_checkboxes;
let password_output;
let slider;

let lowest_possible_weight = 1;

let charSets = {
    "include_upper": ["ABCDEFGHIJKLMNOPQRSTUVWXYZ", true, 0],
    "include_lower": ["abcdefghijklmnopqrstuvwxyz", true, 0],
    "include_num": ["0123465789", true, 0],
    "include_special": ["!\&quot;#$%&amp;'()*+,-./:;&lt;=&gt;?@[\]^_`{|}~", true, 0],
}


function copy_to_clipboard() {
    if(password_output) {
        try {
            navigator.clipboard.writeText(password_output.value);
        } catch(error) {
            console.error("There was an error copying to your clipboard!");
            console.log(error);
        }
    }
}

function reverse_last_checkbox_state(last_checkbox) {
    for (let i = 0; i < num_o_checkboxes; i++) {
        let checkbox = checkboxes[i];

        if (last_checkbox != undefined) {
            last_checkbox.disabled = !last_checkbox.disabled;

            return;
        } else if (checkbox.checked == true) {
            checkbox.disabled = !checkbox.disabled;

            return checkbox;
        }
    }
}

function generate_password() {
    let password = "";
    let chars = slider.value;

    let n = 0;
    for (let key in charSets) {
        charSets[key][1] = checkboxes[n].checked;
        charSets[key][2] = lowest_possible_weight;

        n++;
    }

    let key_list = Object.keys(charSets);
    let key_list_length = key_list.length;

    let key_w_lowest_weight = "";

    while (true) {

        let index = Math.floor(Math.random() * key_list_length)

        if (charSets[key_list[index]][1] == true) {
            key_w_lowest_weight = key_list[index];

            break;
        }
    }

    // For each character
    for (let x = 0; x < chars; x++) {
        for (let z = 0; z < key_list_length; z++) {
            key = key_list[z];

            let current_key_weight = charSets[key][2];

            // if the current key weight is less than the lowest one in the entire data set and is a valid target, do this
            if (current_key_weight < charSets[key_w_lowest_weight][2] && charSets[key][1] == true) {
                key_w_lowest_weight = key;
            }
        }

        charSets[key_w_lowest_weight][2] += 1;

        password += charSets[key_w_lowest_weight][0][Math.floor(Math.random() * charSets[key_w_lowest_weight][0].length)];
    }
    password_output.value = password;
}

window.onload = function() {
    checkboxes = document.querySelectorAll("#checkboxes input[type='checkbox']");
    num_o_checkboxes = checkboxes.length;
    password_output = document.querySelector("#password");
    slider = document.getElementById("slider");
    checkboxes_checked = 0;

    detect_browser();
    // Generate a password once the page loads!
    generate_password();
    // Output the password
    slider.addEventListener("input", function() {
        let chars = this.value;

        document.getElementById("sliderValue").innerText = chars;

        generate_password();
    });

    document.addEventListener('change', function(event) {
        if (event.target.type == "checkbox") {
            if (event.target.checked == false) {
                checkboxes_checked++;

                if (checkboxes_checked == num_o_checkboxes - 1) {
                    console.log("disabling checkbox");
                    last_checkbox = reverse_last_checkbox_state();
                }

            } else {
                checkboxes_checked--;

                if (checkboxes_checked == num_o_checkboxes - 2) {
                    reverse_last_checkbox_state(last_checkbox);
                }
            }
            generate_password();
        }
    });
};
