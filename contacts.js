const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contacts = path.resolve("./db/contacts.json");

// TODO: udokumentuj każdą funkcję
async function listContacts() {
  try {
    console.log("Contact list");
    const data = await fs.readFile(contacts);
    console.log(data);
    return console.table(JSON.parse(data));
  } catch (error) {
    return console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    console.log(`Contact with id: ${contactId}`);
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);
    return dataParse.map((data) => {
      if (data.id === contactId) {
        return console.table(data);
      }
    });
  } catch (error) {
    return console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);
    const contactsWithout = dataParse.filter((contact) => contact.id !== contactId);

    fs.writeFile(contacts, JSON.stringify(contactsWithout));
    console.log(`Contact with id: ${contactId} was deleted.`);
    listContacts();
  } catch (error) {
    return console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contacts);

    const dataParse = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    };

    dataParse.push(newContact)


    fs.writeFile(contacts, JSON.stringify(dataParse));
    console.log(`Contact with id: ${newContact.id} was added.`);
    listContacts();
  } catch (error) {
    return console.log(error);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
