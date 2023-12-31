const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while(optionButtonsElement.firstChild){
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}
function selectOption(option) {
    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0){
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        text: 'Haben Sie Erfahrung oder Vorwissen zu dem Thema "Autismus Spektrum Störung"?',
        options: [
            {
                text: 'Ja',
                setState: {Erfahrung: true},
                nextText: 2
            },
            {
                text: 'Nein',
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: 'In welchen Bereichen haben Sie diese Erfahrung?',
        options: [
            {
                text: 'Im Freundeskreis',
                //requiredState: (currentState) => currentState.Erfahrung,
                setState: {Freundeskreis: true},
                nextText: 3
            },
            {
                text: 'In der Familie',
                //requiredState: (currentState) => currentState.Erfahrung,
                setState: {Familie: true},
                nextText: 3
            },
            {
                text: 'Ich bin selbst betroffen',
                setState: {Selbst: true},
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: 'Dann fangen wir mit dem Training an.',
        options: [
            {
                text: 'Infos zu Erfahrung vom Menschen mit ASD im sozialen Kontext.',
                requiredState: (currentState) => currentState.Freundeskreis,
                nextText: 4

            },
            {
                text: 'Infos zu Erfahrung vom Menschen mit ASD im familiären Kontext.',
                requiredState: (currentState) => currentState.Familie,
                nextText: 5
            },
            {
                text: 'Infos zu Erfahrung vom Menschen mit ASD im Kontext des Arbeitsalltags.',
                requiredState: (currentState) => currentState.Selbst,
                nextText: 6
            },
            {
                text: 'Allgemeine Infos zur Autismus Spektrum Störung.',
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: 'Hier ein paar Infos zu den Erfahrungen von Menschen mit ASD im sozialen Kontext.',
        options: [
            {
                text: 'Super! Zurück auf Anfang',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'Hier ein paar Infos zu den Erfahrungen von Menschen mit ASD im familiären Kontext.',
        options: [
            {
                text: 'Super! Zurück auf Anfang',
                nextText: -1
            }
        ]
    },
    {
        id: 6,
        text: 'Hier ein paar Infos zu den Erfahrungen von Menschen mit ASD im Kontext des Arbeitslebens.',
        options: [
            {
                text: 'Super! Zurück auf Anfang',
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: 'Hier ein paar  Infos zu Menschen mit ASD im allgemeinen.',
        options: [
            {
                text: 'Super!',
                setState: {Familie: true, Selbst: true, Freundeskreis: true},
                nextText: 3
            }
        ]
    },
    {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
]

startGame()