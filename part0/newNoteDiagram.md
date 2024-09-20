 essequenceDiagram
participant Browser
participant Server

    Browser->>Server: GET /exampleapp/notes
    Server-->>Browser: HTML with form for entering note
    
    Browser->>Server: POST /exampleapp/new_note (with the note in the payload)
    Server-->>Server: Process and save the note
    
    Server-->>Browser: Redirect a /exampleapp/notes
    
    Browser->>Server: GET /exampleapp/notes
    Server-->>Browser: HTML with the new note

