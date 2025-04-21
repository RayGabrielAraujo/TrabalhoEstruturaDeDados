process.stdout.setEncoding("utf8");
// Importa o módulo readline nativo como módulo ES
import readlineSync from "readline-sync";
import { ordenacaoCrescenteNome } from "./logica.mjs";
import { ordenacaoDecrescenteRA } from "./logica.mjs";
import { crescenteAprovados } from "./logica.mjs";
import { cadastrarAluno } from "./logica.mjs";




// Função principal do menu
async function mostrarMenu() {
    let escolha;

    do {
        escolha = parseInt(readlineSync.question(
            "TELA DE APRESENTAÇÃO DO PROGRAMA:\n\n" +
            "Entre com uma das opções abaixo:\n" +
            "1. Cadastrar Alunos.\n" +
            "2. Relatório de Alunos em ordem crescente por Nome.\n" +
            "3. Relatório de Alunos em ordem decrescente por RA.\n" +
            "4. Relatório de Alunos em ordem crescente por Nome, apenas dos Aprovados.\n" +
            "5. Encerre a execução do programa.\n" +
            "\nDigite sua escolha: "
        ));

        switch (escolha) {
            case 1:
                cadastrarAluno();
                break;
            case 2:
                ordenacaoCrescenteNome();
                break;
            case 3:
                ordenacaoDecrescenteRA();
                break;
            case 4:
                crescenteAprovados();
                break;
            case 5:
                console.log("Encerrando o programa...");
                rl.close(); // Fecha a interface readline
                return; // Sai da função após encerrar
            default:
                console.log("Opção inválida! Por favor, escolha um número entre 1 e 5.");
        }
    } while (escolha !== 5);
}

// Inicia o programa
mostrarMenu().catch(err => console.error(err));