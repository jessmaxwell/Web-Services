import axios from 'axios';
import React from 'react';
import ContactsService from '../services/ContactsService';
const contacts_rest_api_url = 'http://localhost:8080/contacts';
const find_contacts_rest_api_url = 'http://localhost:8080/contacts/tel';

/**
 * The Main Component of the application uses a table to display 
 *    - all contacts in the database
 *    - all contacts after a contact is added to the database
 *    - all contacts after a contact is deleted from the database
 *    - an empty table after all contacts are deleted
 *    - all contacts after a contact is updated (this function is compeleted in the UpdateComponent)
 *    - all contacts after a search has taken place (by telephone or city)
 */
class MainComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: [], //array to hold all the contacts
      search: '',
      telephone: '',
      firstname: '',
      lastname: '',
      street: '',
      city: '',
      postcode: '',
      telephoneSearch: '',
      citySearch: ''
    }
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.getContactByTel = this.getContactByTel.bind(this)
    this.getContactByCity = this.getContactByCity.bind(this)

  }

  getContacts(){
    //Refresh page to display all contacts again
    window.location.reload();
  }

  /**
   * @param {*} telephone - the telephone number of the contact that is being updated
   * The user is taken to the Update Component component to carry out the update
   */
  updateContact(telephone) {
    this.props.history.push(`/update-contacts/${telephone}`);
  }

  /**
   * 
   * @param {*} telephone - the telephone numebr of the contact that is being deleted
   * Alert the user that the delete was successful and then return the new list of contacts excluding the deleted record
   */
  deleteContact(telephone) {
    ContactsService.deleteContact(telephone).then(() => {
      this.setState({ contacts: this.state.contacts.filter(contact => contact.telephone !== telephone) });
      alert("Contact deleted from the database")
    }
    );
  }

  /**
   * 
   * @param {*} telephone - the telephone number of the contact being searched for
   * Search for the contact and then return the contact that matches 
   * An empty list is returned if there are 0 matches
   */
  getContactByTel(telephone){
    ContactsService.getContactByTel(telephone).then(() => {
      this.setState({contacts: this.state.contacts.filter(contact => contact.telephone === telephone)});
    }
      );
    }
  
    /**
     * 
     * @param {*} city - the city being searched for
     * Return the list of contacts that match the selected city
     * An empty list is returned if there are 0 matches
     */
    getContactByCity(city){
      ContactsService.getContactByCity(city).then(() => {
        this.setState({contacts: this.state.contacts.filter(contact => contact.city === city)});
      }
        );
      }

      /** Called right after the component is mounted 
      *   - This will get all contacts from the database and display them
      */
  componentDidMount() {
    ContactsService.getContacts().then((response) => {
      this.setState({ contacts: response.data })
    });

  }

  //Add elements to the component
  render() {

    return (
      <div>
        &nbsp;
        &nbsp;
        &nbsp;
        <h1 className="text-center"> Contact Database </h1>
        &nbsp;
        &nbsp;
        &nbsp;

        <tr>
          <td>
            {/* //Add contact form */}
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label> Telephone: <input type="text" name="telephone" value={this.state.telephone} onChange={this.onTelephone.bind(this)} /> &nbsp;</label>
              <label > Firstname: <input type="text" name="firstname" value={this.state.firstname} onChange={this.onFirstname.bind(this)} /> &nbsp;</label>
              <label> Lastname: <input type="text" name="lastname" value={this.state.lastname} onChange={this.onLastname.bind(this)} /> &nbsp;</label>
              <label> Street: <input type="text" name="street" value={this.state.street} onChange={this.onStreet.bind(this)} /> &nbsp;</label>
              <label> City: <input type="text" name="city" value={this.state.city} onChange={this.onCity.bind(this)} /> &nbsp;</label>
              <label> Postcode: <input type="text" name="postcode" value={this.state.postcode} onChange={this.onPostcode.bind(this)} /> &nbsp;&nbsp;</label>
              <input type ="submit" name="Add" className="btn btn-success" value = "Add Contact"/>
              
              </form>
              </td>
              </tr>
              &nbsp;
              &nbsp;
              &nbsp;

              {/* The display and search options */}
              <tr>
              <td>
              <label>Configure Contact List:</label>
              <td><button onClick={() => this.getContacts()} className="btn btn-info">Show All Contacts</button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.deleteAllContacts()} className="btn btn-info">Delete All Contacts </button></td>
              
              <label>Search by Telephone Number:</label>
              <td><button onClick={() => this.getContactByTel('000000')} className="btn btn-info">Search Tel - 000000 </button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByTel('111111')} className="btn btn-info">Search Tel - 111111 </button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByTel('222222')} className="btn btn-info">Search Tel - 222222 </button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByTel('333333')} className="btn btn-info">Search Tel - 333333 </button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByTel('444444')} className="btn btn-info">Search Tel - 444444 </button></td>
              
              <label>Search by City:</label>
              <td><button onClick={() => this.getContactByCity('Belfast')} className="btn btn-info">Search City - Belfast</button></td>
              <td> &nbsp;&nbsp;<button onClick={() => this.getContactByCity('Stirling')} className="btn btn-info">Search City - Stirling</button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByCity('Limavady')} className="btn btn-info">Search City - Limavady</button></td>
              <td>&nbsp;&nbsp;<button onClick={() => this.getContactByCity('Portrush')} className="btn btn-info">Search City - Portrush</button></td>
              </td>   
              </tr>
              &nbsp;
              &nbsp;
              &nbsp;

              {/* Table to display contact information and buttons */}
              <table className="table table-hover table-striped">
            <thead>
              <tr >
                <th> Telephone </th>
                <th> Firstname </th>
                <th> Lastname </th>
                <th> Street</th>
                <th> City</th>
                <th> Postcode</th>
              </tr>

            </thead>
            <tbody>
              {
                this.state.contacts.map(
                  contacts =>
                    <tr key={contacts.telephone}>
                      <td> {contacts.telephone} </td>
                      <td> {contacts.firstname} </td>
                      <td> {contacts.lastname} </td>
                      <td> {contacts.street} </td>
                      <td> {contacts.city} </td>
                      <td> {contacts.postcode} </td>

                      <td><button onClick={() => this.deleteContact(contacts.telephone)} className="btn btn-danger">DELETE</button>   </td>
                      <td><button onClick={() => this.updateContact(contacts.telephone)} className="btn btn-warning">Update</button></td>

                    </tr>
                )
              }
            </tbody>
          </table>
      </div>
    )
     }
  /**
   * 
   * @param {*} event - used to retrieve the input data from the text elements which will be used to add a new contact
   */
  onTelephone(event){
          this.setState({ telephone: event.target.value })
        }
  onFirstname(event){
          this.setState({ firstname: event.target.value })
        }
  onLastname(event){
          this.setState({ lastname: event.target.value })
        }
  onStreet(event){
          this.setState({ street: event.target.value })
        }
  onCity(event){
          this.setState({ city: event.target.value })
        }
  onPostcode(event){
          this.setState({ postcode: event.target.value })
        }
  onTelephoneSearch(event){
        this.setState({ telephoneSearch: event.target.value })
  }
       
        /** 
         * Search by telephone number (this is the ID of each record sop should return only 1 contact)
         * - Using the GET method
        */
        handleTelSubmit(e) {      
          e.preventDefault();
          axios({
            method: "GET", 
            url: find_contacts_rest_api_url + "/" + this.telephoneSearch,            
            data: this.state
          }).then((response)=>{
            alert("Contact found")
          })
        }

        //Add new contact - uses telephone number as ID and POST method
        handleSubmit(e) {       
        /**
         * The below commented out code is an attempt to ensure that when a contact is added, it cannot have the 
         * same telephone number (ID) as a current contact in the database
         *     - there are multiple if statements as attempts to compare the input telephone number to those in the database
         * Currently, a contact can be added with the same telephone number as a current contact in the database
         */
        
        
        // if(this.state.contacts.some(contacts => (contacts.telephone == this.telephone))){
        // if(this.telephone in this.state.contacts.telephone){
        //  if(this.getContactByTel(this.telephone) == true) {
        //    alert ("Contact Exists - cannot add")
        //  }
        //  else {
          // alert ("Contact does not exist - adding")

          //Check that all fields have been filled in - return alert if not
          if(this.state.telephone.trim() === ''
            || this.state.firstname.trim() === ''
            || this.state.lastname.trim() === ''
            || this.state.street.trim() === ''
            || this.state.city.trim() === ''
            || this.state.postcode.trim() === '' ){
            alert("All fields must be filled");
            }
            //if all fields filled in then add Contact
          else{
          e.preventDefault();
          axios({
            method: "POST", 
            url: contacts_rest_api_url + "/" + this.telephone,            
            data: this.state
          }).then((response)=>{
            window.location.reload();
          })
        }
      }

        /**
         * Delete all contacts from the database using the deleteAllContacts() method in ContactsService
         * This sets the contacts array to be empty
         */  
        deleteAllContacts() {
          ContactsService.deleteAllContacts().then(() => { 
            this.setState({contacts:[]});
          }
          );
        }
}

export default MainComponent