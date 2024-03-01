# Getting Started

To run the app locally, spin up the docker containers command below, view the app at localhost:3000

```js
docker-compose up
```

# The Help Desk App
## Basic Features
### Ticket Submission
- Users can submit tickets on the home page which can be viewed on the Ticket-List page
- Form values are validated with Zod on the client side and server side. Invalid client-side input is highlighted through the UI visually and will redirect user to the invalid input. Invalid server-side input to the ‘api/ticket’ endpoint will throw an error

### Ticket List
- The ticket list is set up as a table, users can:
    - Sort name, email, date, and status columns
    - Search by description
    - Hide columns for a cleaner display
    - Edit ticket by click on a row to pull a response form
- The ticket list currently displays all tickets in the database. A planned feature would be a separation of active tickets (open or in-progress) from archived tickets (closed)
- If a ticket has been edited by another user, a warning will be displayed to the user that the current ticket they are editing is out of sync. See roadmapped features for plans to synchronize the ticket-list UI with the latest database info

## Roadmapped Features
### Authorization
- Crucial next steps include implementing authorization which would allow the following additional features to be added:
    - Allow a registered users to be associated with a submitted ticket
    - Limit viewing support tickets to authorized reviewers
    - Allow registered users to view a history of their submitted tickets

### Syncing Database with User Interface
- Ideally the ticket-reviewers should have access to the latest information from the database. Ticket-reviewers should also be able to have notifications about new ticket responses or incoming tickets. A future proposal would be implement server sent events to allow realtime data to be streamed from the server

### Additional UI Features
- Improve response form to allow ticket-reviewers to have a communication thread allowing users and reviewers to review past email communication regarding the ticket
- Adding checkboxes to the ticket list to allow multiple tickets to be edited at once
- Ability to prioritize and add notes to tickets