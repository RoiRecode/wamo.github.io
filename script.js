// Initialize EmailJS
(function() {
    emailjs.init("YOUR_USER_ID"); // Replace with your actual EmailJS user ID
})();

let noButton = document.getElementById("no");
let noClicks = 0;
let responseMessage = document.getElementById("response-message");
let yesButton = document.getElementById("yes");

// Handle the "კი" option selection
yesButton.addEventListener("click", function () {
    responseMessage.style.display = "block";
    responseMessage.textContent = "თქვენ ირჩეთ 'კი'. მადლობა!";
    sendEmail("კი");
    disableButtons();
});

// Handle the "არა" option selection with movement animation
function moveButton() {
    if (noClicks === 0) {
        // Move the button first time
        noButton.style.animation = "moveButton 1s forwards";
        noClicks++;
    } else if (noClicks === 1) {
        // Move the button second time
        noButton.style.animation = "moveButtonDelay 1s forwards";
        noClicks++;
    } else {
        // Allow the user to press it on the third click
        responseMessage.style.display = "block";
        responseMessage.textContent = "თქვენ ირჩეთ 'არა'. :( მადლობა!";
        sendEmail("არა");
        disableButtons();
    }
}

// Disable the buttons after a choice is made
function disableButtons() {
    yesButton.disabled = true;
    noButton.disabled = true;
}

// Send email function using EmailJS
function sendEmail(answer) {
    const emailData = {
        to_email: "recipient@example.com", // Replace with the recipient's email
        subject: "Meeting Response",
        message: `The user selected: ${answer}`
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", emailData)
        .then(function(response) {
            console.log('Email sent successfully', response);
        }, function(error) {
            console.log('Failed to send email', error);
        });
}
