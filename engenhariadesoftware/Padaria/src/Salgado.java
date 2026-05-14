public class Salgado {
    private String nome;
    private String sabor;
    private Double valor;

    public Salgado(String nome, String sabor, Double valor) {
        this.nome = nome;
        this.sabor = sabor;
        this.valor = valor;
    }

    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getSabor() {
        return sabor;
    }
    public void setSabor(String sabor) {
        this.sabor = sabor;
    }
    public Double getValor() {
        return valor;
    }
    public void setValor(Double valor) {
        this.valor = valor;
    }
    public Boolean comparar(String salgado) {
        if (this.nome.equals(salgado) && this.sabor.equals(sabor) && this.valor.equals(valor)) {
            return true;
        } else {
            return false;
        }
    }


}

//
//    public Boolean comparar(Jogo jogo) {
//        if(this.titulo.equals(jogo.titulo) && this.produtora.equals(jogo.produtora) && this.estilo.equals(jogo.estilo)) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//}