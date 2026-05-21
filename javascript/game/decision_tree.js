export const decisionTree = {
    start: true,
    message: "Seja bem vindo ao QTDosRPG Game! Escolha um cenário para a sua aventura.",
    paths: [
        {
            optionMessage: "Iniciar na caverna.",
            message: "Você acorda numa caverna escura. É frio, úmido e sua voz ecoa pelas paredes cinzas.",
            paths: [
                {
                    optionMessage: "Sentar e chorar",
                    itsFinal: {
                        finalMessage: "Simplesmente você se senta e chora, triste. Mal sabe o que te aguarda...",
                        achievement: "Chorão",
                        finalID: 0
                    }
                },
                {
                    optionMessage: "Explorar caverna",
                    itsFinal: {
                        finalMessage: "Final placeholder",
                        achievement: "Genérico",
                        finalID: 0
                    }
                },
                {
                    optionMessage: "Fazer nada.",
                    itsFinal: {
                        finalMessage: "Final placeholder",
                        achievement: "Genérico",
                        finalID: 0
                    }
                }
            ]
        },
        {
            optionMessage: "Iniciar na clareira",
            itsFinal: {
                finalMessage: "Clareira desbloqueada",
                achievement: "Clareira",
                finalID: 1
            }
        },
        {
            optionMessage: "Iniciar na vila",
            itsFinal: {
                finalMessage: "Vila desbloqueada",
                achievement: "Vila",
                finalID: 2
            }
        }
    ]
}

/*
    Caminho:

    {
        message: "Seja bem vindo ao QTDosRPG Game! Escolha um cenário para a sua aventura.",
        paths: {
            cave: {...},
            clearing: {...},
            village: {...}
        }
    }
*/

/*
    Final:

    {
        itsFinal: {
            finalMessage: "Vila desbloqueada",
            achievement: "Vila",
            finalID: 2
        }
    }
*/