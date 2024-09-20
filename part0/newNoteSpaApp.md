sequenceDiagram
participant Browser
participant Server

    Browser->>Server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa (with the note in the payload)
    Server-->>Browser: 201 Created (success response)
    Browser: Update note list dynamically without page refresh