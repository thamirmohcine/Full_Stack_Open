sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes "hallo 1337" and clicks Save

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note over browser, server: Payload: Form Data { "note": "hallo 1337" }
    server-->>browser: HTTP 302 Found (Redirect to /notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTTP 304 Not Modified (HTML document)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: HTTP 304 Not Modified (main.css)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: HTTP 304 Not Modified (main.js)
    deactivate server

    Note right of browser: The browser starts executing JS to fetch JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    Note left of server: The server returns JSON including the new note
    server-->>browser: 200 OK (data.json)
    {
        "content": "hallo 1337 ",
        "date": "2026-03-07T20:54:00.786Z"
    }"
    deactivate server

    Note right of browser: The browser executes the callback to render new data