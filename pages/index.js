import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { ChevronRight, ChevronLeft, Check, User, Briefcase, GraduationCap, Building2, Languages, DollarSign, Users, Target, MapPin, Clock, FileText, Star, AlertCircle, TrendingUp, Calendar, Globe, Award, ChevronDown, ChevronUp, Info, Plane, Home, BookOpen, Heart, Loader2, CheckCircle2, Mail, Database, Download, Share2, Sparkles, Shield, Zap, ArrowRight, Quote, Play } from 'lucide-react';
import { initEmailJS, submitQuestionnaireData } from '../lib/integrations';

export default function Geofitting() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [expandedRoute, setExpandedRoute] = useState(null);
  const [expandedCountry, setExpandedCountry] = useState(0);
  const [activeTab, setActiveTab] = useState('resumo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
    // Seção 1: Dados Pessoais
    nomeCompleto: '',
    email: '',
    telefone: '',
    faixaEtaria: '',
    cidadeAtual: '',
    estadoCivil: '',
    nacionalidade: '',
    possuiDuplaCidadania: '',
    
    // Seção 2: Perfil Profissional
    areaAtuacao: '',
    subAreaTech: '',
    nivelCargo: '',
    tipoContrato: '',
    setorEmpresa: '',
    porteEmpresa: '',
    anosExperiencia: '',
    tempoEmpresaAtual: '',
    gestaoEquipe: '',
    trabalhoRemoto: '',
    
    // Seção 3: Realizações
    possuiPremios: '',
    tipoPremios: [],
    possuiPublicacoes: '',
    tipoPublicacoes: [],
    possuiPatentes: '',
    possuiPalestras: '',
    nivelPalestras: [],
    aparicoesMidia: '',
    tipoMidia: [],
    membroAssociacao: '',
    contribuicoesOpenSource: '',
    mentoria: '',
    
    // Seção 4: Formação Acadêmica
    nivelFormacao: '',
    areaCurso: '',
    tipoInstituicao: '',
    posGraduacao: '',
    instituicaoPosReconhecida: '',
    certificacoes: [],
    
    // Seção 5: Situação Empresarial
    possuiEmpresa: '',
    setorEmpresaPropria: '',
    faturamentoAnual: '',
    numeroFuncionarios: '',
    tempoEmpresaAberta: '',
    atuacaoInternacional: '',
    interesseEmpreenderExterior: '',
    tipoNegocioExterior: '',
    
    // Seção 6: Idiomas
    nivelIngles: '',
    certificacaoIngles: '',
    nivelEspanhol: '',
    nivelFrances: '',
    nivelAlemao: '',
    nivelItaliano: '',
    outroIdioma: '',
    disposicaoAprender: '',
    
    // Seção 7: Capacidade Financeira
    rendaMensalFamiliar: '',
    fonteRendaPrincipal: '',
    estabilidadeRenda: '',
    patrimonioLiquido: '',
    tipoPatrimonio: [],
    capacidadeInvestimento: '',
    reservaEmergencia: '',
    dividasSignificativas: '',
    disposicaoGoldenVisa: '',
    
    // Seção 8: Composição Familiar
    situacaoConjuge: '',
    areaConjuge: '',
    nivelInglesConjuge: '',
    flexibilidadeConjuge: '',
    numeroFilhos: '',
    faixaEtariaFilhos: [],
    tipoEscolaAtual: '',
    necessidadesEspeciais: '',
    outrosDependentes: '',
    
    // Seção 9: Objetivos de Vida
    motivacaoPrincipal: [],
    objetivoCarreira: '',
    expectativaSalarial: '',
    prioridadeVidaTrabalho: '',
    planoRetorno: '',
    horizonteTempo: '',
    objetivoEducacaoFilhos: '',
    planoAposentadoria: '',
    
    // Seção 10: Preferências de Destino
    paisesInteresse: [],
    paisesDescartados: [],
    preferenciaRegiao: '',
    preferenciaClima: '',
    preferenciaTamanhoCidade: '',
    importanciaComunidadeBR: '',
    preferenciaIdiomaPais: '',
    importanciaProximidadeBR: '',
    preferenciaEstiloVida: '',
    toleranciaCustoVida: '',
    prioridadeSeguranca: '',
    
    // Seção 11: Timeline e Urgência
    prazoIdeal: '',
    flexibilidadePrazo: '',
    situacaoAtualBrasil: '',
    fatoresUrgencia: [],
    disponibilidadeViagem: '',
    disponibilidadeMudanca: '',
    jaIniciouProcesso: '',
    processoAnterior: '',
    conhecimentoRotas: '',
    rotasConhecidas: [],
    disposicaoInvestirTempo: '',
    disposicaoInvestirDinheiro: ''
  });

  // Inicializar EmailJS
  useEffect(() => {
    initEmailJS();
  }, []);

  // Dados completos dos países e rotas
  const countryData = {
    portugal: {
      nome: 'Portugal',
      bandeira: '🇵🇹',
      capital: 'Lisboa',
      idioma: 'Português',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Muito grande (300k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        techVisa: {
          nome: 'Tech Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais de tecnologia com proposta de trabalho em empresa certificada pelo IAPMEI.',
          requisitos: ['Proposta de trabalho de empresa certificada', 'Formação superior em área de TI ou 5+ anos experiência', 'Contrato com salário mínimo de €1.500/mês', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '85%',
          vantagens: ['Processo simplificado', 'Família incluída', 'Caminho para cidadania'],
          desvantagens: ['Depende de proposta de emprego', 'Restrito a empresas certificadas']
        },
        d7: {
          nome: 'D7 - Visto de Rendimentos',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva mínima de €760/mês', 'Comprovação de origem lícita', 'Alojamento em Portugal', 'Seguro saúde'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Não precisa de emprego', 'Pode trabalhar em PT', 'Família incluída'],
          desvantagens: ['Precisa comprovar renda recorrente', 'Exige presença física']
        },
        d8: {
          nome: 'D8 - Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com empresas estrangeiras.',
          requisitos: ['Contrato remoto com empresa estrangeira', 'Renda mínima de €3.040/mês', 'Seguro saúde internacional', 'Comprovante de alojamento'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '82%',
          vantagens: ['Mantém emprego atual', 'Processo rápido', 'Pode levar família'],
          desvantagens: ['Renda mínima alta', 'Precisa vínculo com empresa estrangeira']
        },
        goldenVisa: {
          nome: 'Golden Visa',
          tipo: 'Investimento',
          descricao: 'Autorização de residência através de investimento qualificado.',
          requisitos: ['Investimento mínimo de €500.000 em fundos', 'Ou €500.000 em pesquisa científica', 'Manutenção por 5 anos'],
          timeline: '6-12 meses',
          custoEstimado: '€500.000+',
          taxaSucesso: '95%',
          vantagens: ['Não exige residência contínua', 'Caminho rápido para cidadania', 'Acesso a toda UE'],
          desvantagens: ['Alto investimento', 'Imóveis não qualificam mais em Lisboa/Porto']
        }
      },
      cidades: ['Lisboa', 'Porto', 'Braga', 'Coimbra', 'Cascais', 'Setúbal']
    },
    alemanha: {
      nome: 'Alemanha',
      bandeira: '🇩🇪',
      capital: 'Berlim',
      idioma: 'Alemão',
      custoVida: 'Médio-Alto',
      qualidadeVida: '9/10',
      seguranca: '8/10',
      clima: 'Temperado',
      comunidadeBR: 'Grande (150k+)',
      tempoResidencia: '8 anos para cidadania (pode reduzir para 6)',
      rotas: {
        blueCard: {
          nome: 'EU Blue Card',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais altamente qualificados.',
          requisitos: ['Diploma universitário reconhecido', 'Salário mínimo de €45.300/ano', 'Para áreas de escassez (TI): €41.000/ano', 'Contrato de pelo menos 1 ano'],
          timeline: '2-4 meses',
          custoEstimado: '€100-500',
          taxaSucesso: '90%',
          vantagens: ['Família incluída', 'Mobilidade na UE após 18 meses', 'Residência permanente em 21-33 meses'],
          desvantagens: ['Exige diploma reconhecido', 'Precisa proposta de emprego']
        },
        chancenkarte: {
          nome: 'Chancenkarte (Opportunity Card)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto baseado em pontos para buscar trabalho.',
          requisitos: ['Mínimo 6 pontos no sistema', 'Pontos por: idade, idioma, experiência', 'Diploma ou qualificação profissional', 'Recursos para se manter'],
          timeline: '2-4 meses',
          custoEstimado: '€75-200',
          taxaSucesso: '75%',
          vantagens: ['Mais flexível', 'Pode trabalhar 20h/semana', 'Válido por 1 ano'],
          desvantagens: ['Novo programa', 'Sistema de pontos complexo']
        }
      },
      cidades: ['Berlim', 'Munique', 'Frankfurt', 'Hamburgo', 'Colônia', 'Stuttgart']
    },
    eua: {
      nome: 'Estados Unidos',
      bandeira: '🇺🇸',
      capital: 'Washington D.C.',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Variado',
      comunidadeBR: 'Muito grande (2M+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        eb2Niw: {
          nome: 'EB-2 NIW',
          tipo: 'Green Card direto',
          descricao: 'Green Card para profissionais cujo trabalho beneficia os EUA.',
          requisitos: ['Mestrado ou bacharelado + 5 anos experiência', 'Demonstrar benefício ao interesse nacional', 'Evidências de realizações excepcionais'],
          timeline: '12-24 meses',
          custoEstimado: '$15.000-25.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador sponsor', 'Green Card direto', 'Família incluída'],
          desvantagens: ['Processo complexo', 'Requer evidências robustas', 'Tempo de espera longo']
        },
        eb1a: {
          nome: 'EB-1A',
          tipo: 'Green Card direto',
          descricao: 'Green Card para indivíduos com habilidades extraordinárias.',
          requisitos: ['Prêmios nacionais/internacionais', 'Atender 3 de 10 critérios', 'Reconhecimento como top da área'],
          timeline: '8-18 meses',
          custoEstimado: '$15.000-30.000',
          taxaSucesso: '60%',
          vantagens: ['Processo mais rápido', 'Não precisa empregador', 'Premium processing disponível'],
          desvantagens: ['Critérios muito exigentes', 'Alto padrão de evidências']
        },
        o1a: {
          nome: 'O-1A',
          tipo: 'Visto temporário',
          descricao: 'Visto para indivíduos com habilidades extraordinárias.',
          requisitos: ['Atender 3 de 8 critérios', 'Prêmios, publicações, salário alto', 'Proposta de trabalho ou agente nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$8.000-15.000',
          taxaSucesso: '75%',
          vantagens: ['Mais rápido que EB-1A', 'Pode renovar indefinidamente', 'Cônjuge pode trabalhar'],
          desvantagens: ['Temporário', 'Vinculado ao empregador/agente']
        },
        l1a: {
          nome: 'L-1A',
          tipo: 'Transferência executiva',
          descricao: 'Visto para executivos transferidos de multinacional.',
          requisitos: ['1+ ano na empresa no exterior', 'Cargo executivo ou gerencial', 'Empresa com operação nos EUA'],
          timeline: '3-6 meses',
          custoEstimado: '$10.000-20.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho para Green Card (EB-1C)', 'Cônjuge pode trabalhar', 'Sem limite de vistos'],
          desvantagens: ['Restrito a multinacionais', 'Precisa cargo gerencial real']
        }
      },
      cidades: ['Nova York', 'San Francisco', 'Austin', 'Miami', 'Los Angeles', 'Boston', 'Seattle']
    },
    espanha: {
      nome: 'Espanha',
      bandeira: '🇪🇸',
      capital: 'Madri',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Grande (200k+)',
      tempoResidencia: '2 anos para cidadania (brasileiros)',
      rotas: {
        nomadaDigital: {
          nome: 'Visa Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Visto para trabalhadores remotos com clientes internacionais.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima de €2.520/mês', '3+ anos de experiência', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Mantém trabalho atual', 'Válido por 3 anos', 'Regime fiscal especial'],
          desvantagens: ['Máximo 20% clientes espanhóis', 'Renda mínima considerável']
        },
        altamenteQualificado: {
          nome: 'Visa Altamente Qualificado',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais com alta qualificação.',
          requisitos: ['Diploma universitário ou 3+ anos experiência', 'Salário mínimo de €40.000/ano', 'Empresa cadastrada no UGE'],
          timeline: '1-3 meses',
          custoEstimado: '€500-1.000',
          taxaSucesso: '85%',
          vantagens: ['Processo rápido', 'Família incluída', 'Caminho para residência'],
          desvantagens: ['Restrito a empresas grandes', 'Vinculado ao empregador']
        }
      },
      cidades: ['Madri', 'Barcelona', 'Valência', 'Sevilha', 'Málaga', 'Bilbao']
    },
    holanda: {
      nome: 'Holanda',
      bandeira: '🇳🇱',
      capital: 'Amsterdã',
      idioma: 'Holandês (inglês amplamente falado)',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        kennismigrant: {
          nome: 'Highly Skilled Migrant',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais qualificados.',
          requisitos: ['Proposta de empresa reconhecida (IND sponsor)', 'Salário mínimo de €4.752/mês (ou €3.549 se <30 anos)', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: '€320-1.000',
          taxaSucesso: '95%',
          vantagens: ['Processo muito rápido', 'Cônjuge pode trabalhar', '30% tax ruling'],
          desvantagens: ['Salário mínimo alto', 'Restrito a empresas reconhecidas']
        },
        startupVisa: {
          nome: 'Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com ideia inovadora.',
          requisitos: ['Produto/serviço inovador', 'Facilitador aprovado', 'Recursos financeiros', 'Plano de negócios'],
          timeline: '1-3 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao ecossistema de startups', 'Pode evoluir para self-employed'],
          desvantagens: ['Precisa facilitador', 'Válido apenas 1 ano inicialmente']
        }
      },
      cidades: ['Amsterdã', 'Rotterdam', 'Haia', 'Utrecht', 'Eindhoven', 'Groningen']
    },
    canada: {
      nome: 'Canadá',
      bandeira: '🇨🇦',
      capital: 'Ottawa',
      idioma: 'Inglês/Francês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Frio',
      comunidadeBR: 'Grande (100k+)',
      tempoResidencia: '3 anos para cidadania',
      rotas: {
        expressEntry: {
          nome: 'Express Entry',
          tipo: 'Sistema de pontos',
          descricao: 'Sistema de pontos para imigração qualificada.',
          requisitos: ['Pontuação CRS competitiva (470+)', 'Teste de idioma (IELTS/CELPIP)', 'Avaliação de credenciais (ECA)', 'Experiência de trabalho qualificado'],
          timeline: '6-12 meses',
          custoEstimado: 'CAD$2.500-5.000',
          taxaSucesso: '80%',
          vantagens: ['Residência permanente direta', 'Processo transparente', 'Pode levar família'],
          desvantagens: ['Alta competição', 'Pontuação muda frequentemente']
        },
        pnp: {
          nome: 'Provincial Nominee Program',
          tipo: 'Nomeação provincial',
          descricao: 'Programas provinciais para residência permanente.',
          requisitos: ['Variam por província', 'Experiência na área demandada', 'Conexão com a província', 'Intenção de residir na província'],
          timeline: '12-18 meses',
          custoEstimado: 'CAD$2.000-5.000',
          taxaSucesso: '75%',
          vantagens: ['+600 pontos no Express Entry', 'Opções para diferentes perfis'],
          desvantagens: ['Compromisso com província', 'Processos variam muito']
        }
      },
      cidades: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Edmonton']
    },
    // ===== NOVOS PAÍSES =====
    irlanda: {
      nome: 'Irlanda',
      bandeira: '🇮🇪',
      capital: 'Dublin',
      idioma: 'Inglês/Irlandês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Grande (70k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        criticalSkills: {
          nome: 'Critical Skills Employment Permit',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas de alta demanda como TI, engenharia e saúde.',
          requisitos: ['Oferta de emprego em área crítica', 'Salário mínimo €38.000/ano (€64.000 para outras áreas)', 'Diploma relevante ou 5+ anos experiência', 'Empresa registrada na Irlanda'],
          timeline: '2-4 meses',
          custoEstimado: '€1.000-3.000',
          taxaSucesso: '85%',
          vantagens: ['Caminho rápido para residência', 'Cônjuge pode trabalhar', 'Acesso ao mercado tech europeu'],
          desvantagens: ['Custo de vida alto em Dublin', 'Restrito a áreas específicas']
        },
        generalEmployment: {
          nome: 'General Employment Permit',
          tipo: 'Trabalho geral',
          descricao: 'Visto para profissionais em áreas não críticas com oferta de emprego.',
          requisitos: ['Oferta de emprego', 'Salário mínimo €34.000/ano', 'Labour Market Needs Test', 'Empresa deve provar que não há candidato local'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-2.000',
          taxaSucesso: '70%',
          vantagens: ['Mais abrangente que Critical Skills', 'Pode evoluir para residência'],
          desvantagens: ['Processo mais demorado', 'Precisa Labour Market Test']
        },
        startupVisa: {
          nome: 'Start-up Entrepreneur Programme',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e financiamento.',
          requisitos: ['Negócio inovador e escalável', 'Financiamento mínimo €50.000', 'Sede na Irlanda', 'Aprovação do comitê de avaliação'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '65%',
          vantagens: ['Acesso ao ecossistema tech Dublin', 'Residência imediata', 'Incentivos fiscais'],
          desvantagens: ['Alto investimento inicial', 'Processo seletivo rigoroso']
        }
      },
      cidades: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Kilkenny']
    },
    uk: {
      nome: 'Reino Unido',
      bandeira: '🇬🇧',
      capital: 'Londres',
      idioma: 'Inglês',
      custoVida: 'Muito Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico (chuvoso)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledWorker: {
          nome: 'Skilled Worker Visa',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho do Reino Unido pós-Brexit.',
          requisitos: ['Oferta de emprego de sponsor licenciado', 'Salário mínimo £26.200/ano (varia por área)', 'Nível B1 de inglês', 'Pontuação mínima de 70 pontos'],
          timeline: '3-8 semanas',
          custoEstimado: '£1.500-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo relativamente rápido', 'Pode levar família', 'Caminho para ILR em 5 anos'],
          desvantagens: ['Vinculado ao empregador', 'Custos de NHS surcharge']
        },
        globalTalent: {
          nome: 'Global Talent Visa',
          tipo: 'Talento excepcional',
          descricao: 'Visto para líderes e talentos excepcionais em tech, ciência, artes ou academia.',
          requisitos: ['Endorsement de órgão competente (Tech Nation para tech)', 'Evidências de liderança ou potencial', 'Contribuições significativas na área', 'Não precisa oferta de emprego'],
          timeline: '3-8 semanas',
          custoEstimado: '£700-2.000',
          taxaSucesso: '70%',
          vantagens: ['Não precisa empregador', 'Flexibilidade total', 'ILR em 3 anos'],
          desvantagens: ['Critérios muito exigentes', 'Processo de endorsement complexo']
        },
        innovatorFounder: {
          nome: 'Innovator Founder Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com negócio inovador e escalável.',
          requisitos: ['Negócio inovador e viável', 'Endorsement de entidade aprovada', 'Inglês nível B2', 'Fundos de manutenção'],
          timeline: '2-3 meses',
          custoEstimado: '£1.500-3.000',
          taxaSucesso: '65%',
          vantagens: ['ILR em 3 anos se metas atingidas', 'Pode trazer família', 'Acesso ao mercado UK'],
          desvantagens: ['Precisa endorsement', 'Metas obrigatórias']
        },
        highPotential: {
          nome: 'High Potential Individual Visa',
          tipo: 'Recém-graduados',
          descricao: 'Visto para graduados de universidades top mundiais nos últimos 5 anos.',
          requisitos: ['Graduação em universidade top global (lista específica)', 'Nos últimos 5 anos', 'Inglês nível B1', 'Fundos de manutenção'],
          timeline: '2-4 semanas',
          custoEstimado: '£750-1.500',
          taxaSucesso: '90%',
          vantagens: ['Não precisa emprego', 'Válido por 2-3 anos', 'Pode trabalhar em qualquer área'],
          desvantagens: ['Só para universidades da lista', 'Limite de 5 anos após graduação']
        }
      },
      cidades: ['Londres', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 'Cambridge', 'Oxford']
    },
    italia: {
      nome: 'Itália',
      bandeira: '🇮🇹',
      capital: 'Roma',
      idioma: 'Italiano',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Mediterrâneo',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10 anos para cidadania (3-4 se ascendência)',
      rotas: {
        nomadeDigitale: {
          nome: 'Visto Nômade Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Novo visto (2024) para trabalhadores remotos com renda do exterior.',
          requisitos: ['Trabalho remoto para empresa estrangeira', 'Renda mínima €28.000/ano', 'Seguro saúde', 'Comprovante de acomodação'],
          timeline: '2-4 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '80%',
          vantagens: ['Pode morar em qualquer região', 'Custo de vida mais baixo que norte da Europa', 'Qualidade de vida'],
          desvantagens: ['Burocracia italiana', 'Idioma pode ser barreira']
        },
        lavoroSubordinato: {
          nome: 'Visto de Trabalho (Subordinato)',
          tipo: 'Trabalho com contrato',
          descricao: 'Visto para trabalho com contrato de empresa italiana.',
          requisitos: ['Contrato de trabalho italiano', 'Nulla Osta do empregador', 'Dentro da quota anual', 'Qualificações comprovadas'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Acesso ao sistema de saúde italiano', 'Direitos trabalhistas europeus'],
          desvantagens: ['Sistema de quotas limitado', 'Processo burocrático lento']
        },
        startupVisa: {
          nome: 'Italia Startup Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores inovadores que querem abrir startup na Itália.',
          requisitos: ['Plano de negócios inovador', 'Capital mínimo €50.000', 'Aprovação do comitê italiano', 'Parceria com incubadora credenciada'],
          timeline: '3-6 meses',
          custoEstimado: '€50.000+',
          taxaSucesso: '60%',
          vantagens: ['Ecossistema de startups crescente', 'Incentivos fiscais', 'Qualidade de vida'],
          desvantagens: ['Mercado menor que outros hubs', 'Burocracia']
        },
        eletivoResidenza: {
          nome: 'Visto Eletivo (Residência Eletiva)',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva que não pretendem trabalhar.',
          requisitos: ['Renda passiva comprovada (€31.000+/ano)', 'Não pode trabalhar na Itália', 'Seguro saúde', 'Acomodação adequada'],
          timeline: '3-6 meses',
          custoEstimado: '€500-1.500',
          taxaSucesso: '75%',
          vantagens: ['Ideal para aposentados', 'Acesso à cultura italiana', 'Custo de vida razoável'],
          desvantagens: ['Não pode trabalhar', 'Renda mínima considerável']
        }
      },
      cidades: ['Roma', 'Milão', 'Florença', 'Veneza', 'Nápoles', 'Bolonha', 'Turim']
    },
    franca: {
      nome: 'França',
      bandeira: '🇫🇷',
      capital: 'Paris',
      idioma: 'Francês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '7/10',
      clima: 'Temperado/Mediterrâneo (sul)',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        passeportTalent: {
          nome: 'Passeport Talent',
          tipo: 'Talento qualificado',
          descricao: 'Visto multiuso para profissionais qualificados, pesquisadores, artistas e empreendedores.',
          requisitos: ['Diploma de mestrado ou equivalente', 'Contrato com salário 1.5x o mínimo (€27.000+)', 'Ou projeto reconhecido', 'Seguro saúde'],
          timeline: '2-4 meses',
          custoEstimado: '€200-1.000',
          taxaSucesso: '80%',
          vantagens: ['Válido por 4 anos', 'Família pode trabalhar', 'Caminho para residência'],
          desvantagens: ['Francês não obrigatório mas recomendado', 'Paris muito cara']
        },
        salarie: {
          nome: 'Visa Salarié',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto de trabalho tradicional com contrato de empresa francesa.',
          requisitos: ['Contrato de trabalho francês', 'Autorização da DIRECCTE', 'Qualificações para a vaga', 'Empresa deve justificar contratação estrangeira'],
          timeline: '3-6 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '70%',
          vantagens: ['Direitos trabalhistas franceses', 'Sistema de saúde público'],
          desvantagens: ['Processo burocrático', 'Precisa justificar contratação']
        },
        entrepreneurLiberal: {
          nome: 'Entrepreneur/Libéral',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para autônomos e empreendedores com projeto viável.',
          requisitos: ['Plano de negócios viável', 'Recursos financeiros suficientes', 'Projeto economicamente sustentável', 'Registro na França'],
          timeline: '3-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '65%',
          vantagens: ['Autonomia profissional', 'Acesso ao mercado europeu'],
          desvantagens: ['Burocracia francesa', 'Impostos altos']
        },
        visiteur: {
          nome: 'Visa Visiteur',
          tipo: 'Renda passiva',
          descricao: 'Visto de longa duração para quem tem recursos próprios.',
          requisitos: ['Renda passiva ou recursos suficientes', 'Não pode trabalhar', 'Seguro saúde', 'Moradia na França'],
          timeline: '2-4 meses',
          custoEstimado: '€200-500',
          taxaSucesso: '80%',
          vantagens: ['Processo simples', 'Ideal para aposentados', 'Qualidade de vida'],
          desvantagens: ['Não pode trabalhar', 'Custo de vida alto']
        }
      },
      cidades: ['Paris', 'Lyon', 'Marselha', 'Toulouse', 'Nice', 'Bordeaux', 'Nantes']
    },
    belgica: {
      nome: 'Bélgica',
      bandeira: '🇧🇪',
      capital: 'Bruxelas',
      idioma: 'Francês/Holandês/Alemão',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Oceânico',
      comunidadeBR: 'Média (40k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        singlePermit: {
          nome: 'Single Permit (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão única combinando autorização de trabalho e residência.',
          requisitos: ['Contrato de trabalho belga', 'Qualificações para a vaga', 'Salário adequado ao cargo', 'Empresa deve solicitar'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '80%',
          vantagens: ['Centro da Europa', 'Hub das instituições EU', 'Multilíngue'],
          desvantagens: ['Impostos altos', 'Clima cinzento', 'Burocracia complexa']
        },
        blueCardBE: {
          nome: 'EU Blue Card Bélgica',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card europeu para profissionais com diploma superior.',
          requisitos: ['Diploma universitário (3+ anos)', 'Salário mínimo €52.000/ano', 'Contrato de pelo menos 1 ano', 'Área relacionada ao diploma'],
          timeline: '3-4 meses',
          custoEstimado: '€350-1.000',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade na UE', 'Família pode acompanhar', 'Residência permanente em 5 anos'],
          desvantagens: ['Salário mínimo alto', 'Precisa diploma relacionado']
        },
        selfEmployed: {
          nome: 'Cartão Profissional (Autônomo)',
          tipo: 'Empreendedorismo',
          descricao: 'Permissão para trabalhar como autônomo ou abrir empresa.',
          requisitos: ['Plano de negócios detalhado', 'Valor agregado para economia belga', 'Recursos financeiros', 'Qualificações profissionais'],
          timeline: '4-6 meses',
          custoEstimado: '€500-2.000',
          taxaSucesso: '60%',
          vantagens: ['Localização estratégica', 'Acesso ao mercado EU', 'Sistema de saúde excelente'],
          desvantagens: ['Processo subjetivo', 'Impostos muito altos']
        }
      },
      cidades: ['Bruxelas', 'Antuérpia', 'Gante', 'Bruges', 'Liège', 'Leuven']
    },
    austria: {
      nome: 'Áustria',
      bandeira: '🇦🇹',
      capital: 'Viena',
      idioma: 'Alemão',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Continental/Alpino',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '10 anos para cidadania',
      rotas: {
        rotWeissRot: {
          nome: 'Red-White-Red Card',
          tipo: 'Sistema de pontos',
          descricao: 'Cartão baseado em pontos para trabalhadores qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: qualificação, experiência, idade, idioma', 'Oferta de emprego ou qualificação especial', 'Seguro saúde'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '80%',
          vantagens: ['Sistema transparente', 'Alta qualidade de vida', 'Segurança'],
          desvantagens: ['Alemão muito importante', 'Comunidade BR pequena', 'Cidadania demora 10 anos']
        },
        blueCardAT: {
          nome: 'EU Blue Card Áustria',
          tipo: 'Trabalho altamente qualificado',
          descricao: 'Blue Card para profissionais com diploma universitário.',
          requisitos: ['Diploma universitário', 'Oferta de emprego', 'Salário mínimo €45.000/ano', 'Contrato de 1+ ano'],
          timeline: '2-3 meses',
          custoEstimado: '€150-500',
          taxaSucesso: '85%',
          vantagens: ['Mobilidade EU após 18 meses', 'Qualidade de vida excelente', 'Sistema de saúde top'],
          desvantagens: ['Alemão necessário longo prazo', 'Cidadania demora muito']
        },
        startupAT: {
          nome: 'Start-up Visa Austria',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para fundadores de startups inovadoras.',
          requisitos: ['Ideia de negócio inovadora', 'Capital mínimo disponível', 'Apoio de incubadora austríaca', 'Plano de negócios'],
          timeline: '3-6 meses',
          custoEstimado: '€1.000-5.000',
          taxaSucesso: '65%',
          vantagens: ['Ecossistema startup crescente', 'Localização central na Europa', 'Incentivos fiscais'],
          desvantagens: ['Mercado menor', 'Alemão importante']
        }
      },
      cidades: ['Viena', 'Salzburgo', 'Innsbruck', 'Graz', 'Linz', 'Klagenfurt']
    },
    suica: {
      nome: 'Suíça',
      bandeira: '🇨🇭',
      capital: 'Berna',
      idioma: 'Alemão/Francês/Italiano',
      custoVida: 'Muito Alto',
      qualidadeVida: '10/10',
      seguranca: '10/10',
      clima: 'Alpino/Continental',
      comunidadeBR: 'Média (50k+)',
      tempoResidencia: '10-12 anos para cidadania',
      rotas: {
        permitB: {
          nome: 'Permit B (Trabalho)',
          tipo: 'Trabalho qualificado',
          descricao: 'Permissão de residência para trabalho com contrato.',
          requisitos: ['Contrato de trabalho suíço', 'Empregador deve provar necessidade', 'Qualificações específicas', 'Prioridade para suíços/EU'],
          timeline: '2-4 meses',
          custoEstimado: 'CHF 500-2.000',
          taxaSucesso: '70%',
          vantagens: ['Salários muito altos', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['Muito difícil conseguir', 'Custo de vida altíssimo', 'Cidadania muito demorada']
        },
        permitL: {
          nome: 'Permit L (Curta duração)',
          tipo: 'Trabalho temporário',
          descricao: 'Permissão para contratos de até 1 ano.',
          requisitos: ['Contrato de até 12 meses', 'Empregador suíço', 'Dentro da quota', 'Qualificações para a vaga'],
          timeline: '1-3 meses',
          custoEstimado: 'CHF 300-1.000',
          taxaSucesso: '75%',
          vantagens: ['Mais fácil que Permit B', 'Pode ser convertido', 'Experiência suíça'],
          desvantagens: ['Temporário', 'Limitado a 1 ano', 'Dentro de quota']
        },
        startupSuica: {
          nome: 'Startup Visa (Cantonal)',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores - varia por cantão.',
          requisitos: ['Plano de negócios sólido', 'Capital significativo', 'Criar empregos locais', 'Aprovação cantonal'],
          timeline: '3-6 meses',
          custoEstimado: 'CHF 5.000+',
          taxaSucesso: '50%',
          vantagens: ['Hub financeiro mundial', 'Estabilidade política', 'Localização central'],
          desvantagens: ['Processo muito seletivo', 'Custo altíssimo', 'Varia muito por cantão']
        }
      },
      cidades: ['Zurique', 'Genebra', 'Basileia', 'Berna', 'Lausanne', 'Lugano']
    },
    australia: {
      nome: 'Austrália',
      bandeira: '🇦🇺',
      capital: 'Canberra',
      idioma: 'Inglês',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '9/10',
      clima: 'Variado (tropical a temperado)',
      comunidadeBR: 'Grande (60k+)',
      tempoResidencia: '4 anos para cidadania',
      rotas: {
        skilledIndependent: {
          nome: 'Skilled Independent (189)',
          tipo: 'Sistema de pontos',
          descricao: 'Visto permanente baseado em pontos para profissionais qualificados.',
          requisitos: ['Ocupação na lista SOL', 'Mínimo 65 pontos', 'Skills assessment positivo', 'Inglês competente (IELTS 6+)', 'Menos de 45 anos'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '75%',
          vantagens: ['Residência permanente direta', 'Não precisa sponsor', 'Pode morar em qualquer lugar'],
          desvantagens: ['Alta competição', 'Processo demorado', 'Precisa ocupação na lista']
        },
        skilledNominated: {
          nome: 'Skilled Nominated (190)',
          tipo: 'Nomeação estadual',
          descricao: 'Visto permanente com nomeação de estado ou território.',
          requisitos: ['Nomeação de estado/território', 'Mínimo 65 pontos (inclui +5 da nomeação)', 'Skills assessment', 'Compromisso com o estado'],
          timeline: '6-18 meses',
          custoEstimado: 'AUD$4.500-8.000',
          taxaSucesso: '80%',
          vantagens: ['+5 pontos da nomeação', 'Mais opções de ocupação', 'Residência permanente'],
          desvantagens: ['Compromisso de morar no estado', 'Depende de nomeação']
        },
        employerSponsored: {
          nome: 'Employer Sponsored (482/494)',
          tipo: 'Patrocínio empregador',
          descricao: 'Visto temporário ou regional com sponsor de empregador.',
          requisitos: ['Sponsor aprovado', 'Ocupação elegível', '2+ anos experiência', 'Inglês competente', 'Skills assessment (algumas ocupações)'],
          timeline: '3-6 meses',
          custoEstimado: 'AUD$3.000-5.000',
          taxaSucesso: '85%',
          vantagens: ['Processo mais rápido', 'Pode levar para PR depois', 'Emprego garantido'],
          desvantagens: ['Vinculado ao empregador', 'Temporário inicialmente']
        },
        globalTalentAU: {
          nome: 'Global Talent Visa (858)',
          tipo: 'Talento excepcional',
          descricao: 'Visto para talentos de classe mundial em setores prioritários.',
          requisitos: ['Reconhecimento internacional na área', 'Salário acima de AUD$162.000 ou potencial', 'Setores: tech, saúde, energia, etc.', 'Nominador australiano'],
          timeline: '2-6 meses',
          custoEstimado: 'AUD$4.500-6.000',
          taxaSucesso: '70%',
          vantagens: ['Processo rápido', 'Residência permanente direta', 'Não precisa emprego'],
          desvantagens: ['Critérios muito exigentes', 'Precisa nominador']
        }
      },
      cidades: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra']
    },
    novaZelandia: {
      nome: 'Nova Zelândia',
      bandeira: '🇳🇿',
      capital: 'Wellington',
      idioma: 'Inglês/Maori',
      custoVida: 'Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Temperado oceânico',
      comunidadeBR: 'Pequena (15k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        skilledMigrant: {
          nome: 'Skilled Migrant Category',
          tipo: 'Sistema de pontos',
          descricao: 'Principal via de imigração qualificada para NZ.',
          requisitos: ['Mínimo 6 pontos (novo sistema 2023)', 'Oferta de emprego qualificado ou', 'Qualificação em área de demanda', 'Inglês competente', 'Menos de 55 anos'],
          timeline: '6-12 meses',
          custoEstimado: 'NZD$4.000-6.000',
          taxaSucesso: '75%',
          vantagens: ['Residência direta', 'Qualidade de vida excepcional', 'Natureza espetacular'],
          desvantagens: ['País isolado', 'Mercado pequeno', 'Custo de vida alto']
        },
        workToResidence: {
          nome: 'Work to Residence',
          tipo: 'Trabalho para residência',
          descricao: 'Visto de trabalho que pode levar à residência.',
          requisitos: ['Oferta de emprego qualificado', 'Salário mediano ou acima', 'Empregador acreditado', '2 anos no emprego para residência'],
          timeline: '2-4 meses',
          custoEstimado: 'NZD$1.000-3.000',
          taxaSucesso: '80%',
          vantagens: ['Caminho claro para residência', 'Pode trazer família', 'Experimenta antes'],
          desvantagens: ['Precisa emprego primeiro', 'Vinculado ao empregador']
        },
        entrepreneurVisa: {
          nome: 'Entrepreneur Work Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com plano de negócio aprovado.',
          requisitos: ['Plano de negócios aprovado', 'Capital mínimo NZD$100.000', 'Experiência empresarial', 'Inglês competente'],
          timeline: '3-6 meses',
          custoEstimado: 'NZD$100.000+',
          taxaSucesso: '60%',
          vantagens: ['Pode trazer família', 'Caminho para residência', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Mercado pequeno', 'Isolamento geográfico']
        }
      },
      cidades: ['Auckland', 'Wellington', 'Christchurch', 'Hamilton', 'Queenstown', 'Dunedin']
    },
    emirados: {
      nome: 'Emirados Árabes',
      bandeira: '🇦🇪',
      capital: 'Abu Dhabi',
      idioma: 'Árabe (inglês amplamente usado)',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '9/10',
      clima: 'Desértico (muito quente)',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: 'Sem cidadania (apenas residência)',
      rotas: {
        employmentVisa: {
          nome: 'Employment Visa',
          tipo: 'Trabalho',
          descricao: 'Visto de trabalho padrão com sponsor de empregador.',
          requisitos: ['Oferta de emprego', 'Empregador faz o sponsor', 'Exame médico', 'Contrato de trabalho'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 3.000-10.000',
          taxaSucesso: '95%',
          vantagens: ['Processo rápido', 'Zero imposto de renda', 'Salários altos', 'Hub internacional'],
          desvantagens: ['Vinculado ao empregador', 'Sem cidadania', 'Calor extremo', 'Cultura diferente']
        },
        goldenVisaUAE: {
          nome: 'Golden Visa UAE',
          tipo: 'Residência longa duração',
          descricao: 'Residência de 10 anos para investidores, talentos e profissionais.',
          requisitos: ['Investimento imobiliário AED 2M+ ou', 'Profissional qualificado com salário AED 30.000+/mês ou', 'Empreendedor com projeto aprovado ou', 'Talento excepcional'],
          timeline: '1-2 meses',
          custoEstimado: 'AED 5.000-15.000',
          taxaSucesso: '90%',
          vantagens: ['10 anos de residência', 'Não precisa sponsor', 'Pode fazer negócios', 'Família incluída'],
          desvantagens: ['Requisitos altos', 'Sem caminho para cidadania', 'Custo de vida alto']
        },
        freelanceVisa: {
          nome: 'Freelance/Self-Sponsor Visa',
          tipo: 'Autônomo',
          descricao: 'Visto para freelancers e profissionais independentes.',
          requisitos: ['Registro em free zone ou DED', 'Comprovação de renda/clientes', 'Seguro saúde', 'Taxa de licença'],
          timeline: '2-4 semanas',
          custoEstimado: 'AED 15.000-30.000/ano',
          taxaSucesso: '90%',
          vantagens: ['Autonomia', 'Zero impostos', 'Pode ter múltiplos clientes'],
          desvantagens: ['Custo de manutenção anual', 'Precisa renovar licença', 'Sem benefícios trabalhistas']
        }
      },
      cidades: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah']
    },
    singapura: {
      nome: 'Singapura',
      bandeira: '🇸🇬',
      capital: 'Singapura',
      idioma: 'Inglês/Mandarim/Malaio/Tamil',
      custoVida: 'Muito Alto',
      qualidadeVida: '9/10',
      seguranca: '10/10',
      clima: 'Tropical (quente e úmido)',
      comunidadeBR: 'Pequena (5k+)',
      tempoResidencia: '2 anos para PR, mais 2 para cidadania',
      rotas: {
        employmentPass: {
          nome: 'Employment Pass',
          tipo: 'Trabalho qualificado',
          descricao: 'Principal visto de trabalho para profissionais qualificados.',
          requisitos: ['Salário mínimo SGD 5.000/mês (mais para experientes)', 'Qualificações reconhecidas', 'Oferta de empregador', 'Framework COMPASS (pontos)'],
          timeline: '3-8 semanas',
          custoEstimado: 'SGD 300-1.000',
          taxaSucesso: '70%',
          vantagens: ['Hub asiático', 'Zero imposto sobre ganhos no exterior', 'Inglês oficial', 'Infraestrutura excelente'],
          desvantagens: ['Muito competitivo', 'Custo de vida altíssimo', 'Espaço limitado', 'Rigoroso']
        },
        entrePass: {
          nome: 'EntrePass',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para empreendedores com startup inovadora.',
          requisitos: ['Empresa inovadora registrada em SG', 'Funding de VC ou incubadora reconhecida ou', 'Propriedade intelectual ou', 'Track record excepcional'],
          timeline: '2-3 meses',
          custoEstimado: 'SGD 500-2.000',
          taxaSucesso: '50%',
          vantagens: ['Ecossistema startup top mundial', 'Acesso ao mercado asiático', 'Incentivos fiscais'],
          desvantagens: ['Muito seletivo', 'Precisa comprovar inovação', 'Metas obrigatórias']
        },
        personalizedEP: {
          nome: 'Personalised Employment Pass',
          tipo: 'Talento de alto nível',
          descricao: 'Passe especial para profissionais de altíssimo salário.',
          requisitos: ['Salário fixo SGD 22.500+/mês ou', 'EP holder com salário SGD 12.000+', 'Não vinculado a empregador específico'],
          timeline: '4-8 semanas',
          custoEstimado: 'SGD 300-500',
          taxaSucesso: '80%',
          vantagens: ['Flexibilidade de empregador', 'Pode ficar até 6 meses sem emprego', 'Prestígio'],
          desvantagens: ['Salário mínimo muito alto', 'Não pode empreender', 'Só para top performers']
        }
      },
      cidades: ['Singapura (cidade-estado)']
    },
    japao: {
      nome: 'Japão',
      bandeira: '🇯🇵',
      capital: 'Tóquio',
      idioma: 'Japonês',
      custoVida: 'Alto',
      qualidadeVida: '8/10',
      seguranca: '10/10',
      clima: 'Temperado (4 estações)',
      comunidadeBR: 'Muito grande (200k+)',
      tempoResidencia: '5-10 anos para cidadania',
      rotas: {
        engineerSpecialist: {
          nome: 'Engineer/Specialist in Humanities',
          tipo: 'Trabalho qualificado',
          descricao: 'Visto para profissionais em áreas técnicas, TI, negócios.',
          requisitos: ['Diploma universitário ou 10+ anos experiência', 'Oferta de trabalho relacionada à formação', 'Contrato com empresa japonesa', 'Salário compatível com japoneses'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '80%',
          vantagens: ['Cultura única', 'Segurança excepcional', 'Tecnologia avançada'],
          desvantagens: ['Barreira do idioma', 'Cultura de trabalho intensa', 'Difícil integração']
        },
        hsfp: {
          nome: 'Highly Skilled Foreign Professional',
          tipo: 'Sistema de pontos',
          descricao: 'Visto preferencial para profissionais altamente qualificados.',
          requisitos: ['Mínimo 70 pontos', 'Pontos por: formação, experiência, salário, idade', 'Oferta de trabalho qualificado', 'Área acadêmica, técnica ou negócios'],
          timeline: '1-3 meses',
          custoEstimado: '¥10.000-50.000',
          taxaSucesso: '85%',
          vantagens: ['Residência permanente em 1-3 anos', 'Pode trazer pais', 'Cônjuge pode trabalhar'],
          desvantagens: ['Precisa 70+ pontos', 'Sistema complexo']
        },
        businessManager: {
          nome: 'Business Manager Visa',
          tipo: 'Empreendedorismo',
          descricao: 'Visto para abrir ou gerenciar negócio no Japão.',
          requisitos: ['Escritório físico no Japão', 'Capital mínimo ¥5.000.000', '2+ funcionários full-time ou investimento equivalente', 'Plano de negócios'],
          timeline: '2-4 meses',
          custoEstimado: '¥5.000.000+',
          taxaSucesso: '65%',
          vantagens: ['Controle do próprio negócio', 'Mercado grande', 'Qualidade de vida'],
          desvantagens: ['Alto investimento', 'Japonês importante', 'Burocracia']
        },
        specifiedSkilled: {
          nome: 'Specified Skilled Worker',
          tipo: 'Trabalho em setores específicos',
          descricao: 'Visto para trabalho em setores com escassez de mão de obra.',
          requisitos: ['Passar em teste de habilidades do setor', 'Teste básico de japonês (N4)', 'Setores: construção, agricultura, hotelaria, etc.', 'Menos de 5 anos (tipo 1)'],
          timeline: '2-4 meses',
          custoEstimado: '¥30.000-100.000',
          taxaSucesso: '75%',
          vantagens: ['Não precisa diploma', 'Demanda alta', 'Caminho para residência (tipo 2)'],
          desvantagens: ['Setores específicos', 'Precisa japonês básico', 'Temporário inicialmente']
        }
      },
      cidades: ['Tóquio', 'Osaka', 'Yokohama', 'Nagoya', 'Kyoto', 'Fukuoka', 'Sapporo']
    },
    mexico: {
      nome: 'México',
      bandeira: '🇲🇽',
      capital: 'Cidade do México',
      idioma: 'Espanhol',
      custoVida: 'Baixo-Médio',
      qualidadeVida: '7/10',
      seguranca: '5/10',
      clima: 'Variado (tropical a árido)',
      comunidadeBR: 'Pequena (10k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        residenteTemporal: {
          nome: 'Residente Temporal',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência renovável por até 4 anos.',
          requisitos: ['Renda mínima ~USD 2.500/mês ou', 'Saldo bancário ~USD 42.000 ou', 'Oferta de trabalho mexicana ou', 'Vínculo familiar'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Processo simples', 'Custo de vida baixo', 'Perto dos EUA', 'Cultura vibrante'],
          desvantagens: ['Questões de segurança em algumas áreas', 'Sistema de saúde variável']
        },
        residentePermanente: {
          nome: 'Residente Permanente',
          tipo: 'Residência permanente',
          descricao: 'Residência indefinida após 4 anos como temporal.',
          requisitos: ['4 anos como residente temporal ou', 'Aposentado com pensão ou', 'Familiar de mexicano ou', 'Sistema de pontos'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 200-400',
          taxaSucesso: '85%',
          vantagens: ['Permanente', 'Pode trabalhar livremente', 'Caminho para cidadania'],
          desvantagens: ['Precisa 4 anos como temporal', 'Documentação extensa']
        },
        nomadaDigitalMX: {
          nome: 'Visa de Nómada Digital',
          tipo: 'Trabalho remoto',
          descricao: 'Residência temporal para trabalhadores remotos (em desenvolvimento).',
          requisitos: ['Trabalho remoto comprovado', 'Renda do exterior', 'Seguro saúde', 'Não trabalhar para empresa mexicana'],
          timeline: '2-4 semanas',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '85%',
          vantagens: ['Custo de vida baixo', 'Fuso horário EUA', 'Cultura rica', 'Comida incrível'],
          desvantagens: ['Programa ainda em definição', 'Segurança em algumas áreas']
        }
      },
      cidades: ['Cidade do México', 'Guadalajara', 'Monterrey', 'Cancún', 'Playa del Carmen', 'Mérida', 'Oaxaca']
    },
    argentina: {
      nome: 'Argentina',
      bandeira: '🇦🇷',
      capital: 'Buenos Aires',
      idioma: 'Espanhol',
      custoVida: 'Baixo (em dólar)',
      qualidadeVida: '7/10',
      seguranca: '6/10',
      clima: 'Variado (subtropical a subpolar)',
      comunidadeBR: 'Grande (50k+)',
      tempoResidencia: '2 anos para cidadania',
      rotas: {
        residenciaMercosur: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para cidadãos do Mercosul (inclui Brasil).',
          requisitos: ['Cidadão de país Mercosul', 'Certidão de nascimento', 'Atestado de antecedentes', 'Não precisa de visto prévio'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Processo muito simples para brasileiros', 'Cidadania em 2 anos', 'Custo baixíssimo', 'Cultura similar'],
          desvantagens: ['Instabilidade econômica', 'Inflação alta', 'Burocracia']
        },
        rentista: {
          nome: 'Visa Rentista',
          tipo: 'Renda passiva',
          descricao: 'Visto para pessoas com renda passiva comprovada.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de origem', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '90%',
          vantagens: ['Custo de vida baixo em dólar', 'Buenos Aires cosmopolita', 'Cultura europeia'],
          desvantagens: ['Economia instável', 'Inflação', 'Controle de câmbio']
        },
        inversionista: {
          nome: 'Visa Inversionista',
          tipo: 'Investimento',
          descricao: 'Visto para investidores em negócios argentinos.',
          requisitos: ['Investimento em negócio argentino', 'Plano de negócios', 'Geração de empregos', 'Capital mínimo variável'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '80%',
          vantagens: ['Oportunidades com dólar forte', 'Mão de obra qualificada', 'Acesso Mercosul'],
          desvantagens: ['Risco econômico', 'Burocracia', 'Impostos altos']
        }
      },
      cidades: ['Buenos Aires', 'Córdoba', 'Mendoza', 'Rosário', 'Bariloche', 'Mar del Plata']
    },
    chile: {
      nome: 'Chile',
      bandeira: '🇨🇱',
      capital: 'Santiago',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '7/10',
      seguranca: '7/10',
      clima: 'Variado (desértico a subpolar)',
      comunidadeBR: 'Média (20k+)',
      tempoResidencia: '5 anos para cidadania',
      rotas: {
        visaTemporaria: {
          nome: 'Visa Temporaria',
          tipo: 'Residência temporária',
          descricao: 'Visto de residência por motivos de trabalho, família ou estudos.',
          requisitos: ['Contrato de trabalho ou', 'Vínculo familiar ou', 'Matrícula em instituição ou', 'Recursos próprios'],
          timeline: '1-3 meses',
          custoEstimado: 'USD 100-500',
          taxaSucesso: '85%',
          vantagens: ['Economia mais estável da região', 'Startup Chile famoso', 'Natureza espetacular'],
          desvantagens: ['Santiago cara para região', 'Terremotos frequentes']
        },
        visaResponsabilidad: {
          nome: 'Visa de Responsabilidad Democrática',
          tipo: 'Asilo/Refugiados',
          descricao: 'Visto especial para pessoas de países em crise.',
          requisitos: ['Nacionalidade de país elegível', 'Situação de vulnerabilidade', 'Documentação básica'],
          timeline: '1-2 meses',
          custoEstimado: 'Gratuito-USD 100',
          taxaSucesso: '70%',
          vantagens: ['Ajuda humanitária', 'Caminho para residência', 'Suporte governamental'],
          desvantagens: ['Só para países específicos', 'Temporário']
        },
        startupChile: {
          nome: 'Startup Chile (Tech Visa)',
          tipo: 'Empreendedorismo tech',
          descricao: 'Programa famoso de aceleração com visto incluído.',
          requisitos: ['Startup inovadora', 'Seleção competitiva', 'Equipe comprometida', 'Mudar para Chile durante programa'],
          timeline: '3-6 meses',
          custoEstimado: 'Gratuito (programa dá equity-free)',
          taxaSucesso: '20% (seletivo)',
          vantagens: ['Até USD 100k equity-free', 'Ecossistema startup', 'Networking Latam', 'Visto incluído'],
          desvantagens: ['Muito competitivo', 'Precisa relocar', 'Compromisso de tempo']
        }
      },
      cidades: ['Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'La Serena', 'Puerto Varas']
    },
    uruguai: {
      nome: 'Uruguai',
      bandeira: '🇺🇾',
      capital: 'Montevidéu',
      idioma: 'Espanhol',
      custoVida: 'Médio',
      qualidadeVida: '8/10',
      seguranca: '8/10',
      clima: 'Subtropical úmido',
      comunidadeBR: 'Média (30k+)',
      tempoResidencia: '3-5 anos para cidadania',
      rotas: {
        residenciaMercosulUY: {
          nome: 'Residência Mercosul',
          tipo: 'Acordo regional',
          descricao: 'Residência facilitada para brasileiros e cidadãos Mercosul.',
          requisitos: ['Cidadão do Mercosul', 'Certidão de nascimento apostilada', 'Atestado de antecedentes', 'Comprovante de renda ou trabalho'],
          timeline: '1-2 meses',
          custoEstimado: 'USD 100-300',
          taxaSucesso: '95%',
          vantagens: ['Muito fácil para brasileiros', 'País estável', 'Qualidade de vida alta', 'Perto do Brasil'],
          desvantagens: ['Mercado pequeno', 'Custo de vida crescendo']
        },
        rentista: {
          nome: 'Residencia Rentista',
          tipo: 'Renda passiva',
          descricao: 'Residência para pessoas com renda passiva estável.',
          requisitos: ['Renda passiva ~USD 1.500/mês', 'Comprovação de 3+ anos de renda', 'Seguro saúde', 'Sem antecedentes'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 200-500',
          taxaSucesso: '90%',
          vantagens: ['Regime fiscal territorial', 'Estabilidade', 'Próximo ao Brasil'],
          desvantagens: ['Mercado pequeno', 'Inverno frio']
        },
        residenciaFiscal: {
          nome: 'Residência Fiscal',
          tipo: 'Incentivo fiscal',
          descricao: 'Residência com benefícios fiscais para estrangeiros.',
          requisitos: ['Investimento imobiliário USD 380.000+ ou', 'Presença física 60+ dias/ano', 'Vínculo com Uruguai', 'Declaração de bens'],
          timeline: '2-4 meses',
          custoEstimado: 'USD 500-2.000',
          taxaSucesso: '85%',
          vantagens: ['Tax holiday de 11 anos', 'Só tributa renda uruguaia', 'Estabilidade jurídica'],
          desvantagens: ['Investimento alto para benefício pleno', 'Precisa presença física']
        }
      },
      cidades: ['Montevidéu', 'Punta del Este', 'Colonia del Sacramento', 'Salto', 'Maldonado']
    }
  };

  const sections = [
    { title: 'Dados Pessoais', icon: User, color: 'blue' },
    { title: 'Perfil Profissional', icon: Briefcase, color: 'green' },
    { title: 'Realizações', icon: Star, color: 'yellow' },
    { title: 'Formação Acadêmica', icon: GraduationCap, color: 'purple' },
    { title: 'Situação Empresarial', icon: Building2, color: 'orange' },
    { title: 'Idiomas', icon: Languages, color: 'cyan' },
    { title: 'Capacidade Financeira', icon: DollarSign, color: 'emerald' },
    { title: 'Composição Familiar', icon: Users, color: 'pink' },
    { title: 'Objetivos de Vida', icon: Target, color: 'red' },
    { title: 'Preferências de Destino', icon: MapPin, color: 'indigo' },
    { title: 'Timeline', icon: Clock, color: 'slate' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMultiSelect = (field, value, maxItems = null) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const isSelected = currentValues.includes(value);
      
      // Se está desmarcando, sempre permite
      if (isSelected) {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      }
      
      // Se está marcando, verifica o limite
      if (maxItems && currentValues.length >= maxItems) {
        return prev; // Não permite adicionar mais
      }
      
      return { ...prev, [field]: [...currentValues, value] };
    });
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmitAndAnalyze();
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  // Função de cálculo de score
  const calculateDetailedScore = () => {
    // Inicializar scores para todos os 22 países
    const allCountries = [
      'portugal', 'alemanha', 'eua', 'espanha', 'holanda', 'canada',
      'irlanda', 'uk', 'italia', 'franca', 'belgica', 'austria', 'suica',
      'australia', 'novaZelandia', 'emirados', 'singapura', 'japao',
      'mexico', 'argentina', 'chile', 'uruguai'
    ];
    
    let scores = {};
    allCountries.forEach(country => {
      scores[country] = { total: 0, viabilidade: 0, alinhamento: 0, timeline: 0, custoBeneficio: 0, potencial: 0, rotas: {} };
    });

    // ===== VIABILIDADE (35%) =====
    
    // Área Tech - países com melhores programas tech
    if (formData.areaAtuacao === 'tech') {
      scores.portugal.viabilidade += 35; scores.alemanha.viabilidade += 35;
      scores.holanda.viabilidade += 35; scores.irlanda.viabilidade += 35;
      scores.eua.viabilidade += 30; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 30; scores.australia.viabilidade += 28;
      scores.singapura.viabilidade += 28; scores.espanha.viabilidade += 25;
      scores.franca.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.austria.viabilidade += 22; scores.belgica.viabilidade += 22;
      scores.novaZelandia.viabilidade += 22; scores.japao.viabilidade += 20;
      scores.emirados.viabilidade += 20; scores.chile.viabilidade += 18;
      scores.italia.viabilidade += 18; scores.mexico.viabilidade += 15;
      scores.argentina.viabilidade += 12; scores.uruguai.viabilidade += 12;
      
      // Rotas específicas para tech
      scores.portugal.rotas.techVisa = 95; scores.portugal.rotas.d8 = 85;
      scores.alemanha.rotas.blueCard = 90; scores.holanda.rotas.kennismigrant = 90;
      scores.irlanda.rotas.criticalSkills = 90; scores.uk.rotas.skilledWorker = 85;
      scores.uk.rotas.globalTalent = 80; scores.australia.rotas.skilledIndependent = 85;
      scores.singapura.rotas.employmentPass = 80; scores.canada.rotas.expressEntry = 85;
    }
    
    // Área Saúde
    if (formData.areaAtuacao === 'saude') {
      scores.canada.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.uk.viabilidade += 25;
      scores.novaZelandia.viabilidade += 25; scores.irlanda.viabilidade += 22;
      scores.portugal.viabilidade += 20; scores.eua.viabilidade += 20;
    }
    
    // Área Engenharia
    if (formData.areaAtuacao === 'engenharia') {
      scores.alemanha.viabilidade += 30; scores.canada.viabilidade += 28;
      scores.australia.viabilidade += 28; scores.eua.viabilidade += 25;
      scores.emirados.viabilidade += 25; scores.singapura.viabilidade += 22;
    }
    
    // Área Finanças
    if (formData.areaAtuacao === 'financas') {
      scores.uk.viabilidade += 30; scores.singapura.viabilidade += 30;
      scores.suica.viabilidade += 28; scores.emirados.viabilidade += 28;
      scores.holanda.viabilidade += 25; scores.eua.viabilidade += 25;
    }
    
    // Experiência profissional
    const expMap = { '0-2': 5, '3-5': 15, '6-8': 25, '9-12': 35, '13-15': 40, '16-20': 45, '20+': 50 };
    const expScore = expMap[formData.anosExperiencia] || 0;
    Object.keys(scores).forEach(country => { scores[country].viabilidade += expScore * 0.5; });
    
    if (['13-15', '16-20', '20+'].includes(formData.anosExperiencia)) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.australia.viabilidade += 12; scores.singapura.viabilidade += 10;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 20;
    }

    // Formação acadêmica
    if (formData.nivelFormacao === 'mestrado') {
      scores.eua.viabilidade += 20; scores.alemanha.viabilidade += 18;
      scores.canada.viabilidade += 20; scores.australia.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.singapura.viabilidade += 15;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 25;
    }
    if (['doutorado', 'posDoutorado'].includes(formData.nivelFormacao)) {
      scores.eua.viabilidade += 30; scores.alemanha.viabilidade += 28;
      scores.canada.viabilidade += 30; scores.uk.viabilidade += 28;
      scores.australia.viabilidade += 25; scores.suica.viabilidade += 25;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 30;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 25;
    }

    // Realizações (importante para EUA, UK, Austrália)
    if (formData.possuiPremios !== 'nao' && formData.possuiPremios) {
      scores.eua.viabilidade += 20; scores.uk.viabilidade += 18;
      scores.australia.viabilidade += 15;
      scores.eua.rotas.eb1a = (scores.eua.rotas.eb1a || 30) + 20;
      scores.eua.rotas.o1a = (scores.eua.rotas.o1a || 40) + 20;
      scores.uk.rotas.globalTalent = (scores.uk.rotas.globalTalent || 50) + 20;
    }
    if (formData.possuiPublicacoes !== 'nao' && formData.possuiPublicacoes) {
      scores.eua.viabilidade += 15; scores.uk.viabilidade += 12;
      scores.eua.rotas.eb2Niw = (scores.eua.rotas.eb2Niw || 50) + 10;
    }

    // IDIOMAS
    if (['fluente', 'nativo'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 25; scores.canada.viabilidade += 30;
      scores.uk.viabilidade += 25; scores.irlanda.viabilidade += 25;
      scores.australia.viabilidade += 28; scores.novaZelandia.viabilidade += 28;
      scores.singapura.viabilidade += 22; scores.emirados.viabilidade += 20;
      scores.holanda.viabilidade += 20; scores.alemanha.viabilidade += 15;
    } else if (['avancado'].includes(formData.nivelIngles)) {
      scores.eua.viabilidade += 15; scores.canada.viabilidade += 18;
      scores.uk.viabilidade += 15; scores.irlanda.viabilidade += 15;
      scores.australia.viabilidade += 18; scores.novaZelandia.viabilidade += 18;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelEspanhol)) {
      scores.espanha.viabilidade += 30; scores.mexico.viabilidade += 25;
      scores.argentina.viabilidade += 25; scores.chile.viabilidade += 25;
      scores.uruguai.viabilidade += 25;
      scores.espanha.rotas.nomadaDigital = 90;
    }
    
    if (['fluente', 'avancado'].includes(formData.nivelAlemao)) {
      scores.alemanha.viabilidade += 25; scores.austria.viabilidade += 25;
      scores.suica.viabilidade += 20;
    }

    if (['fluente', 'avancado'].includes(formData.nivelFrances)) {
      scores.franca.viabilidade += 30; scores.canada.viabilidade += 15;
      scores.belgica.viabilidade += 20; scores.suica.viabilidade += 15;
    }

    // Capacidade financeira para Golden Visa
    if (['1m-2m', '2m-5m', 'acima5m', 'acima2m'].includes(formData.patrimonioLiquido)) {
      scores.portugal.rotas.goldenVisa = 95; scores.eua.rotas.eb5 = 90;
      scores.emirados.rotas.goldenVisaUAE = 90;
    }
    if (['interesse', 'prioridade'].includes(formData.disposicaoGoldenVisa)) {
      scores.portugal.viabilidade += 20; scores.espanha.viabilidade += 15;
      scores.emirados.viabilidade += 20;
    }

    // Empresa própria
    if (formData.possuiEmpresa && !['nao', 'encerrada'].includes(formData.possuiEmpresa)) {
      scores.holanda.rotas.startupVisa = 80; scores.canada.rotas.startupVisa = 75;
      scores.uk.rotas.innovatorFounder = 75; scores.chile.rotas.startupChile = 85;
      scores.singapura.rotas.entrePass = 70;
      if (['filial', 'exporta'].includes(formData.atuacaoInternacional)) {
        scores.eua.rotas.l1a = 85; scores.eua.viabilidade += 20;
      }
    }

    // ===== ALINHAMENTO (25%) =====
    
    // Preferências declaradas de países
    allCountries.forEach(country => {
      if (formData.paisesInteresse.includes(country)) {
        scores[country].alinhamento += 40;
      }
    });
    // Aliases para preferências
    if (formData.paisesInteresse.includes('uk')) scores.uk.alinhamento += 40;
    if (formData.paisesInteresse.includes('uae') || formData.paisesInteresse.includes('dubai')) scores.emirados.alinhamento += 40;
    if (formData.paisesInteresse.includes('nz')) scores.novaZelandia.alinhamento += 40;

    // Clima
    if (['mediterraneo', 'tropical'].includes(formData.preferenciaClima)) {
      scores.portugal.alinhamento += 25; scores.espanha.alinhamento += 25;
      scores.italia.alinhamento += 25; scores.emirados.alinhamento += 20;
      scores.singapura.alinhamento += 18; scores.australia.alinhamento += 20;
      scores.mexico.alinhamento += 22;
    }
    if (['temperado', 'frio'].includes(formData.preferenciaClima)) {
      scores.alemanha.alinhamento += 20; scores.canada.alinhamento += 22;
      scores.uk.alinhamento += 18; scores.irlanda.alinhamento += 18;
      scores.holanda.alinhamento += 18; scores.belgica.alinhamento += 18;
      scores.austria.alinhamento += 20; scores.suica.alinhamento += 20;
      scores.novaZelandia.alinhamento += 18; scores.japao.alinhamento += 18;
      scores.chile.alinhamento += 15; scores.argentina.alinhamento += 15;
    }

    // Preferência de idioma
    if (formData.preferenciaIdiomaPais === 'portugues') {
      scores.portugal.alinhamento += 30;
    }
    if (formData.preferenciaIdiomaPais === 'espanhol') {
      scores.espanha.alinhamento += 30; scores.mexico.alinhamento += 25;
      scores.argentina.alinhamento += 25; scores.chile.alinhamento += 25;
      scores.uruguai.alinhamento += 25;
    }
    if (formData.preferenciaIdiomaPais === 'ingles') {
      scores.eua.alinhamento += 25; scores.canada.alinhamento += 25;
      scores.uk.alinhamento += 25; scores.irlanda.alinhamento += 25;
      scores.australia.alinhamento += 25; scores.novaZelandia.alinhamento += 25;
      scores.singapura.alinhamento += 20; scores.emirados.alinhamento += 18;
    }

    // Comunidade brasileira
    if (formData.importanciaComunidadeBR === 'essencial') {
      scores.portugal.alinhamento += 25; scores.eua.alinhamento += 25;
      scores.japao.alinhamento += 22; scores.uk.alinhamento += 18;
      scores.espanha.alinhamento += 15; scores.argentina.alinhamento += 15;
      scores.uruguai.alinhamento += 15;
    }

    // Família com filhos
    if (formData.numeroFilhos && formData.numeroFilhos !== '0') {
      scores.portugal.alinhamento += 15; scores.espanha.alinhamento += 15;
      scores.canada.alinhamento += 20; scores.australia.alinhamento += 18;
      scores.novaZelandia.alinhamento += 18; scores.alemanha.alinhamento += 15;
    }

    // ===== TIMELINE (15%) =====
    
    // Processos rápidos (até 6 meses)
    if (['imediato', '6meses'].includes(formData.prazoIdeal)) {
      scores.holanda.timeline += 45; scores.emirados.timeline += 45;
      scores.portugal.timeline += 40; scores.alemanha.timeline += 38;
      scores.irlanda.timeline += 38; scores.uk.timeline += 35;
      scores.espanha.timeline += 35; scores.mexico.timeline += 40;
      scores.argentina.timeline += 45; scores.uruguai.timeline += 45;
      scores.singapura.timeline += 35;
      scores.eua.timeline += 15; scores.canada.timeline += 18;
      scores.australia.timeline += 20; scores.novaZelandia.timeline += 22;
    }
    // Médio prazo (1-2 anos)
    if (['1ano', '2anos'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 35; scores.canada.timeline += 38;
      scores.australia.timeline += 35; scores.novaZelandia.timeline += 35;
      scores.uk.timeline += 32;
    }
    // Longo prazo (3+ anos)
    if (['3anos', 'semPressa'].includes(formData.prazoIdeal)) {
      scores.eua.timeline += 40; scores.canada.timeline += 40;
      scores.suica.timeline += 35;
    }

    // ===== CUSTO-BENEFÍCIO (15%) =====
    
    // Orçamento baixo
    if (['ate20k', '20k-50k'].includes(formData.capacidadeInvestimento)) {
      scores.portugal.custoBeneficio += 35; scores.alemanha.custoBeneficio += 40;
      scores.espanha.custoBeneficio += 35; scores.italia.custoBeneficio += 35;
      scores.argentina.custoBeneficio += 45; scores.mexico.custoBeneficio += 42;
      scores.uruguai.custoBeneficio += 38; scores.chile.custoBeneficio += 35;
    }
    // Orçamento médio
    if (['50k-100k', '100k-200k'].includes(formData.capacidadeInvestimento)) {
      scores.canada.custoBeneficio += 35; scores.australia.custoBeneficio += 32;
      scores.irlanda.custoBeneficio += 32; scores.uk.custoBeneficio += 30;
      scores.holanda.custoBeneficio += 32;
    }
    // Orçamento alto
    if (['200k-500k', '500k-1m', 'acima1m'].includes(formData.capacidadeInvestimento)) {
      scores.eua.custoBeneficio += 40; scores.portugal.custoBeneficio += 40;
      scores.emirados.custoBeneficio += 42; scores.singapura.custoBeneficio += 38;
      scores.suica.custoBeneficio += 35;
    }

    // ===== POTENCIAL LONGO PRAZO (10%) =====
    
    // Tempo para cidadania (quanto mais rápido, mais pontos)
    scores.argentina.potencial += 45; // 2 anos
    scores.espanha.potencial += 45; // 2 anos para BR
    scores.canada.potencial += 40; // 3 anos
    scores.chile.potencial += 35; // 5 anos
    scores.uruguai.potencial += 38; // 3-5 anos
    scores.australia.potencial += 38; // 4 anos
    scores.portugal.potencial += 32; // 5 anos
    scores.eua.potencial += 32; // 5 anos
    scores.uk.potencial += 30; // 5 anos
    scores.irlanda.potencial += 30; // 5 anos
    scores.holanda.potencial += 28; // 5 anos
    scores.novaZelandia.potencial += 32; // 5 anos
    scores.franca.potencial += 28; // 5 anos
    scores.belgica.potencial += 28; // 5 anos
    scores.alemanha.potencial += 22; // 6-8 anos
    scores.suica.potencial += 15; // 10-12 anos
    scores.austria.potencial += 18; // 10 anos
    scores.italia.potencial += 20; // 10 anos (3-4 com ascendência)
    scores.singapura.potencial += 25; // 4 anos (2 PR + 2)
    scores.japao.potencial += 20; // 5-10 anos
    scores.emirados.potencial += 10; // Sem cidadania
    scores.mexico.potencial += 30; // 5 anos

    // Dupla cidadania europeia já existente
    if (formData.possuiDuplaCidadania && !['nao'].includes(formData.possuiDuplaCidadania)) {
      if (['italiana', 'portuguesa', 'alema', 'espanhola', 'outraUE'].includes(formData.possuiDuplaCidadania)) {
        // Cidadão UE pode morar/trabalhar em qualquer país da UE
        scores.portugal.potencial += 50; scores.alemanha.potencial += 50;
        scores.espanha.potencial += 50; scores.holanda.potencial += 50;
        scores.franca.potencial += 50; scores.italia.potencial += 50;
        scores.belgica.potencial += 50; scores.austria.potencial += 50;
        scores.irlanda.potencial += 50;
        // Viabilidade também aumenta muito
        scores.portugal.viabilidade += 40; scores.alemanha.viabilidade += 40;
        scores.espanha.viabilidade += 40; scores.holanda.viabilidade += 40;
        scores.franca.viabilidade += 40; scores.italia.viabilidade += 40;
        scores.belgica.viabilidade += 40; scores.austria.viabilidade += 40;
        scores.irlanda.viabilidade += 40;
      }
    }

    // ===== CALCULAR TOTAIS =====
    Object.keys(scores).forEach(country => {
      const s = scores[country];
      // Limitar cada dimensão a 100 antes do cálculo
      s.viabilidade = Math.min(s.viabilidade, 100);
      s.alinhamento = Math.min(s.alinhamento, 100);
      s.timeline = Math.min(s.timeline, 100);
      s.custoBeneficio = Math.min(s.custoBeneficio, 100);
      s.potencial = Math.min(s.potencial, 100);
      
      s.total = Math.round(
        (s.viabilidade * 0.35) + (s.alinhamento * 0.25) +
        (s.timeline * 0.15) + (s.custoBeneficio * 0.15) + (s.potencial * 0.10)
      );
      s.total = Math.min(s.total, 100);
      Object.keys(s.rotas).forEach(rota => { s.rotas[rota] = Math.min(s.rotas[rota], 100); });
    });

    return scores;
  };

  const getBestRoutes = (countryKey, scores) => {
    const calculatedRoutes = scores[countryKey]?.rotas || {};
    const countryRoutes = countryData[countryKey]?.rotas || {};
    
    // Combinar rotas calculadas com todas as rotas disponíveis do país
    const allRoutes = Object.keys(countryRoutes).map(key => ({
      key,
      score: calculatedRoutes[key] || 50, // Score base de 50 se não calculado
      ...countryRoutes[key]
    }));
    
    // Ordenar por score e retornar todas as rotas
    return allRoutes
      .sort((a, b) => b.score - a.score)
      .filter(r => r.nome);
  };

  // Submeter dados e mostrar análise
  const handleSubmitAndAnalyze = async () => {
    setIsSubmitting(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ 
        key, 
        name: countryData[key]?.nome,
        score: data.total,
        ...data, 
        info: countryData[key] 
      }));
    
    const bestRoutes = getBestRoutes(topCountries[0].key, scores);
    
    const analysisResults = {
      topCountries,
      recommendedRoute: bestRoutes[0]?.nome || 'Consultar especialista',
      scores
    };

    // Enviar dados para email e sheets
    try {
      const results = await submitQuestionnaireData(formData, analysisResults);
      setSubmissionStatus(results);
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      setSubmissionStatus({ email: { success: false }, sheets: { success: false } });
    }

    setIsSubmitting(false);
    setShowAnalysis(true);
  };

  const renderRadio = (label, field, options, required = false, columns = 1) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
        {options.map(opt => (
          <label key={opt.value} className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
            formData[field] === opt.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'
          }`}>
            <input type="radio" name={field} value={opt.value} checked={formData[field] === opt.value}
              onChange={(e) => handleChange(field, e.target.value)} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
              formData[field] === opt.value ? 'border-blue-500' : 'border-gray-300'
            }`}>
              {formData[field] === opt.value && <div className="w-2 h-2 rounded-full bg-blue-500" />}
            </div>
            <span className="text-sm">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderCheckbox = (label, field, options, columns = 2, maxItems = null) => {
    const selectedCount = formData[field]?.length || 0;
    const isAtLimit = maxItems && selectedCount >= maxItems;
    
    return (
      <div className="mb-5">
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          {maxItems && (
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              isAtLimit ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'
            }`}>
              {selectedCount}/{maxItems} selecionados
            </span>
          )}
        </div>
        <div className={`grid gap-2 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : columns === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'}`}>
          {options.map(opt => {
            const isSelected = formData[field].includes(opt.value);
            const isDisabled = !isSelected && isAtLimit;
            
            return (
              <label key={opt.value} className={`flex items-center p-3 border rounded-lg transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50 text-blue-700 cursor-pointer' 
                  : isDisabled 
                    ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                    : 'border-gray-200 hover:border-gray-300 cursor-pointer'
              }`}>
                <input type="checkbox" checked={isSelected} disabled={isDisabled}
                  onChange={() => !isDisabled && handleMultiSelect(field, opt.value, maxItems)} className="sr-only" />
                <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                  isSelected ? 'border-blue-500 bg-blue-500' : isDisabled ? 'border-gray-300 bg-gray-200' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm">{opt.label}</span>
              </label>
            );
          })}
        </div>
        {isAtLimit && (
          <p className="text-xs text-orange-600 mt-2">
            ✓ Limite de {maxItems} seleções atingido. Desmarque uma opção para selecionar outra.
          </p>
        )}
      </div>
    );
  };

  const renderInput = (label, field, placeholder = '', required = false) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type="text" value={formData[field]} onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
    </div>
  );

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <div className="space-y-6">
            {renderInput('Nome Completo', 'nomeCompleto', 'Seu nome completo', true)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput('E-mail', 'email', 'seu@email.com', true)}
              {renderInput('Telefone/WhatsApp', 'telefone', '+55 11 99999-9999', true)}
            </div>
            {renderRadio('Faixa Etária', 'faixaEtaria', [
              { value: '18-25', label: '18 a 25 anos' }, { value: '26-30', label: '26 a 30 anos' },
              { value: '31-35', label: '31 a 35 anos' }, { value: '36-40', label: '36 a 40 anos' },
              { value: '41-45', label: '41 a 45 anos' }, { value: '46-50', label: '46 a 50 anos' },
              { value: '51-55', label: '51 a 55 anos' }, { value: '56+', label: '56 anos ou mais' }
            ], true, 2)}
            {renderRadio('Estado Civil', 'estadoCivil', [
              { value: 'solteiro', label: 'Solteiro(a)' }, { value: 'casado', label: 'Casado(a)' },
              { value: 'uniao', label: 'União Estável' }, { value: 'divorciado', label: 'Divorciado(a)' }
            ], true, 2)}
            {renderRadio('Possui dupla cidadania?', 'possuiDuplaCidadania', [
              { value: 'nao', label: 'Não' }, { value: 'italiana', label: 'Italiana' },
              { value: 'portuguesa', label: 'Portuguesa' }, { value: 'alema', label: 'Alemã' },
              { value: 'espanhola', label: 'Espanhola' }, { value: 'outraUE', label: 'Outra UE' },
              { value: 'emProcesso', label: 'Em processo' }
            ], false, 2)}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            {renderRadio('Área de Atuação', 'areaAtuacao', [
              { value: 'tech', label: '💻 Tecnologia / TI' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'engenharia', label: '⚙️ Engenharia' }, { value: 'financas', label: '💰 Finanças' },
              { value: 'marketing', label: '📢 Marketing' }, { value: 'juridico', label: '⚖️ Jurídico' },
              { value: 'educacao', label: '📚 Educação' }, { value: 'negocios', label: '📊 Negócios' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderRadio('Nível do Cargo', 'nivelCargo', [
              { value: 'junior', label: 'Júnior' }, { value: 'pleno', label: 'Pleno' },
              { value: 'senior', label: 'Sênior' }, { value: 'lead', label: 'Tech Lead' },
              { value: 'gerente', label: 'Gerente' }, { value: 'diretor', label: 'Diretor' },
              { value: 'cLevel', label: 'C-Level' }, { value: 'empresario', label: 'Empresário' }
            ], true, 2)}
            {renderRadio('Anos de Experiência', 'anosExperiencia', [
              { value: '0-2', label: '0 a 2 anos' }, { value: '3-5', label: '3 a 5 anos' },
              { value: '6-8', label: '6 a 8 anos' }, { value: '9-12', label: '9 a 12 anos' },
              { value: '13-15', label: '13 a 15 anos' }, { value: '16-20', label: '16 a 20 anos' },
              { value: '20+', label: 'Mais de 20 anos' }
            ], true, 2)}
            {renderRadio('Gestão de equipes', 'gestaoEquipe', [
              { value: 'nao', label: 'Não' }, { value: 'pequena', label: '1-5 pessoas' },
              { value: 'media', label: '6-15 pessoas' }, { value: 'grande', label: '16-50 pessoas' },
              { value: 'multiplas', label: '50+ pessoas' }
            ], true, 2)}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800"><AlertCircle className="inline w-4 h-4 mr-1" />
                Crucial para vistos O-1A, EB-1A e Global Talent.</p>
            </div>
            {renderRadio('Prêmios profissionais?', 'possuiPremios', [
              { value: 'nao', label: 'Não' }, { value: '1-2', label: '1 a 2' },
              { value: '3-5', label: '3 a 5' }, { value: '6+', label: '6 ou mais' }
            ], true, 2)}
            {renderRadio('Publicações?', 'possuiPublicacoes', [
              { value: 'nao', label: 'Não' }, { value: '1-3', label: '1 a 3' },
              { value: '4-10', label: '4 a 10' }, { value: '10+', label: 'Mais de 10' }
            ], true, 2)}
            {renderRadio('Patentes?', 'possuiPatentes', [
              { value: 'nao', label: 'Não' }, { value: '1', label: '1' },
              { value: '2-3', label: '2 a 3' }, { value: '4+', label: '4+' }
            ], true, 2)}
            {renderRadio('Palestras?', 'possuiPalestras', [
              { value: 'nao', label: 'Não' }, { value: '1-5', label: '1 a 5' },
              { value: '6-15', label: '6 a 15' }, { value: '15+', label: '15+' }
            ], true, 2)}
            {renderRadio('Mídia?', 'aparicoesMidia', [
              { value: 'nao', label: 'Nenhuma' }, { value: 'poucas', label: '1 a 3' },
              { value: 'varias', label: '4 a 10' }, { value: 'muitas', label: '10+' }
            ], true, 2)}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {renderRadio('Maior Formação', 'nivelFormacao', [
              { value: 'medio', label: 'Ensino Médio' }, { value: 'tecnico', label: 'Técnico' },
              { value: 'graduacao', label: 'Graduação' }, { value: 'posGraduacao', label: 'Pós/MBA' },
              { value: 'mestrado', label: 'Mestrado' }, { value: 'doutorado', label: 'Doutorado' },
              { value: 'posDoutorado', label: 'Pós-Doutorado' }
            ], true)}
            {renderRadio('Área do Curso', 'areaCurso', [
              { value: 'stem', label: 'STEM / Exatas (Engenharia, TI, Matemática, Física)' },
              { value: 'saude', label: 'Saúde (Medicina, Enfermagem, Odonto, Fisio)' },
              { value: 'direito', label: 'Direito' },
              { value: 'negocios', label: 'Negócios (Administração, Economia, Contabilidade)' },
              { value: 'humanas', label: 'Humanas / Sociais (Psicologia, Comunicação, RI)' },
              { value: 'artes', label: 'Artes / Design (Design, Arquitetura, Publicidade)' },
              { value: 'outro', label: 'Outro' }
            ], true, 2)}
            {renderCheckbox('Certificações', 'certificacoes', [
              { value: 'aws', label: 'AWS' }, { value: 'gcp', label: 'Google Cloud' },
              { value: 'azure', label: 'Azure' }, { value: 'pmp', label: 'PMP' },
              { value: 'scrum', label: 'Scrum' }, { value: 'idioma', label: 'Idioma' },
              { value: 'nenhuma', label: 'Nenhuma' }
            ], 2)}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {renderRadio('Possui empresa?', 'possuiEmpresa', [
              { value: 'nao', label: 'Não' }, { value: 'mei', label: 'MEI' },
              { value: 'me', label: 'ME/EPP' }, { value: 'ltda', label: 'LTDA' },
              { value: 'socio', label: 'Sócio minoritário' }
            ], true, 2)}
            {formData.possuiEmpresa && !['nao'].includes(formData.possuiEmpresa) && (
              <>
                {renderRadio('Faturamento Anual', 'faturamentoAnual', [
                  { value: 'ate81k', label: 'Até R$81k' }, { value: '81k-360k', label: 'R$81k-360k' },
                  { value: '360k-1m', label: 'R$360k-1M' }, { value: '1m-5m', label: 'R$1M-5M' },
                  { value: 'acima5m', label: 'Acima R$5M' }
                ], false, 2)}
                {renderRadio('Atuação Internacional', 'atuacaoInternacional', [
                  { value: 'nao', label: 'Não' }, { value: 'exporta', label: 'Exporta' },
                  { value: 'clientes', label: 'Clientes no exterior' }, { value: 'filial', label: 'Filial no exterior' }
                ], false, 2)}
              </>
            )}
            {renderRadio('Interesse em empreender no exterior?', 'interesseEmpreenderExterior', [
              { value: 'nao', label: 'Não' }, { value: 'talvez', label: 'Talvez' },
              { value: 'sim', label: 'Sim' }, { value: 'jaTenho', label: 'Já tenho' }
            ], true, 2)}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {renderRadio('Nível de Inglês', 'nivelIngles', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }, { value: 'nativo', label: 'Nativo' }
            ], true)}
            {renderRadio('Nível de Espanhol', 'nivelEspanhol', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Nível de Alemão', 'nivelAlemao', [
              { value: 'nenhum', label: 'Não falo' }, { value: 'basico', label: 'Básico' },
              { value: 'intermediario', label: 'Intermediário' }, { value: 'avancado', label: 'Avançado' },
              { value: 'fluente', label: 'Fluente' }
            ], false, 3)}
            {renderRadio('Disposição para aprender?', 'disposicaoAprender', [
              { value: 'nao', label: 'Prefiro país onde já falo' },
              { value: 'basico', label: 'Aprenderia o básico' },
              { value: 'sim', label: 'Sim, disposto' }
            ], true)}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {renderRadio('Renda Mensal Familiar', 'rendaMensalFamiliar', [
              { value: 'ate5k', label: 'Até R$5k' }, { value: '5k-10k', label: 'R$5k-10k' },
              { value: '10k-20k', label: 'R$10k-20k' }, { value: '20k-35k', label: 'R$20k-35k' },
              { value: '35k-50k', label: 'R$35k-50k' }, { value: '50k-80k', label: 'R$50k-80k' },
              { value: 'acima80k', label: 'Acima R$80k' }
            ], true, 2)}
            {renderRadio('Patrimônio Líquido', 'patrimonioLiquido', [
              { value: 'ate50k', label: 'Até R$50k' }, { value: '50k-100k', label: 'R$50k-100k' },
              { value: '100k-250k', label: 'R$100k-250k' }, { value: '250k-500k', label: 'R$250k-500k' },
              { value: '500k-1m', label: 'R$500k-1M' }, { value: '1m-2m', label: 'R$1M-2M' },
              { value: 'acima2m', label: 'Acima R$2M' }
            ], true, 2)}
            {renderRadio('Investimento no processo', 'capacidadeInvestimento', [
              { value: 'ate20k', label: 'Até R$20k' }, { value: '20k-50k', label: 'R$20k-50k' },
              { value: '50k-100k', label: 'R$50k-100k' }, { value: '100k-200k', label: 'R$100k-200k' },
              { value: '200k-500k', label: 'R$200k-500k' }, { value: '500k-1m', label: 'R$500k-1M' },
              { value: 'acima1m', label: 'Acima R$1M' }
            ], true, 2)}
            {renderRadio('Interesse em Golden Visa/EB-5?', 'disposicaoGoldenVisa', [
              { value: 'nao', label: 'Não' }, { value: 'considero', label: 'Consideraria' },
              { value: 'interesse', label: 'Tenho interesse' }, { value: 'prioridade', label: 'Prioridade' }
            ], true, 2)}
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            {(formData.estadoCivil === 'casado' || formData.estadoCivil === 'uniao') && (
              <>
                {renderRadio('Área do Cônjuge', 'areaConjuge', [
                  { value: 'tech', label: 'Tecnologia' }, { value: 'saude', label: 'Saúde' },
                  { value: 'educacao', label: 'Educação' }, { value: 'outro', label: 'Outro' },
                  { value: 'na', label: 'Não trabalha' }
                ], false, 3)}
                {renderRadio('Flexibilidade do Cônjuge', 'flexibilidadeConjuge', [
                  { value: 'total', label: 'Total' }, { value: 'parcial', label: 'Parcial' },
                  { value: 'resistente', label: 'Resistente' }
                ], true, 3)}
              </>
            )}
            {renderRadio('Número de Filhos', 'numeroFilhos', [
              { value: '0', label: 'Nenhum' }, { value: '1', label: '1' },
              { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4+', label: '4+' }
            ], true, 3)}
            {formData.numeroFilhos && formData.numeroFilhos !== '0' && (
              renderCheckbox('Faixa Etária dos Filhos', 'faixaEtariaFilhos', [
                { value: 'bebe', label: '0-2 anos' }, { value: 'preEscola', label: '3-5 anos' },
                { value: 'fundamental1', label: '6-10 anos' }, { value: 'fundamental2', label: '11-14 anos' },
                { value: 'medio', label: '15-17 anos' }, { value: 'adulto', label: '18+' }
              ], 2)
            )}
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            {renderCheckbox('Motivações (até 5)', 'motivacaoPrincipal', [
              { value: 'seguranca', label: '🛡️ Segurança' }, { value: 'qualidadeVida', label: '🌟 Qualidade de vida' },
              { value: 'carreira', label: '📈 Crescimento profissional' }, { value: 'salario', label: '💰 Aumento de renda' },
              { value: 'educacaoFilhos', label: '🎓 Educação dos filhos' }, { value: 'saude', label: '🏥 Saúde' },
              { value: 'estabilidade', label: '🏛️ Estabilidade' }, { value: 'cidadania', label: '🇪🇺 Cidadania UE' },
              { value: 'empreender', label: '🚀 Empreender' }, { value: 'aventura', label: '✈️ Nova experiência' }
            ], 2, 5)}
            {renderRadio('Objetivo de Carreira', 'objetivoCarreira', [
              { value: 'mesmaArea', label: 'Continuar na área' }, { value: 'crescer', label: 'Crescer' },
              { value: 'mudarArea', label: 'Mudar área' }, { value: 'empreender', label: 'Empreender' },
              { value: 'equilibrio', label: 'Mais equilíbrio' }
            ], true)}
            {renderRadio('Expectativa Salarial', 'expectativaSalarial', [
              { value: 'menor', label: 'Aceito ganhar menos' }, { value: 'igual', label: 'Manter' },
              { value: 'maior', label: 'Ganhar mais' }, { value: 'muitoMaior', label: 'Dobrar' }
            ], true, 2)}
            {renderRadio('Plano de Retorno', 'planoRetorno', [
              { value: 'nunca', label: 'Não pretendo voltar' }, { value: 'aposentadoria', label: 'Na aposentadoria' },
              { value: 'temporario', label: 'Alguns anos' }, { value: 'incerto', label: 'Não sei' }
            ], true, 2)}
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            {renderCheckbox('Países de Interesse (selecione quantos quiser)', 'paisesInteresse', [
              // Europa
              { value: 'portugal', label: '🇵🇹 Portugal' }, { value: 'espanha', label: '🇪🇸 Espanha' },
              { value: 'alemanha', label: '🇩🇪 Alemanha' }, { value: 'holanda', label: '🇳🇱 Holanda' },
              { value: 'irlanda', label: '🇮🇪 Irlanda' }, { value: 'uk', label: '🇬🇧 Reino Unido' },
              { value: 'italia', label: '🇮🇹 Itália' }, { value: 'franca', label: '🇫🇷 França' },
              { value: 'belgica', label: '🇧🇪 Bélgica' }, { value: 'austria', label: '🇦🇹 Áustria' },
              { value: 'suica', label: '🇨🇭 Suíça' },
              // Américas
              { value: 'eua', label: '🇺🇸 Estados Unidos' }, { value: 'canada', label: '🇨🇦 Canadá' },
              { value: 'mexico', label: '🇲🇽 México' }, { value: 'argentina', label: '🇦🇷 Argentina' },
              { value: 'chile', label: '🇨🇱 Chile' }, { value: 'uruguai', label: '🇺🇾 Uruguai' },
              // Oceania
              { value: 'australia', label: '🇦🇺 Austrália' }, { value: 'novaZelandia', label: '🇳🇿 Nova Zelândia' },
              // Ásia/Oriente
              { value: 'emirados', label: '🇦🇪 Emirados (Dubai)' }, { value: 'singapura', label: '🇸🇬 Singapura' },
              { value: 'japao', label: '🇯🇵 Japão' },
              // Aberto
              { value: 'aberto', label: '🌍 Aberto a sugestões' }
            ], 3)}
            {renderRadio('Preferência de Clima', 'preferenciaClima', [
              { value: 'tropical', label: '☀️ Quente' }, { value: 'mediterraneo', label: '🌅 Mediterrâneo' },
              { value: 'temperado', label: '🍂 Temperado' }, { value: 'frio', label: '❄️ Frio OK' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Comunidade Brasileira', 'importanciaComunidadeBR', [
              { value: 'essencial', label: 'Essencial' }, { value: 'importante', label: 'Importante' },
              { value: 'indiferente', label: 'Indiferente' }, { value: 'evitar', label: 'Prefiro evitar' }
            ], true, 2)}
            {renderRadio('Preferência de Idioma', 'preferenciaIdiomaPais', [
              { value: 'portugues', label: 'Lusófono' }, { value: 'espanhol', label: 'Hispânico' },
              { value: 'ingles', label: 'Anglófono' }, { value: 'aprender', label: 'Disposto aprender' },
              { value: 'indiferente', label: 'Indiferente' }
            ], true, 3)}
            {renderRadio('Custo de Vida', 'toleranciaCustoVida', [
              { value: 'baixo', label: 'Prefiro baixo' }, { value: 'medio', label: 'Médio OK' },
              { value: 'alto', label: 'Alto OK' }
            ], true, 3)}
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            {renderRadio('Prazo para Mudança', 'prazoIdeal', [
              { value: 'imediato', label: 'Imediato (3 meses)' }, { value: '6meses', label: 'Até 6 meses' },
              { value: '1ano', label: '6m a 1 ano' }, { value: '2anos', label: '1 a 2 anos' },
              { value: '3anos', label: '2 a 3 anos' }, { value: 'semPressa', label: 'Sem pressa' }
            ], true, 2)}
            {renderRadio('Flexibilidade', 'flexibilidadePrazo', [
              { value: 'rigido', label: 'Rígido' }, { value: 'flexivel', label: 'Flexível' },
              { value: 'muitoFlexivel', label: 'Muito flexível' }
            ], true, 3)}
            {renderRadio('Situação no Brasil', 'situacaoAtualBrasil', [
              { value: 'estavel', label: 'Estável' }, { value: 'estavelInsatisfeito', label: 'Estável mas insatisfeito' },
              { value: 'transicao', label: 'Em transição' }, { value: 'urgente', label: 'Urgente' }
            ], true, 2)}
            {renderRadio('Já iniciou processo?', 'jaIniciouProcesso', [
              { value: 'nao', label: 'Não' }, { value: 'pesquisando', label: 'Pesquisando' },
              { value: 'documentos', label: 'Reunindo docs' }, { value: 'processoAtivo', label: 'Processo ativo' }
            ], true, 2)}
            {renderRadio('Conhecimento sobre Rotas', 'conhecimentoRotas', [
              { value: 'nenhum', label: 'Nenhum' }, { value: 'basico', label: 'Básico' },
              { value: 'moderado', label: 'Moderado' }, { value: 'avancado', label: 'Avançado' }
            ], true, 2)}
          </div>
        );

      default:
        return null;
    }
  };

  // RENDER ANÁLISE
  const renderAnalysis = () => {
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    const topCountry = topCountries[0];
    const bestRoutes = getBestRoutes(topCountry.key, scores);

    return (
      <div className="space-y-6">
        {/* Header com status de envio */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Relatório Geofitting</h2>
          <p className="text-gray-600 mt-2">Análise completa para {formData.nomeCompleto || 'Cliente'}</p>
          
          {/* Status de envio */}
          {submissionStatus && (
            <div className="flex justify-center gap-4 mt-4">
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.email?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Mail className="w-4 h-4 mr-1" />
                {submissionStatus.email?.success ? 'Email enviado' : 'Email pendente'}
              </div>
              <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                submissionStatus.sheets?.success ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                <Database className="w-4 h-4 mr-1" />
                {submissionStatus.sheets?.success ? 'Dados salvos' : 'Dados pendentes'}
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 justify-center bg-gray-100 p-2 rounded-xl">
          {[
            { id: 'resumo', label: 'Resumo', icon: FileText },
            { id: 'destinos', label: 'Destinos', icon: MapPin },
            { id: 'rotas', label: 'Rotas', icon: Plane },
            { id: 'comparativo', label: 'Comparativo', icon: TrendingUp }
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600 shadow-md' : 'text-gray-600 hover:text-gray-800'
              }`}>
              <tab.icon className="w-4 h-4 mr-2" />{tab.label}
            </button>
          ))}
        </div>

        {/* Tab Resumo */}
        {activeTab === 'resumo' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Sumário Executivo</h3>
              <p className="text-blue-100 leading-relaxed">
                Com base na análise do seu perfil, identificamos <strong>{topCountry.info?.nome}</strong> como 
                seu destino mais compatível, com score de <strong>{topCountry.total}%</strong>. 
                A rota recomendada é <strong>{bestRoutes[0]?.nome || 'Tech Visa'}</strong>, 
                com timeline estimada de <strong>{bestRoutes[0]?.timeline || '3-6 meses'}</strong>.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-blue-500">
                <p className="text-xs text-gray-500">Área</p>
                <p className="font-bold capitalize">{formData.areaAtuacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-green-500">
                <p className="text-xs text-gray-500">Experiência</p>
                <p className="font-bold">{formData.anosExperiencia || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-purple-500">
                <p className="text-xs text-gray-500">Formação</p>
                <p className="font-bold capitalize">{formData.nivelFormacao || 'N/A'}</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-500">
                <p className="text-xs text-gray-500">Timeline</p>
                <p className="font-bold">{formData.prazoIdeal || 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Destinos */}
        {activeTab === 'destinos' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ranking de Destinos por Compatibilidade</h3>
            {topCountries.map((country, index) => (
              <div key={country.key} className={`bg-white rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'ring-2 ring-green-500' : ''}`}>
                <div className="p-4 cursor-pointer" onClick={() => setExpandedCountry(expandedCountry === index ? null : index)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : index === 2 ? 'bg-purple-500' : 'bg-gray-400'
                      }`}>{index + 1}</span>
                      <span className="text-3xl ml-3">{country.info?.bandeira}</span>
                      <div className="ml-3">
                        <h4 className="font-bold text-lg text-gray-800">{country.info?.nome}</h4>
                        <p className="text-sm text-gray-500">{country.info?.capital} • {country.info?.idioma}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-4">
                        <div className="text-2xl font-bold text-gray-800">{country.total}%</div>
                        <div className="text-xs text-gray-500">Compatibilidade</div>
                      </div>
                      {expandedCountry === index ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                  <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className={`h-full transition-all ${
                      index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                    }`} style={{ width: `${country.total}%` }} />
                  </div>
                </div>
                
                {/* Detalhes expandidos */}
                {expandedCountry === index && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Informações do País</h5>
                        <div className="space-y-1 text-sm">
                          <p><span className="text-gray-500">Custo de Vida:</span> {country.info?.custoVida}</p>
                          <p><span className="text-gray-500">Qualidade de Vida:</span> {country.info?.qualidadeVida}</p>
                          <p><span className="text-gray-500">Segurança:</span> {country.info?.seguranca}</p>
                          <p><span className="text-gray-500">Clima:</span> {country.info?.clima}</p>
                          <p><span className="text-gray-500">Comunidade BR:</span> {country.info?.comunidadeBR}</p>
                          <p><span className="text-gray-500">Cidadania:</span> {country.info?.tempoResidencia}</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Breakdown do Score</h5>
                        <div className="space-y-2">
                          {[
                            { label: 'Viabilidade', value: country.viabilidade, peso: '35%' },
                            { label: 'Alinhamento', value: country.alinhamento, peso: '25%' },
                            { label: 'Timeline', value: country.timeline, peso: '15%' },
                            { label: 'Custo-Benefício', value: country.custoBeneficio, peso: '15%' },
                            { label: 'Potencial LP', value: country.potencial, peso: '10%' }
                          ].map(item => (
                            <div key={item.label} className="flex items-center text-sm">
                              <span className="w-24 text-gray-600">{item.label}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(item.value, 100)}%` }} />
                              </div>
                              <span className="w-12 text-right text-gray-500">{item.peso}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Principais Cidades</h5>
                      <div className="flex flex-wrap gap-2">
                        {country.info?.cidades?.map(cidade => (
                          <span key={cidade} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
                            {cidade}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab Rotas */}
        {activeTab === 'rotas' && (
          <div className="space-y-6">
            {topCountries.slice(0, 3).map((country) => {
              const routes = getBestRoutes(country.key, scores);
              return (
                <div key={country.key} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="bg-gray-800 p-4 text-white flex items-center">
                    <span className="text-2xl mr-2">{country.info?.bandeira}</span>
                    <h4 className="font-bold">{country.info?.nome}</h4>
                    <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">{country.total}%</span>
                  </div>
                  <div className="p-4 space-y-3">
                    {routes.length > 0 ? routes.map((route, idx) => (
                      <div key={route.key} className="border rounded-lg overflow-hidden">
                        <div className="p-4 cursor-pointer hover:bg-gray-50"
                          onClick={() => setExpandedRoute(expandedRoute === `${country.key}-${route.key}` ? null : `${country.key}-${route.key}`)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                                idx === 0 ? 'bg-green-500' : 'bg-gray-400'
                              }`}>{idx + 1}</span>
                              <div className="ml-3">
                                <h5 className="font-semibold">{route.nome}</h5>
                                <p className="text-xs text-gray-500">{route.tipo}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold">{route.score}%</div>
                              <div className="text-xs text-gray-500">{route.timeline}</div>
                            </div>
                          </div>
                        </div>
                        {expandedRoute === `${country.key}-${route.key}` && (
                          <div className="border-t p-4 bg-gray-50">
                            <p className="text-gray-600 mb-4">{route.descricao}</p>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <h6 className="font-medium mb-2">Requisitos</h6>
                                <ul className="text-sm space-y-1">
                                  {route.requisitos?.map((req, i) => (
                                    <li key={i} className="flex items-start">
                                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />{req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-sm"><strong>Custo:</strong> {route.custoEstimado}</p>
                                <p className="text-sm"><strong>Taxa de Sucesso:</strong> {route.taxaSucesso}</p>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                  <div className="bg-green-50 p-2 rounded text-xs">
                                    <strong className="text-green-800">Vantagens:</strong>
                                    <ul className="text-green-700 mt-1">
                                      {route.vantagens?.slice(0, 2).map((v, i) => <li key={i}>• {v}</li>)}
                                    </ul>
                                  </div>
                                  <div className="bg-red-50 p-2 rounded text-xs">
                                    <strong className="text-red-800">Desvantagens:</strong>
                                    <ul className="text-red-700 mt-1">
                                      {route.desvantagens?.slice(0, 2).map((d, i) => <li key={i}>• {d}</li>)}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )) : <p className="text-gray-500 text-center py-4">Consulte um especialista.</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Comparativo */}
        {activeTab === 'comparativo' && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="p-4 text-left">Critério</th>
                  {topCountries.slice(0, 4).map((c) => (
                    <th key={c.key} className="p-4 text-center">
                      <span className="text-2xl block">{c.info?.bandeira}</span>
                      {c.info?.nome}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { label: 'Score Total', key: 'total', suffix: '%' },
                  { label: 'Viabilidade', key: 'viabilidade' },
                  { label: 'Alinhamento', key: 'alinhamento' },
                  { label: 'Timeline', key: 'timeline' }
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-medium">{row.label}</td>
                    {topCountries.slice(0, 4).map((c) => (
                      <td key={c.key} className="p-4 text-center font-bold">
                        {Math.round(c[row.key])}{row.suffix || ''}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="p-4 font-medium">Cidadania</td>
                  {topCountries.slice(0, 4).map((c) => (
                    <td key={c.key} className="p-4 text-center text-sm">{c.info?.tempoResidencia}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Ações do Relatório */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={generatePDF}
            disabled={isGeneratingPDF}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            {isGeneratingPDF ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin text-gray-600" />
            ) : (
              <Download className="w-4 h-4 mr-2 text-gray-600" />
            )}
            <span className="text-gray-700 font-medium">Baixar PDF</span>
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Meu Relatório Geofitting',
                  text: `Fiz minha análise migratória com a UK Consultoria! Meu destino mais compatível é ${topCountries[0]?.info?.nome} com ${topCountries[0]?.total}% de compatibilidade.`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copiado!');
              }
            }}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-gray-700 font-medium">Compartilhar</span>
          </button>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
          <p className="text-blue-100 mb-6">
            Este é um diagnóstico preliminar. Para uma análise completa com advogados especializados, 
            agende uma consulta com nossa equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999'}?text=Olá! Acabei de preencher o Geofitting e gostaria de agendar uma consulta. Meu nome é ${formData.nomeCompleto}`}
              target="_blank" rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
            <button className="flex-1 bg-white text-blue-700 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
              <Calendar className="w-5 h-5 mr-2" />
              Agendar Consulta
            </button>
          </div>
        </div>

        <div className="text-center">
          <button onClick={() => { setShowAnalysis(false); setCurrentSection(0); setActiveTab('resumo'); }}
            className="text-blue-600 hover:text-blue-800 font-medium">
            ← Voltar e editar respostas
          </button>
        </div>
      </div>
    );
  };

  // Função para gerar PDF
  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    const scores = calculateDetailedScore();
    const topCountries = Object.entries(scores)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 5)
      .map(([key, data]) => ({ key, ...data, info: countryData[key] }));
    
    const dataAtual = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const mesAno = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

    // ===== FUNÇÕES AUXILIARES =====
    
    // Gerar análise de "Por que este país para você"
    const getWhyCountry = (countryKey, countryInfo) => {
      const reasons = {
        portugal: [
          { icon: '🗣️', text: 'Idioma: Adaptação imediata — português brasileiro é compreendido e aceito' },
          { icon: '💼', text: 'Mercado tech aquecido: Lisboa é hub europeu de startups e empresas de tecnologia' },
          { icon: '📋', text: 'Tech Visa: Processo simplificado com aprovação em semanas, não meses' },
          { icon: '💰', text: 'Custo de vida: Mais acessível que outros países da Europa Ocidental' },
          { icon: '🛡️', text: 'Segurança: Portugal consistentemente entre os 5 países mais seguros do mundo' },
          { icon: '🎓', text: 'Educação: Sistema público de qualidade + opções internacionais' },
          { icon: '🇪🇺', text: 'Caminho para cidadania: 5 anos de residência legal (um dos mais curtos da UE)' },
          { icon: '🇧🇷', text: 'Comunidade brasileira: Forte rede de apoio, especialmente em Lisboa' }
        ],
        alemanha: [
          { icon: '💶', text: 'Maior economia da Europa: Mercado de trabalho robusto e estável' },
          { icon: '💰', text: 'Salários elevados: Profissionais tech ganham €60.000-€120.000/ano' },
          { icon: '📋', text: 'EU Blue Card: Caminho rápido para residência permanente (21-33 meses)' },
          { icon: '🎓', text: 'Sistema educacional gratuito: Incluindo universidades públicas' },
          { icon: '🚀', text: 'Hub de inovação: Berlim é capital europeia de startups' },
          { icon: '⚖️', text: 'Segurança jurídica: Sistema legal sólido e previsível' }
        ],
        eua: [
          { icon: '💵', text: 'Maiores salários globais: Profissionais tech ganham $150k-$300k/ano' },
          { icon: '🚀', text: 'Centro global de inovação: Oportunidades incomparáveis em tech' },
          { icon: '📋', text: 'EB-2 NIW: Não requer sponsor — pode auto-peticionar' },
          { icon: '🏠', text: 'Green Card permanente: Diferente de vistos temporários europeus' },
          { icon: '🎓', text: 'Educação superior: Melhores universidades do mundo' },
          { icon: '🗣️', text: 'Idioma: Se você fala inglês fluente, adaptação facilitada' }
        ],
        canada: [
          { icon: '🌍', text: 'País multicultural: Sociedade acolhedora e diversa' },
          { icon: '📋', text: 'Express Entry: Sistema de pontos transparente e previsível' },
          { icon: '🏥', text: 'Sistema de saúde público: Acesso universal gratuito' },
          { icon: '🎓', text: 'Educação de qualidade: Ensino público gratuito até ensino médio' },
          { icon: '🛡️', text: 'Segurança: Um dos países mais seguros das Américas' },
          { icon: '🇪🇺', text: 'Cidadania em 3 anos: Um dos processos mais rápidos do mundo' }
        ],
        holanda: [
          { icon: '⚡', text: 'Processo mais rápido da Europa: Aprovação em 2-4 semanas' },
          { icon: '🗣️', text: 'Inglês amplamente falado: 93% da população fala inglês' },
          { icon: '🚴', text: 'Qualidade de vida: Infraestrutura excepcional' },
          { icon: '💼', text: 'Hub de multinacionais: Sede de grandes empresas globais' },
          { icon: '🏠', text: 'Benefícios fiscais: 30% ruling para expatriados qualificados' },
          { icon: '🇪🇺', text: 'Localização central: Fácil acesso a toda Europa' }
        ],
        espanha: [
          { icon: '🌞', text: 'Clima mediterrâneo: Sol abundante o ano todo' },
          { icon: '💰', text: 'Custo de vida acessível: Menor que outros países da Europa Ocidental' },
          { icon: '🗣️', text: 'Espanhol: Se você fala, adaptação facilitada' },
          { icon: '🏖️', text: 'Qualidade de vida: Cultura rica e gastronomia excepcional' },
          { icon: '📋', text: 'Nômade Digital: Visto específico para trabalho remoto' },
          { icon: '🇪🇺', text: 'Cidadania em 2 anos: Para brasileiros (acordo especial)' }
        ],
        uk: [
          { icon: '🗣️', text: 'Idioma inglês: Se você é fluente, integração imediata' },
          { icon: '💰', text: 'Salários elevados: Mercado competitivo em tech' },
          { icon: '🚀', text: 'Hub financeiro global: Londres é centro mundial de negócios' },
          { icon: '🎓', text: 'Universidades renomadas: Oxford, Cambridge, Imperial' },
          { icon: '📋', text: 'Skilled Worker Visa: Processo estruturado e claro' }
        ],
        irlanda: [
          { icon: '💼', text: 'Hub tech europeu: Google, Meta, Apple, Microsoft têm sedes europeias aqui' },
          { icon: '🗣️', text: 'Idioma inglês: País anglófono na União Europeia' },
          { icon: '💰', text: 'Salários competitivos: Especialmente em tech' },
          { icon: '🏞️', text: 'Natureza exuberante: Paisagens verdes e qualidade de ar' },
          { icon: '🇪🇺', text: 'Acesso à UE: Único país anglófono que permanece na UE' }
        ],
        australia: [
          { icon: '🌞', text: 'Clima agradável: Sol abundante na maior parte do país' },
          { icon: '💰', text: 'Salários elevados: Alto padrão de vida' },
          { icon: '🏥', text: 'Sistema de saúde: Medicare oferece cobertura universal' },
          { icon: '🛡️', text: 'Segurança: Um dos países mais seguros do mundo' },
          { icon: '🏖️', text: 'Qualidade de vida: Equilíbrio trabalho-lazer valorizado' },
          { icon: '🇧🇷', text: 'Comunidade brasileira: Presença significativa, especialmente em Sydney' }
        ],
        singapura: [
          { icon: '💼', text: 'Hub financeiro asiático: Centro de negócios global' },
          { icon: '🛡️', text: 'Extremamente seguro: Um dos menores índices de criminalidade do mundo' },
          { icon: '🌐', text: 'Inglês oficial: Sem barreira linguística' },
          { icon: '✈️', text: 'Localização estratégica: Gateway para toda Ásia' },
          { icon: '📋', text: 'Processo eficiente: Burocracia mínima' }
        ],
        emirados: [
          { icon: '💰', text: 'Zero imposto de renda: 100% do salário é seu' },
          { icon: '🌞', text: 'Sol o ano todo: Clima quente e seco' },
          { icon: '🛡️', text: 'Extremamente seguro: Criminalidade quase inexistente' },
          { icon: '✈️', text: 'Hub global: Dubai conecta todos os continentes' },
          { icon: '⚡', text: 'Processo rápido: Golden Visa em semanas' }
        ],
        italia: [
          { icon: '🍝', text: 'Qualidade de vida: Gastronomia, cultura e beleza incomparáveis' },
          { icon: '🗣️', text: 'Italiano similar: Falantes de português aprendem rápido' },
          { icon: '💰', text: 'Custo de vida variável: Cidades menores são muito acessíveis' },
          { icon: '🇪🇺', text: 'Cidadania italiana: Se você tem ancestrais, processo de reconhecimento' },
          { icon: '📋', text: 'Nômade Digital: Visto específico disponível' }
        ],
        argentina: [
          { icon: '⚡', text: 'Processo mais fácil: Mercosul permite residência imediata' },
          { icon: '🗣️', text: 'Espanhol: Muito similar ao português' },
          { icon: '💰', text: 'Custo de vida baixo: Câmbio favorável para quem ganha em reais/dólar' },
          { icon: '🎭', text: 'Cultura vibrante: Buenos Aires é capital cultural da América Latina' },
          { icon: '🇪🇺', text: 'Cidadania em 2 anos: Um dos processos mais rápidos' }
        ],
        uruguai: [
          { icon: '🛡️', text: 'Mais estável da região: Democracia sólida e segurança' },
          { icon: '⚡', text: 'Mercosul: Residência facilitada para brasileiros' },
          { icon: '💰', text: 'Benefícios fiscais: Incentivos para estrangeiros' },
          { icon: '🏖️', text: 'Qualidade de vida: Punta del Este, praias, tranquilidade' }
        ],
        chile: [
          { icon: '💼', text: 'Economia mais estável da região: Ambiente de negócios sólido' },
          { icon: '🚀', text: 'Startup Chile: Programa de incentivo a empreendedores' },
          { icon: '🏔️', text: 'Natureza diversa: Deserto, montanhas, praias' },
          { icon: '🛡️', text: 'Segurança: Um dos países mais seguros da América Latina' }
        ],
        mexico: [
          { icon: '📍', text: 'Proximidade com EUA: Fácil acesso ao mercado americano' },
          { icon: '💰', text: 'Custo de vida baixo: Especialmente fora da Cidade do México' },
          { icon: '🌮', text: 'Cultura rica: Gastronomia, história, tradições' },
          { icon: '📋', text: 'Nômade Digital: Visto disponível para trabalho remoto' }
        ],
        franca: [
          { icon: '🗼', text: 'Qualidade de vida excepcional: Gastronomia, cultura, moda' },
          { icon: '🏥', text: 'Sistema de saúde: Considerado um dos melhores do mundo' },
          { icon: '🎓', text: 'Educação gratuita: Incluindo universidades públicas' },
          { icon: '🇪🇺', text: 'Coração da Europa: Paris conecta todo o continente' }
        ],
        suica: [
          { icon: '💰', text: 'Maiores salários da Europa: Padrão de vida elevadíssimo' },
          { icon: '🏔️', text: 'Natureza espetacular: Alpes, lagos, qualidade do ar' },
          { icon: '🛡️', text: 'Extremamente seguro: Um dos países mais seguros do mundo' },
          { icon: '🏦', text: 'Estabilidade: Economia sólida e moeda forte' }
        ],
        austria: [
          { icon: '🎵', text: 'Cultura rica: Viena, música clássica, arquitetura' },
          { icon: '🏔️', text: 'Natureza: Alpes austríacos são espetaculares' },
          { icon: '💰', text: 'Qualidade de vida: Consistentemente no top 10 mundial' },
          { icon: '🇪🇺', text: 'Coração da Europa: Localização central estratégica' }
        ],
        belgica: [
          { icon: '🇪🇺', text: 'Capital da Europa: Bruxelas é sede da União Europeia' },
          { icon: '🗣️', text: 'Multilíngue: Francês, holandês, alemão oficiais' },
          { icon: '📍', text: 'Localização central: Paris, Amsterdam, Londres a 2h de trem' },
          { icon: '🍫', text: 'Qualidade de vida: Chocolate, cerveja, waffles e cultura' }
        ],
        novaZelandia: [
          { icon: '🏞️', text: 'Natureza incomparável: Paisagens de tirar o fôlego' },
          { icon: '⚖️', text: 'Work-life balance: Cultura de equilíbrio trabalho-vida' },
          { icon: '🛡️', text: 'Extremamente seguro: Um dos países mais pacíficos' },
          { icon: '🗣️', text: 'Inglês: País anglófono com sotaque único' }
        ],
        japao: [
          { icon: '🚄', text: 'Tecnologia avançada: Infraestrutura de primeiro mundo' },
          { icon: '🛡️', text: 'Extremamente seguro: Criminalidade quase zero' },
          { icon: '🍣', text: 'Cultura única: Tradição e modernidade combinadas' },
          { icon: '🏥', text: 'Sistema de saúde: Eficiente e acessível' }
        ]
      };
      return reasons[countryKey] || [
        { icon: '🌍', text: 'Destino com boas oportunidades para seu perfil' },
        { icon: '📋', text: 'Processo migratório estruturado e viável' },
        { icon: '💼', text: 'Mercado de trabalho receptivo à sua área' }
      ];
    };

    // Gerar informações de cidades
    const getCityInfo = (countryKey) => {
      const cities = {
        portugal: [
          {
            nome: 'Lisboa',
            desc: 'Capital e principal hub de tecnologia do país. Concentra a maioria das empresas certificadas para Tech Visa e oferece maior variedade de oportunidades profissionais.',
            pros: ['Maior mercado de trabalho tech', 'Infraestrutura completa', 'Aeroporto internacional', 'Escolas internacionais', 'Clima ameno o ano todo'],
            contras: ['Custo de moradia elevado', 'Trânsito intenso', 'Turismo excessivo no centro', 'Competição por imóveis'],
            custoVida: '€4.500 - €6.000/mês',
            bairros: ['Parque das Nações (moderno, familiar)', 'Cascais (subúrbio premium)', 'Oeiras (tech hub)', 'Almada (custo menor)']
          },
          {
            nome: 'Porto',
            desc: 'Segunda maior cidade, com ecossistema tech crescente e custo de vida mais acessível. Excelente opção para quem prioriza qualidade de vida.',
            pros: ['Custo de vida 20-30% menor', 'Hub tech em crescimento', 'Cidade mais compacta', 'Proximidade com natureza'],
            contras: ['Menos oportunidades que Lisboa', 'Inverno mais frio e chuvoso', 'Menos voos internacionais'],
            custoVida: '€3.500 - €4.500/mês',
            bairros: ['Foz do Douro (premium)', 'Matosinhos (praias)', 'Boavista (central)']
          }
        ],
        alemanha: [
          {
            nome: 'Berlim',
            desc: 'Capital e principal centro de tecnologia do país, com ecossistema vibrante de startups e ambiente internacional.',
            pros: ['Maior hub tech da Europa', 'Custo de vida razoável para capital', 'Ambiente internacional', 'Inglês amplamente falado em tech', 'Cultura vibrante'],
            contras: ['Burocracia alemã complexa', 'Inverno rigoroso', 'Alemão necessário longo prazo', 'Integração social pode ser lenta'],
            custoVida: '€4.000 - €5.500/mês',
            bairros: ['Prenzlauer Berg (famílias)', 'Mitte (central)', 'Kreuzberg (jovem/descolado)', 'Charlottenburg (tradicional)']
          },
          {
            nome: 'Munique',
            desc: 'Centro econômico da Alemanha, sede de grandes empresas como BMW, Siemens e Allianz. Salários mais altos, mas custo de vida também.',
            pros: ['Salários mais altos', 'Proximidade com Alpes', 'Alta qualidade de vida', 'Mais tradicional e organizada'],
            contras: ['Custo de moradia muito alto', 'Menos startups que Berlim', 'Mais conservadora'],
            custoVida: '€5.000 - €7.000/mês',
            bairros: ['Schwabing (central)', 'Maxvorstadt (universitário)', 'Sendling (mais acessível)']
          }
        ],
        eua: [
          {
            nome: 'Austin, TX',
            desc: 'Hub tech em crescimento acelerado, atraindo gigantes como Tesla, Apple e Oracle. Oferece qualidade de vida superior com custo menor que outras cidades tech.',
            pros: ['Hub tech em crescimento acelerado', 'Sem imposto de renda estadual', 'Custo de vida menor que Bay Area', 'Clima quente (familiar para brasileiros)', 'Cena cultural vibrante'],
            contras: ['Processo longo (18-24 meses)', 'Sistema de saúde complexo', 'Dependência de carro', 'Verão muito quente'],
            custoVida: '$7.000 - $10.000/mês',
            bairros: ['Downtown (central)', 'South Congress (descolado)', 'Mueller (famílias)', 'Round Rock (subúrbio)']
          },
          {
            nome: 'Miami, FL',
            desc: 'Porta de entrada para brasileiros nos EUA, com forte comunidade latina e proximidade cultural. Hub financeiro e tech em crescimento.',
            pros: ['Grande comunidade brasileira', 'Clima tropical', 'Sem imposto de renda estadual', 'Proximidade com Brasil'],
            contras: ['Custo de moradia alto', 'Furacões', 'Trânsito intenso'],
            custoVida: '$6.000 - $9.000/mês',
            bairros: ['Brickell (financeiro)', 'Coral Gables (famílias)', 'Coconut Grove (verde)', 'Doral (brasileiro)']
          }
        ],
        canada: [
          {
            nome: 'Toronto',
            desc: 'Maior cidade do Canadá e principal hub de tecnologia. Mercado diversificado com muitas oportunidades em tech.',
            pros: ['Maior mercado de trabalho', 'Muito multicultural', 'Infraestrutura completa', 'Aeroporto hub internacional'],
            contras: ['Custo de moradia alto', 'Inverno rigoroso', 'Trânsito intenso'],
            custoVida: 'CAD $5.500 - $7.500/mês',
            bairros: ['North York (famílias)', 'Mississauga (subúrbio)', 'Downtown (central)', 'Scarborough (mais acessível)']
          },
          {
            nome: 'Vancouver',
            desc: 'Cidade com melhor clima do Canadá, rodeada por natureza espetacular. Hub tech em crescimento.',
            pros: ['Clima mais ameno', 'Natureza espetacular', 'Qualidade de vida', 'Proximidade com EUA'],
            contras: ['Custo de vida muito alto', 'Chuva frequente', 'Mercado menor que Toronto'],
            custoVida: 'CAD $5.000 - $7.000/mês',
            bairros: ['Burnaby (famílias)', 'Richmond (asiático)', 'North Vancouver (natureza)']
          }
        ],
        holanda: [
          {
            nome: 'Amsterdam',
            desc: 'Capital com ecossistema tech vibrante. Sede de muitas multinacionais e startups. Inglês falado por quase todos.',
            pros: ['Hub de multinacionais', '93% falam inglês', 'Infraestrutura de bicicleta', 'Cultura liberal e acolhedora'],
            contras: ['Custo de moradia muito alto', 'Clima chuvoso', 'Difícil encontrar moradia'],
            custoVida: '€4.500 - €6.500/mês',
            bairros: ['Amstelveen (famílias)', 'Oost (jovens profissionais)', 'Zuid (premium)']
          }
        ],
        espanha: [
          {
            nome: 'Barcelona',
            desc: 'Hub tech em crescimento, com qualidade de vida excepcional. Praia, cultura e clima mediterrâneo.',
            pros: ['Praia e clima excelente', 'Cena tech em crescimento', 'Qualidade de vida', 'Custo menor que outras capitais europeias'],
            contras: ['Questão política da Catalunha', 'Turismo excessivo', 'Salários menores que norte da Europa'],
            custoVida: '€3.500 - €5.000/mês',
            bairros: ['Gràcia (descolado)', 'Eixample (central)', 'Poblenou (tech hub)', 'Sant Cugat (famílias)']
          },
          {
            nome: 'Madrid',
            desc: 'Capital com maior mercado de trabalho. Centro financeiro e de negócios da Espanha.',
            pros: ['Maior mercado de trabalho', 'Centro do país', 'Mais oportunidades corporativas'],
            contras: ['Sem praia', 'Verão muito quente', 'Inverno mais frio'],
            custoVida: '€3.000 - €4.500/mês',
            bairros: ['Chamberí (central)', 'Salamanca (premium)', 'Pozuelo (famílias)']
          }
        ],
        uk: [
          {
            nome: 'Londres',
            desc: 'Centro financeiro global e hub tech de primeira linha. Maior mercado para profissionais qualificados.',
            pros: ['Maior hub financeiro global', 'Diversidade cultural', 'Oportunidades incomparáveis', 'Inglês nativo'],
            contras: ['Custo de vida muito alto', 'Clima cinzento', 'Brexit complicou imigração'],
            custoVida: '£5.000 - £8.000/mês',
            bairros: ['Richmond (famílias)', 'Shoreditch (tech)', 'Canary Wharf (financeiro)', 'Wimbledon (subúrbio verde)']
          }
        ],
        australia: [
          {
            nome: 'Sydney',
            desc: 'Maior cidade da Austrália, com mercado de trabalho diversificado e praias famosas.',
            pros: ['Maior mercado de trabalho', 'Praias incríveis', 'Clima excelente', 'Infraestrutura de primeiro mundo'],
            contras: ['Custo de moradia muito alto', 'Distância do Brasil', 'Fuso horário difícil'],
            custoVida: 'AUD $6.000 - $9.000/mês',
            bairros: ['North Sydney (profissionais)', 'Manly (praia)', 'Parramatta (mais acessível)']
          },
          {
            nome: 'Melbourne',
            desc: 'Considerada a cidade mais habitável do mundo várias vezes. Centro cultural e artístico.',
            pros: ['Alta qualidade de vida', 'Cena cultural vibrante', 'Mais acessível que Sydney', 'Muito multicultural'],
            contras: ['Clima mais instável', 'Mercado menor que Sydney'],
            custoVida: 'AUD $5.000 - $7.500/mês',
            bairros: ['South Yarra (jovens profissionais)', 'St Kilda (praia)', 'Brunswick (descolado)']
          }
        ],
        irlanda: [
          {
            nome: 'Dublin',
            desc: 'Sede europeia de Google, Meta, Apple, Microsoft e muitas outras. Principal hub tech anglófono da UE.',
            pros: ['Sedes de gigantes tech', 'Inglês nativo', 'Acesso à UE', 'Cultura acolhedora'],
            contras: ['Custo de moradia altíssimo', 'Clima chuvoso', 'Crise de habitação'],
            custoVida: '€4.500 - €6.500/mês',
            bairros: ['Blackrock (famílias)', 'Dún Laoghaire (costeiro)', 'Rathmines (central)']
          }
        ]
      };
      return cities[countryKey] || [];
    };

    // Identificar pontos fortes detalhados
    const getPontosFortes = () => {
      const pontos = [];
      
      if (formData.areaAtuacao === 'tech') {
        pontos.push('Profissão em alta demanda global: Tecnologia é uma das áreas mais procuradas em todos os países desenvolvidos');
      }
      if (formData.areaAtuacao === 'saude') {
        pontos.push('Área de saúde: Profissionais de saúde são valorizados globalmente, especialmente pós-pandemia');
      }
      if (['9-12', '13-15', '16-20', '20+'].includes(formData.anosExperiencia)) {
        pontos.push('Experiência sólida: ' + (formData.anosExperiencia === '20+' ? '20+' : formData.anosExperiencia) + ' anos de experiência profissional demonstram competência e estabilidade');
      }
      if (['gerente', 'diretor', 'cLevel'].includes(formData.nivelCargo)) {
        pontos.push('Posição de liderança: ' + (formData.nivelCargo === 'cLevel' ? 'C-Level' : formData.nivelCargo === 'diretor' ? 'Diretor' : 'Gerente') + ' com gestão de equipes, demonstrando soft skills valorizadas');
      }
      if (['fluente', 'nativo'].includes(formData.nivelIngles)) {
        pontos.push('Inglês fluente: Elimina barreiras em países anglófonos e facilita adaptação em qualquer destino');
      }
      if (['fluente', 'nativo'].includes(formData.nivelEspanhol)) {
        pontos.push('Espanhol fluente: Vantagem significativa para Espanha e países da América Latina');
      }
      if (['fluente', 'nativo'].includes(formData.nivelAlemao)) {
        pontos.push('Alemão fluente: Diferencial enorme para Alemanha, Áustria e Suíça');
      }
      if (formData.estadoCivil === 'casado' && formData.numeroFilhos && formData.numeroFilhos !== '0') {
        pontos.push('Estabilidade familiar: Casado(a) com filhos — perfil valorizado por programas de imigração');
      }
      if (['mestrado', 'doutorado', 'posDoutorado'].includes(formData.nivelFormacao)) {
        pontos.push('Formação avançada: ' + (formData.nivelFormacao === 'posDoutorado' ? 'Pós-doutorado' : formData.nivelFormacao === 'doutorado' ? 'Doutorado' : 'Mestrado') + ' é diferencial para vistos qualificados');
      }
      if (formData.possuiPremios === 'sim') {
        pontos.push('Prêmios e reconhecimentos: Evidências de destaque profissional fortalecem petições');
      }
      if (formData.possuiPublicacoes === 'sim') {
        pontos.push('Publicações: Artigos e papers demonstram contribuição ao campo de atuação');
      }
      if (formData.possuiPatentes === 'sim') {
        pontos.push('Patentes: Inovação comprovada é forte evidência para vistos como O-1A e EB-1A');
      }
      if (['alto', 'muitoAlto'].includes(formData.capacidadeInvestimento)) {
        pontos.push('Capacidade financeira: Recursos disponíveis permitem transição confortável e acesso a Golden Visas');
      }
      if (formData.possuiDuplaCidadania === 'europeia') {
        pontos.push('Cidadania europeia: Acesso livre a todo Espaço Schengen sem necessidade de visto');
      }
      if (formData.possuiEmpresa === 'ativa' || formData.possuiEmpresa === 'socia') {
        pontos.push('Experiência empresarial: Empreendedorismo é valorizado em vistos de startup e investidor');
      }
      
      return pontos.length > 0 ? pontos : ['Perfil com potencial para imigração qualificada'];
    };

    // Identificar pontos de atenção
    const getPontosAtencao = () => {
      const pontos = [];
      
      if (formData.situacaoConjuge && !['naoPossui', 'solteiro'].includes(formData.estadoCivil)) {
        pontos.push('Cônjuge precisará de estratégia própria: Dependendo da profissão, pode requerer revalidação de diploma ou visto de trabalho específico');
      }
      if (formData.faixaEtariaFilhos?.includes('medio') || formData.faixaEtariaFilhos?.includes('adolescente')) {
        pontos.push('Filhos em idade escolar/adolescente: Necessidade de adaptação a novo sistema educacional e possível resistência à mudança');
      }
      if (!formData.possuiDuplaCidadania || formData.possuiDuplaCidadania === 'nao') {
        pontos.push('Sem cidadania estrangeira: Elimina via de cidadania por descendência e livre acesso a blocos econômicos');
      }
      if (['nenhum', 'basico'].includes(formData.nivelIngles)) {
        pontos.push('Inglês limitado: Pode restringir opções em países anglófonos e dificultar adaptação inicial');
      }
      if (formData.prazoIdeal === 'imediato') {
        pontos.push('Timeline muito curto: A maioria dos processos leva meses; expectativa de imediato pode não ser realista');
      }
      if (formData.flexibilidadeConjuge === 'resistente') {
        pontos.push('Resistência do cônjuge: Alinhamento familiar é crucial para sucesso da imigração');
      }
      if (['medio', 'tecnico'].includes(formData.nivelFormacao)) {
        pontos.push('Formação acadêmica básica: Alguns vistos exigem diploma superior; pode limitar opções');
      }
      
      return pontos;
    };

    // Identificar oportunidades
    const getOportunidades = () => {
      const oportunidades = [];
      
      if (formData.areaAtuacao === 'tech') {
        oportunidades.push('Tech Visa Portugal: Processo simplificado para profissionais de tecnologia contratados por empresas certificadas');
        oportunidades.push('EU Blue Card: Caminho rápido para residência em países como Alemanha e Holanda');
      }
      if (['gerente', 'diretor', 'cLevel'].includes(formData.nivelCargo) && formData.areaAtuacao === 'tech') {
        oportunidades.push('EB-2 NIW: Perfil forte para argumentar interesse nacional dos EUA em retenção de talentos');
      }
      if (formData.trabalhoRemoto === 'sim' || formData.trabalhoRemoto === 'hibrido') {
        oportunidades.push('Trabalho remoto: Possibilidade de manter emprego atual inicialmente através de Digital Nomad Visas');
      }
      if (['fluente', 'nativo'].includes(formData.nivelIngles)) {
        oportunidades.push('Países anglófonos: Canadá, Irlanda, Austrália e Nova Zelândia têm processos estruturados para profissionais qualificados');
      }
      if (formData.possuiDuplaCidadania === 'europeia') {
        oportunidades.push('Livre circulação na UE: Pode trabalhar e residir em qualquer país do Espaço Schengen imediatamente');
      }
      if (['alto', 'muitoAlto'].includes(formData.capacidadeInvestimento)) {
        oportunidades.push('Golden Visa: Portugal, Espanha e outros oferecem residência por investimento');
      }
      if (formData.possuiEmpresa === 'ativa') {
        oportunidades.push('Vistos de empreendedor: Holanda, UK, Canadá e Chile têm programas para fundadores de startup');
      }
      oportunidades.push('Cidadania portuguesa/espanhola: Após residência legal, acesso a toda União Europeia');
      
      return oportunidades;
    };

    // Identificar limitações
    const getLimitacoes = () => {
      const limitacoes = [];
      
      limitacoes.push('Loteria H-1B: Rota tradicional para EUA tem baixa probabilidade (25-30% por tentativa)');
      
      if (formData.situacaoConjuge && formData.areaConjuge === 'saude') {
        limitacoes.push('Revalidação de diploma na saúde: Processo longo que pode atrasar inserção profissional do cônjuge');
      }
      
      const paisesCaros = ['portugal', 'holanda', 'irlanda', 'uk', 'suica'];
      if (topCountries.some(c => paisesCaros.includes(c.key))) {
        limitacoes.push('Custo de vida europeu: Algumas capitais como Lisboa, Dublin e Amsterdam têm custo de moradia elevado');
      }
      
      if (formData.numeroFilhos && formData.numeroFilhos !== '0') {
        limitacoes.push('Adaptação dos filhos: Transição escolar e social requer planejamento cuidadoso');
      }
      
      if (!['fluente', 'nativo'].includes(formData.nivelIngles)) {
        limitacoes.push('Barreira linguística: Integração profissional e social pode ser mais lenta sem fluência no idioma local');
      }
      
      return limitacoes;
    };

    // Gerar roadmap por tipo de rota
    const getRoadmap = (countryKey, routeType) => {
      const roadmaps = {
        techVisa: {
          title: 'Portugal via Tech Visa',
          fases: [
            {
              nome: 'Fase 1: Preparação',
              periodo: 'Mês 1-3',
              tarefas: [
                'Atualizar currículo para padrão europeu (Europass)',
                'Criar perfil no LinkedIn em inglês otimizado para Portugal',
                'Pesquisar empresas certificadas para Tech Visa',
                'Iniciar aplicações para vagas em Lisboa e Porto',
                'Reunir documentação básica (certidões, diplomas)',
                'Apostilar documentos brasileiros'
              ]
            },
            {
              nome: 'Fase 2: Contratação',
              periodo: 'Mês 3-5',
              tarefas: [
                'Realizar entrevistas remotas com empresas portuguesas',
                'Negociar proposta e aceitar oferta',
                'Empresa inicia processo de Tech Visa junto ao IAPMEI',
                'Obter termo de responsabilidade da empresa'
              ]
            },
            {
              nome: 'Fase 3: Visto e Mudança',
              periodo: 'Mês 5-8',
              tarefas: [
                'Agendar e comparecer ao consulado português',
                'Obter visto de residência para trabalho',
                'Pesquisar e reservar moradia temporária',
                'Matricular filhos em escola (pública ou internacional)',
                'Realizar mudança internacional',
                'Chegar a Portugal e iniciar trabalho'
              ]
            },
            {
              nome: 'Fase 4: Estabelecimento',
              periodo: 'Mês 8-12',
              tarefas: [
                'Obter NIF (número fiscal) e NISS (segurança social)',
                'Abrir conta bancária portuguesa',
                'Registrar no Centro de Saúde (SNS)',
                'Agendar SEF para autorização de residência',
                'Encontrar moradia definitiva',
                'Iniciar integração social e profissional'
              ]
            }
          ]
        },
        blueCard: {
          title: 'EU Blue Card (Alemanha)',
          fases: [
            {
              nome: 'Fase 1: Preparação',
              periodo: 'Mês 1-2',
              tarefas: [
                'Verificar reconhecimento do diploma (ANABIN)',
                'Atualizar currículo para padrão alemão',
                'Criar perfil em plataformas alemãs (StepStone, XING)',
                'Iniciar aplicações para vagas',
                'Reunir documentação'
              ]
            },
            {
              nome: 'Fase 2: Contratação',
              periodo: 'Mês 2-4',
              tarefas: [
                'Realizar entrevistas',
                'Aceitar proposta (mínimo €45.300/ano)',
                'Obter contrato de trabalho formal',
                'Empresa pode iniciar pré-aprovação'
              ]
            },
            {
              nome: 'Fase 3: Visto',
              periodo: 'Mês 4-6',
              tarefas: [
                'Agendar consulado alemão',
                'Submeter aplicação de Blue Card',
                'Aguardar processamento (1-3 meses)',
                'Obter visto no passaporte'
              ]
            },
            {
              nome: 'Fase 4: Estabelecimento',
              periodo: 'Mês 6-9',
              tarefas: [
                'Chegar na Alemanha',
                'Registrar residência (Anmeldung)',
                'Converter para Blue Card definitivo',
                'Abrir conta bancária',
                'Registrar para seguro saúde'
              ]
            }
          ]
        },
        eb2niw: {
          title: 'EB-2 NIW (Green Card EUA)',
          fases: [
            {
              nome: 'Fase 1: Construção do Case',
              periodo: 'Mês 1-4',
              tarefas: [
                'Reunir evidências de realizações profissionais',
                'Documentar impacto nacional/internacional do trabalho',
                'Coletar 5-8 cartas de recomendação',
                'Preparar declaração pessoal detalhada',
                'Compilar publicações, citações, prêmios',
                'Contratar advogado especializado'
              ]
            },
            {
              nome: 'Fase 2: Preparação da Petição',
              periodo: 'Mês 4-6',
              tarefas: [
                'Elaborar petição I-140 detalhada',
                'Organizar exhibits de evidências',
                'Construir argumentação dos 3 critérios NIW',
                'Revisar com advogado especializado'
              ]
            },
            {
              nome: 'Fase 3: Submissão',
              periodo: 'Mês 6-8',
              tarefas: [
                'Submeter petição I-140 ao USCIS',
                'Pagar taxas ($700+)',
                'Optar por premium processing se disponível ($2.500)',
                'Aguardar receipt notice'
              ]
            },
            {
              nome: 'Fase 4: Processamento',
              periodo: 'Mês 8-24',
              tarefas: [
                'Acompanhar status do caso',
                'Responder RFE se necessário',
                'Aguardar aprovação I-140',
                'Iniciar I-485 ou processo consular',
                'Exame médico e entrevista',
                'Receber Green Card'
              ]
            }
          ]
        },
        expressEntry: {
          title: 'Express Entry (Canadá)',
          fases: [
            {
              nome: 'Fase 1: Preparação',
              periodo: 'Mês 1-3',
              tarefas: [
                'Fazer teste de idioma IELTS ou CELPIP',
                'Obter ECA (Educational Credential Assessment)',
                'Calcular pontuação CRS estimada',
                'Identificar gaps e possíveis melhorias de pontos'
              ]
            },
            {
              nome: 'Fase 2: Entrada no Pool',
              periodo: 'Mês 3-4',
              tarefas: [
                'Criar perfil no Express Entry',
                'Submeter Expression of Interest',
                'Monitorar rodadas de draw',
                'Buscar Provincial Nomination se pontos baixos'
              ]
            },
            {
              nome: 'Fase 3: ITA e Aplicação',
              periodo: 'Mês 4-6',
              tarefas: [
                'Receber ITA (Invitation to Apply)',
                'Submeter aplicação completa em 60 dias',
                'Pagar taxas',
                'Fornecer biometria',
                'Exame médico'
              ]
            },
            {
              nome: 'Fase 4: Aprovação',
              periodo: 'Mês 6-12',
              tarefas: [
                'Aguardar processamento',
                'Background check',
                'Receber COPR (Confirmation of PR)',
                'Planejar mudança',
                'Landing no Canadá'
              ]
            }
          ]
        }
      };
      
      // Mapear rotas para roadmaps
      const routeMap = {
        techVisa: 'techVisa', d7: 'techVisa', d8: 'techVisa',
        blueCard: 'blueCard', blueCardAT: 'blueCard', blueCardBE: 'blueCard',
        eb2Niw: 'eb2niw', eb1a: 'eb2niw', o1a: 'eb2niw',
        expressEntry: 'expressEntry', pnp: 'expressEntry',
        skilledWorker: 'blueCard', criticalSkills: 'blueCard',
        kennismigrant: 'blueCard'
      };
      
      const key = routeMap[routeType] || 'techVisa';
      return roadmaps[key] || roadmaps.techVisa;
    };

    // ===== CSS DO PDF =====
    const pdfStyles = `
      @page { size: A4; margin: 0; }
      @media print { 
        .page-break { page-break-before: always; } 
        .no-break { page-break-inside: avoid; }
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: 'Segoe UI', -apple-system, Arial, sans-serif; 
        color: #1f2937; 
        line-height: 1.6;
        font-size: 10pt;
      }
      
      /* CAPA */
      .cover {
        height: 100vh;
        background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: white;
        padding: 50px;
        position: relative;
      }
      .cover-logo { font-size: 42pt; font-weight: 800; background: linear-gradient(135deg, #60a5fa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      .cover-tagline { font-size: 14pt; color: #94a3b8; margin-bottom: 50px; }
      .cover-box { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 30px 50px; margin: 20px 0; }
      .cover-label { font-size: 10pt; color: #94a3b8; margin-bottom: 10px; }
      .cover-client { font-size: 24pt; font-weight: 600; }
      .cover-family { font-size: 12pt; color: #94a3b8; margin-top: 5px; }
      .cover-date { font-size: 11pt; color: #64748b; margin-top: 40px; }
      .cover-tier { font-size: 10pt; color: #60a5fa; margin-top: 10px; }
      .cover-footer { position: absolute; bottom: 30px; color: #475569; font-size: 9pt; }
      
      /* PÁGINAS */
      .page { padding: 40px 50px; min-height: 100vh; background: white; }
      .header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 15px; border-bottom: 2px solid #e5e7eb; margin-bottom: 25px; }
      .header-logo { font-size: 14pt; font-weight: 700; color: #2563eb; }
      .header-info { text-align: right; font-size: 8pt; color: #6b7280; }
      
      /* SEÇÕES */
      .section { margin-bottom: 25px; }
      .section-title { font-size: 14pt; font-weight: 700; color: #1e40af; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6; }
      .section-subtitle { font-size: 10pt; color: #64748b; margin-top: -10px; margin-bottom: 15px; }
      
      /* SUMÁRIO EXECUTIVO */
      .exec-box { background: linear-gradient(135deg, #eff6ff, #dbeafe); border-radius: 12px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #2563eb; }
      .exec-text { font-size: 10pt; color: #374151; line-height: 1.7; }
      
      /* TABELAS DE PERFIL */
      .profile-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 15px; }
      .profile-table td { padding: 8px 12px; border-bottom: 1px solid #e5e7eb; }
      .profile-table td:first-child { font-weight: 600; color: #374151; width: 35%; background: #f8fafc; }
      .profile-table td:last-child { color: #1f2937; }
      
      /* BOX RECOMENDAÇÃO */
      .rec-box { background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; border-radius: 12px; padding: 20px; margin: 20px 0; }
      .rec-title { font-size: 12pt; font-weight: 600; margin-bottom: 10px; }
      .rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
      .rec-item { text-align: center; }
      .rec-label { font-size: 8pt; opacity: 0.8; margin-bottom: 3px; }
      .rec-value { font-size: 11pt; font-weight: 600; }
      
      /* ALTERNATIVAS */
      .alt-table { width: 100%; border-collapse: collapse; font-size: 9pt; border-radius: 8px; overflow: hidden; }
      .alt-table th { background: #1e3a5f; color: white; padding: 10px; text-align: left; }
      .alt-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
      .alt-table tr:nth-child(even) { background: #f8fafc; }
      .rank-badge { display: inline-block; background: #2563eb; color: white; padding: 2px 8px; border-radius: 10px; font-size: 8pt; font-weight: 600; }
      .rank-badge.gold { background: #f59e0b; }
      
      /* ANÁLISE DE PERFIL */
      .analysis-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
      .analysis-box { border-radius: 10px; padding: 15px; }
      .analysis-box.strong { background: linear-gradient(135deg, #f0fdf4, #dcfce7); border: 1px solid #86efac; }
      .analysis-box.attention { background: linear-gradient(135deg, #fefce8, #fef3c7); border: 1px solid #fde047; }
      .analysis-box.opportunity { background: linear-gradient(135deg, #eff6ff, #dbeafe); border: 1px solid #93c5fd; }
      .analysis-box.limitation { background: linear-gradient(135deg, #fef2f2, #fee2e2); border: 1px solid #fca5a5; }
      .analysis-title { font-size: 10pt; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
      .analysis-box.strong .analysis-title { color: #166534; }
      .analysis-box.attention .analysis-title { color: #a16207; }
      .analysis-box.opportunity .analysis-title { color: #1e40af; }
      .analysis-box.limitation .analysis-title { color: #991b1b; }
      .analysis-list { list-style: none; font-size: 9pt; }
      .analysis-item { padding: 5px 0; padding-left: 15px; position: relative; line-height: 1.5; }
      .analysis-item::before { content: '•'; position: absolute; left: 0; }
      
      /* PAÍS RECOMENDADO */
      .country-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
      .country-name { font-size: 18pt; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 10px; }
      .country-flag { font-size: 30pt; }
      .country-score { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 10px 20px; border-radius: 10px; text-align: center; }
      .country-score-value { font-size: 20pt; font-weight: 800; }
      .country-score-label { font-size: 8pt; opacity: 0.9; }
      
      .why-box { background: #f8fafc; border-radius: 10px; padding: 15px; margin-bottom: 20px; }
      .why-title { font-size: 11pt; font-weight: 600; color: #1e40af; margin-bottom: 12px; }
      .why-intro { font-size: 10pt; color: #374151; margin-bottom: 15px; line-height: 1.6; }
      .why-list { list-style: none; }
      .why-item { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 9pt; }
      .why-icon { font-size: 14pt; }
      
      /* CIDADES */
      .city-card { background: white; border: 1px solid #e5e7eb; border-radius: 10px; padding: 15px; margin-bottom: 15px; }
      .city-name { font-size: 12pt; font-weight: 700; color: #1e293b; margin-bottom: 5px; }
      .city-desc { font-size: 9pt; color: #64748b; margin-bottom: 12px; line-height: 1.5; }
      .city-proscons { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px; }
      .city-pros, .city-cons { font-size: 8pt; padding: 10px; border-radius: 6px; }
      .city-pros { background: #f0fdf4; }
      .city-cons { background: #fef2f2; }
      .city-pros-title { color: #166534; font-weight: 600; margin-bottom: 5px; }
      .city-cons-title { color: #991b1b; font-weight: 600; margin-bottom: 5px; }
      .city-list { list-style: none; }
      .city-list li { padding: 2px 0; }
      .city-meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; font-size: 9pt; }
      .city-meta-item { background: #f8fafc; padding: 8px 10px; border-radius: 6px; }
      .city-meta-label { font-size: 8pt; color: #64748b; }
      .city-meta-value { font-weight: 600; color: #1e293b; }
      
      /* ROTAS */
      .route-card { border: 1px solid #e5e7eb; border-radius: 10px; overflow: hidden; margin-bottom: 15px; }
      .route-card.recommended { border: 2px solid #22c55e; }
      .route-header { padding: 12px 15px; background: #f8fafc; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
      .route-card.recommended .route-header { background: linear-gradient(135deg, #f0fdf4, #dcfce7); }
      .route-name { font-size: 11pt; font-weight: 700; color: #1e293b; }
      .route-badge { font-size: 8pt; padding: 3px 10px; border-radius: 10px; font-weight: 600; }
      .route-card.recommended .route-badge { background: #22c55e; color: white; }
      .route-card:not(.recommended) .route-badge { background: #e5e7eb; color: #64748b; }
      .route-body { padding: 15px; }
      .route-desc { font-size: 9pt; color: #4b5563; margin-bottom: 15px; line-height: 1.6; }
      
      .route-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 15px; }
      .route-table td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; }
      .route-table td:first-child { font-weight: 600; color: #374151; width: 40%; background: #f8fafc; }
      
      .route-viability { margin-top: 12px; padding: 10px; border-radius: 8px; font-size: 9pt; }
      .route-viability.high { background: #f0fdf4; border: 1px solid #86efac; }
      .route-viability.medium { background: #fefce8; border: 1px solid #fde047; }
      .route-viability.low { background: #fef2f2; border: 1px solid #fca5a5; }
      .route-viability-title { font-weight: 600; margin-bottom: 5px; }
      .route-viability.high .route-viability-title { color: #166534; }
      .route-viability.medium .route-viability-title { color: #a16207; }
      .route-viability.low .route-viability-title { color: #991b1b; }
      
      /* COMPARATIVO */
      .compare-table { width: 100%; border-collapse: collapse; font-size: 8pt; border-radius: 10px; overflow: hidden; }
      .compare-table th { background: #1e3a5f; color: white; padding: 10px 8px; text-align: center; }
      .compare-table th:first-child { text-align: left; }
      .compare-table td { padding: 8px; text-align: center; border-bottom: 1px solid #e5e7eb; }
      .compare-table td:first-child { text-align: left; font-weight: 600; background: #f8fafc; }
      .compare-table tr:nth-child(even) { background: #fafafa; }
      .compare-highlight { background: #dcfce7 !important; font-weight: 600; }
      
      /* ROADMAP */
      .roadmap { margin-top: 15px; }
      .roadmap-title { font-size: 12pt; font-weight: 700; color: #1e40af; margin-bottom: 15px; }
      .roadmap-phase { display: flex; margin-bottom: 15px; }
      .roadmap-timeline { width: 80px; flex-shrink: 0; }
      .roadmap-period { font-size: 8pt; color: #64748b; font-weight: 600; }
      .roadmap-content { flex: 1; background: #f8fafc; border-radius: 8px; padding: 12px; border-left: 3px solid #3b82f6; }
      .roadmap-phase-title { font-size: 10pt; font-weight: 600; color: #1e293b; margin-bottom: 8px; }
      .roadmap-tasks { list-style: none; font-size: 9pt; }
      .roadmap-task { padding: 3px 0; padding-left: 20px; position: relative; }
      .roadmap-task::before { content: '☐'; position: absolute; left: 0; color: #64748b; }
      
      /* CTA */
      .cta-box { background: linear-gradient(135deg, #1e40af, #1e3a8a); color: white; border-radius: 12px; padding: 25px; text-align: center; margin: 25px 0; }
      .cta-title { font-size: 14pt; font-weight: 700; margin-bottom: 10px; }
      .cta-text { font-size: 10pt; opacity: 0.9; margin-bottom: 15px; }
      .cta-contact { font-size: 10pt; }
      
      /* FOOTER */
      .page-footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; font-size: 8pt; color: #9ca3af; }
      
      /* DESCONTO */
      .discount-box { background: linear-gradient(135deg, #fef3c7, #fde68a); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; text-align: center; margin: 20px 0; }
      .discount-label { font-size: 9pt; color: #a16207; margin-bottom: 5px; }
      .discount-value { font-size: 16pt; font-weight: 800; color: #92400e; }
    `;

    // ===== GERAR CONTEÚDO =====
    const pontosFortes = getPontosFortes();
    const pontosAtencao = getPontosAtencao();
    const oportunidades = getOportunidades();
    const limitacoes = getLimitacoes();
    const bestRoute = getBestRoutes(topCountries[0]?.key, scores)[0];
    const roadmap = getRoadmap(topCountries[0]?.key, bestRoute?.key);
    
    const pdfContent = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Relatório Geofitting - ${formData.nomeCompleto}</title>
  <style>${pdfStyles}</style>
</head>
<body>

<!-- CAPA -->
<div class="cover">
  <div class="cover-logo">GEOFITTING</div>
  <div class="cover-tagline">Seu Mapa Migratório Personalizado</div>
  
  <div class="cover-box">
    <div class="cover-label">Preparado exclusivamente para</div>
    <div class="cover-client">${formData.nomeCompleto?.toUpperCase() || 'CLIENTE'}</div>
    ${(formData.estadoCivil === 'casado' || (formData.numeroFilhos && formData.numeroFilhos !== '0')) ? '<div class="cover-family">e família</div>' : ''}
  </div>
  
  <div class="cover-date">${mesAno}</div>
  <div class="cover-tier">Geofitting Completo</div>
  
  <div class="cover-footer">UK Consultoria Migratória • Especialistas em Imigração Internacional</div>
</div>

<!-- PÁGINA 2: SUMÁRIO EXECUTIVO -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">SUMÁRIO EXECUTIVO</div>
    
    <div class="exec-box">
      <div class="exec-text">
        Este relatório apresenta uma análise completa do perfil migratório de <strong>${formData.nomeCompleto}</strong>${(formData.estadoCivil === 'casado' || (formData.numeroFilhos && formData.numeroFilhos !== '0')) ? ' e sua família' : ''}, identificando as melhores oportunidades de imigração legal considerando seus objetivos, qualificações e preferências.
      </div>
    </div>
    
    <div class="section-title" style="font-size: 11pt; border-bottom-width: 2px;">Perfil Resumido</div>
    <table class="profile-table">
      <tr><td>Cliente</td><td>${formData.nomeCompleto || 'Não informado'}${formData.faixaEtaria ? ', ' + formData.faixaEtaria.replace('-', ' a ') + ' anos' : ''}</td></tr>
      ${formData.estadoCivil === 'casado' && formData.situacaoConjuge ? `<tr><td>Cônjuge</td><td>${formData.areaConjuge || 'Profissão não informada'}</td></tr>` : ''}
      ${formData.numeroFilhos && formData.numeroFilhos !== '0' ? `<tr><td>Dependentes</td><td>${formData.numeroFilhos} filho(s)</td></tr>` : ''}
      <tr><td>Profissão</td><td>${formData.nivelCargo || ''} ${formData.areaAtuacao ? '• ' + formData.areaAtuacao : ''}</td></tr>
      <tr><td>Idiomas</td><td>Português (nativo)${formData.nivelIngles && formData.nivelIngles !== 'nenhum' ? ', Inglês (' + formData.nivelIngles + ')' : ''}${formData.nivelEspanhol && formData.nivelEspanhol !== 'nenhum' ? ', Espanhol (' + formData.nivelEspanhol + ')' : ''}${formData.nivelAlemao && formData.nivelAlemao !== 'nenhum' ? ', Alemão (' + formData.nivelAlemao + ')' : ''}</td></tr>
      <tr><td>Timeline Desejado</td><td>${formData.prazoIdeal || 'Não informado'}</td></tr>
      <tr><td>Objetivos</td><td>${formData.motivacaoPrincipal || 'Qualidade de vida e oportunidades'}</td></tr>
    </table>
    
    <div class="rec-box">
      <div class="rec-title">Recomendação Principal</div>
      <div class="rec-grid">
        <div class="rec-item">
          <div class="rec-label">DESTINO</div>
          <div class="rec-value">${topCountries[0]?.info?.bandeira || ''} ${topCountries[0]?.info?.nome || ''}</div>
        </div>
        <div class="rec-item">
          <div class="rec-label">ROTA</div>
          <div class="rec-value">${bestRoute?.nome || 'A definir'}</div>
        </div>
        <div class="rec-item">
          <div class="rec-label">TIMELINE</div>
          <div class="rec-value">${bestRoute?.timeline || 'Variável'}</div>
        </div>
      </div>
    </div>
    
    <div class="section-title" style="font-size: 11pt; border-bottom-width: 2px;">Alternativas Viáveis</div>
    <table class="alt-table">
      <thead>
        <tr>
          <th>Ranking</th>
          <th>País + Cidade</th>
          <th>Rota</th>
          <th>Timeline</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        ${topCountries.map((c, i) => {
          const route = getBestRoutes(c.key, scores)[0];
          const cities = getCityInfo(c.key);
          return `
            <tr>
              <td><span class="rank-badge ${i === 0 ? 'gold' : ''}">${i === 0 ? '1º (Principal)' : (i + 1) + 'º'}</span></td>
              <td>${c.info?.bandeira || ''} ${c.info?.nome || ''} — ${cities[0]?.nome || c.info?.capital || ''}</td>
              <td>${route?.nome || 'Várias opções'}</td>
              <td>${route?.timeline || 'Variável'}</td>
              <td><strong>${c.total}%</strong></td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória</div>
    <div>Página 2</div>
  </div>
</div>

<!-- PÁGINA 3: ANÁLISE DE PERFIL -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">ANÁLISE DE PERFIL</div>
    
    <div class="analysis-grid">
      <div class="analysis-box strong">
        <div class="analysis-title">✅ Pontos Fortes para Imigração</div>
        <ul class="analysis-list">
          ${pontosFortes.map(p => `<li class="analysis-item">${p}</li>`).join('')}
        </ul>
      </div>
      
      <div class="analysis-box attention">
        <div class="analysis-title">⚠️ Pontos de Atenção</div>
        <ul class="analysis-list">
          ${pontosAtencao.length > 0 ? pontosAtencao.map(p => `<li class="analysis-item">${p}</li>`).join('') : '<li class="analysis-item">Nenhum ponto crítico identificado</li>'}
        </ul>
      </div>
      
      <div class="analysis-box opportunity">
        <div class="analysis-title">🎯 Oportunidades Identificadas</div>
        <ul class="analysis-list">
          ${oportunidades.map(p => `<li class="analysis-item">${p}</li>`).join('')}
        </ul>
      </div>
      
      <div class="analysis-box limitation">
        <div class="analysis-title">⛔ Limitações a Considerar</div>
        <ul class="analysis-list">
          ${limitacoes.map(p => `<li class="analysis-item">${p}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória</div>
    <div>Página 3</div>
  </div>
</div>

<!-- PÁGINAS DE PAÍSES -->
${topCountries.map((country, countryIndex) => {
  const routes = getBestRoutes(country.key, scores);
  const whyReasons = getWhyCountry(country.key, country.info);
  const cities = getCityInfo(country.key);
  
  return `
<!-- PAÍS ${countryIndex + 1}: ${country.info?.nome?.toUpperCase() || ''} -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">RECOMENDAÇÃO #${countryIndex + 1}: ${country.info?.nome?.toUpperCase() || ''}</div>
    
    <div class="country-header">
      <div class="country-name">
        <span class="country-flag">${country.info?.bandeira || ''}</span>
        ${country.info?.nome || ''}
      </div>
      <div class="country-score">
        <div class="country-score-value">${country.total}/100</div>
        <div class="country-score-label">Score de Compatibilidade</div>
      </div>
    </div>
    
    <div class="why-box">
      <div class="why-title">Por que ${country.info?.nome || 'este país'} para você</div>
      <div class="why-intro">
        ${country.info?.nome || 'Este destino'} representa uma excelente combinação entre facilidade de processo migratório, qualidade de vida e oportunidades profissionais para o seu perfil.
      </div>
      <ul class="why-list">
        ${whyReasons.slice(0, 6).map(r => `
          <li class="why-item">
            <span class="why-icon">${r.icon}</span>
            <span>${r.text}</span>
          </li>
        `).join('')}
      </ul>
    </div>
    
    ${cities.length > 0 ? `
      <div class="section-title" style="font-size: 11pt; border-bottom-width: 2px;">Cidades Recomendadas</div>
      ${cities.slice(0, 2).map(city => `
        <div class="city-card no-break">
          <div class="city-name">${city.nome}</div>
          <div class="city-desc">${city.desc}</div>
          <div class="city-proscons">
            <div class="city-pros">
              <div class="city-pros-title">✓ Prós</div>
              <ul class="city-list">
                ${city.pros.slice(0, 4).map(p => `<li>• ${p}</li>`).join('')}
              </ul>
            </div>
            <div class="city-cons">
              <div class="city-cons-title">✗ Contras</div>
              <ul class="city-list">
                ${city.contras.slice(0, 4).map(c => `<li>• ${c}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="city-meta">
            <div class="city-meta-item">
              <div class="city-meta-label">Custo de Vida (família)</div>
              <div class="city-meta-value">${city.custoVida}</div>
            </div>
            <div class="city-meta-item">
              <div class="city-meta-label">Bairros Recomendados</div>
              <div class="city-meta-value">${city.bairros.slice(0, 3).join(', ')}</div>
            </div>
          </div>
        </div>
      `).join('')}
    ` : ''}
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória</div>
    <div>Página ${4 + countryIndex * 2}</div>
  </div>
</div>

<!-- ROTAS PARA ${country.info?.nome?.toUpperCase() || ''} -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">Rotas Migratórias para ${country.info?.bandeira || ''} ${country.info?.nome || ''}</div>
    
    ${routes.map((route, routeIndex) => `
      <div class="route-card ${routeIndex === 0 ? 'recommended' : ''} no-break">
        <div class="route-header">
          <div class="route-name">${route.nome || 'Rota'}</div>
          <div class="route-badge">${routeIndex === 0 ? '★ RECOMENDADA' : 'Alternativa'}</div>
        </div>
        <div class="route-body">
          <div class="route-desc">${route.descricao || 'Rota migratória disponível para seu perfil.'}</div>
          
          <table class="route-table">
            <tr><td>Tipo</td><td>${route.tipo || 'Trabalho/Residência'}</td></tr>
            ${route.requisitos ? `<tr><td>Requisitos</td><td>${route.requisitos.slice(0, 3).join('; ')}</td></tr>` : ''}
            <tr><td>Timeline</td><td>${route.timeline || 'Variável'}</td></tr>
            <tr><td>Custo Estimado</td><td>${route.custoEstimado || 'A orçar'}</td></tr>
            <tr><td>Validade Inicial</td><td>${route.validadeInicial || '1-2 anos, renovável'}</td></tr>
            <tr><td>Família</td><td>Cônjuge e filhos podem acompanhar</td></tr>
            <tr><td>Cidadania</td><td>Elegível após ${country.info?.tempoResidencia || '5 anos'}</td></tr>
          </table>
          
          <div class="route-viability ${routeIndex === 0 ? 'high' : routeIndex === 1 ? 'medium' : 'medium'}">
            <div class="route-viability-title">Viabilidade para ${formData.nomeCompleto?.split(' ')[0] || 'você'}: ${routeIndex === 0 ? 'ALTA' : 'MÉDIA'}</div>
            <div>${routeIndex === 0 ? 'Perfil se enquadra nos requisitos. Recomendamos iniciar preparação.' : 'Rota viável como alternativa. Avalie prós e contras.'}</div>
          </div>
        </div>
      </div>
    `).join('')}
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória</div>
    <div>Página ${5 + countryIndex * 2}</div>
  </div>
</div>
  `;
}).join('')}

<!-- COMPARATIVO GERAL -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">COMPARATIVO GERAL</div>
    
    <table class="compare-table">
      <thead>
        <tr>
          <th>Critério</th>
          ${topCountries.map(c => `<th>${c.info?.bandeira} ${c.info?.nome?.split(' ')[0] || ''}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Score Final</td>
          ${topCountries.map((c, i) => `<td class="${i === 0 ? 'compare-highlight' : ''}"><strong>${c.total}/100</strong></td>`).join('')}
        </tr>
        <tr>
          <td>Timeline</td>
          ${topCountries.map(c => `<td>${getBestRoutes(c.key, scores)[0]?.timeline || 'Variável'}</td>`).join('')}
        </tr>
        <tr>
          <td>Custo Processo</td>
          ${topCountries.map(c => `<td>${getBestRoutes(c.key, scores)[0]?.custoEstimado || 'Variável'}</td>`).join('')}
        </tr>
        <tr>
          <td>Custo de Vida</td>
          ${topCountries.map(c => `<td>${c.info?.custoVida || 'Médio'}</td>`).join('')}
        </tr>
        <tr>
          <td>Idioma</td>
          ${topCountries.map(c => `<td>${c.info?.idioma?.split('/')[0]?.split(' ')[0] || ''}</td>`).join('')}
        </tr>
        <tr>
          <td>Cidadania em</td>
          ${topCountries.map(c => `<td>${c.info?.tempoResidencia?.replace(' para cidadania', '') || '5 anos'}</td>`).join('')}
        </tr>
        <tr>
          <td>Segurança</td>
          ${topCountries.map(c => `<td>${c.info?.seguranca || 'Boa'}</td>`).join('')}
        </tr>
        <tr>
          <td>Clima</td>
          ${topCountries.map(c => `<td>${c.info?.clima?.split(' ')[0] || ''}</td>`).join('')}
        </tr>
        <tr>
          <td>Acesso à UE</td>
          ${topCountries.map(c => `<td>${['portugal', 'alemanha', 'espanha', 'holanda', 'franca', 'italia', 'irlanda', 'austria', 'belgica'].includes(c.key) ? 'Sim' : 'Não'}</td>`).join('')}
        </tr>
      </tbody>
    </table>
  </div>
  
  <div class="section">
    <div class="section-title">ROADMAP: ${topCountries[0]?.info?.nome?.toUpperCase() || ''}</div>
    
    <div class="roadmap">
      ${roadmap.fases.map(fase => `
        <div class="roadmap-phase no-break">
          <div class="roadmap-timeline">
            <div class="roadmap-period">${fase.periodo}</div>
          </div>
          <div class="roadmap-content">
            <div class="roadmap-phase-title">${fase.nome}</div>
            <ul class="roadmap-tasks">
              ${fase.tarefas.map(t => `<li class="roadmap-task">${t}</li>`).join('')}
            </ul>
          </div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória</div>
    <div>Página ${14 + topCountries.length * 2}</div>
  </div>
</div>

<!-- PRÓXIMOS PASSOS -->
<div class="page page-break">
  <div class="header">
    <div class="header-logo">🌍 GEOFITTING</div>
    <div class="header-info"><strong>${formData.nomeCompleto}</strong><br>${dataAtual}</div>
  </div>
  
  <div class="section">
    <div class="section-title">PRÓXIMOS PASSOS</div>
    
    <div class="why-box">
      <div class="why-title">O Que Fazer Agora</div>
      <ol style="margin-left: 20px; font-size: 10pt; line-height: 1.8;">
        <li><strong>Definir destino prioritário:</strong> Recomendamos ${topCountries[0]?.info?.nome || 'o primeiro colocado'} como primeira opção, mas a decisão final deve considerar as preferências pessoais da família.</li>
        <li><strong>Atualizar documentação:</strong> Reunir certidões, diplomas e documentos que precisarão ser apostilados.</li>
        <li><strong>Iniciar busca por emprego:</strong> Começar a aplicar para vagas em empresas no destino escolhido.</li>
        <li><strong>Planejar financeiramente:</strong> Reservar recursos para mudança internacional.</li>
        <li><strong>Conversar com a família:</strong> Alinhar expectativas com cônjuge e preparar os filhos para a mudança.</li>
      </ol>
    </div>
    
    <div class="why-box">
      <div class="why-title">Como a UK Pode Ajudar</div>
      <ul style="margin-left: 20px; font-size: 10pt; line-height: 1.8;">
        <li>Assessoria na preparação de documentos e apostilamento</li>
        <li>Suporte na busca e negociação com empresas</li>
        <li>Preparação e acompanhamento do processo de visto</li>
        <li>Orientação para cônjuge sobre revalidação de diploma</li>
        <li>Suporte na chegada e estabelecimento no destino</li>
        <li>Planejamento tributário para expatriados</li>
      </ul>
    </div>
    
    <div class="discount-box">
      <div class="discount-label">Benefício exclusivo Geofitting:</div>
      <div class="discount-value">R$ 1.800 de desconto</div>
      <div style="font-size: 9pt; color: #78350f; margin-top: 5px;">na contratação de qualquer serviço de execução</div>
    </div>
    
    <div class="cta-box">
      <div class="cta-title">📞 Agende sua Consulta</div>
      <div class="cta-text">
        Este relatório é um diagnóstico inicial. Para plano de ação detalhado<br>
        e acompanhamento profissional, fale com nossa equipe.
      </div>
      <div class="cta-contact">
        <strong>Email:</strong> contato@ukconsultoria.com.br<br>
        <strong>WhatsApp:</strong> +55 11 99999-9999
      </div>
    </div>
    
    <div style="text-align: center; margin-top: 30px; font-size: 10pt; color: #64748b; font-style: italic;">
      Obrigado pela confiança.<br>
      Estamos prontos para transformar seu sonho em realidade.
    </div>
  </div>
  
  <div class="page-footer">
    <div>UK Consultoria Migratória • www.ukconsultoria.com.br</div>
    <div>Documento confidencial • ${dataAtual}</div>
  </div>
</div>

</body>
</html>
    `;

    // Criar blob e abrir para impressão
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        setTimeout(() => { printWindow.print(); }, 500);
      };
    }
    
    setIsGeneratingPDF(false);
  };

  // Landing Page
  const renderLanding = () => (
    <>
      <Head>
        <title>Geofitting | Descubra Seu Destino Ideal | UK Consultoria Migratória</title>
        <meta name="description" content="Análise personalizada de rotas migratórias. Descubra qual país e visto são ideais para seu perfil em apenas 10 minutos." />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute top-60 -left-40 w-80 h-80 bg-cyan-500 rounded-full opacity-10 blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
            {/* Logo */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-blue-400 text-sm font-medium">UK Consultoria Migratória</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  GEOFITTING
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 mb-2">
                Seu Mapa Migratório Personalizado
              </p>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Descubra qual país, cidade e rota migratória são ideais para você e sua família
              </p>
            </div>

            {/* Main CTA Card */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Análise Completa em 10 Minutos
                  </h2>
                  <p className="text-gray-300">
                    Responda nosso questionário e receba um relatório detalhado com os melhores destinos e rotas para seu perfil
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                      <MapPin className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">22 Países</p>
                      <p className="text-gray-400 text-xs">Analisados</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3">
                      <Plane className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">70+ Rotas</p>
                      <p className="text-gray-400 text-xs">Migratórias</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                      <FileText className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Relatório</p>
                      <p className="text-gray-400 text-xs">Personalizado</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setShowLanding(false)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25 flex items-center justify-center group"
                >
                  Começar Minha Análise Gratuita
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-center text-gray-400 text-sm mt-4">
                  ⏱️ Tempo estimado: 8-10 minutos • 🔒 Suas informações são confidenciais
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <div className="flex items-center text-gray-400">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">100% Seguro</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">+500 Análises Realizadas</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Award className="w-5 h-5 mr-2 text-blue-400" />
                <span className="text-sm">Especialistas em Imigração</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white/5 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              Como Funciona
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: FileText, title: 'Responda', desc: 'Preencha o questionário com seu perfil' },
                { icon: Sparkles, title: 'Análise', desc: 'Nossa IA analisa seus dados' },
                { icon: MapPin, title: 'Resultado', desc: 'Receba o ranking de destinos' },
                { icon: Calendar, title: 'Consulta', desc: 'Agende com nossos especialistas' }
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                      <step.icon className="w-7 h-7 text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                  <p className="text-gray-400 text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-white text-center mb-12">
              O Que Nossos Clientes Dizem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Lucas M.', country: '🇵🇹 Portugal', text: 'O Geofitting me mostrou que Portugal era ideal pro meu perfil de TI. Em 4 meses já estava em Lisboa!' },
                { name: 'Fernanda S.', country: '🇩🇪 Alemanha', text: 'Não sabia que existia a Blue Card. A análise me abriu os olhos pra essa possibilidade.' },
                { name: 'Ricardo P.', country: '🇨🇦 Canadá', text: 'Achei que EUA era minha única opção, mas o Canadá se mostrou muito mais viável pro meu caso.' }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <Quote className="w-8 h-8 text-blue-400/50 mb-4" />
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div className="ml-3">
                      <p className="text-white font-medium text-sm">{testimonial.name}</p>
                      <p className="text-gray-400 text-xs">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">
              Pronto para Descobrir Seu Destino?
            </h3>
            <p className="text-gray-400 mb-8">
              Milhares de brasileiros já realizaram o sonho de morar no exterior. Você pode ser o próximo.
            </p>
            <button
              onClick={() => setShowLanding(false)}
              className="py-4 px-10 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-lg rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 inline-flex items-center group"
            >
              Começar Agora — É Grátis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 UK Consultoria Migratória. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // Mostrar Landing Page primeiro
  if (showLanding) {
    return renderLanding();
  }

  // Loading durante submissão
  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Analisando seu perfil...</h2>
          <p className="text-gray-600">Estamos processando suas respostas</p>
        </div>
      </div>
    );
  }

  // Render principal
  if (showAnalysis) {
    return (
      <>
        <Head>
          <title>Seu Relatório Geofitting | UK Consultoria Migratória</title>
          <meta name="description" content="Relatório personalizado de análise migratória" />
        </Head>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">GEOFITTING</h1>
              <p className="text-sm text-gray-500">UK Consultoria Migratória</p>
            </div>
            {renderAnalysis()}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Geofitting | Seu Mapa Migratório | UK Consultoria</title>
        <meta name="description" content="Descubra o melhor destino e rota migratória para seu perfil" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">GEOFITTING</h1>
            <p className="text-gray-600">Seu Mapa Migratório Personalizado</p>
            <p className="text-sm text-gray-500 mt-2">UK Consultoria Migratória</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Seção {currentSection + 1} de {sections.length}</span>
              <span>{Math.round(((currentSection + 1) / sections.length) * 100)}% completo</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button key={index} onClick={() => setCurrentSection(index)}
                  className={`flex items-center px-3 py-1.5 rounded-full text-xs transition-all ${
                    index === currentSection ? 'bg-blue-600 text-white'
                      : index < currentSection ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                  <Icon className="w-3 h-3 mr-1" />
                  <span className="hidden md:inline">{section.title}</span>
                  <span className="md:hidden">{index + 1}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              {React.createElement(sections[currentSection].icon, { className: "w-6 h-6 text-blue-600 mr-3" })}
              <h2 className="text-xl font-semibold text-gray-800">{sections[currentSection].title}</h2>
            </div>

            {renderSection()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button onClick={prevSection} disabled={currentSection === 0}
                className={`flex items-center px-6 py-2 rounded-lg transition-colors ${
                  currentSection === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                <ChevronLeft className="w-5 h-5 mr-1" />Anterior
              </button>
              <button onClick={nextSection}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                {currentSection === sections.length - 1 ? (
                  <><CheckCircle2 className="w-5 h-5 mr-1" />Gerar Análise</>
                ) : (
                  <>Próximo<ChevronRight className="w-5 h-5 ml-1" /></>
                )}
              </button>
            </div>
          </div>

          <div className="text-center mt-8 text-sm text-gray-500">
            <p>Suas informações são confidenciais e protegidas.</p>
            <p className="mt-1">© 2026 UK Consultoria Migratória</p>
          </div>
        </div>
      </div>
    </>
  );
}
