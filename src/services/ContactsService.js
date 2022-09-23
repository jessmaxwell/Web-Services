import axios from 'axios'

//The base URL (loaded on run of application)
const contacts_rest_api_url = 'http://localhost:8080/contacts';
//The URL required when searching by telephone number 
const tel_contacts_rest_api_url = 'http://localhost:8080/contacts/tel';
//The URL required when searching by city
const city_contacts_rest_api_url = 'http://localhost:8080/contacts/city';

/** 
    The ContactsService class includes the methods required to call the RESTfull API (Contact Database)
    The database calls and generates return messages using the axios library
*/
class ContactsService {
  getContacts() {
    return axios.get(contacts_rest_api_url);
  }

  getContactByTel(telephone) {
    return axios.get(tel_contacts_rest_api_url + '/' + telephone);
  }

   getContactByCity(city){
    return axios.get(city_contacts_rest_api_url + '/' + city);
  }

  deleteContact(telephone){
    return axios.delete(contacts_rest_api_url + '/' + telephone);
  }

  deleteAllContacts(){
    return axios.delete(contacts_rest_api_url);
  }

  updateContact(contact, contactTel){
    return axios.put(contacts_rest_api_url  + '/' + contactTel, contact);
  }   
}

export default new ContactsService();