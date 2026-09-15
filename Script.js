const messageInput = document.getElementById("message");
const senderInput = document.getElementById("senderName");

const characterCount =
    document.getElementById("characterCount");

const generateBtn =
    document.getElementById("generateBtn");

const qrSection =
    document.getElementById("qrSection");

const qrContainer =
    document.getElementById("qrcode");

const shareBtn =
    document.getElementById("shareBtn");

const newMessageBtn =
    document.getElementById("newMessageBtn");

const receivedSection =
    document.getElementById("receivedSection");

const receivedMessage =
    document.getElementById("receivedMessage");

const receivedSender =
    document.getElementById("receivedSender");

const replyBtn =
    document.getElementById("replyBtn");

const ignoreBtn =
    document.getElementById("ignoreBtn");



/*
    Character counter
*/

messageInput.addEventListener("input", () => {

    characterCount.textContent =
        messageInput.value.length;

});



/*
    Generate QR code
*/

generateBtn.addEventListener("click", () => {

    const message =
        messageInput.value.trim();

    const sender =
        senderInput.value.trim();


    if (!message) {

        alert("Please write a message first.");

        return;
    }


    const data = {

        message: message,

        sender: sender || "Someone nearby",

        timestamp: Date.now()

    };


    /*
        Encode the message into a URL.

        In a production application,
        the message should instead be stored
        on a server and the QR should contain
        only a short message ID.
    */

    const encoded =
        encodeURIComponent(
            btoa(
                unescape(
                    encodeURIComponent(
                        JSON.stringify(data)
                    )
                )
            )
        );


    const url =
        `${window.location.origin}${window.location.pathname}?message=${encoded}`;


    qrContainer.innerHTML = "";


    new QRCode(qrContainer, {

        text: url,

        width: 220,

        height: 220,

        correctLevel:
            QRCode.CorrectLevel.H

    });


    qrSection.classList.remove("hidden");

    qrSection.scrollIntoView({
        behavior: "smooth"
    });

});



/*
    Share the message
*/

shareBtn.addEventListener("click", async () => {

    const qrImage =
        qrContainer.querySelector("img");


    if (!qrImage) {

        return;
    }


    try {

        if (navigator.share) {

            await navigator.share({

                title: "QR Messaging",

                text:
                    "Someone wants to share a message with you.",

                url: window.location.href

            });

        } else {

            await navigator.clipboard.writeText(
                window.location.href
            );

            alert(
                "Message link copied to clipboard."
            );

        }

    } catch (error) {

        console.log(error);

    }

});



/*
    Create another message
*/

newMessageBtn.addEventListener("click", () => {

    messageInput.value = "";

    senderInput.value = "";

    characterCount.textContent = "0";

    qrContainer.innerHTML = "";

    qrSection.classList.add("hidden");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/*
    Decode received message
*/

function checkForReceivedMessage() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const encoded =
        params.get("message");


    if (!encoded) {

        return;
    }


    try {

        const json =
            decodeURIComponent(
                escape(
                    atob(
                        decodeURIComponent(encoded)
                    )
                )
            );


        const data =
            JSON.parse(json);


        receivedMessage.textContent =
            data.message;


        receivedSender.textContent =
            `— ${data.sender}`;


        receivedSection.classList.remove(
            "hidden"
        );


        receivedSection.scrollIntoView({
            behavior: "smooth"
        });


    } catch (error) {

        console.error(
            "Could not decode message:",
            error
        );

    }

}



/*
    Reply
*/

replyBtn.addEventListener("click", () => {

    alert(
        "A future version can connect this button to an anonymous reply system."
    );

});



/*
    Ignore
*/

ignoreBtn.addEventListener("click", () => {

    receivedSection.classList.add(
        "hidden"
    );

});



/*
    Start application
*/

checkForReceivedMessage();
