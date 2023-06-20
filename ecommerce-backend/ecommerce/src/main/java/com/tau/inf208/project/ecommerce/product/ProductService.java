package com.tau.inf208.project.ecommerce.product;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	
	private static List<Product> products = new ArrayList<>();
	
	ProductRepository productRepository;
	
	@Autowired
	public ProductService(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}
	
	
	public void deleteById(int id) {
		Predicate<? super Product> predicate = 
				product -> product.getId() == id;
		products.removeIf(predicate);
	}
	
	public Product findById(int id) {
		List<Product> productsList = productRepository.findAll();
		Predicate<? super Product> predicate = 
				product -> product.getId() == id;
		Product product = productsList.stream().filter(predicate).findFirst().get();
		return product;
	}
	
	public Product findByProductName(String productName) {
		List<Product> products = productRepository.findAll();
		Predicate<? super Product> predicate = 
				product -> product.getProductName().equals(productName);
		Product product = products.stream().filter(predicate).findFirst().get();
		return product;
	}
	
	public void updateProduct(Product product) {
		deleteById(product.getId());
		products.add(product);
	}
	
	public List<Product> getProductsInCart() {
		List<Product> products = productRepository.findAll();
		Predicate<? super Product> predicate = 
				product -> product.getCartAmount() > 0;
		List<Product> productsInCart = products.stream().filter(predicate).toList();
		return productsInCart;
	}
	
	public void save(Product product) {
		productRepository.save(product);
	}

}
