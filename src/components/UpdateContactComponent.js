import React, { Component } from 'react'
import ContactsService from '../services/ContactsService';

/**
 * The component of the application that is used to update a contact record
 */
class UpdateContactComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {

            telephone: this.props.match.params.id,
            firstname: '',
            lastname: '',
            street: '',
            city: '',
            postcode: ''
        };
        this.updateTel = this.updateTel.bind(this);
        this.updateFirstname = this.updateFirstname.bind(this);
        this.updateLastname = this.updateLastname.bind(this);
        this.updateStreet = this.updateStreet.bind(this);
        this.updateCity = this.updateCity.bind(this);
        this.updatePostcode = this.updatePostcode.bind(this);
        this.updateContact = this.updateContact.bind(this);
    }

    /**
     * 
     * @param {*} e 
     * This method will update the selected contact based on the data input in the text fields
     */
    updateContact = (e) => {
        
        e.preventDefault();
        let contacts = {
            telephone: this.state.telephone,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            street: this.state.street,
            city: this.state.city,
            postcode: this.state.postcode
        };

        /** Check that each field is filled in
          *   - Return alert to the user if a field is empty - cannot update if this is the case
          */
        if(this.state.telephone.trim() === ''
            || this.state.firstname.trim() === ''
            || this.state.lastname.trim() === ''
            || this.state.street.trim() === ''
            || this.state.city.trim() === ''
            || this.state.postcode.trim() === '' ){
            alert("All fields must be filled");

        /** If all fields are filled in then update the contact with the new details
         *  Return an alert to the user that the contact has been updated
         *  Return to the main component 
         */
        } else {
            
            console.log('contacts => ' + JSON.stringify(contacts)); //convert the contact object to a string
            console.log('telephone => ' + JSON.stringify(this.state.telephone)); // convert the telephone field object to a string
            ContactsService.updateContact(contacts, this.state.telephone).then( () => {
                alert("Contact Updated");
                this.props.history.push('/contacts');
            });
        }
    };

    /**
    * 
    * @param {*} event - used to retrieve the input data from the text elements which will be used to update the contact
    */
    updateTel= (event) => {
        this.setState({telephone: event.target.value});
    };

    updateFirstname= (event) => {
        this.setState({firstname: event.target.value});
    };

    updateLastname= (event) => {
        this.setState({lastname: event.target.value});
    };

    updateStreet= (event) => {
        this.setState({street: event.target.value});
    };

    updateCity= (event) => {
        this.setState({city: event.target.value});
    };

    updatePostcode= (event) => {
        this.setState({postcode: event.target.value});
    };

    cancel(){
        this.props.history.push('/contacts');
    }

    /** Called right after the component is mounted 
    *    - Called each time the component is edited (i.e. a field is changed)
    */
    componentDidMount(){
        ContactsService.getContactByTel(this.state.telephone).then( (res) =>{
            let contacts = res.data;

            this.setState({
                telephone: contacts.telephone,
                firstname: contacts.firstname,
                lastname: contacts.lastname,
                street: contacts.street,
                city: contacts.city,
                postcode : contacts.postcode
            });
        });
    }

    //Add elements to the component
    render() {
        return (
            <div>
                <br /><br />
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Update Contact</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Telephone: </label>
                                        <input  name="telephone" className="form-control" maxLength="11" disabled ="disabled"
                                                value={this.state.telephone} onChange={this.updateTel}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstname" className="form-control" maxLength="50"
                                               value={this.state.firstname} onChange={this.updateFirstname}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastname" className="form-control" maxLength="50"
                                               value={this.state.lastname} onChange={this.updateLastname}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Street: </label>
                                        <input placeholder="Street Address" name="street" className="form-control" maxLength="50"
                                               value={this.state.street} onChange={this.updateStreet}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> City: </label>
                                        <input placeholder="City" name="city" className="form-control" maxLength="40"
                                               value={this.state.city} onChange={this.updateCity}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> Post Code: </label>
                                        <input placeholder="Post Code" name="postcode" className="form-control" maxLength="7"
                                               value={this.state.postcode} onChange={this.updatePostcode}/>
                                    </div>
                                    <button className="btn btn-success" onClick={this.updateContact}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default UpdateContactComponent
