export const decisionTree = {
    type: "common",
    message: "Seja bem vindo ao QTDosRPG Game! Escolha um cenário para a sua aventura.",
    paths: [
        {
            type: "common",
            optionMessage: "Iniciar na caverna.",
            message: `Você acorda numa caverna escura. É frio, úmido e sua voz ecoa pelas paredes cinzas.`,
            paths: [
                {
                    type: "final",
                    optionMessage: "Sentar e chorar",
                    final: QTDOS_FINALS[0],
                },
                {
                    type: "fork",
                    optionMessage: "Texto da opção",
                    chance: 0.4,
                    cases: [
                        {
                            type: "common",
                            message: "Você entra adentra pela caverna, explorando as pedras geladas.",
                            paths: [
                                {
                                    type: "final",
                                    optionMessage: "Finais fixos (teste)",
                                    final: QTDOS_FINALS[30], 
                                },
                                {
                                    type: "final",
                                    optionMessage: "Finais fixos (teste)",
                                    final: QTDOS_FINALS[30],
                                },
                                {
                                    type: "final",
                                    optionMessage: "Finais fixos (teste)",
                                    final: QTDOS_FINALS[30],
                                }
                            ]
                        },
                        {
                            type: "final",
                            final: QTDOS_FINALS[31],
                        }
                    ]
                },
                {
                    type: "final",
                    optionMessage: "Outro caminho",
                    final: QTDOS_FINALS[0],
                }
            ]
        },
        {
            type: "final",
            optionMessage: "Iniciar na clareira",
            final: QTDOS_FINALS[0],
        },
        {
            type: "common",
            optionMessage: "Iniciar na vila",
            message: `Você surge numa vila, bem no centro dela, cercada por montanhas altas. 
                     <br>O dia está claro e o clima é frio, e logo você pode sentir os pequenos flocos de neve caindo em seu rosto.
                     <br>Há 3 caminhos para seguir.`,
            paths: [
                {
                    type: "common",
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
                    type: "common",
                    optionMessage: "Caminho das pontes.",
                    message: "Texto de escolha",
                    paths: [
                        {},
                        {},
                        {}
                    ] 
                },
                {
                    type: "common",
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