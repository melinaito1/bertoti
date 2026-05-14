import java.util.List;
import java.util.LinkedList;

public class Padaria {
    private List<Salgado> salgados = new LinkedList<Salgado>();

    public void cadastrarSalgado(Salgado salgado) {
        salgados.add(salgado);
    }
    public List<Salgado> buscarSalgadoNome(String salg){
        List<Salgado> encontrados = new LinkedList<Salgado>();
        for(Salgado salgado:salgados) {
            if (salgado.comparar(salg))
                encontrados.add(salgado);
        }
        return encontrados;
    }

    public List<Salgado> getSalgados(){
        return salgados;
    }

}
//import java.util.List;
//import java.util.LinkedList;
//
//public class Steam {
//    private List<Jogo> jogos = new LinkedList<Jogo>();
//
//    public void cadastrarJogo(Jogo jogo){
//        jogos.add(jogo);
//    }
//
//    public List<Jogo> buscarJogoTituloProdutora(Jogo jog) {
//        List<Jogo> encontrados = new LinkedList<Jogo>();
//        for(Jogo jogo:jogos) {
//            if (jogo.comparar(jog)) {
//                encontrados.add(jogo);
//            }
//        }
//        return encontrados;
//    }
//
//    public List<Jogo> getJogos() {
//        return jogos;
//    }
//}