package com.tau.inf208.project.ecommerce.customer;

import java.util.ArrayList;
import java.util.List;

import com.tau.inf208.project.ecommerce.product.ProductRepository;
import com.tau.inf208.project.ecommerce.product.ProductService;
import com.tau.inf208.project.ecommerce.product.Product;

import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CustomerResource {
	
	@Autowired
	CustomerService customerService;
	
	CustomerRepository customerRepository;
	ProductRepository productRepository;
	ProductService productService;
	
	public CustomerResource(CustomerRepository customerRepository,CustomerService customerService,
			ProductRepository productRepository, ProductService productService) {
		this.customerRepository = customerRepository;
		this.customerService = customerService;
		this.productRepository = productRepository;
		this.productService = productService;
	}
	
	@GetMapping("/customers")
	public List<Customer> retrieveAllCustomers() {
		return customerRepository.findAll();
	}
	
	@PutMapping("/{username}/last-checked/{productId}")
	public void changeLastCheckedProduct(@PathVariable String username,
			@PathVariable int productId) {
		List<Customer> customers = customerRepository.findAll();
		List<Product> products = productRepository.findAll();
		Predicate<? super Product> predicate = 
				product -> product.getId() == productId;
		Predicate<? super Customer> predicate2 = 
				customer -> customer.getUsername().equals(username);
		Customer customer = customers.stream().filter(predicate2).findFirst().orElse(null);
		Product product = products.stream().filter(predicate).findFirst().get();
		customer.setLastCheckedProductName(product.getProductName());
		customerRepository.save(customer);
	}
	
	/*
	@GetMapping("{username}/last-checked")
	public String retrieveLastCheckedProductName(@PathVariable String username) {
		List<Customer> customers = customerRepository.findAll();
		Predicate<? super Customer> predicate = 
				customer -> username.equals(customer.getUsername());
		Customer customer = customers.stream().filter(predicate).findFirst().get();
		return customer.getLastCheckedProductName();
	}
	*/
	
	@GetMapping("/{username}/last-checked-product")
	public Product retrieveLastCheckedProduct(@PathVariable String username) {
		Customer customer = customerService.findByUsername(username);
		Product product = productService.findByProductName(customer.getLastCheckedProductName());
		return product;
	}
	
	@GetMapping("/{username}/cart")
	public List<Product> retrieveProductsInCart(@PathVariable String username) {
		Customer customer = customerService.findByUsername(username);
		return productService.getProductsInCart();
	}
	
	@GetMapping("/{username}/wallet")
	public double retrieveWallet(@PathVariable String username) {
		return customerService.findByUsername(username).getWallet();
	}
	
	@PutMapping("/{username}/update-wallet/{totalCartAmount}")
	public void updateWallet(@PathVariable String username, @PathVariable double totalCartAmount) {
		Customer customer = customerService.findByUsername(username);
		if (customer.getWallet() > totalCartAmount) {
			customer.setWallet(customer.getWallet() - totalCartAmount);
		}
		customerRepository.save(customer);
	}
	
	@GetMapping("/{username}/profile")
	public Customer retrieveCustomerInfos(@PathVariable String username) {
		Customer customer = customerService.findByUsername(username);
		return customer;
	}
	
	@PutMapping("/{username}/update-profile/{name}/{lastName}/{phoneNumber}/{wallet}")
	public void updateProfile(@PathVariable String username, @PathVariable String name, @PathVariable String lastName,
			@PathVariable String phoneNumber, @PathVariable double wallet) {
		Customer customer = customerService.findByUsername(username);
		customer.setName(name);
		customer.setLastName(lastName);
		customer.setPhoneNumber(phoneNumber);
		customer.setWallet(wallet);
		customerRepository.save(customer);
	}
	
	@GetMapping("/usernames")
	public String retrieveAllUsernames() {
		List<Customer> customers = customerRepository.findAll();
		String usernameString = "";
		for(int i = 0; i < 1; i++) {
			usernameString = customers.get(i).getUsername();
		}
		return usernameString;
	}
	
	@GetMapping("/passwords")
	public String retrieveAllPasswords() {
		List<Customer> customers = customerRepository.findAll();
		String passwordString = "";
		for(int i = 0; i < 1; i++) {
			passwordString = customers.get(i).getPassword();
		}
		return passwordString;
	}
	
	@GetMapping("/{username}/totalAmount")
	public double getTotalCartAmount(@PathVariable String username) {
		double totalAmount = 0;
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			if(product.getCartAmount() > 0) {
				totalAmount += product.getPrice() * product.getCartAmount();
			}
		}
		return totalAmount;
	}
	
	@GetMapping("/{username}/shopping-password")
	public String getShoppingPassword(@PathVariable String username) {
		Customer customer = customerService.findByUsername(username);
		return customer.getShoppingPassword();
	}

	
}
