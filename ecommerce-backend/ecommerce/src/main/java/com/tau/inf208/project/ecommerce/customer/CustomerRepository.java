package com.tau.inf208.project.ecommerce.customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer>{
	
	public Customer findByUsername(String username);
	
	
}
