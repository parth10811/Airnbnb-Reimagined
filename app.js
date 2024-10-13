document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const searchInput = document.getElementById('search');
    let contacts = [];

    // Add a new contact
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        const newContact = { name, email, phone };
        contacts.push(newContact);
        displayContacts();
        contactForm.reset();
    });

    // Display contacts
    function displayContacts(filteredContacts = contacts) {
        contactList.innerHTML = '';
        filteredContacts.forEach((contact, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.email}</td>
                <td>${contact.phone}</td>
                <td>
                    <button onclick="editContact(${index})">Edit</button>
                    <button onclick="deleteContact(${index})">Delete</button>
                </td>
            `;
            contactList.appendChild(row);
        });
    }

    // Delete a contact
    window.deleteContact = function(index) {
        contacts.splice(index, 1);
        displayContacts();
    };

    // Edit a contact
    window.editContact = function(index) {
        const contact = contacts[index];
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('phone').value = contact.phone;
        deleteContact(index);
    };

    // Search for contacts
    searchInput.addEventListener('input', function() {
        const searchValue = searchInput.value.toLowerCase();
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchValue) ||
            contact.email.toLowerCase().includes(searchValue) ||
            contact.phone.includes(searchValue)
        );
        displayContacts(filteredContacts);
    });

    // Initial display
    displayContacts();
});
