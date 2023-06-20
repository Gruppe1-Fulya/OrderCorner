package com.tau.inf208.project.ecommerce.customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Customers")
public class Customer {
	
	public Customer() {
		
	}
	
	@Id
	@GeneratedValue
	private int customerId;
	
	private String name;
	private String lastName;
	private String username;
	private String password;
	private String shoppingPassword;
	private String email;
	private String phoneNumber;
	private double wallet;
	private String lastCheckedProductName;
	
	
	
	public Customer(int customerId, String name, String lastName, String username, String email, String phoneNumber,
			double wallet, String lastCheckedProductName, String password, String shoppingPassword) {
		super();
		this.customerId = customerId;
		this.name = name;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.shoppingPassword = shoppingPassword;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.wallet = wallet;
		this.lastCheckedProductName = lastCheckedProductName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getShoppingPassword() {
		return shoppingPassword;
	}
	public void setShoppingPassword(String shoppingPassword) {
		this.shoppingPassword = shoppingPassword;
	}
	public int getCustomerId() {
		return customerId;
	}
	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public double getWallet() {
		return wallet;
	}
	public void setWallet(double wallet) {
		this.wallet = wallet;
	}
	public String getLastCheckedProductName() {
		return lastCheckedProductName;
	}
	public void setLastCheckedProductName(String lastCheckedProductName) {
		this.lastCheckedProductName = lastCheckedProductName;
	}
	@Override
	public String toString() {
		return "Customer [customerId=" + customerId + ", name=" + name + ", lastName=" + lastName + ", username="
				+ username + ", email=" + email + ", phoneNumber=" + phoneNumber + ", wallet=" + wallet
				+ ", lastCheckedProductName=" + lastCheckedProductName + "]";
	}
	

}

