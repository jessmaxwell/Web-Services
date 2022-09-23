package com.example.assignment;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Set;


public class ContactRepository { 
	 
	 private Set<Contact> contacts = Collections.newSetFromMap(new LinkedHashMap<>()); 
	 	  
	 public ContactRepository() { 
		 
		 contacts.add(new Contact("Geller", "Ross", "Fossils street, New York , 10069" , "9847598374659"));   
		 contacts.add(new Contact("Geller", "Monica", "Chef street, New York , 10012", "8405879347"));        
		 contacts.add(new Contact("Bing", "Chandler", "Transponster street, New York , 10017", "98394729485")); 
		 contacts.add(new Contact("Green", "Rachel", "Newark street, New York , 10065" , "9875638492")); 
		 contacts.add(new Contact("Tribiani", "Joe" , "Central, New York , 98342", "112233445566")); 
		 contacts.add(new Contact("Buffay", "Phoebe", "Union street, Stirling , FK8 1NZ", "0044 111185599")); 
		 contacts.add(new Contact("Litman-Goralnik", "Janice", "Kition street, Lim,  7550", "99001122")); 
		 contacts.add(new Contact("Central-perk", "Gunther", "University, Stirling , FK9 4LD", "0044 3456785599")); 

	 } 
	 	  
	 public Set<Contact> getContacts() { 
	 	 return contacts; 
	 }  
	 public Contact getContactByName(String name) {  	
		 for (Contact temp : contacts) { 
	 	        if(temp.getName().equalsIgnoreCase(name))  	  
	 	        	return temp; 
	 	     } 
	 	 return new Contact("","","",""); 
	 } 
	 
//	 public Contact getContactByFirstName(String firstName) {  	
//		 for (Contact temp : contacts) { 
//	 	        if(temp.getFirstName().equalsIgnoreCase(firstName))  	  
//	 	        	return temp; 
//	 	     } 
//	 	 return new Contact("","","",""); 
//	 } 
//	 
//	 public Contact getContactByAddress(String address) {  	
//		 for (Contact temp : contacts) { 
//	 	        if(temp.getAddress().equalsIgnoreCase(address))  	  
//	 	        	return temp; 
//	 	     } 
//	 	 return new Contact("","","",""); 
//	 } 
//	 
//	 public Contact getContactByTelephoneNumber(String telephoneNumber) {  	
//		 for (Contact temp : contacts) { 
//	 	        if(temp.getTelephoneNumber().equalsIgnoreCase(telephoneNumber))  	  
//	 	        	return temp; 
//	 	     } 
//	 	 return new Contact("","","",""); 
//	 } 
	 	  
	 public boolean editContact(Contact contact) { 
		 contacts.removeIf(existingContact -> 
	                          (existingContact.getTelephoneNumber().contentEquals(contact.getTelephoneNumber()))); 
	 return contacts.add(contact); 
	 } 
	 	  
	 public boolean removeContact(String name, String firstName, String address , String telephoneNumber) {  
		 if(name.equals("")) 
	 	 	 return contacts.removeIf(existingContact ->  
	                                   (existingContact.getName().contentEquals(name)));  	
	 else return contacts.removeIf(existingContact ->  
	                                 (existingContact.getName().contentEquals(name) &&                     
	                                		 existingContact.getFirstName().contentEquals(firstName)) &&
	                                 existingContact.getAddress().contentEquals(address) &&
			 existingContact.getTelephoneNumber().contentEquals(telephoneNumber));}
		 
	 	  
	 public boolean addContact(Contact contact) { 
	 	 return contacts.add(contact); 
	 } 
	}
