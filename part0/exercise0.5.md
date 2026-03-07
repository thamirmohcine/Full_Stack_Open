sequenceDiagram
    participant browser
    participant server

    Note right of browser: User visits the SPA version of the notes app

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: 304 Not Modified (HTML document)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 304 Not Modified (main.css)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: 304 Not Modified (spa.js)
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code (spa.js)

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: 304 Not Modified (data.json)
    deactivate server

    Note over browser, server: The 304 status indicates the resources are fetched from browser cache