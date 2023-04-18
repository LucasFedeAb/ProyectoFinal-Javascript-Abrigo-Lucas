/* Arrays de preguntas y respuestas */
class Question {
    constructor(question, answer0, answer1, answer2, answer3, correctAnswer) {
        this.question = question
        this.answer0 = answer0
        this.answer1 = answer1
        this.answer2 = answer2
        this.answer3 = answer3
        this.correctAnswer = correctAnswer
    }
}

export const geography = [
    new Question("¿Cual es la capital de Francia?", "Brujas", "Marsella", "Paris", "Bruselas", 2),
    new Question("¿Cuál es la capital de Brasil?", "Brasilia", "Rio de Janeiro", "Sao Paulo", "Buenos Aires", 0),
    new Question("¿Cuál es el océano más grande del mundo?", "Océano Atlántico", "Océano Pacífico", "Océano Índico", "Océano Ártico", 1),
    new Question("¿Cuál es el río más largo del mundo?", "Río Nilo", "Río Yangtze", "Río Misisipi", "Río Amazonas", 3),
    new Question("¿Cuál es el desierto más grande del mundo?", "Desierto del Sahara", "Desierto de Gobi", "Desierto de Kalahari", "Desierto de Atacama", 0),
    new Question("¿En qué país se encuentra la Torre Eiffel?", "Italia", "España", "Francia", "Reino Unido", 2),
    new Question("¿Cuál es el país más grande del mundo por superficie?", "China", "Estados Unidos", "Rusia", "Canadá", 2),
    new Question("¿Cuál es la capital de Canadá?", "Toronto", "Montreal", "Vancouver", "Ottawa", 3),
    new Question("¿En qué continente se encuentra el monte Kilimanjaro?", "África", "Asia", "Europa", "América del Sur", 0),
    new Question("¿Cuál es la ciudad más poblada del mundo?", "Tokio", "Shanghai", "Mumbai", "Ciudad de México", 0),
    new Question("¿En qué país se encuentra la Gran Muralla China?", "India", "China", "Corea del Norte", "Japón", 1),
    new Question("¿Cuál es el país más pequeño del mundo por superficie?", "Mónaco", "San Marino", "El Vaticano", "Liechtenstein", 2)
]

export const sports = [
    new Question("¿En que deporte se destacó Mike Tyson?", "Basquet ", "Boxeo", "MMA", "Ciclismo", 1),
    new Question("¿Cuantos campeonatos del mundo tiene la Seleccion Argentina?", "1", "2", "3", "4", 2),
    new Question("¿En qué deporte se destaca Usain Bolt?", "Fútbol", "Atletismo", "Baloncesto", "Natación", 1),
    new Question("¿Quién es considerado el mejor jugador de baloncesto de todos los tiempos?", "Michael Jordan", "Kobe Bryant", "LeBron James", "Stephen Curry", 0),
    new Question("¿En qué deporte compiten los Lakers y los Celtics?", "Fútbol", "Baloncesto", "Hockey sobre hielo", "Béisbol", 1),
    new Question("¿Quién ganó el primer Mundial de Fútbol?", "Brasil", "Argentina", "Alemania", "Uruguay", 3),
    new Question("¿Qué país es considerado la cuna del fútbol?", "Brasil", "Alemania", "Argentina", "Inglaterra", 3),
    new Question("¿En qué deporte se destacó Michael Phelps?", "Atletismo", "Natación", "Esquí", "Snowboard", 1),
    new Question("¿Qué tenista tiene el récord de más títulos de Grand Slam en individuales?", "Roger Federer", "Rafael Nadal", "Novak Djokovic", "Pete Sampras", 0),
    new Question("¿Cuál es el equipo de fútbol más exitoso de la historia?", "Real Madrid", "Barcelona", "Manchester United", "Bayern Munich", 0),
    new Question("¿En qué deporte compite Manny Pacquiao?", "MMA", "Lucha libre", "Boxeo", "Kickboxing", 2),
    new Question("¿Cuántas veces ha ganado la Copa del Mundo de Rugby la selección de Nueva Zelanda?", "1", "2", "3", "4", 2)
]

export const history = [
    new Question("¿En qué año se produjo la Revolución Francesa?", "1789", "1798", "1812", "1830", 0),
    new Question("¿En qué año finalizó la Segunda Guerra Mundial?", "1940", "1950", "1945", "1939", 2),
    new Question("¿Qué emperador romano construyó el Coliseo?", "César Augusto", "Nerón", "Trajano", "Constantino", 0),
    new Question("¿Qué famoso líder africano luchó por la independencia de Ghana?", "Mandela", "Haile Selassie", "Kwame Nkrumah", "Kofi Annan", 2),
    new Question("¿Qué líder militar lideró la Revolución cubana en 1959?", "Fidel Castro", "Che Guevara", "Raul Castro", "Camilo Cienfuegos", 0),
    new Question("¿Qué territorio fue anexado por Hitler en 1938, previo al inicio de la Segunda Guerra Mundial?", "Checoslovaquia", "Polonia", "Dinamarca", "Austria", 3),
    new Question("¿Quién fue el primer presidente de Estados Unidos?", "Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln", 1),
    new Question("¿Qué líder mundial llevó a cabo la política conocida como 'Perestroika'?", "Vladimir Putin", "Nikita Kruschev", "Boris Yeltsin", "Mijail Gorbachov", 3),
    new Question("¿En qué año se produjo la Guerra de los Cien Años?", "1337", "1386", "1420", "1475", 0),
    new Question("¿Qué reina de Inglaterra fue conocida como 'La Reina Virgen'?", "María I", "Victoria", "Isabel I", "Ana", 2),
    new Question("¿Qué rey de España financió el viaje de Cristóbal Colón al Nuevo Mundo?", "Fernando II de Aragón", "Carlos I de España", "Felipe II de España", "Isabel I de Castilla", 3),
    new Question("¿Qué líder mundial conocido como el 'Padre de la Nación' luchó por la independencia de la India?", "Nelson Mandela", "Mahatma Gandhi", "Jawaharlal Nehru", "Indira Gandhi", 0)
]

export const devs = [
    new Question("¿Qué significa HTML?", "Hypertext Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperspace Text Markup Language", 0),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar el color de fondo de un elemento?", "color", "background-color", "border-color", "font-color", 1),
    new Question("¿Qué método de JavaScript se utiliza para agregar un nuevo elemento al final de un array?", "unshift()", "pop()", "shift()", "push()", 3),
    new Question("¿Qué elemento de HTML se utiliza para incluir CSS en una página?", "<style>", "<script>", "<link>", "<head>", 2),
    new Question("¿Qué tipo de valor devuelve el método parseInt() de JavaScript?", "booleano", "número entero", "cadena de texto", "flotante", 1),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar la posición de un elemento?", "position", "top", "left", "margin", 0),
    new Question("¿Qué evento de JavaScript se utiliza para detectar cuando un usuario hace clic en un elemento?", "onchange", "onclick", "onmouseclick", "onmouseover", 1),
    new Question("¿Qué elemento de HTML se utiliza para definir un enlace?", "<link>", "<a>", "<href>", "<url>", 1),
    new Question("¿Qué método de JavaScript se utiliza para agregar un nuevo elemento al inicio de un array?", "push()", "pop()", "shift()", "unshift()", 3),
    new Question("¿Qué propiedad de CSS se utiliza para cambiar el tamaño de fuente de un elemento?", "text-size", "size", "font-size", "text-font", 2)
]