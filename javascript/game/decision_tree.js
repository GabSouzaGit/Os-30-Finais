/*
    Caminho:

    {
        optionMessage: "Texto da opção",
        message: "Texto de escolha",
        paths: [
            {},
            {},
            {}
        ]
    }

    Final:

    {
        itsFinal: {
            finalMessage: "Vila desbloqueada",
            achievement: "Vila",
            finalID: 2
        }
    }
*/ 

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
                        finalID: 0,
                        achievement: rpgFinals[0],
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
            message: `Você surge numa vila, bem no centro dela, cercada por montanhas altas. 
                     <br>O dia está claro e o clima é frio, e logo você pode sentir os pequenos flocos de neve caindo em seu rosto.
                     <br>Há 3 caminhos para seguir.`,
            paths: [
                {
                   optionMessage: "Caminho do desfiladeiro.",
                    message: `Você caminha pela trilha enevoada de terra misturada, até chegar num ponto<br>
                              mais distante da vila; um grande desfiladeiro, coberto por uma névoa densa.
                              <p>Você segue pelo desfiladeiro, sentindo muito frio.</p>`,
                    paths: [
                        {},
                        {},
                        {}
                    ] 
                },
                {
                    optionMessage: "Caminho das pontes.",
                    message: "Texto de escolha",
                    paths: [
                        {},
                        {},
                        {}
                    ] 
                },
                {
                    optionMessage: "Caminho da mina.",
                    message: "Texto de escolha",
                    paths: [
                        {},
                        {},
                        {}
                    ]
                },
            ]
        }
    ]
}