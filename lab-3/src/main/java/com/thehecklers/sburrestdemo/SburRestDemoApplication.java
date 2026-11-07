package com.thehecklers.sburrestdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@SpringBootApplication
public class SburRestDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SburRestDemoApplication.class, args);
	}

}
@CrossOrigin(origins = {"http://localhost:8080","http://127.0.0.1:5500"})
@RestController
@RequestMapping("/hamburgueria")
class RestApiDemoController {

	private final HamburguerRepository repository;

	public RestApiDemoController(HamburguerRepository repository) {
		this.repository = repository;
	}

	// GET - Listar todos os hambúrgueres
	@GetMapping
	public List<Hamburguer> getHamburgueria() {
		return repository.findAll();
	}

	// GET - Buscar hambúrguer por ID
	@GetMapping("/{id}")
	public ResponseEntity<Hamburguer> getHamburguerById(
			@PathVariable String id) {

		return repository.findById(id)
				.map(ResponseEntity::ok)
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	// POST - Cadastrar novo hambúrguer
	@PostMapping
	public ResponseEntity<Hamburguer> postHamburguer(
			@RequestBody Hamburguer hamburguer) {

		Hamburguer salvo = repository.save(hamburguer);

		return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
	}

	// PUT - Atualizar hambúrguer existente
	@PutMapping("/{id}")
	public ResponseEntity<Hamburguer> putHamburguer(
			@PathVariable String id,
			@RequestBody Hamburguer hamburguer) {

		return repository.findById(id)
				.map(existente -> {
					existente.setName(hamburguer.getName());

					Hamburguer atualizado = repository.save(existente);

					return ResponseEntity.ok(atualizado);
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	// DELETE - Excluir hambúrguer
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteHamburguer(
			@PathVariable String id) {

		if (!repository.existsById(id)) {
			return ResponseEntity.notFound().build();
		}

		repository.deleteById(id);

		return ResponseEntity.noContent().build();
	}
}