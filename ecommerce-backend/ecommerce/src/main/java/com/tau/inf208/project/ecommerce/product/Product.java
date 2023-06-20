package com.tau.inf208.project.ecommerce.product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "Products")
public class Product {
	
	public Product() {
		
	}
	
	@Id
	@GeneratedValue
	private int id;
	
	private String productName;
	private double price;
	private int stock;
	private int cartAmount;
	private String category;
	
	
	public Product(int id,String productName, double price, int stock, int cartAmount, String category) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.stock = stock;
		this.cartAmount = cartAmount;
		this.category = category;
		
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getStock() {
		return stock;
	}
	public void setStock(int stock) {
		this.stock = stock;
	}

	public int getCartAmount() {
		return cartAmount;
	}

	public void setCartAmount(int cartAmount) {
		this.cartAmount = cartAmount;
	}


	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "Product [id=" + id + ", productName=" + productName + ", price=" + price + ", stock=" + stock
				+ ", cartAmount=" + cartAmount + "]";
	}

		

}

