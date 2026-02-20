
1. Comentar com suas palavras o primeiro trecho do livro Software Engineering at Google, Oreilly. (primeiro post)<br>
   <br>O trecho busca esclarecer que programar não é exatamente o mesmo que fazer engenharia de software. Enquanto a programação costuma estar associada ao ato de escrever código, a engenharia de software envolve uma visão mais ampla, como aplicar conhecimento teórico, pensar em processos, confiabilidade e impacto real dos sistemas que estão sendo construídos. A comparação com engenharias tradicionais reforça essa ideia, e outras áreas já operam com padrões rigorosos porque erros podem gerar consequências graves, algo que historicamente nem sempre ocorreu no desenvolvimento de software.
   Ao mesmo tempo, os autores sugerem que essa realidade está mudando. À medida que o software passa a fazer parte de praticamente tudo (infraestrutura, serviços e decisões do cotidiano) torna-se necessário adotar práticas mais maduras e disciplinadas. A perspectiva do Google aparece como a de quem vive problemas de escala e manutenção contínua, mostrando que engenharia de software não é só criar algo que funciona hoje, mas garantir que continue funcionando bem ao longo do tempo. No fundo, o trecho mostra que o desenvolvimento de software deve ser visto como uma engenharia responsável, que equilibra teoria, prática e impacto no mundo real.

2. Comentar com suas palavras o segundo trecho do livro Software Engineering at Google, Oreilly.(segundo post)<br>
   <br>Esse trecho reforça a ideia de que engenharia de software não é só escrever código, mas cuidar de tudo o que permite que ele continue útil ao longo do tempo. Quando os autores falam em “programming integrated over time”, eles lembram que o verdadeiro desafio não é fazer algo funcionar hoje, e sim garantir que o sistema consiga evoluir, mudar e ainda fazer sentido daqui a anos.
   Os três princípios (tempo e mudança, escala e crescimento e trade-offs e custos) trazem uma visão bem prática do dia a dia, o código vai precisar se adaptar, as equipes vão crescer e cada decisão técnica tem um preço. Bons engenheiros pensam além da solução imediata e escrevem software considerando as pessoas e os problemas que virão depois, não apenas o momento atual.
<br>

   3- Requisitos não funcionais<br>
   Listar 5 requisitos não funcionais e descrevê-los com suas palavras (ver slides 8, 9 e 10)
   <br>
   
   Auditabilidade: um sistema deve ter a capacidade de registrar ações e eventos para que possam ser verificados posteriormente, é importante conseguir rastrear ações.<br>
   Integridade: a informação deve se manter na sua forma original, não pode ser alterada sem autorização. Dados devem ser consistentes e precisos durante todo o seu ciclo de vida. <br>
   Usabilidade: o sistema deve ser intuitivo, fácil de se usar e de se aprender. O usuário deve ter uma boa experiência ao utilizar o sistema. <br>
   Segurança: o sistema deve ser seguro e protegido contra acessos não autorizados e ataques. Deve ter mecanismos de autenticação, criptografia, etc. <br>
   Escalabilidade: o sistema deve ser capaz de lidar com um aumento na quantidade de usuários ou de dados sem perder desempenho.<br>


   4 - Trade-offs (negociação entre requisitos não funcionais)<br>
   Citar e descrever 3 cenários de trade-offs (ver slide 12, mas usar outros exemplos)
   <br>
   
   Segurança versus usabilidade: quanto mais barreiras de segurança (como autenticação de dois fatores, senhas complexas, etc), menor a usabilidade e pior a experiência do usuário. <br>
   Velocidade de entrega versus Qualidade técnica: dilema entre lançar rápido uma funcionalidade ou investir mais tempo em refatoração, testes, arquitetura. Caso priorize a velocidade corre o risco de entregar um projeto sem qualidade, e com uma experiência do usuário prejudicada. Se priorizar qualidade, o software tende a ser mais estável e sustentável, porém demora mais para chegar ao usuário. <br>
   Flexibilidade versus Simplicidade: dilema entre criar uma arquitetura preparada para muitos cenários futuros ou algo direto para resolver o problema atual. Mais flexibilidade: aumenta a capacidade de evolução, mas também a complexidade. Mais simplicidade: acelera o desenvolvimento e reduz bugs, porém pode limitar mudanças futuras. <br>
