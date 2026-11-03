import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Award, Monitor, BookOpen, Calculator, PenTool, ChevronLeft, LayoutGrid, Upload, Loader2 } from 'lucide-react';

const INITIAL_QUESTIONS = [
  // Conhecimentos Específicos (1-10)
  {
    id: 1, category: 'Conhecimentos Específicos',
    text: 'Na preparação e manuseio de um cadáver para o velório, qual é o equipamento de proteção individual (EPI) básico e obrigatório que o Agente Funerário deve utilizar para garantir a biossegurança?',
    options: ['Apenas uniforme padrão da empresa.', 'Luvas de procedimento, máscara, avental e óculos de proteção.', 'Óculos de sol e luvas de tecido.', 'Apenas botas de borracha e boné.'],
    correctOptionIndex: 1,
    explanation: 'A biossegurança exige o uso de luvas, máscara, avental (ou jaleco impermeável) e óculos para proteger o profissional contra fluidos corporais e riscos biológicos.'
  },
  {
    id: 2, category: 'Conhecimentos Específicos',
    text: 'O procedimento que consiste em desenterrar os restos mortais de uma pessoa, respeitando os prazos legais e normas sanitárias, é chamado de:',
    options: ['Inumação.', 'Tanatopraxia.', 'Exumação.', 'Necropsia.'],
    correctOptionIndex: 2,
    explanation: 'Exumação é o ato de retirar os restos mortais da sepultura. Inumação é o sepultamento.'
  },
  {
    id: 3, category: 'Conhecimentos Específicos',
    text: 'Sobre a ética profissional e o atendimento ao público no serviço funerário, o Agente Funerário deve:',
    options: ['Agir com total frieza para terminar o trabalho rápido.', 'Prestar informações e acolhimento com empatia, mantendo o respeito e o sigilo.', 'Delegar o atendimento da família apenas para o setor administrativo.', 'Fazer comentários inadequados sobre a causa da morte.'],
    correctOptionIndex: 1,
    explanation: 'A ética exige empatia, respeito à dor do luto, discrição e garantia do sigilo profissional.'
  },
  {
    id: 4, category: 'Conhecimentos Específicos',
    text: 'A técnica moderna de conservação e higienização de cadáveres, que retarda a decomposição e proporciona uma aparência mais natural para o velório, é conhecida como:',
    options: ['Cremação.', 'Formolização simples.', 'Tanatopraxia.', 'Necromaquiagem.'],
    correctOptionIndex: 2,
    explanation: 'A tanatopraxia é a técnica avançada de higienização, conservação e apresentação do cadáver.'
  },
  {
    id: 5, category: 'Conhecimentos Específicos',
    text: 'Durante a remoção e o transporte de um corpo, é responsabilidade do Agente Funerário:',
    options: ['Transportar o corpo em qualquer veículo disponível, sem fixação.', 'Utilizar veículo apropriado, garantindo o acondicionamento seguro.', 'Deixar a família responsável por carregar o corpo.', 'Conduzir em alta velocidade, pois é uma emergência.'],
    correctOptionIndex: 1,
    explanation: 'O transporte exige veículo adaptado, fixação correta para segurança e condução defensiva.'
  },
  {
    id: 6, category: 'Conhecimentos Específicos',
    text: 'De acordo com as normas de biossegurança e gerenciamento de resíduos (Resolução SS-SP nº 28), os resíduos infectantes gerados na preparação do corpo devem ser descartados em:',
    options: ['Lixo comum (sacos pretos).', 'Sacos plásticos brancos leitosos com símbolo de risco biológico.', 'Recipientes de papelão sem identificação.', 'Qualquer lixeira disponível no cemitério.'],
    correctOptionIndex: 1,
    explanation: 'Resíduos infectantes (Grupo A) devem ser acondicionados em sacos brancos leitosos identificados com o símbolo de risco biológico.'
  },
  {
    id: 7, category: 'Conhecimentos Específicos',
    text: 'Ao auxiliar na sala de necropsia (S.V.O.), uma das funções permitidas ao agente de suporte funerário é:',
    options: ['Assinar o atestado de óbito.', 'Realizar incisões e exames toxicológicos.', 'Auxiliar na movimentação do cadáver e limpeza dos equipamentos.', 'Emitir laudos cadavéricos.'],
    correctOptionIndex: 2,
    explanation: 'O agente de suporte auxilia na movimentação, arranjo e limpeza. Laudos e atestados são funções de médicos legistas ou patologistas.'
  },
  {
    id: 8, category: 'Conhecimentos Específicos',
    text: 'O que é a "Necromaquiagem"?',
    options: ['Processo de embalsamamento de longa duração.', 'Técnica utilizada para melhorar a aparência do falecido, disfarçando hematomas ou palidez.', 'Técnica de congelamento de corpos.', 'Procedimento de autópsia.'],
    correctOptionIndex: 1,
    explanation: 'Necromaquiagem utiliza cosméticos específicos para restaurar a aparência natural do falecido.'
  },
  {
    id: 9, category: 'Conhecimentos Específicos',
    text: 'No atendimento às famílias enlutadas, a comunicação do Agente Funerário deve ser:',
    options: ['Agressiva e impositiva.', 'Técnica, utilizando termos médicos complexos que a família não entenda.', 'Clara, objetiva e acolhedora, demonstrando respeito.', 'Informal e com piadas para alegrar o ambiente.'],
    correctOptionIndex: 2,
    explanation: 'A comunicação deve ser clara, respeitosa e acolhedora, facilitando a compreensão das etapas do serviço.'
  },
  {
    id: 10, category: 'Conhecimentos Específicos',
    text: 'Qual documento é fundamental e exigido por lei para que se proceda o sepultamento de um cadáver?',
    options: ['Certidão de Nascimento do falecido.', 'Guia de Sepultamento ou Certidão de Óbito.', 'Comprovante de residência.', 'Identidade original (RG) do falecido retida no cemitério.'],
    correctOptionIndex: 1,
    explanation: 'O sepultamento só pode ser realizado mediante a apresentação da Guia de Sepultamento ou Certidão de Óbito emitida pelo cartório.'
  },

  // Matemática (11-20)
  {
    id: 11, category: 'Matemática',
    text: 'Uma coroa de flores custa R$ 300,00. Se um cliente pagar à vista, recebe 15% de desconto. Qual o valor final?',
    options: ['R$ 285,00', 'R$ 255,00', 'R$ 250,00', 'R$ 270,00'],
    correctOptionIndex: 1,
    explanation: '15% de 300 é 45. 300 - 45 = R$ 255,00.'
  },
  {
    id: 12, category: 'Matemática',
    text: 'Um total de R$ 134,50 foi pago com uma nota de R$ 200,00. Qual é o troco?',
    options: ['R$ 75,50', 'R$ 66,50', 'R$ 65,50', 'R$ 55,50'],
    correctOptionIndex: 2,
    explanation: '200,00 - 134,50 = R$ 65,50.'
  },
  {
    id: 13, category: 'Matemática',
    text: 'Se 1/4 (um quarto) das 120 urnas do estoque são do modelo luxo, quantas urnas desse modelo existem?',
    options: ['20 urnas', '30 urnas', '40 urnas', '60 urnas'],
    correctOptionIndex: 1,
    explanation: '120 dividido por 4 é igual a 30.'
  },
  {
    id: 14, category: 'Matemática',
    text: 'Observe a sequência: 2, 4, 8, 16, 32, ... O próximo número é:',
    options: ['48', '60', '64', '72'],
    correctOptionIndex: 2,
    explanation: 'A sequência dobra o valor do número anterior. O dobro de 32 é 64.'
  },
  {
    id: 15, category: 'Matemática',
    text: 'Um translado durou 3 horas e 45 minutos. Em minutos totais, isso corresponde a:',
    options: ['225 minutos', '180 minutos', '245 minutos', '345 minutos'],
    correctOptionIndex: 0,
    explanation: '(3 * 60) + 45 = 180 + 45 = 225 minutos.'
  },
  {
    id: 16, category: 'Matemática',
    text: 'Para limpar 3 salas idênticas, um funcionário gasta 1 hora e meia. Quanto tempo ele gastará para limpar 5 salas?',
    options: ['2 horas', '2 horas e 30 minutos', '3 horas', '3 horas e 15 minutos'],
    correctOptionIndex: 1,
    explanation: '1h30 = 90 min. 90/3 = 30 min por sala. Para 5 salas: 5 * 30 = 150 min = 2 horas e 30 minutos.'
  },
  {
    id: 17, category: 'Matemática',
    text: 'Uma sala de velório retangular tem 8 metros de comprimento por 5 metros de largura. Qual é a sua área?',
    options: ['13 m²', '40 m²', '26 m²', '35 m²'],
    correctOptionIndex: 1,
    explanation: 'Área do retângulo = comprimento x largura = 8 * 5 = 40 m².'
  },
  {
    id: 18, category: 'Matemática',
    text: 'O valor de (25 + 15) x 2 - 10 é:',
    options: ['70', '60', '80', '50'],
    correctOptionIndex: 0,
    explanation: 'Resolve-se primeiro os parênteses: 40. Depois a multiplicação: 40 * 2 = 80. Depois a subtração: 80 - 10 = 70.'
  },
  {
    id: 19, category: 'Matemática',
    text: 'Um pacote de café custa R$ 18,50. Comprando 4 pacotes, o total a pagar é:',
    options: ['R$ 72,00', 'R$ 74,00', 'R$ 76,00', 'R$ 78,50'],
    correctOptionIndex: 1,
    explanation: '18,50 x 4 = 74,00.'
  },
  {
    id: 20, category: 'Matemática',
    text: 'A média aritmética dos números 12, 15 e 21 é:',
    options: ['15', '16', '17', '18'],
    correctOptionIndex: 1,
    explanation: '(12 + 15 + 21) / 3 = 48 / 3 = 16.'
  },

  // Língua Portuguesa (21-30)
  {
    id: 21, category: 'Língua Portuguesa',
    text: 'Assinale a alternativa em que a palavra destacada está escrita CORRETAMENTE:',
    options: ['Foi aberta uma "eceção".', 'A "excessão" confirmou a regra.', 'Com "esceção" do motorista, todos chegaram.', 'Todos participaram, sem "exceção".'],
    correctOptionIndex: 3,
    explanation: 'A grafia correta da palavra é "exceção".'
  },
  {
    id: 22, category: 'Língua Portuguesa',
    text: 'Qual das alternativas apresenta um sinônimo adequado para "Translado"?',
    options: ['Permanência', 'Transferência (ou transporte)', 'Estagnação', 'Ocultação'],
    correctOptionIndex: 1,
    explanation: 'Translado significa transportar ou deslocar algo de um lugar para outro.'
  },
  {
    id: 23, category: 'Língua Portuguesa',
    text: 'Assinale a alternativa em que TODAS as palavras estão acentuadas corretamente:',
    options: ['Jacaré, saúde, caju, pajé.', 'Raíz, ideia, vovó, túnel.', 'Árvore, urubú, vírus, cipó.', 'Mesa, flôr, pássaro, água.'],
    correctOptionIndex: 0,
    explanation: 'Caju não tem acento, o que torna a primeira opção correta. "Raiz", "ideia", "urubu" e "flor" não levam acento gráfico.'
  },
  {
    id: 24, category: 'Língua Portuguesa',
    text: 'Qual é o plural correto de "Cidadão"?',
    options: ['Cidadões', 'Cidadães', 'Cidadãos', 'Cidadões e Cidadães'],
    correctOptionIndex: 2,
    explanation: 'O plural correto é "cidadãos".'
  },
  {
    id: 25, category: 'Língua Portuguesa',
    text: 'No que se refere à concordância nominal, assinale a frase correta:',
    options: ['As portas estavam meio abertas.', 'Elas mesmo prepararam.', 'É proibida a entrada de pessoas.', 'Seguem anexo os documentos.'],
    correctOptionIndex: 2,
    explanation: '"É proibida a entrada" está correto. Outros erros: "meio abertas", "elas mesmas", "seguem anexos".'
  },
  {
    id: 26, category: 'Língua Portuguesa',
    text: 'Identifique o antônimo da palavra "Zelar":',
    options: ['Cuidar.', 'Proteger.', 'Negligenciar.', 'Observar.'],
    correctOptionIndex: 2,
    explanation: 'Zelar significa cuidar. O antônimo (sentido oposto) é negligenciar (descuidar).'
  },
  {
    id: 27, category: 'Língua Portuguesa',
    text: 'Assinale a frase em que o uso da crase está INCORRETO:',
    options: ['Fui à cerimônia.', 'Chegamos às oito horas.', 'Entreguei o documento à ele.', 'Vou à praça.'],
    correctOptionIndex: 2,
    explanation: 'Não se usa crase antes de pronomes pessoais masculinos como "ele".'
  },
  {
    id: 28, category: 'Língua Portuguesa',
    text: 'Qual alternativa apresenta erro de pontuação?',
    options: ['O agente, preparou o documento.', 'Os familiares chegaram cedo.', 'Após o velório, fomos ao cemitério.', 'O veículo, limpo e abastecido, estava pronto.'],
    correctOptionIndex: 0,
    explanation: 'Não se separa sujeito (O agente) do verbo (preparou) com vírgula.'
  },
  {
    id: 29, category: 'Língua Portuguesa',
    text: 'Complete corretamente: "O supervisor pediu para _____ fazer o relatório."',
    options: ['eu', 'mim', 'mim mesmo', 'eu próprio'],
    correctOptionIndex: 0,
    explanation: 'Antes de verbos no infinitivo (fazer), usa-se o pronome reto "eu" (sujeito da ação).'
  },
  {
    id: 30, category: 'Língua Portuguesa',
    text: 'Identifique o substantivo no trecho: "O carro funerário é muito moderno."',
    options: ['O', 'carro', 'muito', 'moderno'],
    correctOptionIndex: 1,
    explanation: '"carro" é o substantivo. "O" é artigo, "funerário" é adjetivo, "muito" é advérbio e "moderno" é adjetivo.'
  },

  // Informática (31-40)
  {
    id: 31, category: 'Informática',
    text: 'No Windows 10, qual a finalidade da "Área de Transferência"?',
    options: ['Armazenar arquivos excluídos.', 'Armazenar temporariamente itens copiados ou recortados.', 'Aumentar a velocidade da internet.', 'Bloquear o computador contra vírus.'],
    correctOptionIndex: 1,
    explanation: 'A Área de Transferência guarda temporariamente textos, imagens ou arquivos copiados (Ctrl+C) ou recortados (Ctrl+X).'
  },
  {
    id: 32, category: 'Informática',
    text: 'Ao redigir um ofício no Word 2016 (português), qual atalho salva o documento?',
    options: ['Ctrl + S', 'Ctrl + B', 'Ctrl + C', 'Ctrl + P'],
    correctOptionIndex: 1,
    explanation: 'No Word em Português, o atalho para salvar é Ctrl + B. Ctrl + S é sublinhado.'
  },
  {
    id: 33, category: 'Informática',
    text: 'Qual é a extensão padrão de um arquivo gerado no Excel 2016?',
    options: ['.docx', '.pdf', '.xlsx', '.txt'],
    correctOptionIndex: 2,
    explanation: 'A extensão padrão para pastas de trabalho do Excel a partir da versão 2007 é .xlsx.'
  },
  {
    id: 34, category: 'Informática',
    text: 'Em um e-mail, ao preencher o endereço no campo "Cco", o que ocorre?',
    options: ['A mensagem vai "Com Cópia Oculta", invisível aos outros destinatários.', 'O e-mail é cancelado.', 'O destinatário recebe em áudio.', 'A mensagem tem alta prioridade.'],
    correctOptionIndex: 0,
    explanation: 'Cco significa Com Cópia Oculta, escondendo o endereço dos demais.'
  },
  {
    id: 35, category: 'Informática',
    text: 'Assinale a alternativa que apresenta apenas navegadores de Internet:',
    options: ['Microsoft Word e Excel.', 'Google Chrome e Mozilla Firefox.', 'Windows 10 e Linux.', 'Outlook e PowerPoint.'],
    correctOptionIndex: 1,
    explanation: 'Chrome e Firefox são browsers utilizados para navegar na web.'
  },
  {
    id: 36, category: 'Informática',
    text: 'Qual atalho no Windows 10 serve para abrir o "Explorador de Arquivos" (Windows Explorer)?',
    options: ['Tecla Windows + E', 'Tecla Windows + R', 'Ctrl + Shift + Esc', 'Alt + Tab'],
    correctOptionIndex: 0,
    explanation: 'Windows + E abre o Explorador de Arquivos. (E de Explorer).'
  },
  {
    id: 37, category: 'Informática',
    text: 'No MS Word 2016, para que serve o recurso "Mala Direta"?',
    options: ['Para bloquear sites indesejados.', 'Para enviar arquivos pesados para a Lixeira.', 'Para criar um conjunto de documentos personalizados (como etiquetas ou cartas) a partir de um banco de dados.', 'Para formatar planilhas matemáticas complexas.'],
    correctOptionIndex: 2,
    explanation: 'A Mala Direta é usada para enviar um mesmo documento base personalizado para vários destinatários.'
  },
  {
    id: 38, category: 'Informática',
    text: 'Se a célula A1 do Excel tem o valor 10 e a B1 tem 5, qual o resultado da fórmula "=A1*B1"?',
    options: ['15', '5', '50', '2'],
    correctOptionIndex: 2,
    explanation: 'O asterisco (*) é o operador de multiplicação. 10 * 5 = 50.'
  },
  {
    id: 39, category: 'Informática',
    text: 'Na internet, a sigla URL refere-se a:',
    options: ['Um tipo de vírus.', 'Endereço eletrônico que permite localizar um site ou recurso na web.', 'Um software antivírus.', 'Uma marca de processador de computador.'],
    correctOptionIndex: 1,
    explanation: 'URL (Uniform Resource Locator) é o endereço de um recurso disponível na rede, como um site.'
  },
  {
    id: 40, category: 'Informática',
    text: 'Qual software abaixo tem a função principal de proteger o computador contra softwares maliciosos?',
    options: ['Microsoft Word', 'Google Chrome', 'Antivírus (ex: Windows Defender)', 'MS-Excel'],
    correctOptionIndex: 2,
    explanation: 'Os antivírus são projetados para detectar e remover malwares (vírus, cavalos de troia, etc).'
  }
];

// IndexedDB Helper Functions
const DB_NAME = 'SimuladoSETEC_DB';
const DB_VERSION = 1;
const STORE_NAME = 'questionsStore';

const initIndexedDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
    request.onsuccess = (e) => resolve(e.target.result);
    request.onerror = (e) => reject(e.target.error);
  });
};

const getQuestionsFromDB = (db) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const saveQuestionsToDB = (db, questions) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    questions.forEach(q => store.put(q));
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

export default function SimuladoSetec() {
  const [screen, setScreen] = useState('menu'); // 'menu', 'quiz', 'result'
  const [activeCategory, setActiveCategory] = useState('');
  
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  
  const [isLoading, setIsLoading] = useState(true);
  const dbRef = useRef(null);
  const fileInputRef = useRef(null);

  const appFont = { fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" };

  const categories = [
    { name: 'Conhecimentos Específicos', icon: BookOpen, color: 'text-emerald-400', border: 'hover:border-emerald-500' },
    { name: 'Matemática', icon: Calculator, color: 'text-blue-400', border: 'hover:border-blue-500' },
    { name: 'Língua Portuguesa', icon: PenTool, color: 'text-yellow-400', border: 'hover:border-yellow-500' },
    { name: 'Informática', icon: Monitor, color: 'text-purple-400', border: 'hover:border-purple-500' }
  ];

  // Initialize DB and Load Data
  useEffect(() => {
    const setupDB = async () => {
      try {
        const db = await initIndexedDB();
        dbRef.current = db;
        
        let storedQuestions = await getQuestionsFromDB(db);
        
        // Populate initial questions if empty
        if (storedQuestions.length === 0) {
          await saveQuestionsToDB(db, INITIAL_QUESTIONS);
          storedQuestions = await getQuestionsFromDB(db);
        }
        
        setQuestions(storedQuestions);
      } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
        alert("Aviso: Seu navegador não suporta armazenamento local para este simulado.");
        setQuestions(INITIAL_QUESTIONS); // fallback to memory
      } finally {
        setIsLoading(false);
      }
    };
    
    setupDB();
  }, []);

  const handleStartCategory = (categoryName) => {
    const cats = questions.filter(q => q.category === categoryName);
    setFilteredQuestions(cats);
    setActiveCategory(categoryName);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setScreen('quiz');
  };

  const handleOptionClick = (index) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === filteredQuestions[currentQuestionIndex].correctOptionIndex) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < filteredQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setScreen('result');
    }
  };

  const handleBackToMenu = () => {
    setScreen('menu');
    setActiveCategory('');
  };

  // Import JSON file
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target.result);
        if (Array.isArray(json) && json.length > 0 && json[0].category) {
          setIsLoading(true);
          await saveQuestionsToDB(dbRef.current, json);
          const updatedQuestions = await getQuestionsFromDB(dbRef.current);
          setQuestions(updatedQuestions);
          alert(`Sucesso! Foram importadas ${json.length} questões. O banco possui agora ${updatedQuestions.length} questões.`);
        } else {
          alert('Formato inválido. O arquivo JSON deve conter um array de questões com a propriedade "category".');
        }
      } catch (error) {
        alert('Erro ao ler ou processar o arquivo JSON.');
        console.error(error);
      } finally {
        setIsLoading(false);
        e.target.value = null; // reset input
      }
    };
    reader.readAsText(file);
  };

  const getOptionClass = (index) => {
    const baseClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium flex items-center justify-between ";
    
    if (!isAnswered) {
      return baseClass + "border-blue-800 bg-blue-900/50 text-blue-100 hover:bg-blue-800 hover:border-blue-600";
    }

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isCorrectOption = index === currentQuestion.correctOptionIndex;
    const isSelected = index === selectedOption;

    if (isCorrectOption) {
      return baseClass + "border-green-500 bg-green-900/40 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
    }

    if (isSelected && !isCorrectOption) {
      return baseClass + "border-red-500 bg-red-900/40 text-red-100";
    }

    return baseClass + "border-blue-900/50 bg-blue-950/30 text-gray-500 opacity-60";
  };

  const progressPercentage = filteredQuestions.length > 0 ? ((currentQuestionIndex) / filteredQuestions.length) * 100 : 0;

  if (isLoading) {
    return (
      <div style={appFont} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
        <p className="text-blue-200 font-semibold">Carregando banco de questões...</p>
      </div>
    );
  }

  return (
    <div style={appFont} className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4">
      
      {/* Header Fixo */}
      <div className="w-full max-w-3xl mb-8 flex flex-col items-center gap-2 justify-center">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200 text-center">
            Simulado SETEC Campinas
          </h1>
        </div>
        <p className="text-slate-400 font-medium tracking-wide text-sm md:text-base">Cargo: Agente Funerário (Ensino Fundamental)</p>
      </div>

      {screen === 'menu' && (
        <div className="w-full max-w-3xl animate-[fadeIn_0.5s_ease-out]">
          
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="mb-4 sm:mb-0">
               <h2 className="text-lg font-semibold text-slate-300">Escolha uma categoria para estudar:</h2>
               <p className="text-sm text-slate-500">Total de questões no banco: {questions.length}</p>
            </div>
            
            <button 
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Upload className="w-4 h-4" />
              Importar Questões (JSON)
            </button>
            <input 
              type="file" 
              accept=".json" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const qCount = questions.filter(q => q.category === cat.name).length;
              
              return (
                <button
                  key={idx}
                  onClick={() => handleStartCategory(cat.name)}
                  disabled={qCount === 0}
                  className={`flex flex-col items-center justify-center gap-4 p-8 rounded-2xl border-2 border-slate-800 bg-slate-900 hover:bg-slate-800 transition-all duration-300 shadow-lg ${cat.border} group ${qCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon className={`w-12 h-12 ${cat.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-lg font-bold text-slate-200">{cat.name}</span>
                  <span className="text-sm text-slate-500">{qCount} Questões</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {screen === 'quiz' && filteredQuestions.length > 0 && (
        <div className="w-full max-w-3xl bg-slate-900 border border-blue-900/50 rounded-2xl shadow-2xl p-6 md:p-8 animate-[fadeIn_0.3s_ease-out]">
          
          {/* Header do Quiz (Voltar e Barra de Progresso) */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button 
                onClick={handleBackToMenu}
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-blue-400 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Voltar
              </button>
              <span className="text-sm font-semibold text-blue-400 bg-blue-950 px-3 py-1 rounded-full">
                {activeCategory}
              </span>
              <span className="text-sm text-slate-400 font-medium">
                {currentQuestionIndex + 1} / {filteredQuestions.length}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <h2 className="text-lg md:text-xl font-semibold leading-relaxed mb-8 text-slate-50">
            {filteredQuestions[currentQuestionIndex].text}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {filteredQuestions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={isAnswered}
                className={getOptionClass(index)}
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-950 text-blue-300 font-bold shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-left">{option}</span>
                </div>
                
                {isAnswered && index === filteredQuestions[currentQuestionIndex].correctOptionIndex && (
                  <CheckCircle2 className="w-6 h-6 text-green-400 shrink-0" />
                )}
                {isAnswered && selectedOption === index && index !== filteredQuestions[currentQuestionIndex].correctOptionIndex && (
                  <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                )}
              </button>
            ))}
          </div>

          {/* Feedback (Gabarito) */}
          {isAnswered && (
            <div className="bg-blue-950/40 border border-blue-800 rounded-xl p-5 mb-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="flex items-start gap-3">
                <BookOpen className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-blue-300 mb-1">Gabarito e Explicação</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {filteredQuestions[currentQuestionIndex].explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 
                ${isAnswered 
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/50 cursor-pointer' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
            >
              {currentQuestionIndex + 1 === filteredQuestions.length ? 'Finalizar' : 'Próxima Questão'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {screen === 'result' && (
        <div className="w-full max-w-xl bg-slate-900 border border-blue-900/50 rounded-2xl shadow-2xl p-8 text-center animate-[fadeIn_0.5s_ease-out]">
          <Award className="w-20 h-20 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-slate-100 mb-2">Simulado Concluído!</h2>
          <p className="text-slate-400 mb-8">
            Você terminou as questões de <strong className="text-slate-200">{activeCategory}</strong>.
          </p>

          <div className="bg-slate-950 rounded-2xl p-6 mb-8 border border-slate-800">
            <div className="text-5xl font-black text-blue-400 mb-2">
              {score} <span className="text-2xl text-slate-500">/ {filteredQuestions.length}</span>
            </div>
            <p className="text-slate-300">
              Taxa de acerto: <span className="font-bold text-blue-300">{Math.round((score / filteredQuestions.length) * 100)}%</span>
            </p>
            {score === filteredQuestions.length ? (
              <p className="text-green-400 font-semibold mt-4">Gabaritou! Excelente preparação.</p>
            ) : score >= (filteredQuestions.length / 2) ? (
              <p className="text-yellow-400 font-semibold mt-4">Bom trabalho! Continue revisando os erros.</p>
            ) : (
              <p className="text-red-400 font-semibold mt-4">É importante revisar os conceitos básicos desta disciplina.</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleStartCategory(activeCategory)}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300"
            >
              <RefreshCcw className="w-5 h-5" />
              Tentar Novamente
            </button>
            <button
              onClick={handleBackToMenu}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              <LayoutGrid className="w-5 h-5" />
              Menu Principal
            </button>
          </div>
        </div>
      )}
      
      {/* Footer minimalista */}
      <div className="mt-8 text-slate-500 text-sm text-center">
        Desenvolvido para Concurso • INDEPAC
      </div>
    </div>
  );
}