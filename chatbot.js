/**
 * PsiCare Chatbot - Versão 100% Frontend
 * Chatbot inteligente estilo WhatsApp sem dependência de servidor
 * Funciona com HTML/CSS/JS puro - sem backend necessário
 * 
 * @author PsiCare Team
 * @version 1.0.0
 * @license MIT
 */

(function(global) {
    'use strict';

    class PsiCareChatbot {
        constructor(options = {}) {
            this.config = {
                position: options.position || 'right',
                welcomeMessage: options.welcomeMessage || 'Olá! 👋 Sou o assistente virtual do PsiCare. Como posso ajudar?',
                context: options.context || 'general',
                typingDelay: { min: 600, max: 2000 },
                maxHistory: 50,
                ...options
            };

            this.state = {
                isOpen: false,
                isTyping: false,
                conversationHistory: [],
                userContext: {},
                lastTopic: null,
                initialized: false
            };

            this.knowledgeBase = this._buildKnowledgeBase();
            this.intents = this._buildIntentPatterns();
            
            if (!this.state.initialized) {
                this._init();
                this.state.initialized = true;
            }
        }

        // ========== BASE DE CONHECIMENTO EXPANDIDA ==========
        _buildKnowledgeBase() {
            return {
                sales: {
                    precos: {
                        keywords: ['preço', 'valor', 'custo', 'quanto', 'pagar', 'planos', 'assinatura', 'mensalidade', 'precos', 'valores'],
                        responses: [
                            'Temos 3 planos flexíveis! 🎉\n\n💚 <strong>Iniciante</strong>: R$ 49/mês\n✨ <strong>Profissional</strong>: R$ 89/mês (mais popular!)\n🏢 <strong>Clínica</strong>: R$ 179/mês\n\nTodos com <strong>14 dias de teste grátis</strong>!',
                            'Os planos começam em R$ 49/mês! 💰\n\nO plano <strong>Profissional (R$ 89)</strong> inclui:\n• Pacientes ilimitados\n• Agenda inteligente com lembretes\n• Prontuário completo\n• Suporte 24/7\n\nQuer testar grátis por 14 dias?',
                            '💚 Planos PsiCare:\n\n🌱 <strong>Iniciante - R$ 49/mês</strong>\n• Até 20 pacientes ativos\n• Agenda básica\n• Prontuário eletrônico\n• Backup diário\n\n⭐ <strong>Profissional - R$ 89/mês</strong>\n• Pacientes ilimitados\n• Agenda com lembretes\n• Módulo financeiro\n• Suporte prioritário\n\n🏢 <strong>Clínica - R$ 179/mês</strong>\n• Tudo do Profissional\n• Múltiplos profissionais\n• API para integrações\n• Gerente de conta\n\nSem fidelidade! Cancele quando quiser. ✨'
                        ],
                        followUp: ['Quer saber a diferença entre os planos?', 'Posso te ajudar a escolher o ideal para você?']
                    },
                    teste: {
                        keywords: ['teste', 'grátis', 'gratuito', 'trial', 'experimentar', 'demo', 'demonstração', 'avaliar'],
                        responses: [
                            'Sim! 🎁 Oferecemos <strong>14 dias de teste gratuito</strong> no plano Profissional!\n\n✅ Acesso completo a todas as funcionalidades\n✅ Sem cartão de crédito necessário\n✅ Cancele quando quiser, sem burocracia\n✅ Suporte incluso durante o teste\n\nQuer começar agora? É só clicar em "Testar por 14 dias"!',
                            'Claro! O teste grátis de 14 dias é completo! 🚀\n\n• Você acessa TUDO do plano Profissional\n• Pode cadastrar pacientes reais\n• Testar agenda, prontuário, financeiro\n• Sem compromisso, sem cartão\n• Se gostar, é só continuar!\n\nBasta criar sua conta e começar a usar imediatamente.',
                            '🎉 Teste grátis disponível!\n\nComo funciona:\n1️⃣ Clique em "Testar por 14 dias"\n2️⃣ Crie sua conta com e-mail e senha\n3️⃣ Acesse o sistema imediatamente\n4️⃣ Explore todas as funcionalidades\n5️⃣ Decida depois se quer continuar\n\nSimples, rápido e sem riscos! 😊'
                        ],
                        followUp: ['Precisa de ajuda para criar a conta?', 'Quer que eu te mostre as principais funcionalidades primeiro?']
                    },
                    recursos: {
                        keywords: ['recursos', 'funcionalidades', 'o que inclui', 'tem', 'oferece', 'features', 'vantagens', 'benefícios'],
                        responses: [
                            'O PsiCare inclui tudo que você precisa! ✨\n\n👥 <strong>Gestão de Pacientes</strong>\n• Cadastro completo com anamnese\n• Histórico de atendimento\n• Controle de status (Ativo/Suspenso/Alta)\n\n📅 <strong>Agenda Inteligente</strong>\n• Agendamento online\n• Lembretes automáticos\n• Integração com videoconferência\n\n📋 <strong>Prontuário Eletrônico</strong>\n• Texto rico com formatação\n• Observações sigilosas\n• Histórico em timeline\n\n💰 <strong>Financeiro</strong>\n• Controle de recebimentos\n• Emissão de recibos\n• Relatórios em tempo real\n\n🔐 <strong>Segurança</strong>\n• Conformidade LGPD\n• Criptografia de dados\n• Logs de auditoria',
                            '🚀 Principais funcionalidades:\n\n✓ Interface intuitiva e fácil de usar\n✓ Dados 100% seguros e criptografados\n✓ Lembretes automáticos para reduzir faltas\n✓ Prontuário com texto rico e sigilo profissional\n✓ Agenda com visualização mensal e diária\n✓ Financeiro integrado com múltiplos métodos\n✓ Dashboard com métricas da sua clínica\n✓ Acesso mobile e desktop sincronizado\n✓ Backup automático diário\n✓ Suporte especializado em psicologia\n\nTudo em uma plataforma moderna e confiável!',
                            'Tudo integrado para sua clínica! 💚\n\n📋 <strong>Para o dia a dia:</strong>\n• Cadastro rápido de pacientes\n• Agenda que evita conflitos de horário\n• Prontuário que protege o sigilo\n• Lembretes que reduzem faltas\n\n📊 <strong>Para gestão:</strong>\n• Controle financeiro simplificado\n• Relatórios de faturamento\n• Métricas de atendimento\n\n🔐 <strong>Para segurança:</strong>\n• Conformidade com LGPD e Código de Ética\n• Criptografia de ponta a ponta\n• Acesso restrito por perfil\n\nPronto para transformar sua gestão?'
                        ],
                        followUp: ['Quer ver uma demonstração de alguma funcionalidade específica?', 'Tem alguma dúvida sobre como usar algum recurso?']
                    },
                    seguranca: {
                        keywords: ['segurança', 'lgpd', 'privacidade', 'dados', 'sigilo', 'criptografia', 'proteção', 'confidencial', 'ético'],
                        responses: [
                            '🔐 Sua segurança é prioridade absoluta!\n\n<strong>Criptografia:</strong>\n• AES-256 para dados em repouso\n• HTTPS/TLS para dados em trânsito\n• Chaves de criptografia gerenciadas com segurança\n\n<strong>Conformidade LGPD:</strong>\n• Gestão de consentimento digital\n• Direitos do titular facilitados\n• Registro de bases legais\n• Exclusão segura quando solicitado\n\n<strong>Controle de Acesso:</strong>\n• Autenticação segura por usuário\n• Permissões granulares por função\n• Logs de auditoria imutáveis\n• Sessões com timeout automático\n\n<strong>Infraestrutura:</strong>\n• Backups automáticos diários\n• Servidores em território nacional\n• Monitoramento 24/7\n\nDesenvolvido respeitando integralmente o Código de Ética dos Psicólogos. 🧠💚',
                            'O PsiCare foi criado pensando na sensibilidade dos dados de saúde mental! 🧠\n\n✅ <strong>Princípios de Privacidade:</strong>\n• Minimização: coletamos apenas o necessário\n• Finalidade: uso exclusivo para gestão clínica\n• Transparência: você controla seus dados\n• Segurança: proteção técnica e organizacional\n\n✅ <strong>Para o Psicólogo:</strong>\n• Acesso restrito aos seus próprios pacientes\n• Prontuários com campo sigiloso exclusivo\n• Exportação de dados quando necessário\n• Exclusão completa da conta se desejar\n\n✅ <strong>Para o Paciente:</strong>\n• Consentimento digital para tratamento\n• Direito de acesso e correção de dados\n• Transparência sobre uso das informações\n\nSiga tranquilo(a) as normas do seu conselho profissional! 📋',
                            'Conformidade é nosso compromisso! 📋✨\n\n🔹 <strong>LGPD - Lei Geral de Proteção de Dados:</strong>\n• Artigo 7º: Bases legais para tratamento\n• Artigo 18º: Direitos dos titulares garantidos\n• Artigo 46º: Medidas de segurança adequadas\n\n🔹 <strong>Código de Ética dos Psicólogos:</strong>\n• Sigilo profissional preservado\n• Prontuários com acesso restrito\n• Registro ético de evoluções\n\n🔹 <strong>Medidas Técnicas:</strong>\n• Criptografia de ponta a ponta\n• Autenticação de dois fatores (em breve)\n• Logs que não podem ser alterados\n• Backups em locais isolados\n\n🔹 <strong>Medidas Organizacionais:</strong>\n• Equipe treinada em privacidade\n• Políticas de acesso documentadas\n• Auditorias regulares de segurança\n\nSeus pacientes merecem essa proteção! 💚'
                        ],
                        followUp: ['Quer saber mais sobre como protegemos os dados?', 'Tem alguma dúvida específica sobre conformidade com seu conselho?']
                    },
                    suporte: {
                        keywords: ['suporte', 'ajuda', 'atendimento', 'contato', 'falar', 'suporte técnico', 'assistência', 'dúvida'],
                        responses: [
                            'Estamos aqui para ajudar! 💬✨\n\n<strong>Canais de Atendimento:</strong>\n📧 E-mail: contato@psicare.com.br\n📱 WhatsApp: (11) 99999-9999\n💬 Chat: Aqui mesmo comigo! 😊\n🕐 Horário: Seg-Sex, 9h-18h (horário de Brasília)\n\n<strong>Por Plano:</strong>\n• Iniciante: Suporte por e-mail (até 24h)\n• Profissional: Suporte prioritário 24/7\n• Clínica: Gerente de conta dedicado\n\n<strong>Autoatendimento:</strong>\n📚 Central de Ajuda com tutoriais\n🎥 Vídeos passo a passo\n❓ FAQs com perguntas frequentes\n👥 Comunidade de usuários\n\nQual canal você prefere usar?',
                            'Precisa de ajuda? Temos várias opções! 🙌\n\n💬 <strong>Chat com IA (eu!):</strong>\n• Respostas imediatas para dúvidas comuns\n• Orientação passo a passo no sistema\n• Disponível 24/7\n\n👤 <strong>Suporte Humano:</strong>\n• E-mail: contato@psicare.com.br\n• WhatsApp: (11) 99999-9999\n• Resposta em até 2h (planos Profissional/Clínica)\n\n📚 <strong>Central de Ajuda:</strong>\n• Tutoriais em vídeo\n• Artigos detalhados\n• Guias de boas práticas\n• Webinars mensais\n\n👥 <strong>Comunidade:</strong>\n• Grupo exclusivo de usuários\n• Troca de experiências\n• Dicas entre profissionais\n\nComo posso te ajudar agora? 😊',
                            'Nosso suporte é especializado em psicologia! 🧠💚\n\n✨ <strong>Por que nosso suporte é diferente:</strong>\n• Equipe que entende sua rotina clínica\n• Respostas contextualizadas para psicólogos\n• Respeito ao sigilo profissional em todo atendimento\n• Orientações alinhadas ao Código de Ética\n\n✨ <strong>Tempo de Resposta:</strong>\n• Chat IA: Imediato ⚡\n• E-mail (Iniciante): Até 24h\n• E-mail (Profissional/Clínica): Até 2h\n• WhatsApp: Até 1h em horário comercial\n\n✨ <strong>Recursos Exclusivos:</strong>\n• Tutoriais com casos reais da psicologia\n• Webinars sobre gestão de clínica\n• Templates de documentos éticos\n• Atualizações sobre LGPD para saúde\n\nQual é a sua dúvida específica? Estou aqui para ajudar! 🤝'
                        ],
                        followUp: ['Qual é a sua dúvida específica?', 'Posso te direcionar para o recurso certo?']
                    },
                    cancelar: {
                        keywords: ['cancelar', 'cancelamento', 'parar', 'encerrar', 'sair', 'excluir conta', 'remover', 'deletar'],
                        responses: [
                            'Você pode cancelar a qualquer momento, sem burocracia! 🙌✨\n\n<strong>Como cancelar:</strong>\n1️⃣ Acesse Configurações → Minha Conta\n2️⃣ Clique em "Gerenciar Assinatura"\n3️⃣ Selecione "Cancelar Plano"\n4️⃣ Confirme a ação\n5️⃣ Pronto! 🎉\n\n<strong>O que acontece depois:</strong>\n✓ Seu acesso continua até o fim do período pago\n✓ Você pode exportar todos os seus dados\n✓ Não há multa ou fidelidade\n✓ Pode reativar quando quiser, mantendo seus dados\n\nPosso te ajudar com algo mais antes de decidir? 😊',
                            'Entendemos que cada momento é único! 💚\n\n<strong>Política de Cancelamento Transparente:</strong>\n\n✅ Sem taxas ocultas\n✅ Sem fidelidade obrigatória\n✅ Sem perguntas constrangedoras\n✅ Processo em menos de 1 minuto\n\n<strong>Antes de cancelar, saiba que:</strong>\n• Seus dados permanecem seguros até a exclusão\n• Você pode fazer backup completo a qualquer momento\n• Se mudar de ideia, reativação é instantânea\n• Histórico e configurações são preservados\n\n<strong>Precisa de ajuda?</strong>\nSe houver algo que não está funcionando como esperado, me conta! Talvez possamos resolver juntos. 🤝\n\nO que te leva a considerar o cancelamento?',
                            'Sem problemas! O cancelamento é simples e sem letras miúdas: ✨\n\n🔄 <strong>Flexibilidade Total:</strong>\n• Pause sua conta por até 3 meses\n• Mude de plano quando quiser\n• Cancele e reative sem perder dados\n\n📦 <strong>Exportação de Dados:</strong>\n• Baixe todos os seus pacientes em CSV\n• Exporte prontuários em PDF\n• Guarde seu histórico financeiro\n\n🔐 <strong>Exclusão Segura:</strong>\n• Confirmação por e-mail para segurança\n• Exclusão definitiva em até 30 dias\n• Certificado de exclusão disponível\n\n💡 <strong>Dica:</strong> Se o motivo for preço, conheça nosso plano Iniciante (R$ 49/mês) ou entre em contato para condições especiais!\n\nHá algo que possamos melhorar? Sua opinião é importante! 🙏'
                        ],
                        followUp: ['Há algo que possamos melhorar?', 'Posso te mostrar outras opções de plano?']
                    },
                    comparacao: {
                        keywords: ['comparar', 'diferença', 'qual escolher', 'recomenda', 'melhor', 'indicar', 'sugere', 'ideal'],
                        responses: [
                            'Vamos encontrar o plano ideal para você! 🎯✨\n\n🌱 <strong>Iniciante - R$ 49/mês</strong>\n<em>Perfeito para:</em> Quem está começando\n• Até 20 pacientes ativos\n• Agenda básica funcional\n• Prontuário eletrônico completo\n• Backup diário automático\n• Ideal para: Consultório individual iniciante\n\n⭐ <strong>Profissional - R$ 89/mês</strong> ⭐ MAIS POPULAR\n<em>Perfeito para:</em> Profissional em crescimento\n• Pacientes ilimitados\n• Agenda com lembretes automáticos\n• Módulo financeiro completo\n• Suporte prioritário 24/7\n• Integração com videoconferência\n• Ideal para: Consultório estabelecido\n\n🏢 <strong>Clínica - R$ 179/mês</strong>\n<em>Perfeito para:</em> Equipes e clínicas\n• Tudo do Profissional\n• Múltiplos profissionais na mesma conta\n• Controle de permissões por usuário\n• Relatórios avançados e API\n• Gerente de conta dedicado\n• Ideal para: Clínicas com equipe\n\nQual é o tamanho da sua prática hoje?',
                            'Minha recomendação: comece pelo <strong>Profissional (R$ 89)</strong>! ✨\n\n<strong>Por quê?</strong>\n✓ Teste grátis de 14 dias para experimentar sem risco\n✓ Cabe no orçamento da maioria dos profissionais\n✓ Inclui TUDO que você precisa para crescer\n✓ Suporte prioritário quando mais precisar\n✓ Pode mudar para Iniciante depois se quiser\n\n<strong>Matemática simples:</strong>\n• R$ 89/mês = menos de R$ 3/dia\n• Se evitar 1 falta por mês com lembretes, já se paga\n• Tempo economizado na gestão = mais tempo para pacientes\n• Paz mental com segurança e conformidade\n\n<strong>Garantia:</strong>\n• 14 dias de teste grátis\n• Cancelamento a qualquer momento\n• Sem fidelidade, sem multa\n\nQuer começar o teste agora? 😊',
                            '🤔 Ajudo você a decidir com 3 perguntas rápidas!\n\n1️⃣ <strong>Quantos pacientes você atende por mês?</strong>\n• Até 20 → Iniciante pode ser suficiente\n• Mais de 20 → Profissional é ideal\n\n2️⃣ <strong>Trabalha sozinho(a) ou em equipe?</strong>\n• Sozinho(a) → Iniciante ou Profissional\n• Equipe → Clínica é necessário\n\n3️⃣ <strong>Precisa de integração com outros sistemas?</strong>\n• Não → Iniciante ou Profissional\n• Sim → Clínica com API\n\n<strong>Minha sugestão geral:</strong>\nComece com o Profissional em teste grátis! 🎁\n• Experimente todas as funcionalidades\n• Veja o que realmente usa\n• Decida depois com base na experiência real\n\nQuer que eu te mostre uma comparação detalhada em tabela?'
                        ],
                        followUp: ['Quantos pacientes você atende atualmente?', 'Trabalha sozinho(a) ou com equipe?']
                    }
                },

                support: {
                    login: {
                        keywords: ['login', 'entrar', 'acessar', 'senha', 'esqueci', 'conta', 'usuário', 'user', 'acesso', 'autenticação'],
                        responses: [
                            'Vamos resolver isso! 🔐✨\n\n<strong>Para acessar o sistema:</strong>\n1️⃣ Use o e-mail cadastrado\n2️⃣ Digite sua senha\n3️⃣ Selecione seu perfil:\n   • Psicólogo\n   • Paciente\n   • Administrador\n4️⃣ Clique em "Entrar"\n\n<strong>Esqueceu a senha?</strong>\n• Clique em "Esqueci minha senha" na tela de login\n• Digite seu e-mail cadastrado\n• Receba o link de redefinição\n• Crie uma nova senha segura\n\n<strong>Usuários de teste:</strong>\n👨‍⚕️ Psicólogo: psicologo@psicare.com / 123456\n👤 Paciente: paciente@psicare.com / 123456\n👨‍💼 Admin: admin@psicare.com / 123456\n\nPrecisa de mais ajuda?',
                            'Problemas para entrar? Vamos verificar! ✅\n\n🔍 <strong>Checklist de Solução:</strong>\n✓ E-mail digitado corretamente (sem espaços)\n✓ Senha com maiúsculas/minúsculas corretas\n✓ Caps Lock desativado\n✓ Conexão com internet estável\n✓ Navegador atualizado (Chrome, Firefox, Edge)\n\n🔄 <strong>Tente isto:</strong>\n1. Recarregue a página (F5 ou Ctrl+R)\n2. Limpe cache e cookies do navegador\n3. Tente o modo anônimo/privado\n4. Tente outro navegador ou dispositivo\n\n🔑 <strong>Redefinir senha:</strong>\n1. Na tela de login, clique em "Esqueci minha senha"\n2. Insira seu e-mail cadastrado\n3. Verifique sua caixa de entrada (e spam)\n4. Siga o link recebido (válido por 1 hora)\n5. Crie uma nova senha forte\n\nSe persistir, me conta: qual mensagem de erro aparece?',
                            'Dicas para login sem erros! 💡🔐\n\n✨ <strong>Boas Práticas:</strong>\n• Use um e-mail que você acessa regularmente\n• Crie senhas fortes: mínimo 8 caracteres, com letras, números e símbolos\n• Anote a senha em local seguro (gerenciador de senhas)\n• Ative a autenticação de dois fatores (em breve disponível)\n\n✨ <strong>Se o login falhar:</strong>\n• Verifique se está no perfil correto (Psicólogo/Paciente/Admin)\n• Confirme se a conta foi ativada (verifique e-mail de boas-vindas)\n• Tente acessar por outro dispositivo para isolar o problema\n\n✨ <strong>Segurança da Conta:</strong>\n• Nunca compartilhe sua senha\n• Deslogue ao usar computadores públicos\n• Altere a senha periodicamente\n• Desconfie de e-mails pedindo dados (nunca pedimos senha por e-mail)\n\nAinda com dificuldades? Me conta o que está acontecendo! 🤝'
                        ],
                        followUp: ['Qual mensagem de erro está aparecendo?', 'Já tentou redefinir a senha?']
                    },
                    paciente: {
                        keywords: ['paciente', 'cadastrar', 'novo paciente', 'editar paciente', 'excluir paciente', 'dados paciente', 'cliente', 'atendido'],
                        responses: [
                            'Gerenciar pacientes é simples! 👥✨\n\n<strong>📋 Para cadastrar um novo paciente:</strong>\n1️⃣ Menu lateral → <strong>Pacientes</strong>\n2️⃣ Clique no botão <strong>"Novo Paciente"</strong>\n3️⃣ Preencha os campos obrigatórios (*):\n   • Nome Completo\n   • E-mail\n4️⃣ Preencha campos opcionais:\n   • Telefone (com DDD)\n   • Data de Nascimento\n   • Status (Ativo/Suspenso/Alta)\n   • Anamnese inicial\n5️⃣ Clique em <strong>Salvar</strong> ✅\n\n<strong>💡 Dicas:</strong>\n• Use o campo "Status" para organizar sua lista\n• A anamnese pode ser editada depois\n• O e-mail é usado para lembretes automáticos\n• Telefone no formato: (11) 99999-9999\n\n<strong>🔍 Para encontrar um paciente:</strong>\n• Use a busca no topo da tabela\n• Filtre por status clicando no cabeçalho\n• Ordene por nome ou última consulta\n\nPrecisa de ajuda com alguma ação específica?',
                            'Tudo sobre pacientes! 📋👥\n\n✏️ <strong>Editar paciente:</strong>\n1. Na lista de pacientes, localize o nome\n2. Clique no botão ✏️ (Editar)\n3. Altere os dados necessários\n4. Clique em "Salvar"\n\n🗑️ <strong>Excluir paciente:</strong>\n1. Clique no botão 🗑️ (Excluir)\n2. Confirme a ação no pop-up\n⚠️ <em>Atenção:</em> A exclusão remove o paciente da lista, mas mantém histórico de consultas e prontuários por conformidade.\n\n🔍 <strong>Buscar e filtrar:</strong>\n• Barra de pesquisa: digite nome ou e-mail\n• Ordenação: clique nos cabeçalhos das colunas\n• Filtro por status: use o dropdown acima da tabela\n\n📊 <strong>Informações úteis:</strong>\n• "Última Consulta": mostra a data do último atendimento\n• Badge de status: cores indicam Ativo (verde), Suspenso (amarelo), Alta (cinza)\n• Botão 📋: acesso rápido ao prontuário do paciente\n\n✨ <strong>Boas práticas:</strong>\n• Mantenha dados atualizados para lembretes funcionarem\n• Use "Suspenso" para pausas temporárias no tratamento\n• Marque "Alta" apenas quando o tratamento for encerrado\n\nQuer que eu te mostre como registrar a primeira sessão de um paciente?',
                            'Fluxo completo de pacientes! 🔄👥\n\n<strong>1️⃣ Cadastro Inicial</strong>\n• Dados básicos: nome, e-mail, telefone\n• Informações clínicas: data de nascimento, anamnese\n• Configurações: status inicial, observações\n\n<strong>2️⃣ Primeira Sessão</strong>\n• Agenda: marque o primeiro horário\n• Prontuário: registre anamnese detalhada\n• Financeiro: registre pagamento ou pendência\n\n<strong>3️⃣ Acompanhamento</strong>\n• Agenda: consultas recorrentes ou avulsas\n• Prontuário: evolução após cada sessão\n• Financeiro: controle mensal de recebimentos\n\n<strong>4️⃣ Encerramento</strong>\n• Status: mudar para "Alta" quando apropriado\n• Prontuário: registro final da evolução\n• Dados: exportar se necessário para o paciente\n\n✨ <strong>Recursos inteligentes:</strong>\n• Histórico automático de consultas vinculadas\n• Lembretes baseados no e-mail/telefone cadastrado\n• Prontuário com bloqueio de edição após 24h (integridade)\n• Exportação de dados para portabilidade (LGPD)\n\nQuer que eu te guie passo a passo em alguma dessas etapas?'
                        ],
                        followUp: ['Quer cadastrar um paciente agora?', 'Precisa de ajuda com a anamnese?']
                    },
                    agenda: {
                        keywords: ['agenda', 'agendar', 'consulta', 'horário', 'marcar', 'cancelar consulta', 'lembrete', 'calendário', 'sessão'],
                        responses: [
                            'Agendar é rápido! 📅✨\n\n<strong>🗓️ Passo a passo para agendar:</strong>\n1️⃣ Menu lateral → <strong>Agenda</strong>\n2️⃣ Clique em <strong>"Agendar Consulta"</strong>\n3️⃣ Selecione o paciente na lista\n4️⃣ Escolha <strong>data</strong> e <strong>horário</strong> disponíveis\n5️⃣ Defina o <strong>tipo</strong>:\n   • Presencial (endereço do consultório)\n   • Online (link de vídeo gerado automaticamente)\n6️⃣ Adicione <strong>observações</strong> (opcional)\n7️⃣ Defina o <strong>status</strong>:\n   • Agendada (padrão)\n   • Confirmada (após confirmação do paciente)\n8️⃣ Clique em <strong>Salvar</strong> ✅\n\n<strong>🔔 Lembretes automáticos:</strong>\n• Enviados 24h antes da consulta\n• Por e-mail e/ou WhatsApp (se configurado)\n• Com link de confirmação para o paciente\n• Reduzem faltas em até 80%!\n\n<strong>📱 Visualizações da agenda:</strong>\n• Calendário mensal: visão geral do mês\n• Lista: todas as consultas em ordem cronológica\n• Filtros: por paciente, tipo ou status\n\nQuer que eu te mostre como agendar uma consulta online com link de vídeo?',
                            'Dicas para uma agenda organizada! ✨📅\n\n🎨 <strong>Personalização:</strong>\n• Cores por tipo de consulta (Presencial/Online)\n• Destaque para consultas confirmadas\n• Indicador visual para consultas com observações\n\n🔔 <strong>Lembretes inteligentes:</strong>\n• Configure o horário do lembrete (24h, 2h, 30min antes)\n• Mensagem personalizável para cada paciente\n• Link de confirmação que atualiza o status automaticamente\n• Redução significativa de faltas e atrasos\n\n🔄 <strong>Recorrência:</strong>\n• Agende sessões semanais/mensais de uma vez\n• Ex: "Toda terça às 15h" → cria automaticamente\n• Pause ou cancele ocorrências individuais se necessário\n• Ideal para tratamentos de longo prazo\n\n🌐 <strong>Consultas Online:</strong>\n• Link de vídeo gerado automaticamente (Zoom/Meet)\n• Enviado no lembrete e na confirmação\n• Acesso direto pelo paciente, sem cadastro extra\n• Registro no prontuário do link utilizado\n\n📊 <strong>Estatísticas úteis:</strong>\n• Taxa de comparecimento por paciente\n• Horários mais solicitados\n• Média de sessões por tratamento\n\nPrecisa de ajuda para configurar os lembretes?',
                            'Gerencie sua agenda como um pro! 🎯📅\n\n<strong>📱 Acesso Multiplataforma:</strong>\n• Desktop: visão completa com calendário e lista\n• Tablet: interface adaptada para toque\n• Mobile: agenda simplificada para consulta rápida\n• Sincronização em tempo real entre dispositivos\n\n<strong>🔔 Notificações:</strong>\n• Alertas push no navegador (se permitido)\n• E-mail para consultas do dia\n• WhatsApp para confirmações (integração em breve)\n• Resumo semanal por e-mail (configurável)\n\n<strong>🔄 Gestão de Mudanças:</strong>\n• Reagendar: arraste e solte no calendário ou edite\n• Cancelar: status muda para "Cancelada", mantém histórico\n• Justificativa: campo opcional para registrar motivo\n• Notificação automática ao paciente sobre mudanças\n\n<strong>🌐 Integração de Vídeo:</strong>\n• Links automáticos para Zoom, Google Meet, Jitsi\n• Um clique para iniciar a sessão\n• Registro do link no prontuário para histórico\n• Opção de gerar link único por consulta\n\n<strong>📊 Planejamento:</strong>\n• Visão mensal para organizar a carga de atendimentos\n• Bloqueio de horários para almoço/descanso\n• Indicador de disponibilidade em tempo real\n• Exportação para Google Calendar (em breve)\n\nPrecisa de ajuda para configurar alguma dessas funcionalidades?'
                        ],
                        followUp: ['Quer agendar uma consulta agora?', 'Precisa de ajuda com consultas online?']
                    },
                    prontuario: {
                        keywords: ['prontuário', 'evolução', 'sessão', 'registro', 'anotação', 'histórico', 'sigilo', 'pep', 'prontuario'],
                        responses: [
                            'Prontuário seguro e organizado! 📋🔐\n\n<strong>📝 Para registrar uma evolução:</strong>\n1️⃣ Menu lateral → <strong>Prontuários</strong>\n2️⃣ Selecione o paciente no dropdown\n3️⃣ Clique em <strong>"Nova Evolução"</strong>\n4️⃣ Preencha os campos:\n   • Data da sessão (preenchida automaticamente)\n   • Evolução: descreva o atendimento (texto rico)\n   • Observações sigilosas: só você vê (opcional)\n5️⃣ Clique em <strong>Salvar Evolução</strong> ✅\n\n<strong>✍️ Editor de texto rico:</strong>\n• <strong>Negrito</strong>: selecione e use Ctrl+B ou o botão\n• <em>Itálico</em>: selecione e use Ctrl+I\n• Listas com marcadores ou numeração\n• Títulos e subtítulos para organizar\n\n<strong>🔒 Campo sigiloso:</strong>\n• Anotações sensíveis que só você acessa\n• Não aparece em exportações para o paciente\n• Útil para reflexões profissionais ou informações delicadas\n• Criptografado separadamente no banco de dados\n\n<strong>📅 Linha do tempo:</strong>\n• Evoluções exibidas em ordem cronológica\n• Data e hora de cada registro\n• Indicador visual para observações sigilosas\n• Busca por palavras-chave no histórico\n\n<strong>⚠️ Integridade dos registros:</strong>\n• Edição permitida apenas nas primeiras 24h\n• Após isso, apenas adendos são possíveis\n• Todas as alterações são registradas em log\n• Conformidade com requisitos éticos de prontuário\n\nPrecisa de ajuda para registrar sua primeira evolução?',
                            'Boas práticas no prontuário! 💡📋\n\n✨ <strong>Estrutura sugerida para evoluções:</strong>\n1. <strong>Queixa principal:</strong> motivo da sessão\n2. <strong>Observações:</strong> comportamento, humor, aparência\n3. <strong>Intervenções:</strong> técnicas utilizadas\n4. <strong>Resposta do paciente:</strong> reações e insights\n5. <strong>Encaminhamentos:</strong> tarefas para próxima sessão\n6. <strong>Plano:</strong> foco do próximo atendimento\n\n✨ <strong>Uso do campo sigiloso:</strong>\n• Reflexões profissionais sobre o caso\n• Informações sensíveis não compartilháveis\n• Anotações para supervisão ou estudo\n• Dados que exigem proteção adicional\n\n✨ <strong>Dicas de redação:</strong>\n• Seja objetivo mas completo\n• Use linguagem técnica apropriada\n• Evite juízos de valor, foque em observações\n• Registre logo após a sessão (memória fresca)\n• Revise antes de salvar (edição limitada após 24h)\n\n✨ <strong>Organização do histórico:</strong>\n• Use títulos para sessões importantes\n• Marque evoluções-chave para referência rápida\n• Exporte trechos quando necessário para relatórios\n• Mantenha consistência na estrutura ao longo do tempo\n\n✨ <strong>Conformidade ética:</strong>\n• Registre apenas o necessário para o cuidado\n• Proteja identidades em anotações compartilhadas\n• Respeite o direito de acesso do paciente aos próprios dados\n• Mantenha sigilo mesmo em anotações internas\n\nQuer dicas de como estruturar uma boa evolução para um caso específico?',
                            'Sigilo e praticidade juntos! 🔐✨📋\n\n<strong>📝 Editor Rico - Recursos:</strong>\n• Formatação: negrito, itálico, sublinhado\n• Listas: com marcadores ou numeração\n• Títulos: H1, H2, H3 para hierarquia\n• Citações: para destacar trechos importantes\n• Código: para registrar escalas ou protocolos\n\n<strong>🔒 Camadas de Sigilo:</strong>\n• <em>Público</em>: informações que o paciente pode acessar\n• <em>Profissional</em>: apenas você, o psicólogo responsável\n• <em>Sigiloso</em>: campo extra para anotações sensíveis\n• <em>Auditoria</em>: logs de acesso que ninguém altera\n\n<strong>📅 Linha do Tempo Inteligente:</strong>\n• Visualização cronológica com indicadores visuais\n• Filtro por período: semana, mês, ano, personalizado\n• Busca full-text: encontre por palavras-chave\n• Exportação seletiva: escolha quais evoluções incluir\n\n<strong>🔍 Busca e Organização:</strong>\n• Busque por: data, palavras-chave, tipo de sessão\n• Marque evoluções como "favoritas" para referência\n• Agrupe por temas: ansiedade, relacionamento, etc.\n• Adicione tags para filtragem avançada\n\n<strong>📤 Exportação Ética:</strong>\n• Gere PDF para compartilhar com o paciente\n• Selecione quais evoluções incluir\n• Remova automaticamente campos sigilosos\n• Adicione cabeçalho com dados da clínica\n\n<strong>⚡ Atalhos úteis:</strong>\n• Ctrl+S: salvar evolução rapidamente\n• Ctrl+Enter: nova evolução para o mesmo paciente\n• Ctrl+F: buscar no histórico\n• Ctrl+E: exportar seleção\n\nPrecisa de ajuda para registrar sua primeira evolução?'
                        ],
                        followUp: ['Quer registrar uma evolução agora?', 'Tem dúvida sobre o que incluir no prontuário?']
                    },
                    financeiro: {
                        keywords: ['financeiro', 'pagamento', 'recebimento', 'valor', 'recibo', 'faturamento', 'relatório', 'dinheiro', 'pix', 'cartão'],
                        responses: [
                            'Controle financeiro simplificado! 💰✨\n\n<strong>💵 Para registrar um pagamento:</strong>\n1️⃣ Menu lateral → <strong>Financeiro</strong>\n2️⃣ Clique em <strong>"Novo Pagamento"</strong>\n3️⃣ Selecione o <strong>paciente</strong> na lista\n4️⃣ Informe o <strong>valor</strong> (R$)\n5️⃣ Escolha o <strong>método</strong>:\n   • Dinheiro\n   • Cartão de Crédito\n   • Cartão de Débito\n   • PIX\n   • Transferência Bancária\n6️⃣ Defina o <strong>status</strong>:\n   • Pendente (ainda não recebido)\n   • Pago (recebido com sucesso)\n   • Cancelado (não será recebido)\n7️⃣ Confirme a <strong>data</strong> do pagamento\n8️⃣ Clique em <strong>Salvar</strong> ✅\n\n<strong>📊 Dashboard Financeiro:</strong>\n• Receita total do mês em destaque\n• Valores pendentes para controle de inadimplência\n• Gráfico de métodos de pagamento mais usados\n• Comparativo mês a mês para acompanhar crescimento\n\n<strong>🧾 Emissão de recibos:</strong>\n• Gere recibos em PDF para reembolso de convênio\n• Inclui: dados da clínica, paciente, valor, data, método\n• Assinatura digital opcional\n• Envio automático por e-mail (configurável)\n\n<strong>🔍 Filtros e relatórios:</strong>\n• Por período: semana, mês, trimestre, ano, personalizado\n• Por paciente: veja histórico de pagamentos de cada um\n• Por método: analise preferências dos pacientes\n• Por status: foque em pendentes ou confirme recebidos\n\nQuer que eu te mostre como emitir um recibo?',
                            'Dicas financeiras para sua clínica! 💡💰\n\n✨ <strong>Boas práticas de registro:</strong>\n• Cadastre todos os recebimentos, mesmo os em dinheiro\n• Use "Pendente" para controlar o que ainda não recebeu\n• Atualize o status assim que o pagamento for confirmado\n• Registre a data real do recebimento, não do agendamento\n\n✨ <strong>Controle de inadimplência:</strong>\n• Filtre por "Pendente" para ver o que está em aberto\n• Use lembretes automáticos para cobranças (em breve)\n• Negocie prazos e registre no campo de observações\n• Marque como "Cancelado" apenas após confirmação\n\n✨ <strong>Relatórios que fazem diferença:</strong>\n• <em>Faturamento mensal</em>: acompanhe a saúde financeira\n• <em>Ticket médio</em>: valor médio por consulta\n• <em>Receita por paciente</em>: identifique os mais fiéis\n• <em>Métodos preferidos</em>: adapte suas opções de pagamento\n\n✨ <strong>Integração com a prática:</strong>\n• Vincule pagamentos às consultas na agenda\n• Veja no prontuário se há pendências financeiras\n• Configure lembretes de vencimento para pacientes\n• Exporte relatórios para seu contador\n\n✨ <strong>Segurança dos dados financeiros:</strong>\n• Valores criptografados no banco de dados\n• Acesso restrito por perfil de usuário\n• Logs de quem registrou ou alterou pagamentos\n• Backup automático para evitar perda de informações\n\n✨ <strong>Dica profissional:</strong>\nDefina um valor padrão da consulta em Configurações → Sistema. Isso agiliza o registro e mantém consistência nos valores cobrados.\n\nPrecisa de ajuda para interpretar algum relatório?',
                            'Relatórios que fazem diferença! 📈💰\n\n<strong>💵 Visão Geral do Faturamento:</strong>\n• <em>Receita Total</em>: soma de todos os pagamentos "Pago"\n• <em>Pendentes</em>: valores ainda a receber (controle de inadimplência)\n• <em>Recebido</em>: total já confirmado na conta\n• <em>Projeção</em>: estimativa baseada em agendamentos futuros\n\n<strong>📅 Análise por Período:</strong>\n• Filtre por: semana, mês, trimestre, ano ou datas personalizadas\n• Compare períodos: "Este mês vs. mês passado"\n• Identifique sazonalidade: épocas de maior/menor movimento\n• Planeje com base em tendências históricas\n\n<strong>👥 Análise por Paciente:</strong>\n• Veja quem mais contribui para o faturamento\n• Identifique pacientes com pendências recorrentes\n• Acompanhe a evolução do valor pago por cada um\n• Personalize abordagens com base no histórico\n\n<strong>💳 Análise por Método de Pagamento:</strong>\n• Descubra preferências: PIX, cartão, dinheiro?\n• Otimize suas opções com base na demanda\n• Negocie taxas de maquininha com dados reais\n• Facilite a vida dos pacientes com seus métodos favoritos\n\n<strong>📤 Exportação e Integração:</strong>\n• Exporte relatórios em CSV para planilhas\n• Gere PDFs formatados para contadores\n• Integre com sistemas de contabilidade (em breve)\n• Compartilhe dados anonimizados para estudos\n\n<strong>🔐 Segurança e Conformidade:</strong>\n• Dados financeiros criptografados\n• Acesso restrito por perfil (ex: paciente não vê financeiro)\n• Logs de auditoria para todas as alterações\n• Conformidade com LGPD para dados sensíveis\n\n✨ <strong>Dica de ouro:</strong>\nRevise seus relatórios financeiramente toda sexta-feira. 15 minutos bem gastos para manter a saúde financeira da sua prática!\n\nPrecisa de ajuda para configurar algum filtro ou relatório?'
                        ],
                        followUp: ['Quer registrar um pagamento agora?', 'Precisa de ajuda com os relatórios?']
                    },
                    erro: {
                        keywords: ['erro', 'bug', 'problema', 'não funciona', 'travou', 'lento', 'falha', 'quebrou', 'bugado'],
                        responses: [
                            'Ops! Vamos resolver isso juntos! 🛠️✨\n\n<strong>🔄 Soluções rápidas:</strong>\n1️⃣ <strong>Recarregue a página</strong>\n   • Pressione F5 ou Ctrl+R (Windows) / Cmd+R (Mac)\n   • Às vezes é só um carregamento incompleto\n\n2️⃣ <strong>Limpe o cache do navegador</strong>\n   • Ctrl+Shift+Del (Windows) / Cmd+Shift+Del (Mac)\n   • Selecione "Imagens e arquivos em cache"\n   • Clique em "Limpar dados"\n   • Recarregue a página\n\n3️⃣ <strong>Tente outro navegador</strong>\n   • Chrome, Firefox, Edge, Safari\n   • Às vezes o problema é específico de um navegador\n\n4️⃣ <strong>Verifique sua conexão</strong>\n   • Internet estável é essencial para o sistema\n   • Teste em outra rede se possível\n\n5️⃣ <strong>Desative extensões</strong>\n   • Algumas extensões podem interferir\n   • Tente o modo anônimo para testar\n\n<strong>📋 Se persistir, me ajude a investigar:</strong>\n• Qual funcionalidade estava usando?\n• Apareceu alguma mensagem de erro? Qual?\n• Isso acontece sempre ou foi uma vez?\n• Qual navegador e dispositivo está usando?\n\nCom essas informações, consigo te ajudar melhor! 🤝',
                            'Entendo que erros são frustrantes! 😓 Vamos investigar juntos:\n\n🔍 <strong>Me ajude a entender o problema:</strong>\n\n1. <strong>Onde aconteceu?</strong>\n   • Tela de login?\n   • Cadastro de paciente?\n   • Agenda ou calendário?\n   • Prontuário ou evolução?\n   • Financeiro ou relatórios?\n\n2. <strong>O que você estava fazendo?</strong>\n   • Clicou em algum botão específico?\n   • Preencheu algum formulário?\n   • Navegou entre páginas?\n\n3. <strong>O que apareceu?</strong>\n   • Mensagem de erro (copie o texto)\n   • Tela branca ou travada?\n   • Carregamento infinito?\n\n4. <strong>Informações do seu ambiente:</strong>\n   • Navegador: Chrome, Firefox, Edge, Safari?\n   • Dispositivo: computador, tablet, celular?\n   • Sistema: Windows, Mac, Linux, iOS, Android?\n\n💡 <strong>Enquanto isso, tente:</strong>\n• Sair e entrar novamente na conta\n• Usar o modo anônimo do navegador\n• Acessar por outro dispositivo se possível\n\nSe preferir, entre em contato direto:\n📧 contato@psicare.com.br\n📱 WhatsApp: (11) 99999-9999\n\nEstou aqui para ajudar! O que está acontecendo?',
                            'Solução rápida para problemas comuns! ⚡🛠️\n\n🔄 <strong>Página não carrega ou fica branca:</strong>\n• Limpe cache: Ctrl+Shift+Del → "Imagens e arquivos" → Limpar\n• Desative bloqueadores de anúncio temporariamente\n• Tente o modo anônimo (Ctrl+Shift+N)\n• Verifique se há atualizações pendentes do navegador\n\n💾 <strong>Dados não salvam ou somem:</strong>\n• Confirme se está conectado à internet\n• Verifique se o formulário foi preenchido corretamente (campos obrigatórios *)\n• Tente salvar novamente após alguns segundos\n• Se persistir, copie o texto antes de tentar novamente\n\n🔐 <strong>Erro de login ou acesso negado:</strong>\n• Confirme e-mail e senha (lembre-se de maiúsculas/minúsculas)\n• Verifique se selecionou o perfil correto (Psicólogo/Paciente/Admin)\n• Tente redefinir a senha se necessário\n• Confirme se sua conta está ativa (verifique e-mail de boas-vindas)\n\n🐌 <strong>Sistema lento ou travando:</strong>\n• Feche outras abas e programas para liberar memória\n• Verifique sua conexão com a internet\n• Tente acessar em horário de menor movimento\n• Use um navegador atualizado (Chrome ou Firefox recomendados)\n\n❌ <strong>Botão não clica ou não responde:</strong>\n• Aguarde alguns segundos (pode ser carregamento)\n• Recarregue a página e tente novamente\n• Tente em outro navegador ou dispositivo\n• Verifique se há pop-ups bloqueados\n\n📱 <strong>Problemas no mobile:</strong>\n• Atualize o aplicativo do navegador\n• Limpe cache do navegador mobile\n• Tente acessar pelo modo desktop do navegador\n• Verifique permissões do navegador (localização, notificações)\n\n✨ <strong>Dica de ouro:</strong>\nSe nada funcionar, tire um print da tela com o erro e me envie! Uma imagem vale mais que mil palavras. 📸\n\nSe ainda assim persistir, estou aqui para escutar! O que está acontecendo?'
                        ],
                        followUp: ['Pode descrever o erro que apareceu?', 'Isso aconteceu em qual funcionalidade?']
                    }
                },

                general: {
                    saudacao: {
                        keywords: ['olá', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'hello', 'hey', 'eai', 'opa'],
                        responses: [
                            'Olá! 👋 Que bom te ver por aqui! Como posso ajudar você hoje?',
                            'Oi! 😊 Sou o assistente do PsiCare. Em que posso ser útil?',
                            'Olá! Bem-vindo(a) ao PsiCare! 🧠💚 Precisa de ajuda com planos, sistema ou tem alguma dúvida?',
                            'Oie! ✨ PsiBot aqui, seu assistente virtual. Conta pra mim: o que você precisa?'
                        ],
                        followUp: ['Quer saber sobre nossos planos?', 'Precisa de ajuda com o sistema?', 'Tem alguma dúvida específica?']
                    },
                    despedida: {
                        keywords: ['tchau', 'adeus', 'até logo', 'bye', 'flw', 'sair', 'fechar', 'encerrar'],
                        responses: [
                            'Até logo! 👋 Foi um prazer ajudar. Volte sempre que precisar! 💚',
                            'Tchau! 😊 Se surgir qualquer dúvida, estou aqui. Cuide-se!',
                            'Até a próxima! 🌟 Lembre-se: seu bem-estar é prioridade. PsiCare está com você!',
                            'Falou! 🙌 Qualquer coisa, é só clicar no botão do WhatsApp de novo. Boa jornada!'
                        ],
                        followUp: []
                    },
                    agradecimento: {
                        keywords: ['obrigado', 'obrigada', 'valeu', 'thanks', 'agradeço', 'grato', 'grata'],
                        responses: [
                            'De nada! 😊 Estou aqui para isso. Precisa de mais alguma coisa?',
                            'Por nada! 🙌 Qualquer dúvida, é só chamar. Boa jornada!',
                            'Imagina! 💚 Fico feliz em ajudar. Em que mais posso ser útil?',
                            'Que bom que ajudei! ✨ Se precisar de novo, estou à disposição. Cuide-se!'
                        ],
                        followUp: ['Posso ajudar com algo mais?', 'Tem outra dúvida?']
                    },
                    ajuda: {
                        keywords: ['ajuda', 'help', 'como fazer', 'tutorial', 'guia', 'instruções', 'passo a passo'],
                        responses: [
                            'Claro! Posso ajudar com: 💬✨\n\n📋 <strong>Vendas e Planos:</strong>\n• Preços e diferenças entre planos\n• Como funciona o teste grátis\n• Recursos incluídos em cada plano\n• Como cancelar ou mudar de plano\n\n🔧 <strong>Uso do Sistema:</strong>\n• Login e acesso à conta\n• Cadastro e gestão de pacientes\n• Agendamento de consultas\n• Registro de evoluções no prontuário\n• Controle financeiro e relatórios\n\n🔐 <strong>Segurança e Conformidade:</strong>\n• Como protegemos seus dados (LGPD)\n• Sigilo profissional no prontuário\n• Exportação e exclusão de dados\n• Conformidade com o Código de Ética\n\n🐛 <strong>Solução de Problemas:</strong>\n• Erros de login ou acesso\n• Dados que não salvam\n• Sistema lento ou travando\n• Dúvidas sobre funcionalidades\n\nSobre qual tópico você gostaria de saber mais? 😊',
                            'Estou aqui para facilitar sua vida! 🎯✨\n\nDigite uma palavra-chave ou escolha um tópico:\n\n💰 <strong>"planos"</strong> → Para saber sobre preços e testes grátis\n👥 <strong>"paciente"</strong> → Para cadastrar ou gerenciar pacientes\n📅 <strong>"agenda"</strong> → Para agendar consultas e usar lembretes\n📋 <strong>"prontuário"</strong> → Para registrar evoluções com sigilo\n💵 <strong>"financeiro"</strong> → Para controlar pagamentos e emitir recibos\n🔐 <strong>"lgpd"</strong> → Para dúvidas sobre segurança e privacidade\n🐛 <strong>"erro"</strong> → Para solucionar problemas técnicos\n\nOu simplesmente descreva sua dúvida em português! 😊\nExemplos:\n• "Como agendar uma consulta online?"\n• "Qual plano é ideal para quem está começando?"\n• "Meus dados estão seguros no sistema?"\n\nO que te traz aqui hoje?',
                            'Guia rápido de como posso ajudar! 🗺️✨\n\n<strong>🔍 Busque por:</strong>\n• Funcionalidades: "como usar a agenda", "como registrar evolução"\n• Planos: "quanto custa", "diferença entre planos", "teste grátis"\n• Segurança: "meus dados", "lgpd", "sigilo", "criptografia"\n• Problemas: "não consigo entrar", "erro ao salvar", "sistema lento"\n\n<strong>💡 Dicas para melhores respostas:</strong>\n• Seja específico: "como agendar consulta online" é melhor que "como agendar"\n• Inclua contexto: "sou psicólogo iniciante, qual plano me indica?"\n• Descreva o erro: "aparece mensagem X quando faço Y"\n\n<strong>🔄 Se não entender:</strong>\n• Reformule a pergunta com outras palavras\n• Escolha uma das sugestões rápidas abaixo\n• Use /ajuda para ver este guia novamente\n\n<strong>🤝 Suporte humano:</strong>\nSe eu não conseguir resolver, posso te direcionar para:\n• E-mail: contato@psicare.com.br\n• WhatsApp: (11) 99999-9999\n• Central de Ajuda: tutoriais e FAQs\n\nQual é a sua dúvida principal? Estou pronto para ajudar! 😊'
                        ],
                        followUp: ['Qual é a sua dúvida principal?', 'Quer que eu te mostre por onde começar?']
                    },
                    identidade: {
                        keywords: ['quem é você', 'seu nome', 'o que é psicare', 'você é humano', 'ia', 'robô', 'bot', 'assistente'],
                        responses: [
                            'Sou o PsiBot! 🤖✨ Um assistente virtual desenvolvido especialmente para o PsiCare.\n\n<strong>Fui criado para:</strong>\n• Tirar dúvidas sobre planos e funcionalidades\n• Ajudar no uso do sistema passo a passo\n• Orientar sobre segurança e conformidade com LGPD\n• Facilitar sua experiência na plataforma\n• Estar disponível 24/7 para respostas rápidas\n\n<strong>Como funciono:</strong>\n• Respostas baseadas na documentação oficial do PsiCare\n• Reconhecimento de intenções para entender sua pergunta\n• Respostas contextualizadas (vendas ou suporte técnico)\n• Tudo processado no seu navegador, sem enviar dados\n\n<strong>O que não faço:</strong>\n• Não substituo o suporte humano para casos complexos\n• Não acesso seus dados pessoais ou da clínica\n• Não tomo decisões por você, apenas oriento\n\nNão sou humano, mas faço meu melhor para ajudar! 😊\nComo posso te auxiliar hoje?',
                            'Olá! Sou uma inteligência artificial amigável do PsiCare! 🧠💚✨\n\n<strong>Minhas especialidades:</strong>\n✅ Responder perguntas sobre planos, preços e funcionalidades\n✅ Explicar como usar cada módulo do sistema\n✅ Orientar sobre conformidade LGPD e Código de Ética\n✅ Sugerir o melhor plano para seu perfil profissional\n✅ Ajudar a solucionar erros comuns de uso\n\n<strong>Privacidade garantida:</strong>\n🔒 Tudo funciona 100% no seu navegador\n🔒 Nenhuma mensagem é enviada para servidores externos\n🔒 Não acesso seus dados pessoais ou da clínica\n🔒 Histórico da conversa fica apenas no seu dispositivo\n\n<strong>Transparência:</strong>\n• Sou uma IA, não um humano\n• Minhas respostas são baseadas na documentação oficial\n• Se não souber algo, te direciono para o suporte humano\n• Estou em constante aprendizado com feedbacks\n\n<strong>Pronto para ajudar!</strong>\nBasta digitar sua pergunta em português. Exemplos:\n• "Qual plano é ideal para quem tem 30 pacientes?"\n• "Como registro uma evolução no prontuário?"\n• "Meus dados estão seguros?"\n\nEm que posso ajudar? 😊',
                            'Prazer, PsiBot! 👋🤖 Seu assistente virtual especializado em psicologia e tecnologia.\n\n<strong>🎯 Meu propósito:</strong>\nFacilitar sua jornada no PsiCare, respondendo dúvidas rápidas para que você foque no que importa: cuidar de pessoas. 🧠💚\n\n<strong>🧠 Como penso:</strong>\n• Analiso sua mensagem para identificar a intenção\n• Busco na base de conhecimento oficial do PsiCare\n• Adapto a resposta ao seu contexto (vendas ou suporte)\n• Aprendo com padrões de perguntas para melhorar\n\n<strong>🔐 Meus princípios:</strong>\n• Privacidade: nada sai do seu navegador\n• Transparência: sempre deixo claro que sou uma IA\n• Ética: alinhado ao Código de Ética dos Psicólogos\n• Utilidade: foco em respostas práticas e acionáveis\n\n<strong>🤝 Quando te direciono para humanos:</strong>\n• Casos complexos que exigem análise personalizada\n• Problemas técnicos que precisam de acesso ao sistema\n• Dúvidas sobre sua conta específica ou dados\n• Solicitações que fogem do meu escopo de conhecimento\n\n<strong>✨ Curiosidade:</strong>\nMeu nome vem de "Psi" (psicologia) + "Bot" (robô). Simples e direto, como gosto das coisas! 😊\n\nQuer saber como funciono por dentro? Ou tem alguma dúvida prática sobre o PsiCare?'
                        ],
                        followUp: ['Quer saber como funciono?', 'Tem alguma dúvida específica sobre o PsiCare?']
                    },
                    fallback: {
                        keywords: [],
                        responses: [
                            'Entendi! 🤔✨ Essa é uma pergunta interessante. Deixe-me ver o que posso te ajudar...\n\n<strong>Você pode estar procurando por:</strong>\n• 💰 Informações sobre <strong>planos e preços</strong>\n• 🔧 Ajuda com <strong>funcionalidades do sistema</strong>\n• 🔐 Dúvidas sobre <strong>segurança e LGPD</strong>\n• 🐛 Suporte para <strong>problemas técnicos</strong>\n\n<strong>Dica:</strong> Tente reformular com palavras-chave como:\n• "preço", "plano", "teste" → para questões comerciais\n• "paciente", "agenda", "prontuário" → para uso do sistema\n• "lgpd", "sigilo", "dados" → para segurança\n• "erro", "não funciona", "bug" → para problemas\n\nOu escolha uma das sugestões rápidas abaixo! 😊\nQual é a sua necessidade?',
                            'Hmm, interessante! 😊✨ Para te dar a melhor resposta, preciso entender um pouco melhor.\n\n<strong>Sua pergunta é sobre:</strong>\n💰 <strong>Planos e Preços:</strong> valores, teste grátis, diferenças entre planos\n🔧 <strong>Uso do Sistema:</strong> como cadastrar, agendar, registrar evoluções\n🔐 <strong>Segurança:</strong> LGPD, privacidade, conformidade ética\n🐛 <strong>Problemas:</strong> erros, travamentos, dificuldades de acesso\n\n<strong>Exemplos do que posso ajudar:</strong>\n• "Como agendar uma consulta online?"\n• "Qual plano é ideal para consultório pequeno?"\n• "Como registro uma evolução com texto formatado?"\n• "Meus dados estão criptografados?"\n• "Apareceu erro X quando fiz Y, o que fazer?"\n\n<strong>Se não for nada disso:</strong>\nDescreva com mais detalhes o que você precisa! Quanto mais contexto, melhor consigo ajudar. 🎯\n\nMe dê uma dica: é sobre planos, sistema, segurança ou solução de problemas?',
                            'Boa pergunta! 🎯✨ Vou fazer meu melhor para responder.\n\n<strong>Enquanto isso, aqui estão os tópicos que mais ajudo:</strong>\n\n💰 <strong>Comercial:</strong>\n• "Quanto custa o PsiCare?"\n• "Como funciona o teste grátis?"\n• "Qual plano me indica?"\n\n🔧 <strong>Sistema:</strong>\n• "Como agendar uma consulta?"\n• "Como registrar evolução no prontuário?"\n• "Como emitir um recibo?"\n\n🔐 <strong>Segurança:</strong>\n• "Meus dados estão seguros?"\n• "Como funciona a conformidade com LGPD?"\n• "Quem tem acesso aos prontuários?"\n\n🐛 <strong>Suporte:</strong>\n• "Não consigo fazer login, e agora?"\n• "O sistema está lento, o que fazer?"\n• "Apareceu um erro, como resolver?"\n\n<strong>✨ Dica:</strong> Se sua dúvida for muito específica, descreva o contexto! Ex: "Sou psicólogo iniciante com 15 pacientes, qual plano?"\n\nAlgum desses é o que você precisa? Ou pode me dar mais detalhes? 😊'
                        ],
                        followUp: ['Pode me dar mais detalhes?', 'Isso é sobre planos, sistema ou segurança?']
                    }
                }
            };
        }

        // ========== PADRÕES DE INTENÇÃO (NLP Simplificado) ==========
        _buildIntentPatterns() {
            return {
                entities: {
                    paciente: /\b(paciente[s]?|cliente[s]?|atendido[s]?|pessoa[s]?|usuário[s]?)\b/i,
                    consulta: /\b(consulta[s]?|sess[ãa]o|sessões|atendimento|horário|agenda|marcar)\b/i,
                    valor: /\b([R$]?[\d,]+\.?[\d]*|preço|valor|custo|barato|caro|grátis|gratuito)\b/i,
                    tempo: /\b(hoje|amanhã|semana|mês|ano|agora|depois|antes|próximo|passado|sempre|nunca)\b/i,
                    status: /\b(ativo|suspenso|alta|pago|pendente|cancelado|confirmado|agendado|realizado)\b/i
                },
                sentiment: {
                    positivo: /\b(bom|ótimo|excelente|maravilhoso|perfeito|amei|adorei|obrigado|valeu|top|show|legal)\b/i,
                    negativo: /\b(ruim|péssimo|horrível|ódio|odeio|frustrado|chateado|erro|problema|não funciona|travou)\b/i,
                    neutro: /\b(ok|certo|entendi|hum|aham|talvez|não sei|pode ser|acho que)\b/i
                }
            };
        }

        // ========== INICIALIZAÇÃO ==========
        _init() {
            this._createWidget();
            this._injectStyles();
            this._attachEvents();
            this._addMessage(this.config.welcomeMessage, 'bot');
            this._updateSuggestions();
        }

        // ========== CRIAÇÃO DO WIDGET ==========
        _createWidget() {
            const widget = document.createElement('div');
            widget.id = 'psicare-chatbot';
            widget.className = `chatbot-widget chatbot-${this.config.position}`;
            
            widget.innerHTML = `
                <button class="chatbot-toggle" id="chatbotToggle" aria-label="Abrir chat" title="Fale conosco">
                    <i class="fab fa-whatsapp"></i>
                    <span class="chatbot-badge" style="display: none;">1</span>
                </button>
                
                <div class="chatbot-window" id="chatbotWindow">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar"><i class="fas fa-robot"></i></div>
                        <div class="chatbot-info">
                            <h4>PsiCare Assistente</h4>
                            <span class="chatbot-status">● Online</span>
                        </div>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Fechar chat">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-body" id="chatbotBody"></div>
                    
                    <div class="chatbot-typing" id="chatbotTyping" style="display: none;">
                        <div class="typing-bubble">
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                            <span class="typing-dot"></span>
                        </div>
                    </div>
                    
                    <div class="chatbot-suggestions" id="chatbotSuggestions"></div>
                    
                    <div class="chatbot-input">
                        <input type="text" id="chatbotInput" placeholder="Digite sua mensagem..." autocomplete="off" aria-label="Mensagem">
                        <button class="chatbot-send" id="chatbotSend" aria-label="Enviar mensagem" disabled>
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    
                    <div class="chatbot-footer">
                        <small>🔒 Conversa local • Sem envio de dados</small>
                        <button class="chatbot-reset" id="chatbotReset" title="Reiniciar conversa">🔄</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(widget);
        }

        // ========== ESTILOS CSS ==========
        _injectStyles() {
            const style = document.createElement('style');
            style.id = 'psicare-chatbot-styles';
            style.textContent = `
                #psicare-chatbot * { box-sizing: border-box; margin: 0; padding: 0; }
                #psicare-chatbot { position: fixed; z-index: 9999; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; }
                #psicare-chatbot.chatbot-right { right: 20px; bottom: 20px; }
                #psicare-chatbot.chatbot-left { left: 20px; bottom: 20px; }
                
                .chatbot-toggle { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); border: none; color: white; font-size: 2rem; cursor: pointer; box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4), 0 0 0 4px rgba(255,255,255,0.1); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); position: relative; display: flex; align-items: center; justify-content: center; outline: none; }
                .chatbot-toggle:hover { transform: scale(1.08) translateY(-2px); box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6), 0 0 0 4px rgba(255,255,255,0.2); }
                .chatbot-toggle:active { transform: scale(0.96); }
                .chatbot-badge { position: absolute; top: -4px; right: -4px; background: #e53e3e; color: white; font-size: 0.7rem; font-weight: 700; padding: 4px 8px; border-radius: 12px; min-width: 20px; text-align: center; animation: chatbotPulse 2s infinite; border: 2px solid white; }
                @keyframes chatbotPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.15); opacity: 0.9; } }
                
                .chatbot-window { position: absolute; bottom: 84px; right: 0; width: 380px; max-height: 560px; background: white; border-radius: 18px; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0,0,0,0.05); display: none; flex-direction: column; overflow: hidden; animation: chatbotSlideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1); transform-origin: bottom right; }
                .chatbot-window.active { display: flex; }
                #psicare-chatbot.chatbot-left .chatbot-window { right: auto; left: 0; transform-origin: bottom left; }
                @keyframes chatbotSlideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                
                .chatbot-header { background: linear-gradient(135deg, #25D366 0%, #075E54 100%); color: white; padding: 16px 20px; display: flex; align-items: center; gap: 12px; position: relative; }
                .chatbot-header::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1px; background: rgba(255,255,255,0.2); }
                .chatbot-avatar { width: 42px; height: 42px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
                .chatbot-info { flex: 1; min-width: 0; }
                .chatbot-info h4 { margin: 0; font-size: 1rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .chatbot-status { font-size: 0.75rem; opacity: 0.9; display: flex; align-items: center; gap: 4px; }
                .chatbot-status::before { content: ''; display: inline-block; width: 6px; height: 6px; background: #34C759; border-radius: 50%; animation: chatbotOnline 2s infinite; }
                @keyframes chatbotOnline { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                .chatbot-close { background: none; border: none; color: white; font-size: 1.3rem; cursor: pointer; padding: 8px; border-radius: 50%; transition: background 0.2s; display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; flex-shrink: 0; }
                .chatbot-close:hover { background: rgba(255,255,255,0.15); }
                
                .chatbot-body { flex: 1; padding: 16px; overflow-y: auto; background: #ECE5DD; background-image: radial-gradient(#D7CCC8 1px, transparent 1px), radial-gradient(#D7CCC8 1px, transparent 1px); background-size: 20px 20px; background-position: 0 0, 10px 10px; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
                .chatbot-body::-webkit-scrollbar { width: 6px; }
                .chatbot-body::-webkit-scrollbar-track { background: transparent; }
                .chatbot-body::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 3px; }
                .chatbot-body::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.3); }
                
                .message { max-width: 85%; padding: 10px 14px; border-radius: 12px; font-size: 0.92rem; line-height: 1.4; animation: messageFadeIn 0.2s ease-out; position: relative; word-wrap: break-word; }
                @keyframes messageFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
                .message.bot { align-self: flex-start; background: white; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05); }
                .message.user { align-self: flex-end; background: #DCF8C6; border-bottom-right-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.05); }
                .message strong { color: #128C7E; font-weight: 600; }
                .message.bot strong { color: #075E54; }
                .message ul, .message ol { padding-left: 20px; margin: 4px 0; }
                .message li { margin: 2px 0; }
                .message-time { font-size: 0.7rem; color: #666; margin-top: 4px; text-align: right; opacity: 0.8; display: block; }
                .message.bot .message-time { text-align: left; }
                
                .chatbot-typing { padding: 12px 20px 16px; background: #ECE5DD; display: flex; align-items: center; }
                .typing-bubble { background: white; padding: 12px 16px; border-radius: 12px; border-bottom-left-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.08); display: flex; gap: 4px; align-items: center; }
                .typing-dot { width: 8px; height: 8px; background: #999; border-radius: 50%; animation: typingBounce 1.4s infinite ease-in-out both; }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                .typing-dot:nth-child(3) { animation-delay: 0s; }
                @keyframes typingBounce { 0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; } 40% { transform: scale(1.2); opacity: 1; } }
                
                .chatbot-suggestions { padding: 12px 16px; background: white; border-top: 1px solid rgba(0,0,0,0.08); display: flex; flex-wrap: wrap; gap: 8px; min-height: 44px; }
                .suggestion-chip { background: #E9EDEF; border: none; padding: 8px 14px; border-radius: 20px; font-size: 0.82rem; font-weight: 500; cursor: pointer; transition: all 0.2s; color: #333; white-space: nowrap; display: flex; align-items: center; gap: 6px; }
                .suggestion-chip::before { content: '💬'; font-size: 0.9rem; }
                .suggestion-chip:hover { background: #D1D7DB; transform: translateY(-1px); }
                .suggestion-chip:active { transform: translateY(0); }
                
                .chatbot-input { padding: 12px 16px; background: white; border-top: 1px solid rgba(0,0,0,0.08); display: flex; gap: 10px; align-items: center; }
                .chatbot-input input { flex: 1; padding: 12px 16px; border: 1px solid #E9EDEF; border-radius: 24px; font-size: 0.92rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s; background: #F0F2F5; }
                .chatbot-input input::placeholder { color: #999; }
                .chatbot-input input:focus { border-color: #25D366; box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.15); background: white; }
                .chatbot-input input:disabled { background: #F5F5F5; cursor: not-allowed; }
                .chatbot-send { width: 44px; height: 44px; border-radius: 50%; background: #25D366; border: none; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; font-size: 1.1rem; }
                .chatbot-send:hover:not(:disabled) { background: #128C7E; transform: scale(1.05); }
                .chatbot-send:active:not(:disabled) { transform: scale(0.95); }
                .chatbot-send:disabled { background: #CCC; cursor: not-allowed; opacity: 0.7; }
                
                .chatbot-footer { padding: 10px 16px; background: #F0F2F5; border-top: 1px solid rgba(0,0,0,0.08); display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #666; }
                .chatbot-reset { background: none; border: none; color: #25D366; cursor: pointer; font-size: 0.75rem; padding: 4px 8px; border-radius: 4px; transition: background 0.2s; font-weight: 500; }
                .chatbot-reset:hover { background: rgba(37, 211, 102, 0.1); }
                
                @media (max-width: 480px) {
                    #psicare-chatbot.chatbot-right, #psicare-chatbot.chatbot-left { right: 12px !important; left: 12px !important; }
                    .chatbot-toggle { width: 58px; height: 58px; font-size: 1.8rem; }
                    .chatbot-window { width: calc(100vw - 24px) !important; max-height: calc(100vh - 120px); bottom: 76px; right: 12px !important; left: 12px !important; border-radius: 16px; }
                    .message { max-width: 92%; }
                }
                
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
                }
                
                @media (prefers-color-scheme: dark) {
                    .chatbot-window { background: #1a1a1a; }
                    .chatbot-body { background: #0d0d0d; background-image: radial-gradient(#333 1px, transparent 1px), radial-gradient(#333 1px, transparent 1px); }
                    .message.bot { background: #2d2d2d; color: #eee; border-color: #444; }
                    .message.user { background: #005c4b; color: white; }
                    .chatbot-input input { background: #2d2d2d; border-color: #444; color: #eee; }
                    .chatbot-input input:focus { background: #333; }
                    .chatbot-suggestions { background: #2d2d2d; border-color: #444; }
                    .suggestion-chip { background: #444; color: #eee; }
                    .suggestion-chip:hover { background: #555; }
                    .chatbot-footer { background: #252525; border-color: #444; color: #aaa; }
                }
            `;
            document.head.appendChild(style);
        }

        // ========== EVENTOS ==========
        _attachEvents() {
            const toggle = document.getElementById('chatbotToggle');
            const close = document.getElementById('chatbotClose');
            const send = document.getElementById('chatbotSend');
            const input = document.getElementById('chatbotInput');
            const reset = document.getElementById('chatbotReset');
            const window = document.getElementById('chatbotWindow');
            
            toggle?.addEventListener('click', () => this.toggle());
            close?.addEventListener('click', () => this.close());
            send?.addEventListener('click', () => this._handleSend());
            
            input?.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this._handleSend();
                }
            });
            
            input?.addEventListener('input', () => {
                if (send) send.disabled = !input.value.trim();
            });
            
            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('suggestion-chip')) {
                    const suggestion = e.target.dataset.suggestion;
                    this._addMessage(suggestion, 'user');
                    this._processMessage(suggestion);
                }
            });
            
            reset?.addEventListener('click', () => this.reset());
            
            document.addEventListener('click', (e) => {
                if (this.state.isOpen && window && toggle && 
                    !window.contains(e.target) && !toggle.contains(e.target)) {
                    this.close();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.state.isOpen) this.close();
            });
        }

        // ========== MÉTODOS PÚBLICOS ==========
        toggle() {
            this.state.isOpen = !this.state.isOpen;
            const window = document.getElementById('chatbotWindow');
            const toggle = document.getElementById('chatbotToggle');
            
            if (window) window.classList.toggle('active', this.state.isOpen);
            if (toggle) toggle.style.display = this.state.isOpen ? 'none' : 'flex';
            
            if (this.state.isOpen) {
                const input = document.getElementById('chatbotInput');
                if (input) input.focus();
                this._clearBadge();
                const body = document.getElementById('chatbotBody');
                if (body) body.scrollTop = body.scrollHeight;
            }
        }

        close() {
            this.state.isOpen = false;
            const window = document.getElementById('chatbotWindow');
            const toggle = document.getElementById('chatbotToggle');
            if (window) window.classList.remove('active');
            if (toggle) toggle.style.display = 'flex';
        }

        reset() {
            this.state.conversationHistory = [];
            this.state.userContext = {};
            this.state.lastTopic = null;
            
            const body = document.getElementById('chatbotBody');
            if (body) body.innerHTML = '';
            
            this._addMessage(this.config.welcomeMessage, 'bot');
            this._updateSuggestions();
            this._showTemporaryMessage('💬 Conversa reiniciada!', 'bot', 1500);
        }

        sendMessage(text, simulateUser = true) {
            if (simulateUser) this._addMessage(text, 'user');
            this._processMessage(text);
        }

        setContext(newContext) {
            this.config.context = newContext;
            this._updateSuggestions();
        }

        // ========== LÓGICA PRINCIPAL ==========
        _handleSend() {
            const input = document.getElementById('chatbotInput');
            const message = input?.value.trim();
            if (!message) return;
            
            this._addMessage(message, 'user');
            if (input) input.value = '';
            const send = document.getElementById('chatbotSend');
            if (send) send.disabled = true;
            
            this._processMessage(message);
        }

        _addMessage(text, sender) {
            const body = document.getElementById('chatbotBody');
            if (!body) return;
            
            const messageEl = document.createElement('div');
            messageEl.className = `message ${sender}`;
            
            const formattedText = this._formatMessage(text);
            const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
            
            messageEl.innerHTML = `${formattedText}<span class="message-time">${time}</span>`;
            body.appendChild(messageEl);
            body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
            
            this.state.conversationHistory.push({ text, sender, timestamp: Date.now() });
            if (this.state.conversationHistory.length > this.config.maxHistory) {
                this.state.conversationHistory.shift();
            }
        }

        _formatMessage(text) {
            let formatted = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>');
            formatted = formatted.replace(/\n/g, '<br>');
            
            if (formatted.includes('- ')) {
                const lines = formatted.split('<br>');
                let inList = false, result = [];
                
                for (let line of lines) {
                    if (line.trim().startsWith('- ')) {
                        if (!inList) { result.push('<ul>'); inList = true; }
                        result.push('<li>' + line.trim().substring(2) + '</li>');
                    } else {
                        if (inList) { result.push('</ul>'); inList = false; }
                        result.push(line);
                    }
                }
                if (inList) result.push('</ul>');
                formatted = result.join('<br>');
            }
            return formatted;
        }

        _showTyping() {
            this.state.isTyping = true;
            const typing = document.getElementById('chatbotTyping');
            if (typing) typing.style.display = 'flex';
            const body = document.getElementById('chatbotBody');
            if (body) body.scrollTop = body.scrollHeight;
        }

        _hideTyping() {
            this.state.isTyping = false;
            const typing = document.getElementById('chatbotTyping');
            if (typing) typing.style.display = 'none';
        }

        async _processMessage(userMessage) {
            this._showTyping();
            const delay = this._randomRange(this.config.typingDelay.min, this.config.typingDelay.max);
            await this._delay(delay);
            
            const response = this._generateResponse(userMessage);
            this._hideTyping();
            this._addMessage(response, 'bot');
            this._updateSuggestions(userMessage);
            this._updateUserContext(userMessage);
        }

        // ========== MOTOR DE RESPOSTAS ==========
        _generateResponse(userMessage) {
            const lowerMsg = userMessage.toLowerCase().trim();
            const intent = this._detectIntent(lowerMsg);
            let response = this._findResponse(intent, lowerMsg);
            response = this._varyResponse(response, intent);
            
            if (Math.random() > 0.4) {
                const followUp = this._getFollowUp(intent);
                if (followUp && response.length < 300) response += '\n\n' + followUp;
            }
            
            const sentiment = this._detectSentiment(lowerMsg);
            return this._personalizeResponse(response, sentiment);
        }

        _detectIntent(message) {
            const contexts = [this.config.context, 'general'];
            for (const context of contexts) {
                const kb = this.knowledgeBase[context];
                if (!kb) continue;
                for (const [intentName, intentData] of Object.entries(kb)) {
                    if (intentData.keywords.some(keyword => message.includes(keyword.toLowerCase()))) {
                        return { context, name: intentName, data: intentData };
                    }
                }
            }
            return this._fuzzyMatchIntent(message);
        }

        _fuzzyMatchIntent(message) {
            const words = message.split(/\s+/).filter(w => w.length > 3);
            for (const context of [this.config.context, 'general']) {
                const kb = this.knowledgeBase[context];
                if (!kb) continue;
                for (const [intentName, intentData] of Object.entries(kb)) {
                    const score = intentData.keywords.reduce((acc, keyword) => {
                        const keywordWords = keyword.split(/\s+/);
                        const matches = words.filter(word => 
                            keywordWords.some(kw => word.includes(kw.toLowerCase()) || kw.toLowerCase().includes(word))
                        );
                        return acc + matches.length;
                    }, 0);
                    if (score > 0) return { context, name: intentName, data: intentData, score };
                }
            }
            return { context: 'general', name: 'fallback', data: this.knowledgeBase.general.fallback };
        }

        _findResponse(intent, message) {
            if (!intent?.data?.responses) return this.knowledgeBase.general.fallback.responses[0];
            const responses = intent.data.responses;
            const usedResponses = this.state.conversationHistory.filter(m => m.sender === 'bot').map(m => m.text);
            const available = responses.filter(r => !usedResponses.includes(r));
            const pool = available.length > 0 ? available : responses;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        _varyResponse(response, intent) {
            const prefixes = ['', '', '', '💡 ', '✨ ', '🎯 '];
            const suffixes = ['', '', '\n\nEspero ter ajudado! 😊', '\n\nPrecisa de mais detalhes?'];
            return prefixes[Math.floor(Math.random() * prefixes.length)] + response + suffixes[Math.floor(Math.random() * suffixes.length)];
        }

        _getFollowUp(intent) {
            if (!intent?.data?.followUp) return null;
            const followUps = intent.data.followUp;
            if (followUps.length === 0) return null;
            const recentFollowUps = this.state.conversationHistory.slice(-3).map(m => m.text).join(' ');
            const available = followUps.filter(fu => !recentFollowUps.includes(fu));
            const pool = available.length > 0 ? available : followUps;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        _detectSentiment(message) {
            const { sentiment } = this.intents;
            if (sentiment.positivo.some(p => message.includes(p))) return 'positive';
            if (sentiment.negativo.some(n => message.includes(n))) return 'negative';
            return 'neutral';
        }

        _personalizeResponse(response, sentiment) {
            const additions = { positive: [' 😊', ' 🎉', ' 💚'], negative: [' 🤝', ' 💪', ' 🙏'], neutral: [' ✨', ' 👍', ' 📋'] };
            const add = additions[sentiment] || additions.neutral;
            return response + add[Math.floor(Math.random() * add.length)];
        }

        _updateUserContext(message) {
            const { entities } = this.intents;
            for (const [entityName, pattern] of Object.entries(entities)) {
                if (pattern.test(message)) {
                    this.state.userContext[entityName] = { detected: true, lastSeen: Date.now(), message };
                }
            }
            const intent = this._detectIntent(message.toLowerCase());
            if (intent?.name && intent.name !== 'fallback') this.state.lastTopic = intent.name;
        }

        // ========== UTILITÁRIOS ==========
        _updateSuggestions(lastMessage = '') {
            const suggestionsEl = document.getElementById('chatbotSuggestions');
            if (!suggestionsEl) return;
            const suggestions = this._getSuggestions(lastMessage);
            suggestionsEl.innerHTML = suggestions.map(s => `<button class="suggestion-chip" data-suggestion="${s}">${s}</button>`).join('');
        }

        _getSuggestions(lastMessage = '') {
            const base = ['Planos', 'Como usar', 'Suporte', 'LGPD'];
            if (lastMessage) {
                const lower = lastMessage.toLowerCase();
                if (lower.includes('preço') || lower.includes('valor')) return ['Teste grátis', 'Comparar planos', 'Formas de pagamento', 'Cancelar'];
                if (lower.includes('paciente') || lower.includes('cadastrar')) return ['Editar paciente', 'Excluir paciente', 'Anamnese', 'Histórico'];
                if (lower.includes('agenda') || lower.includes('agendar')) return ['Consultas online', 'Lembretes', 'Cancelar consulta', 'Recorrência'];
                if (lower.includes('prontuário') || lower.includes('evolução')) return ['Texto rico', 'Observações sigilosas', 'Exportar PDF', 'Buscar registros'];
                if (lower.includes('erro') || lower.includes('problema')) return ['Recarregar página', 'Limpar cache', 'Contatar suporte', 'Relatar bug'];
            }
            if (this.config.context === 'sales') return ['Planos', 'Teste grátis', 'Recursos', 'Contato'];
            if (this.config.context === 'support') return ['Login', 'Pacientes', 'Agenda', 'Prontuário'];
            return base;
        }

        _clearBadge() {
            const badge = document.querySelector('.chatbot-badge');
            if (badge) { badge.style.display = 'none'; badge.textContent = '1'; }
        }

        _showBadge(text = '1') {
            const badge = document.querySelector('.chatbot-badge');
            if (badge) { badge.textContent = text; badge.style.display = 'block'; }
        }

        _showTemporaryMessage(text, sender = 'bot', duration = 2000) {
            this._addMessage(text, sender);
            setTimeout(() => {
                const body = document.getElementById('chatbotBody');
                const messages = body?.querySelectorAll('.message');
                if (messages?.length > 0) {
                    const last = messages[messages.length - 1];
                    last.style.transition = 'opacity 0.3s, transform 0.3s';
                    last.style.opacity = '0';
                    last.style.transform = 'translateY(-8px)';
                    setTimeout(() => last.remove(), 300);
                }
            }, duration);
        }

        _randomRange(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
        _delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }
        _trackEvent(event, data = {}) { if (window.console?.debug) console.debug('[PsiCare Chatbot]', event, data); }
    }

    // Auto-inicialização
    if (typeof document !== 'undefined') {
        document.addEventListener('DOMContentLoaded', () => {
            const isSystemPage = window.location.href.includes('psicare.html') || 
                                 document.getElementById('appContainer') ||
                                 document.querySelector('.sidebar');
            const isLandingPage = window.location.href.includes('index.html') || 
                                  document.querySelector('.hero') ||
                                  document.querySelector('.pricing-grid');
            const context = isSystemPage ? 'support' : isLandingPage ? 'sales' : 'general';
            
            const welcomeMessages = {
                sales: 'Olá! 👋 Sou o assistente do PsiCare. Quer saber sobre nossos planos ou funcionalidades?',
                support: 'Olá! 👋 Sou o assistente do PsiCare. Precisa de ajuda com pacientes, agenda ou prontuários?',
                general: 'Olá! 👋 Sou o assistente virtual do PsiCare. Como posso ajudar você hoje?'
            };
            
            if (!global.psiCareChatbot) {
                global.psiCareChatbot = new PsiCareChatbot({
                    position: 'right',
                    context,
                    welcomeMessage: welcomeMessages[context] || welcomeMessages.general
                });
            }
            
            if (isLandingPage && global.psiCareChatbot) {
                setTimeout(() => global.psiCareChatbot._showBadge('✨'), 4000);
            }
        });
    }

    // Export
    if (typeof module !== 'undefined' && module.exports) module.exports = PsiCareChatbot;
    global.PsiCareChatbot = PsiCareChatbot;

})(typeof window !== 'undefined' ? window : this);