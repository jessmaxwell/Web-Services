package com.example.assignment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class AssignmentContactsApplication{
	

	@Bean 
 	protected ContactRepository contactRepository() { 
 	    return new ContactRepository(); 
 	} 
	
	public static void main(String[] args) {
		SpringApplication.run(AssignmentContactsApplication.class, args);
	}

//	@Override
//	public void run(String... args) throws Exception {
//		contact.add(new Contact("Geller", "Monica", "he street, new york , ABC DEF", "2"));        
//		this.contactRepository.save(new Contact("Bing", "Chandler", "helo street, new york , ABC DEF", "3")); 
//		this.contactRepository.save(new Contact("Green", "Rachel", "hllo street, new york , ABC DEF" , "4")); 
//		this.contactRepository.save(new Contact("Tribiani", "Joe" , "hlo street, new york , ABC DEF", "5")); 
//		this.contactRepository.save(new Contact("Buffay", "Phoebe", "ello street, new york , ABC DEF", "6"));   
//		this.contactRepository.save(new Contact("Geller", "Ross", "hello street, new york , ABC DEF" , "1"));   
//	}
		

}
