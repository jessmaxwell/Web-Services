package com.example.assignment;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "http://localhost:3000")
@RestController 
@RequestMapping("/")

public class ContactController  { 
	
	
	@Autowired 
 	private ContactRepository contactRepository; 
	

	@GetMapping("/contactBook") 
    public Set<Contact> getContacts() {      
 		return contactRepository.getContacts(); 
    } 
	
 	@GetMapping("/contactBook/find/{name}")  
 	public Contact getContactByName(@PathVariable String name) {   
 		return contactRepository.getContactByName(name);     }
	
	@PutMapping("/contactBook/{name}") 
    public Contact addContact(@RequestBody Contact myContact) {  	 
 		if (contactRepository.addContact(myContact)) 
 	 	 	 	return myContact; 
 	 	 	else return new Contact();  
 	  }  
	
	@PostMapping("/contactBook/edit/{name}") 
    public Contact editContact(@RequestBody Contact myContact) {  	 
 		if (contactRepository.addContact(myContact)) 
 	 	 	 	return myContact; 
 	 	 	else return new Contact();  
 	  }  
	
	@DeleteMapping("/contactBook/delete/{name}") 
    public String deleteContact(@PathVariable String name) {  	 
 		if (contactRepository.removeContact(name, "", "", ""))
 	 	 	 	return "Success"; 
 	 	 	else return "Error";  
 	  } 
 	  
 
}
 
 	
