import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class Teste {
    @Test
    public void test() {
        Padaria bib = new Padaria();
        bib.cadastrarSalgado(new Salgado("Hamburgao", "Cheddar", 10.0));
        assertEquals(bib.getSalgados().size(), 1);
        List<Salgado> encontrados = bib.buscarSalgadoNome("Hamburgao");
        assertEquals(encontrados.get(0).getSabor(), "Cheddar");

    }
}
