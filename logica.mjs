import fs from "fs";
import readlineSync from "readline-sync";
import { objAlunos } from "./aluno-obj.mjs";

export function quickSort(vetor, fnComp, ini = 0, fim = vetor.length - 1) {
    if (fim <= ini) return;

    

    const pivot = fim;
    let div = ini;

    for (let i = ini; i < fim; i++) {
        
        if (fnComp(vetor[i], vetor[pivot])) {
            [vetor[i], vetor[div]] = [vetor[div], vetor[i]];
            div++;
            
        }
    }

    // Coloca o pivô na posição correta
    [vetor[div], vetor[pivot]] = [vetor[pivot], vetor[div]];
    

    // Chama recursivamente para as subpartes
    quickSort(vetor, fnComp, ini, div - 1);
    quickSort(vetor, fnComp, div + 1, fim);
}

export function ordenacaoCrescenteNome(elem1, elem2) {
quickSort(objAlunos, (elem1, elem2) => elem1.nome.localeCompare(elem2.nome) < 0);
console.log(objAlunos);
}

export function ordenacaoDecrescenteRA(elem1, elem2) {
    quickSort(objAlunos, (elem1, elem2) => elem1.ra > elem2.ra);
    console.log(objAlunos);
}

export function filtrarAprovados(alunos) {
    // Filtra apenas os alunos com resultado "APROVADO"
    const aprovados = alunos.filter(aluno => aluno.resultado === "APROVADO");

    // Retorna um novo objeto com os alunos aprovados
    return { aprovados };
}

export function crescenteAprovados() {
    // Filtra os alunos aprovados
    const { aprovados } = filtrarAprovados(objAlunos);

    // Ordena os aprovados em ordem crescente pelo nome
    quickSort(aprovados, (elem1, elem2) => elem1.nome.localeCompare(elem2.nome) < 0);

    // Exibe os aprovados ordenados
    console.log(aprovados);
}

export function cadastrarAluno() {
    // Captura os dados do usuário
    const nome = readlineSync.question("Digite o nome do aluno: ");
    const ra = readlineSync.question("Digite o RA do aluno: ");
    const idade = readlineSync.question("Digite a idade do aluno: ");
    const sexo = readlineSync.question("Digite o sexo do aluno (MASCULINO/FEMININO): ");
    const media = readlineSync.question("Digite a média do aluno: ");
    const resultado = readlineSync.question("Digite o resultado do aluno (APROVADO/REPROVADO): ");

    // Validações básicas
    if (isNaN(idade) || isNaN(media)) {
        console.log("Erro: Idade e média devem ser números.");
        return;
    }

    // Cria o novo objeto do aluno
    const novoAluno = {
        nome,
        ra,
        idade,
        sexo,
        media,
        resultado
    };

    // Adiciona o novo aluno ao array existente
    objAlunos.push(novoAluno);

    // Gera o conteúdo atualizado do arquivo
    const novoConteudo = `export const objAlunos = ${JSON.stringify(objAlunos, null, 4)};`;

    // Escreve o conteúdo atualizado no arquivo aluno-obj.mjs
    const caminhoArquivo = "./aluno-obj.mjs"; // Ajuste conforme necessário
    try {
        fs.writeFileSync(caminhoArquivo, novoConteudo, "utf8");
        console.log("Aluno cadastrado e adicionado ao arquivo com sucesso!");
    } catch (error) {
        console.error("Erro ao salvar o arquivo:", error.message);
    }
}
