# QR Messaging

A privacy-first proximity messaging experiment.

## Concept

QR Messaging allows a person to create a short message and generate a QR code.

Another person can scan the QR code using their phone camera and read the message without installing an application.

## Features

- Create anonymous messages
- Optional sender name
- QR code generation
- Mobile-friendly interface
- Share message
- No account required for the prototype
- No Bluetooth tracking
- No collection of nearby device identifiers

## Technology

- HTML5
- CSS3
- JavaScript
- QRCode.js
- Google Fonts

## Font

The application uses:

**Fredericka the Great**

## Important

This repository is an experimental prototype.

The current version stores the message directly inside the QR code.

A production version should:

1. Store messages on a secure server.
2. Generate random message IDs.
3. Expire messages automatically.
4. Add abuse/spam protection.
5. Allow anonymous replies.
6. Add reporting/blocking.
7. Encrypt sensitive communication.
