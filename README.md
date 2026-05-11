# Travel & Contact Manager
**Author:** [Moses Emonde]

## Description
A comprehensive application to manage personal contacts and track travel destinations.

## Setup Instructions
1. Clone this repository.
2. Open `index.html` 

## Business Logic Tests (TDD)

### Describe: AddressBook()
* **Test:** "It should create an empty AddressBook with an ID counter."
  * **Code:** `let book = new AddressBook();`
  * **Expected Output:** `AddressBook { contacts: {}, currentId: 0 }`

### Describe: Contact()
* **Test:** "It should create a contact with first, last, and phone properties."
  * **Code:** `let person = new Contact
  * **Expected Output:** `{ firstName, lastName: , phoneNumber:  }`

### Describe: TravelLog()
* **Test:** "It should store destinations in an object keyed by ID."
  * **Code:** `let log = new TravelLog(); let p = new Place("Paris"); log.addPlace(p);`
  * **Expected Output:** `log.places[1].location === "Paris"`

## License
Copyright (c) 2026 [Moses Emonde
]. MIT License.
