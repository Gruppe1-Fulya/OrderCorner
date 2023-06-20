package com.tau.inf208.project.ecommerce.customer;

import java.util.List;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;

	public CustomerService(CustomerRepository customerRepository) {
		this.customerRepository = customerRepository;
	}
	
	public List<Customer> findAllCustomers(){
		return customerRepository.findAll();
	}
	
	public Customer findByUsername(String username) {
		List<Customer> customers = customerRepository.findAll();
		Predicate<? super Customer> predicate = 
				customer -> customer.getUsername().equals(username);
		Customer customer = customers.stream().filter(predicate).findFirst().get();
		return customer;
	}
	
	

}
