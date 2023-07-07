import React, {useState, useEffect} from "react";
import { nanoid } from 'nanoid';
import Form from '../components/Form/Form';
import FormSearch from 'components/Form/FormSearch';
import ContactsList from './ContactsList/ContactsList';
import css from './Form/Form.module.css';

const LS_KEY = 'contactsLS';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addItem = (e) => {
    const { name, number } = e;
    if (contacts.find((contact) => name === contact.name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = { id: nanoid(), name, number };
    setContacts((prevState) => [...prevState, newContact]);
  };

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const filterList = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteItem = (id) => {
    setContacts((prevState) => prevState.filter((contact) => contact.id !== id));
  };

  return (
    <React.Fragment>
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onSubmit={addItem} />
        <h2>Contacts</h2>
        <FormSearch filter={filter} onChangeFilter={handleChange} />
        <ContactsList contacts={filterList()} onDeleteItem={deleteItem} />
      </div>
    </React.Fragment>
  );
}

