sequenceDiagram
    participant browser
    participant server

    Note right of browser: The user types a note and clicks the "Save" button

    Note right of browser: The JavaScript code (spa.js) adds the note to the list locally and rerenders the page

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server

    Note over browser, server: Payload: {content: "hallo 1337 SPA", date: "2026-03-07T21:59:14.546Z"}
    
    server-->>browser: 201 Created {"message":"note created"}
    deactivate server

    Note right of browser: No further requests are made; the page does not reload