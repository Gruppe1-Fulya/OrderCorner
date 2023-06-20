package com.tau.inf208.project.ecommerce.product;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ProductResource {
	
	@Autowired
	ProductService productService;
	
	ProductRepository productRepository;
	
	public ProductResource(ProductService productService, ProductRepository productRepository) {
		this.productService = productService;
		this.productRepository = productRepository;
	}
	
	@GetMapping("/products")
	public List<Product> retrieveAllProducts(){
		return productRepository.findAll();
	}
	
	@GetMapping("/products/{id}")
	public Product retrieveProduct(@PathVariable int id) {
		return productRepository.findById(id).get();
	}
	
	
	@DeleteMapping("/products/{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable int id){
		productService.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	/*
	@PutMapping("/users/{username}/products/update-products/{id}")
	public void updateProduct(@PathVariable String username,
								@PathVariable int id) {
		productService.save(product);
	}
	*/
	
	@PutMapping("/products/{id}")
	public void addToCart(@PathVariable int id) {
		Product product = productRepository.findById(id).get();
		if(product.getStock() > product.getCartAmount() + 1) {			
			product.setCartAmount(product.getCartAmount()+1);
			product.setStock(product.getStock() - 1);
		}
		productRepository.save(product);
	}
	
	@PutMapping("/products/{id}/remove")
	public void removeFromCart(@PathVariable int id) {
		Product product = productRepository.findById(id).get();
		if(product.getCartAmount() > 0) {
			product.setCartAmount(product.getCartAmount()-1);
			product.setStock(product.getStock() + 1);
		}
		productRepository.save(product);
	}
	
	@GetMapping("/{category}/products")
	public List<Product> retrieveProductsByCategory(@PathVariable String category) {
		List<Product> filtered_products = new ArrayList<>();
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			if (product.getCategory().toLowerCase().equals(category)) {
				filtered_products.add(product);
			}
		}
		return filtered_products;
	}
	
	@PutMapping("/products/{id}/update-cartAmount/{newCartAmount}")
	public void updateCartAmount(@PathVariable int id, @PathVariable int newCartAmount) {
		Product product = productRepository.findById(id).get();
		if(product.getStock() > newCartAmount) {
			product.setCartAmount(newCartAmount);
			product.setStock(product.getStock() - newCartAmount);
		}
		productRepository.save(product);
	}

}
