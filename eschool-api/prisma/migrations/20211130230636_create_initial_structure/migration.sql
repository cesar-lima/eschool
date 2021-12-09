-- CreateTable
CREATE TABLE `tipo_usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `sobrenome` VARCHAR(45) NOT NULL,
    `celular` VARCHAR(11) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `senha` VARCHAR(400) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_tipo_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cooperacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `texto` LONGTEXT NOT NULL,
    `id_usuario_visitante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_categoria` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `noticia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(600) NOT NULL,
    `subtitulo` VARCHAR(600) NOT NULL,
    `texto` LONGTEXT NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `data_atualizacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `imagem` LONGTEXT NOT NULL,
    `rascunho` BOOLEAN NOT NULL DEFAULT true,
    `id_categoria` INTEGER NOT NULL,
    `id_usuario_editor` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` LONGTEXT NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_noticia` INTEGER NOT NULL,
    `id_usuario_visitante` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visitas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ip_visita` VARCHAR(30) NOT NULL,
    `id_noticia` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_id_tipo_usuario_fkey` FOREIGN KEY (`id_tipo_usuario`) REFERENCES `tipo_usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cooperacao` ADD CONSTRAINT `cooperacao_id_usuario_visitante_fkey` FOREIGN KEY (`id_usuario_visitante`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `noticia` ADD CONSTRAINT `noticia_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `noticia` ADD CONSTRAINT `noticia_id_usuario_editor_fkey` FOREIGN KEY (`id_usuario_editor`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario` ADD CONSTRAINT `comentario_id_noticia_fkey` FOREIGN KEY (`id_noticia`) REFERENCES `noticia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentario` ADD CONSTRAINT `comentario_id_usuario_visitante_fkey` FOREIGN KEY (`id_usuario_visitante`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visitas` ADD CONSTRAINT `visitas_id_noticia_fkey` FOREIGN KEY (`id_noticia`) REFERENCES `noticia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO `tipo_usuario` (`nome`) VALUES ('admin'), ('editor'), ('visitante');

INSERT INTO `categoria` (`nome_categoria`) VALUES ('manchetes'), ('vestibulares'), ('editais'), ('eventos'), ('estágios '), ('editoriais');

INSERT INTO `usuario` (`nome`, `sobrenome`, `celular`, `email`, `senha`, `id_tipo_usuario`) VALUES ('root', 'eschool', '11989898888', 'root@eschool.com', '$2a$08$yy1mhpCMMiulX4txJ3vOcee15vPNG8Xc5DyOB3KD6fxXHKWGgHRNq', 1);

INSERT INTO eschool.noticia (titulo,subtitulo,texto,data_criacao,data_atualizacao,ativo,imagem,rascunho,id_categoria,id_usuario_editor) VALUES
	 ('Suspensão das aulas para todos alunos.','Suspensão das aulas para todas as turmas dos ETIMs (integral) e Novotec (turno Manhã e Tarde) pelo período de 14 dias.','<h3>Prezados(as) Alunos(as) e Respons&aacute;veis,&nbsp;</h3>
<p>Informamos que foi confirmada a contamina&ccedil;&atilde;o de um aluno com <strong>COVID 19</strong>, e h&aacute; suspeita de contamina&ccedil;&atilde;o de outro aluno e de um funcion&aacute;rio (estes aguardando resultado do exame).</p>
<p>Sendo assim, seguiremos o seguinte protocolo sanit&aacute;rio:&nbsp;</p>
<p>Suspens&atilde;o das aulas para todas as turmas dos ETIMs (integral) e Novotec (turno Manh&atilde; e Tarde) pelo per&iacute;odo de 14 dias, isto &eacute;, do dia <strong>01</strong> a <strong>14/12</strong>. Nesse per&iacute;odo, as aulas dessas turmas, ocorrer&atilde;o pela Plataforma Teams.</p>','2021-12-07 20:04:58.444000000','2021-12-07 20:04:58.443000000',1,'https://i.imgur.com/WBZGtti.jpg',0,3,1),
	 ('Tickets e entrega de almoço.','A partir de 03/nov (quarta-feira) será ofertado almoço para todos os alunos do ETIM das 12h às 12h50. ','<p><span style="font-weight: 400;">Os tickets ser&atilde;o entregues no dia 03/nov (quarta-feira).</span></p>
<ul>
<li><span style="font-weight: 400;">Os port&otilde;es da escola continuar&atilde;o fechados, para o cumprimento dos protocolos sanit&aacute;rios.&nbsp;</span></li>
<li><span style="font-weight: 400;">Os hor&aacute;rios de abertura e fechamento dos port&otilde;es da escola est&atilde;o divulgados no site da Etec Parque da Juventude.&nbsp;</span></li>
<li><span style="font-weight: 400;">Os alunos n&atilde;o poder&atilde;o sair da escola no hor&aacute;rio do almo&ccedil;o.&nbsp;</span></li>
<li><span style="font-weight: 400;">A copa ser&aacute; mantida fechada para os alunos, devido ao cumprimento dos protocolos sanit&aacute;rios.&nbsp;</span></li>
<li><span style="font-weight: 400;">N&atilde;o</span><span style="font-weight: 400;">&nbsp;h&aacute; microondas&nbsp;dispon&iacute;vel.&nbsp;</span></li>
<li><span style="font-weight: 400;">O aluno dever&aacute; trazer sua pr&oacute;pria garrafinha de &aacute;gua para a escola. Devido aos protocolos sanit&aacute;rios, a coleta de &aacute;gua nos bebedouros s&oacute; pode ser feita com a garrafinha.&nbsp;</span></li>
<li><span style="font-weight: 400;">Segundo calend&aacute;rio acad&ecirc;mico divulgado no site da Etec Parque da Juventude, os dias 28 e 29/10, e 1/11 n&atilde;o s&atilde;o letivos e dia 02/11 </span></li>
</ul>','2021-12-07 20:09:16.004000000','2021-12-07 20:09:16.004000000',1,'https://i.imgur.com/Yzbzh6p.jpg',0,3,1),
	 ('Pendência do histórico de conclusão do Ensino fundamental e RG atualizado.','Entrega de histórico de conclusão do Ensino fundamental e RG atualizado para a documentação do prontuário de ensino médio. ','<p><span style="font-weight: 400;">A secretaria est&aacute; fazendo o levantamento dos prontu&aacute;rios dos alunos que concluir&atilde;o o ETIM em dezembro de 2021,&nbsp;e que ap&oacute;s o levantamento consta a pend&ecirc;ncia do Hist&oacute;rico de Conclus&atilde;o do Ensino Fundamental e RG atualizado&nbsp;</span></p>
<p><span style="font-weight: 400;">Solicitamos que providencie o documento original com c&oacute;pia simples, leg&iacute;vel citado acima, e apresente na Secretaria da Etec Parque da Juventude, no per&iacute;odo de&nbsp;18/10/2021 a 27/10/2021, no hor&aacute;rio das 14h &agrave;s 17h.</span></p>','2021-12-07 20:09:41.123000000','2021-12-07 20:09:41.123000000',1,'https://i.imgur.com/5PxF7QV.jpg',0,3,1),
	 ('Retorno obrigatório das aulas.','O retorno dos alunos às aulas presenciais na Etec Parque da Juventude torna-se obrigatório a partir do dia 25/10/2021.','<p><span style="font-weight: 400;">O retorno dos alunos &agrave;s aulas presenciais na Etec Parque da Juventude torna-se obrigat&oacute;rio a partir do dia 25/10/2021.</span></p>
<p><span style="font-weight: 400;">A Delibera&ccedil;&atilde;o CEE 204/2021, que trata sobre retorno obrigat&oacute;rio dos alunos, mant&eacute;m a obrigatoriedade do cumprimento dos protocolos sanit&aacute;rios no que se refere ao distanciamento social, uso obrigat&oacute;rio de m&aacute;scaras e &aacute;lcool em gel.&nbsp;</span></p>
<p><span style="font-weight: 400;">Objetivando o cumprimento dos protocolos sanit&aacute;rios assim exigidos, a <strong>Etec Parque da Juventude</strong> manter&aacute; a mesma din&acirc;mica at&eacute; agora utilizada, com o revezamento de alunos em grupos A e B.&nbsp;</span></p>
<p><span style="font-weight: 400;">Sobre c&ocirc;mputo da frequ&ecirc;ncia informamos que,&nbsp;</span></p>
<p><span style="font-weight: 400;">Nos dias indicados para que a participa&ccedil;&atilde;o do aluno seja presencial, a frequ&ecirc;ncia dever&aacute; ser aferida pela presen&ccedil;a f&iacute;sica dele na escola;&nbsp;</span></p>
<p><span style="font-weight: 400;">Nos dias indicados para que a participa&ccedil;&atilde;o do aluno seja remota, o docente dever&aacute; aferir a frequ&ecirc;ncia por meio da entrega de atividades que mensurem a constru&ccedil;&atilde;o das compet&ecirc;ncias previstas na quinzena.&nbsp;</span></p>
<p><span style="font-weight: 400;">Conforme;</span></p>
<p><span style="font-weight: 400;">&sect; 1&ordm; do Art 2 da mesma Delibera&ccedil;&atilde;o, a presen&ccedil;a do estudante&nbsp;n&atilde;o ser&aacute; obrigat&oacute;ria&nbsp;quando:&nbsp;</span></p>
<ol style="list-style-type: lower-alpha;">
<li><span style="font-weight: 400;">se aplique a Delibera&ccedil;&atilde;o CEE 59/2006, que estabelece condi&ccedil;&otilde;es especiais de atividades escolares de aprendizagem e avalia&ccedil;&atilde;o para discentes cujo estado de sa&uacute;de as recomende;&nbsp;&nbsp;</span></li>
<li><span style="font-weight: 400;">gestante ou pu&eacute;rpera;&nbsp;&nbsp;</span></li>
<li><span style="font-weight: 400;">a partir de 12 anos pertencente ao grupo de risco para Covid-19 e que n&atilde;o tenha completado seu ciclo vacinal contra a Covid-19; d) menor de 12 anos pertencente ao grupo de risco para Covid-19.&nbsp;&nbsp;</span></li>
</ol>
<p><span style="font-weight: 400;">&sect; 2&ordm; As Institui&ccedil;&otilde;es de Ensino dever&atilde;o manter atividades remotas para os estudantes que se enquadrarem nos casos previstos no &sect;1&ordm; deste Artigo.</span></p>','2021-12-07 20:11:41.543000000','2021-12-07 20:11:41.543000000',1,'https://i.imgur.com/5PxF7QV.jpg',0,3,1),
	 ('Prolongamento da data de entrega de Histórico escolar e RG atualizado.','Prolongamento da data de entrega de Histórico escolar e RG atualizado, nos dias 15/12/2021 a 22/12/2021.','<p><span style="font-weight: 400;">A secretaria est&aacute; fazendo o levantamento dos prontu&aacute;rios dos alunos que concluir&atilde;o o ETIM em dezembro de 2021,&nbsp;e que ap&oacute;s o levantamento alguns alunos ainda consta a pend&ecirc;ncia do Hist&oacute;rico de Conclus&atilde;o do Ensino Fundamental e RG atualizado.</span></p>
<p><span style="font-weight: 400;">Solicitamos que providencie o documento original com c&oacute;pia simples,leg&iacute;vel citado acima, e apresente na Secretaria da Etec Parque da Juventude, no per&iacute;odo de&nbsp;15/12/2021 a 22/12/2021, no hor&aacute;rio das 14h &agrave;s 17h, de acordo com o prolongamento da data.</span></p>','2021-12-07 20:13:04.492000000','2021-12-07 20:13:04.492000000',1,'https://i.imgur.com/JsAXoIE.jpg',0,3,1),
	 ('Divulgação dos resultados do 3° bimestre/1° trimestre.','Divulgação dos Resultados referentes ao 3º Bimestre (Anual) e 1º Bimestre (Semestral), será a partir do dia 18/10/2021 (Segunda-feDira), no sistema informatizado NSA do ETIM e Novotec. ','<p><span style="font-weight: 400;">1.Comunicamos que a divulga&ccedil;&atilde;o dos Resultados referentes ao 3&ordm; Bimestre (Anual) e 1&ordm; Bimestre (Semestral), ser&aacute; a partir do dia&nbsp;18/10/2021 (Segunda-feira),&nbsp;no sistema informatizado NSA.</span></p>
<p><span style="font-weight: 400;">2.Temporariamente as men&ccedil;&otilde;es de alguns componentes curriculares e cursos n&atilde;o estar&atilde;o vis&iacute;veis no NSA. Assim que forem liberadas e vis&iacute;veis as men&ccedil;&otilde;es destes componentes curriculares espec&iacute;ficos no NSA, informaremos.</span></p>
<p><span style="font-weight: 400;">3.Reconsidera&ccedil;&atilde;o (informa&ccedil;&otilde;es e procedimentos:</span></p>
<p><span style="font-weight: 400;">Dos procedimentos e prazos para solicita&ccedil;&atilde;o de revis&atilde;o da avalia&ccedil;&atilde;o de desempenho que ser&aacute; apreciada nos termos do Regimento Escolar.</span></p>
<p><span style="font-weight: 400;">Pedido de reconsidera&ccedil;&atilde;o de que trata o caput dever&aacute; ser protocolado em nosso canal de atendimento no site de Etec, no per&iacute;odo de 18/10/2021 at&eacute; 22/10/2021.</span></p>
<p><span style="font-weight: 400;">O aluno ou, se menor, o seu respons&aacute;vel legal dever&aacute; realizar a solicita&ccedil;&atilde;o em nosso canal de atendimento no site de Etec.</span></p>
<p><span style="font-weight: 400;">O prazo para resposta da Dire&ccedil;&atilde;o sobre o pedido de reconsidera&ccedil;&atilde;o: 10 dias a partir da solicita&ccedil;&atilde;o, ou seja, os prazos ficam suspensos em per&iacute;odos de f&eacute;rias e recesso escolar conforme disposto no Art. 3 &sect;5&ordm; CEE 161/18.</span></p>
<p><span style="font-weight: 400;">As informa&ccedil;&otilde;es na sua &iacute;ntegra, referentes a Delibera&ccedil;&atilde;o CEE n&ordm; 120/2013, a Indica&ccedil;&atilde;o CEE n&ordm; 128/2014 e a Delibera&ccedil;&atilde;o CEE n&ordm; 127/2014 e Indica&ccedil;&atilde;o CEE n&ordm; 121/2013 que foram revogadas pela&nbsp;DELIBERA&Ccedil;&Atilde;O N.155/2017, est&atilde;o divulgadas para pais/respons&aacute;veis e estudantes no site da Etec Parque da Juventude,&nbsp;e no portal NSA.</span></p>','2021-12-07 20:13:38.493000000','2021-12-07 20:13:38.493000000',1,'https://i.imgur.com/7u6nz3V.jpg',0,3,1),
	 ('Passaporte sanitário nas escolas','Uma medida útil, porém, não utilizada.','<p><span style="font-weight: 400;">A pandemia de Covid-19 afetou drasticamente a vida de toda a sociedade, for&ccedil;ando todo uma popula&ccedil;&atilde;o a manter isolamento caso assim desejassem n&atilde;o contrair o v&iacute;rus. Por&eacute;m, com o avan&ccedil;o da vacina&ccedil;&atilde;o no pa&iacute;s, &eacute; poss&iacute;vel deslumbrar uma volta &agrave; normalidade, ainda bem distante no horizonte. Para que seja poss&iacute;vel obter um retorno saud&aacute;vel e seguro para todos, &eacute; necess&aacute;rio tomar alguns cuidados e seguir os protocolos sanit&aacute;rios para retardar a propaga&ccedil;&atilde;o da doen&ccedil;a, seja em ambiente aberto, fechado, p&uacute;blico ou privado.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Algumas medidas que s&atilde;o comprovadamente eficazes para evitar a dissemina&ccedil;&atilde;o da doen&ccedil;a, tais como o uso de m&aacute;scara (protegendo nariz e boca) e o uso de &aacute;lcool em gel 70% para a desinfec&ccedil;&atilde;o das m&atilde;os e objetos, j&aacute; s&atilde;o utilizados e s&atilde;o pe&ccedil;as importantes para uma diminui&ccedil;&atilde;o de casos e &oacute;bitos no pa&iacute;s. Por&eacute;m, uma medida que tamb&eacute;m &eacute; eficaz para diminuir a propaga&ccedil;&atilde;o da doen&ccedil;a, n&atilde;o &eacute; utilizada em alguns ambientes p&uacute;blicos que precisam se manter abertos. Se trata do chamado &ldquo;passaporte sanit&aacute;rio&rdquo;, que n&atilde;o &eacute; usado para adentrar em escolas, seja de ensino fundamental ou m&eacute;dio.&nbsp;</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Solicitar o comprovante da vacina ou ent&atilde;o um teste negativo para a doen&ccedil;a (das &uacute;ltimas 24 horas), &eacute; uma medida simples que serviria para evitar que alguma pessoa contaminada transmita para a doen&ccedil;a para os demais, assim protegendo a todos. Em um per&iacute;odo como o atual, no qual discursos contr&aacute;rios a vacina&ccedil;&atilde;o e recomenda&ccedil;&atilde;o de rem&eacute;dios ineficazes, medidas mais en&eacute;rgicas para o combate &agrave; doen&ccedil;a, infelizmente, s&atilde;o necess&aacute;rias para que seja poss&iacute;vel controlar a doen&ccedil;a e assim diminuir o n&uacute;mero de mortes e casos no nosso pa&iacute;s. </span></p>','2021-12-07 21:21:57.360000000','2021-12-07 21:21:57.360000000',1,'https://i.imgur.com/SsHMgr5.png',0,6,1),
	 ('Retorno presencial obrigatório','O retorno presencial é realmente necessário?','<p><span style="font-weight: 400;">O retorno presencial obrigat&oacute;rio foi definido pela secret&aacute;ria da educa&ccedil;&atilde;o no dia 18 de outubro. A partir desta data, as escolas foram autorizadas a receber 100% de seus estudantes, isso divide as opini&otilde;es de estudantes, pais e professores.</span></p>
<p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;Acredito que retornar as aulas para o modelo normal agora &eacute; uma decis&atilde;o equivocada. O ano letivo j&aacute; est&aacute; quase acabando, no caso da Etec, esse retorno s&oacute; iria abranger um m&ecirc;s de aula, e convenhamos, para quem j&aacute; est&aacute; a pouco mais de um ano no modelo EAD um m&ecirc;s n&atilde;o faria tanta diferen&ccedil;a assim.&nbsp;</span></p>
<p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;Al&eacute;m das mudan&ccedil;as na rotina tamb&eacute;m, dentro da Etec, os alunos do etim estudam em per&iacute;odo integral, ou seja, ter&atilde;o que se acostumar novamente a rotina que tinham anteriormente e isso pode gerar algum descontentamento.</span></p>
<p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;A maioria das atividades ainda est&atilde;o sendo atribu&iacute;das e entregues no Microsoft Teams, ou seja, muitas pessoas est&atilde;o indo para a escola apenas pelo fato da presen&ccedil;a obrigat&oacute;ria pois os alunos podem ser reprovados por faltas. E mesmo que a vacina&ccedil;&atilde;o esteja bem avan&ccedil;ada, ainda h&aacute; um risco para a sa&uacute;de at&eacute; mesmo para quem j&aacute; recebeu as das doses.&nbsp;</span></p>
<p><span style="font-weight: 400;">&nbsp;&nbsp;&nbsp;&nbsp;O retorno as aulas veio muito cedo, voltar agora far&aacute; o saldo ficar mais negativo do que positivo na minha opini&atilde;o. E ainda sim muitos alunos n&atilde;o seguem os protocolos corretamente o que agrava ainda mais essa situa&ccedil;&atilde;o.</span></p>','2021-12-07 21:22:46.001000000','2021-12-07 21:22:46.001000000',1,'https://i.imgur.com/mDsgfSA.jpg',0,6,1),
	 ('Como a carência de medidas efetivas no combate à pandemia afetou a educação','A evasão escolar se tornou um problema ainda maior','<p><span style="font-weight: 400;">&Eacute; de conhecimento p&uacute;blico que a pandemia afetou diversos setores da sociedade. Fechou com&eacute;rcios, inibiu o contato entre as pessoas e, como esperado, causou um preju&iacute;zo enorme para a sociedade como um todo. O impacto que a pandemia teve sobre a educa&ccedil;&atilde;o talvez seja o mais evidente.</span></p>
<p><span style="font-weight: 400;">O &iacute;ndice de abandono escolar, isto &eacute;, pessoas largando os estudos, em geral para trabalhar ou ajudar os pais de alguma outra forma, aumentou consideravelmente. Segundo a Unicef, no ano de 2020, a quantidade de estudantes que abandonaram a escola foi de aproximadamente 1,38 milh&atilde;o, 3,8%. Soma-se isso aos 11,2%, cerca de 4,12 milh&otilde;es de estudantes, que mesmo matriculados e em per&iacute;odo escolar n&atilde;o receberam nenhuma atividade online.</span></p>
<p><span style="font-weight: 400;">Tamb&eacute;m vale ressaltar a discrep&acirc;ncia existente entre os estados brasileiros no que tange a evas&atilde;o escolar. Segundo os dados do Instituto Brasileiro de Geografia e Estat&iacute;stica (IBGE), a pandemia afetou muito mais os estados da regi&atilde;o Norte do pa&iacute;s do que das demais regi&otilde;es do pa&iacute;s. Segundo o estudo realizado, at&eacute; o fim do ano de 2020, os estados de Roraima, Amap&aacute; e Acre registraram respectivamente, 15%, 12% e 10% de evas&atilde;o escolar, bastante acima da m&eacute;dia nacional, de 4%.</span></p>
<p><span style="font-weight: 400;">Fica bastante claro que os efeitos da pandemia sobre a educa&ccedil;&atilde;o poderiam ser mitigados, possibilitando um retorno ao ensino presencial de forma mais segura e eficaz, se as autoridades respons&aacute;veis tivessem tido atitudes mais en&eacute;rgicas com rela&ccedil;&atilde;o aos cuidados e protocolos sanit&aacute;rios, como isolamento social, vacina&ccedil;&atilde;o em massa e uso de m&aacute;scara.</span></p>','2021-12-07 21:28:14.773000000','2021-12-07 21:28:14.773000000',1,'https://i.imgur.com/dPDjQhJ.jpg',0,6,1),
	 ('A Importância das Entidades Estudantis em momentos de crise','Mesmo sendo importantes para o ambiente democrático, sua relevância tem sido contestada inúmeras vezes','<p><span style="font-weight: 400;">&Eacute; bastante evidente que, em todo o mundo (e em especial, no Brasil), entidades estudantis, como a Federa&ccedil;&atilde;o Nacional dos Estudantes em Ensino T&eacute;cnico <strong>(FENET),</strong> tiveram papel de destaque nos desdobramentos ocorridos em seus pa&iacute;ses. Um exemplo disso, se trata das manifesta&ccedil;&otilde;es estudantis ocorridas no Reino Unido, em 2019. Mais de 20 mil estudantes fizeram protestos e greves em escolas cobrando medidas do governo contra as mudan&ccedil;as clim&aacute;ticas e as desigualdades sociais.</span></p>
<p><span style="font-weight: 400;">Talvez um exemplo mais enf&aacute;tico do papel das entidades estudantes na sociedade esteja no Brasil, em especial no per&iacute;odo da Ditadura Militar (1964-1985). A Uni&atilde;o Nacional dos Estudantes (UNE), foi um dos maiores alvos de repress&atilde;o por parte do governo, tanto que teve sua sede queimada, sua representatividade anulada e sua atua&ccedil;&atilde;o colocada na ilegalidade. Mesmo ap&oacute;s as medidas de opress&atilde;o do regime militar, a UNE continuou atuando clandestinamente, engajando e estimulando a oposi&ccedil;&atilde;o ao regime nas camadas mais jovens da sociedade. Um dos seus feitos de grande destaque foi na participa&ccedil;&atilde;o da Passeata dos Cem Mil, ocorrida em 1968 e que contou com a participa&ccedil;&atilde;o de v&aacute;rias camadas da sociedade, como artistas, intelectuais, e claro, estudantes.</span></p>
<p><span style="font-weight: 400;">Dito isso, &eacute; bastante claro que as entidades estudantis s&atilde;o muito importantes durante os per&iacute;odos de crise, pois s&atilde;o &oacute;rg&atilde;os importantes para a defesa de ideais, valores e representatividade da parcela estudantil de algum pa&iacute;s. Devido a essa tamanha import&acirc;ncia, fica claro que seus l&iacute;deres tenham de estar sempre alinhados com os valores democr&aacute;ticos e comprometidos com a defesa da democracia e liberdades individuais.</span></p>','2021-12-07 21:29:49.047000000','2021-12-07 21:29:49.047000000',1,'https://i.imgur.com/wDGZs7W.jpg',0,6,1);
INSERT INTO eschool.noticia (titulo,subtitulo,texto,data_criacao,data_atualizacao,ativo,imagem,rascunho,id_categoria,id_usuario_editor) VALUES
	 ('Impacto do ENEM na saúde mental dos estudantes','Em época de vestibulares sempre surge relatos de estudantes deprimidos ou exaustos','<p><span style="font-weight: 400;">Pr&oacute;ximo ao fim do ano, &eacute;poca de vestibulares, &eacute; comum nessa &eacute;poca o surgimento de in&uacute;meros relatos de pessoas desanimadas e deprimidas com todas as provas a serem feitas no per&iacute;odo. Os conte&uacute;dos de tais relatos s&atilde;o diversos, uns est&atilde;o deprimidos consigo mesmos, outros est&atilde;o cansados e mais outros est&atilde;o demasiadamente raivosos. Rea&ccedil;&otilde;es distintas, por&eacute;m, com a mesma causa, os vestibulares.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Pensando no estado emocional dos estudantes ao realizarem os vestibulares, &eacute; de se refletir a press&atilde;o posta sobre eles durante tal per&iacute;odo. Sempre &eacute; dito que agora &eacute; o momento de se definir o seu futuro &eacute; que tudo depende das notas obtidas nessas provas. &Eacute; tudo uma grande bobagem.&nbsp;</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">A imensa maioria daqueles que est&atilde;o realizando tais provas, s&atilde;o jovens de 17 ou 18 anos, pessoas com pouca experi&ecirc;ncia de vida e bastante tempo para decidir quais rumos tornar em sua vida profissional e pessoal. Colocar uma press&atilde;o enorme, como decidir totalmente o seu futuro, em pessoas que acabaram de entrar na vida adulta &eacute; totalmente descabido e pode prejudicar a sa&uacute;de mental dos mesmos.</span></p>','2021-12-07 21:30:21.873000000','2021-12-07 21:30:21.873000000',1,'https://i.imgur.com/dKEVV1n.jpg',0,6,1),
	 ('Microsoft abre 200 vagas de estágio para alunos das ETECs ','Empresa busca estudantes nas áreas de informática e administração','<p><span style="font-weight: 400;">S&atilde;o Paulo, SP, no dia 29 de novembro, a Microsoft divulgou em seu site oficial um formul&aacute;rio de inscri&ccedil;&atilde;o para um processo seletivo, organizado pela mesma, na qual est&aacute; sendo oferecido um total de 200 vagas de est&aacute;gios para estudantes das ETECs, que est&atilde;o cursando administra&ccedil;&atilde;o ou inform&aacute;tica para internet.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">A sele&ccedil;&atilde;o ser&aacute; feita mediante realiza&ccedil;&atilde;o de uma prova, cujos locais de aplica&ccedil;&atilde;o ser&atilde;o definidos pela empresa, ap&oacute;s encerrar o per&iacute;odo de inscri&ccedil;&otilde;es. A inscri&ccedil;&atilde;o &eacute; gratuita e prazo vai at&eacute; o dia 2 de dezembro.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Se trata de uma excelente oportunidade para aqueles que desejam aprofundar seus conhecimentos e conseguir uma maior experi&ecirc;ncia no mercado de trabalho.</span></p>','2021-12-07 21:33:42.291000000','2021-12-07 21:33:42.291000000',1,'https://i.imgur.com/i3lvkqP.jpg',0,5,1),
	 ('VIVO abre 75 vagas de estágio para estudantes de administração','Vagas preveem possível efetivação em caso de resultados satisfatórios','<p><span style="font-weight: 400;">S&atilde;o Paulo, SP, no dia 25 de novembro, a <strong>VIVO </strong>disponibilizou em seu perfil do Twitter um link para o formul&aacute;rio de inscri&ccedil;&atilde;o para um processo de sele&ccedil;&atilde;o, na qual ela oferece 75 vagas de est&aacute;gios para estudantes de administra&ccedil;&atilde;o, seja de institui&ccedil;&otilde;es p&uacute;blicas ou privadas.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">A sele&ccedil;&atilde;o ser&aacute; feita mediante respostas do formul&aacute;rio publicado, no qual consta com um espa&ccedil;o para reda&ccedil;&atilde;o de no m&aacute;ximo 20 linhas, questionando o motivo da pessoa desejar adentrar na empresa. A inscri&ccedil;&atilde;o custa R$ 95,00 e prazo vai at&eacute; o dia 30 de novembro.</span><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Segundo a empresa, est&aacute; previsto poss&iacute;vel efetiva&ccedil;&atilde;o no cargo caso os resultados obtidos sejam satisfat&oacute;rios.</span></p>','2021-12-07 21:34:05.066000000','2021-12-07 21:34:05.066000000',1,'https://i.imgur.com/DBUzDZG.jpg',0,5,1),
	 ('Hospital do Rim abre 4 vagas de estágio para estudantes da ETEC PJ','Vagas preveem jornadas de trabalho de 4 horas por dia de segunda à sexta-feira ','<p><span style="font-weight: 400;">S&atilde;o Paulo, SP, no dia 5 de novembro, o Hospital do Rim enviou um e-mail para a coordena&ccedil;&atilde;o da ETEC PJ solicitando a divulga&ccedil;&atilde;o de 4 vagas de est&aacute;gio abertas no hospital. Segue todas as informa&ccedil;&otilde;es a respeito das vagas abertas.</span></p>
<p>&nbsp;</p>
<ul>
<li><span style="font-weight: 400;"> Aprendiz (2 vagas)</span></li>
</ul>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Setor: Faturamento</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Hor&aacute;rios: 1 vaga das 9 &agrave;s 13 horas e 1 vaga das 13 &agrave;s 17 horas (segunda &agrave; sexta-feira)</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Cursando T&eacute;cnico em Administra&ccedil;&atilde;o</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Atividades: Realizar a primeira confer&ecirc;ncia de guias autorizadas; Arquivar e conferir RPS j&aacute; pagas; montar processos de cobran&ccedil;as para envio aos conv&ecirc;nios, prestar apoio nas demais atividades administrativas do setor de Faturamento.</span></p>
<p>&nbsp;</p>
<ul>
<li><span style="font-weight: 400;"> Aprendiz (2 vagas)</span></li>
</ul>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Setor: Tecnologia da Informa&ccedil;&atilde;o</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Hor&aacute;rios: 1 vaga das 8 &agrave;s 12 horas e 1 vaga das 13 &agrave;s 17 horas (segunda &agrave; sexta-feira)</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Cursando T&eacute;cnico em Administra&ccedil;&atilde;o ou em Inform&aacute;tica</span></p>
<p style="padding-left: 40px;"><span style="font-weight: 400;">Atividades: Realizar atendimento telef&ocirc;nico, abrir chamados (Ordens de Servi&ccedil;os) e encaminhar aos respons&aacute;veis, criar usu&aacute;rios no sistema Tasy, criar e-mails institucionais, conferir notas fiscais e rateio de contas.</span></p>
<p>&nbsp;</p>
<p><span style="font-weight: 400;">Os Estudantes da ETEC que sejam interessados nas vagas abertas, devem encaminhar o curr&iacute;culo atualizado para o e-mail:cv@hrim.com.bre inserir no campo &ldquo;Assunto&rdquo; o nome da vaga, como por exemplo: &ldquo;Aprendiz de Faturamento&rdquo; ou &ldquo;Aprendiz de Tecnologia da Informa&ccedil;&atilde;o&rdquo;. &Eacute; imprescind&iacute;vel que o candidato seja estudante de curso T&eacute;cnico da ETEC.</span></p>','2021-12-07 21:34:55.741000000','2021-12-07 21:34:55.741000000',1,'https://i.imgur.com/PhApqIT.jpg',0,5,1),
	 ('Oportunidades de estágios disponíveis para alunos de administração','Vagas contam com direito a benefícios como bolsa-auxílio e auxilio transporte','<p><span style="font-weight: 400;">S&atilde;o Paulo, SP, no dia 15 de novembro, uma empresa do ramo de com&eacute;rcio varejista enviou um e-mail para a coordena&ccedil;&atilde;o da ETEC PJ solicitando a divulga&ccedil;&atilde;o de vagas de est&aacute;gio abertas na empresa. As vagas s&atilde;o oferecidas somente para alunos de ensino m&eacute;dio, t&eacute;cnicos em administra&ccedil;&atilde;o/marketing/publicidade e ETIM em administra&ccedil;&atilde;o/marketing/publicidade.</span></p>
<p><span style="font-weight: 400;">Os afazeres previstos variam entre elabora&ccedil;&atilde;o de propostas comercias e trabalhos com telemarketing. Possui benef&iacute;cios como bolsa auxilio de R$ 850,00 ao m&ecirc;s, vale transporte e recesso remunerado.&nbsp;</span></p>
<p><span style="font-weight: 400;">Para os interessados nas vagas, anotem o c&oacute;digo 181814 e ligue para (11) 3514-9300.</span></p>','2021-12-07 21:35:25.893000000','2021-12-07 21:35:25.893000000',1,'https://i.imgur.com/7ygH4eY.jpg',0,5,1),
	 ('Parceria CIEE com a ETEC PJ','CIEE está disponibilizando cursos de capacitação profissional','<p><span style="font-weight: 400;">S&atilde;o Paulo, SP, atrav&eacute;s da parceria com a ETEC PARQUE DA JUVENTUDE, os alunos poder&atilde;o fazer o cadastro no CIEE e concorrer as in&uacute;meras vagas de est&aacute;gio.</span></p>
<p><span style="font-weight: 400;">Pensando tamb&eacute;m na sua qualifica&ccedil;&atilde;o e prepara&ccedil;&atilde;o para o Mercado de Trabalho, o CIEE parceiro da ETEC PARQUE DA JUVENTUDE, est&aacute; disponibilizando gratuitamente cursos de capacita&ccedil;&atilde;o profissional que ir&aacute; te ajudar na hora da entrevista e durante o seu est&aacute;gio.</span></p>
<p><span style="font-weight: 400;">- Postura e Imagem Profissional&nbsp;</span></p>
<p><span style="font-weight: 400;">- Processo Seletivo&nbsp;</span></p>
<p><span style="font-weight: 400;">- LinkedIn: por que eu preciso?&nbsp;</span></p>
<p><span style="font-weight: 400;">- Pacote Microsoft Office</span></p>
<p><span style="font-weight: 400;">- Passos para Escolher sua Profiss&atilde;o&nbsp;</span></p>
<p><span style="font-weight: 400;">- Gram&aacute;tica Pr&aacute;tica&nbsp;</span></p>
<p><span style="font-weight: 400;">- Matem&aacute;tica I e II</span></p>
<p><span style="font-weight: 400;">- Produ&ccedil;&atilde;o de Textos&nbsp;</span></p>
<p><span style="font-weight: 400;">- T&eacute;cnicas da Express&atilde;o Verbal&nbsp;</span></p>
<p><span style="font-weight: 400;">- Como Investir em Voc&ecirc;</span></p>
<p><span style="font-weight: 400;">- Gest&atilde;o de Finan&ccedil;as Pessoais&nbsp;&nbsp;</span></p>
<p><span style="font-weight: 400;">- LIBRAS</span></p>','2021-12-07 21:36:34.045000000','2021-12-07 21:36:34.045000000',1,'https://i.imgur.com/QD6BoeX.jpg',0,5,1),
	 ('Dia 23/11, às 12:10 vai rolar Equipenetra x Zero Grau Futsal e PSI x S.M.A.P','PSI x S.M.A.P irá ocorrer no Loducão’s Stadium e Equipenetra x Zero Grau Futsal no Loduquinha’s Stadium.','<p><span style="font-weight: 400;">As expectativas para essas partidas s&atilde;o de que o PSI vence e segue como l&iacute;der do campeonato. No outro jogo, Zero Grau Futsal tem mais chances de vencer, e com isso avan&ccedil;a em dire&ccedil;&atilde;o ao l&iacute;der. Dependendo do resultado, S.M.A.P pode perder seu lugar como segundo colocado.</span></p>','2021-12-07 21:37:48.632000000','2021-12-07 21:37:48.632000000',1,'https://i.imgur.com/QlIZYMK.png',0,4,1),
	 ('Dia 24/11, às 12:10 vai rolar Equipenetra x Power Guido e Zero Grau Futsal x Xamego','Equipenetra x Power Guido irá ocorrer no Loducão’s Stadium e Zero Grau Futsal x Xamego no Loduquinha’s Stadium.','<p><span style="font-weight: 400;">As expectativas para essas partidas s&atilde;o que de que a Equipenetra vence e segue como segundo colocado. Enquanto isso, no outro jogo, &eacute; mais prov&aacute;vel que Zero Grau Futsal ven&ccedil;a. Com isso, Xamego e Power Guido seguem como pen&uacute;ltimo e &uacute;ltimo lugar, respectivamente, continuando assim na zona de rebaixamento.</span></p>','2021-12-07 21:38:10.903000000','2021-12-07 21:38:10.903000000',1,'https://i.imgur.com/QlIZYMK.png',0,4,1),
	 ('O que levar para a primeira fase da Fuvest?','A primeira fase da Fuvest, um dos vestibulares mais concorridos do Brasil, acontece no próximo domingo (12).','<p><span style="font-weight: 400;">Primeiramente, &eacute; importante ressaltar o material obrigat&oacute;rio ao aluno, que deve apresentar obrigatoriamente durante a realiza&ccedil;&atilde;o da prova:</span></p>
<ul>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Documento de identidade</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Caneta esferogr&aacute;fica de tinta azul ou preta fabricada em material transparente</span></li>
</ul>
<p><span style="font-weight: 400;">H&aacute; tamb&eacute;m os materiais que s&atilde;o permitidos:</span></p>
<ul>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">L&aacute;pis</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Borracha</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">R&eacute;gua</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Compasso</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Apontador</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">&Aacute;gua</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Alimentos leves (vale ressaltar que &eacute; proibido comer dentro da sala de prova)&nbsp;</span></li>
</ul>
<p><span style="font-weight: 400;">Entretanto, vale se atentar ao material proibido, que se identificados durante a realiza&ccedil;&atilde;o da prova, podem resultar na elimina&ccedil;&atilde;o do candidato:</span></p>
<ul>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Rel&oacute;gio de qualquer tipo</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Equipamentos eletr&ocirc;nicos como calculadora, celular, computador, tablet, reprodutor de &aacute;udio, m&aacute;quina fotogr&aacute;fica, filmadora, equipamento eletr&ocirc;nico do tipo vest&iacute;vel (como smartwatch, &oacute;culos eletr&ocirc;nicos, ponto eletr&ocirc;nico), etc.</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Material impresso ou de anota&ccedil;&otilde;es</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Corretivo</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Caneta que n&atilde;o seja esferogr&aacute;fica</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Gorro, bon&eacute;, chap&eacute;u ou similares</span></li>
<li style="font-weight: 400;" aria-level="1"><span style="font-weight: 400;">Protetor auricular, fone de ouvido ou similares</span></li>
</ul>','2021-12-07 21:41:05.884000000','2021-12-07 21:41:05.884000000',1,'https://i.imgur.com/flfIPbx.jpg',0,2,1),
	 ('É lançado o gabarito do Enem 2021','Na última quarta-feira (1) foi liberado o gabarito do Enem 2021, que contou com uma questão de anulada','<p><span style="font-weight: 400;">Tr&ecirc;s dias ap&oacute;s a realiza&ccedil;&atilde;o da segunda fase do Enem, que contava com quest&otilde;es das &aacute;reas de ci&ecirc;ncias da natureza e suas tecnologias, e matem&aacute;tica, foi disponibilizado para o p&uacute;blico o gabarito das provas.&nbsp;</span></p>
<p><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> </span><span style="font-weight: 400;">Foi apontado que a quest&atilde;o 157 da prova rosa foi anulada. A quest&atilde;o sobre Copa do Brasil n&atilde;o possu&iacute;a entre as op&ccedil;&otilde;es uma resposta correta. O item apareceu na prova azul como quest&atilde;o 138, como 155 da prova cinza e 178 das provas amarela, laranja e verde.</span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"><br /></span><span style="font-weight: 400;"> </span><span style="font-weight: 400;">O gabarito completo de todas as provas est&atilde;o dispon&iacute;veis no site oficial do Inep.</span></p>
<p><span style="font-weight: 400;">O resultado final das provas sai apenas no dia 11 de fevereiro.</span></p>','2021-12-07 21:41:42.296000000','2021-12-07 21:41:42.296000000',1,'https://i.imgur.com/flfIPbx.jpg',0,2,1);
INSERT INTO eschool.noticia (titulo,subtitulo,texto,data_criacao,data_atualizacao,ativo,imagem,rascunho,id_categoria,id_usuario_editor) VALUES
	 ('Sai lista de aprovados da primeira fase da Unicamp','A Comissão Permanente para os Vestibulares da Unicamp (Comvest) liberou na última segunda-feira (29) a lista de aprovados ','<p><span style="font-weight: 400;">Dos 58.425 candidatos fizeram a prova da primeira fase, foram aprovados para a segunda fase 12.938 candidatos. As listas est&atilde;o dispon&iacute;veis no site oficial da Comvest.</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">A segunda fase ocorre nos dias 9 e 10 de janeiro, e ser&aacute; composta por quest&otilde;es dissertativas. As provas t&ecirc;m uma parte comum para todos os candidatos e uma parte diversificada, de acordo com a &aacute;rea de conhecimento do curso escolhido em 1&ordf; op&ccedil;&atilde;o (Ci&ecirc;ncias Biol&oacute;gicas/Sa&uacute;de; Ci&ecirc;ncias Exatas/Tecnol&oacute;gicas, Ci&ecirc;ncias Humanas/Artes)</span></p>','2021-12-07 21:42:13.244000000','2021-12-07 21:42:13.244000000',1,'https://i.imgur.com/j5Nzy2A.png',0,2,1),
	 ('Sai lista de aprovados da primeira fase da Unesp','A Universidade Estadual Paulista (Unesp) divulgou nesta segunda-feira (6) a lista de aprovados para a segunda fase do vestibular.','<p><span style="font-weight: 400;">A lista dos alunos aprovados foi disponibilizada no site oficial da Unesp. Mais de 69 mil candidatos se inscreveram para o processo seletivo, que oferece 7.690 vagas distribu&iacute;das por 24 cidades paulistas.&nbsp;</span></p>
<p><span style="font-weight: 400;"> </span><span style="font-weight: 400;">A segunda fase acontece em dia &uacute;nico (19 de dezembro) e seu resultado final ser&aacute; disponibilizado no dia 27 de janeiro.</span></p>','2021-12-07 21:42:35.609000000','2021-12-07 21:42:35.609000000',1,'https://i.imgur.com/FiI9jX4.jpg',0,2,1),
	 ('Faculdade Santa Casa de SP divulga resultado do Vestibular 2022/1','Os selecionados deverão realizar matrícula on-line durante os dias 07 e 08 de dezembro','<p><span style="font-weight: 400;">A Faculdade de Ci&ecirc;ncias M&eacute;dicas da Santa Casa de S&atilde;o Paulo (FCMSCSP) soltou nesta quinta-feira, 02 de dezembro, o resultado do seu Vestibular 2022/1, cujas provas foram aplicadas nos dias 30 e 31 de outubro. Os resultados est&atilde;o dispon&iacute;veis no site oficial da Santa Casa.</span></p>','2021-12-07 21:42:53.113000000','2021-12-07 21:42:53.113000000',1,'https://i.imgur.com/C3eTD6X.jpg',0,2,1);