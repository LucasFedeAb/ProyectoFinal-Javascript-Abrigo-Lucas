/* Importamos array de preguntas y respuestas */
import { geography, history, sports, devs, } from './questions.js';

/* Recuperamos variables almacenadas en storage*/
let categorySelect = localStorage.getItem('categorySelect');
let categorySelectNav = localStorage.getItem('categorySelectNav');
let name = localStorage.getItem('Nombre');

let SelectNavGame
let categoryDefault

//variables
let answerCategory; //almacenar array a barajar
let currentQuestion = 0; // índice de la pregunta actual
let userAnswers = []; // array para almacenar las respuestas del usuario
let isAnswered = false;
let life = 3;
let timer;
let getScore = 0;
let maxScore = 0;
let maxScoreData = null;

/* Botones nav gamePlay */
const navSports = document.querySelector('#nav-deportes');
const navGeography = document.querySelector('#nav-geografia');
const navHistory = document.querySelector('#nav-historia');
const navDevs = document.querySelector('#nav-programacion');
const navVehiculos = document.querySelector('#nav-vehiculos');
const navAll = document.querySelector('#nav-aleatorio');

/* Mostrar contenido */
const showCategory = document.querySelector(".category");
const showQuest = document.querySelector("#question");
const showBtn0 = document.querySelector(".btn0");
const showBtn1 = document.querySelector(".btn1");
const showBtn2 = document.querySelector(".btn2");
const showBtn3 = document.querySelector(".btn3");
const btnAnswers = document.querySelector("#btn-answers");
const timerContainer = document.querySelector(".div__time");
const timerText = document.querySelector("#timer-text");
const lifeContainer = document.querySelector("#life-container");
const timeLine = document.querySelector('.time__line');
const line = document.getElementById("line");
const statistics = document.querySelector('.statistics');
const statisticsMobile = document.querySelector('.statistics__mobile');
const help = document.querySelector('.help');
const helpMobile = document.querySelector('.help__mobile');


/* Funcion asignar valor string */
function varValue(valueString) {
    SelectNavGame = valueString;
    localStorage.setItem('SelectNavGame', SelectNavGame);
}

/* Escuchamos click del nav */
navSports.addEventListener("click", function () { varValue("Deportes"); });
navGeography.addEventListener("click", function () { varValue("Geografia"); });
navHistory.addEventListener("click", function () { varValue("Historia"); });
navDevs.addEventListener("click", function () { varValue("Programacion"); });
navAll.addEventListener("click", function () { varValue("Aleatorio"); });

/* Recuperamos informacion de click storage */
SelectNavGame = localStorage.getItem('SelectNavGame');

//Funcion agregar categoria con for of
const addCategory = (array, nameCategory) => {
    for (const elemento of array) {
        elemento.category = nameCategory;
    }
}
addCategory(geography, "GEOGRAFIA");
addCategory(sports, "DEPORTES");
addCategory(history, "HISTORIA");
addCategory(devs, "PROGRAMACION");

//Creamos array todas las categorias
const allCategory = geography.concat(sports, history, devs);


/* Funcion para acceder a array segun click categorias  */
function clickCategory(btnCategory) {
    switch (btnCategory) {
        case "Geografia":
            answerCategory = geography;
            break;
        case "Deportes":
            answerCategory = sports;
            break;
        case "Historia":
            answerCategory = history;
            break;
        case "Programacion":
            answerCategory = devs;
            break;
        case "Aleatorio":
            answerCategory = allCategory;
            break;
       
        
    }
}

/* Verificar categoria seleccionada segun nav o slider */
function handleCategorySelection(category) {
    if (category) {
        localStorage.setItem('categoryDefault', category);
        clickCategory(category);
    }
    localStorage.removeItem('categorySelect');
    localStorage.removeItem('categorySelectNav');
    localStorage.removeItem('SelectNavGame');
    
}

// Llamada a la función para cada caso
handleCategorySelection(categorySelect);
handleCategorySelection(categorySelectNav);
handleCategorySelection(SelectNavGame);

if (answerCategory === undefined) {
    categoryDefault = localStorage.getItem('categoryDefault');
    clickCategory(categoryDefault); //Categoria por defecto si actualiza el navegador
    // barajar el array almacenado en answerCategory
    shuffleArray(answerCategory);
} else {
    shuffleArray(answerCategory);
}

// función para barajar el array usando el método Fisher-Yates shuffle
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// función para guardar el puntaje máximo en el localStorage
const maxScoreDataJSON = localStorage.getItem('maxScore');
if (maxScoreDataJSON) {
    const maxScoreDataParsed = JSON.parse(maxScoreDataJSON);
    if (maxScoreDataParsed.score > maxScore) {
        maxScore = maxScoreDataParsed.score;
        maxScoreData = maxScoreDataParsed;
    }
}

// función para guardar el puntaje máximo en el localStorage
function saveMaxScore(maxScoreData) {
    localStorage.setItem('maxScore', JSON.stringify(maxScoreData));
} 


// función para actualizar el puntaje máximo si es necesario
function updateMaxScore(score, category) {
    maxScore = JSON.parse(localStorage.getItem('maxScore')) || {score: 0, category: ''}; // obtiene el puntaje máximo del localStorage o lo inicializa a 0 y una categoría vacía si no hay uno guardado
    
    
    if (score > maxScore.score) {
        maxScoreData = { score, category };
        saveMaxScore(maxScoreData);
    }
}

// función para mostrar el puntaje máximo al usuario
function showMaxScore() {
    maxScoreData = JSON.parse(localStorage.getItem('maxScore')); // obtiene el puntaje máximo del localStorage
    if (maxScoreData) {
        console.log(`El puntaje máximo es ${maxScoreData.score} en la categoría ${maxScoreData.category}`);
    } else {
        console.log('Aún no hay un puntaje máximo registrado en el localStorage');
    }
}


// función para verificar la respuesta del usuario
function checkAnswer(selectedAnswer) {
    // si ya se ha respondido a la pregunta actual, no se hace nada
    if (isAnswered) {
        return;
    }
    // marcar que ya se ha respondido a la pregunta actual
    isAnswered = true;

    // detener el temporizador
    clearInterval(timer);
    line.classList.remove("countdown-line");
    timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time', 'div__time__end');
    timerContainer.classList.add('time__empty');

    // verificar si la respuesta es correcta y actualizar el botón
    let btn = document.querySelector(".btn" + selectedAnswer);
    let textAlert = document.querySelector(".alert__msg");

    if (selectedAnswer === answerCategory[currentQuestion].correctAnswer) {
        btn.classList.add("correct");
        textAlert.classList.add("textCorrect");
        getScore = getScore + 10;
        document.querySelector(".alert__msg").innerText = `Correcto`;
        document.querySelector(".score").innerText = `Score: ${getScore}`;
    } else {
        life--;
        switch (life) {
            case 2:
                document.querySelector('.life__3').remove();
            break;
            case 1:
                document.querySelector('.life__2').remove();
            break;
            case 0:
                document.querySelector('.life__1').remove();
            break;
        }
        console.log(life);
        btn.classList.add("incorrect");
        textAlert.classList.add("textIncorrect");
        textAlert.innerText = `Incorrecto`;
        // resaltar la respuesta correcta
        document.querySelector(`.btn${answerCategory[currentQuestion].correctAnswer}`).classList.add("correct");

    }
    // guardar la respuesta del usuario
    userAnswers[currentQuestion] = selectedAnswer;

    // pasar a la siguiente pregunta después de 1 segundo
    setTimeout(function () {
        // restablecer los botones
        timerContainer.classList.remove('time__empty');
        line.classList.add("countdown-line");
        timerContainer.classList.add('div__time');
        btn.classList.remove("correct");
        btn.classList.remove("incorrect");
        textAlert.classList.remove("textCorrect");
        textAlert.classList.remove("textIncorrect");
        document.querySelector(".alert__msg").innerText = ` `;
        document.querySelector(`.btn${answerCategory[currentQuestion].correctAnswer}`).classList.remove("correct");
        // pasar a la siguiente pregunta o mostrar el puntaje final
        
        if (currentQuestion < answerCategory.length - 1 && life > 0) {
            currentQuestion++
            showQuestion();
        } else {
            showScore();
        }
        // restablecer el indicador de respuesta
        isAnswered = false;
    }, 1000);
}

// función para mostrar la pregunta y las respuestas posibles
function showQuestion() {
    // restablecer el temporizador
    timerContainer.classList.remove('time__empty');
    clearInterval(timer);
    line.classList.add("countdown-line");
    timerContainer.classList.add('div__time');
    timerText.innerText = `Tiempo: 15`;

    // mostrar la pregunta y las respuestas posibles
    showCategory.innerText = answerCategory[currentQuestion].category;
    showQuest.innerText = answerCategory[currentQuestion].question;
    showBtn0.innerText = answerCategory[currentQuestion].answer0;
    showBtn1.innerText = answerCategory[currentQuestion].answer1;
    showBtn2.innerText = answerCategory[currentQuestion].answer2;
    showBtn3.innerText = answerCategory[currentQuestion].answer3;
    console.log(answerCategory[currentQuestion].category);
    // activar los botones de respuesta

    showBtn0.disabled = false;
    showBtn0.addEventListener("click", function () { checkAnswer(0); });
    showBtn1.disabled = false;
    showBtn1.addEventListener("click", function () { checkAnswer(1); });
    showBtn2.disabled = false;
    showBtn2.addEventListener("click", function () { checkAnswer(2); });
    showBtn3.disabled = false;
    showBtn3.addEventListener("click", function () { checkAnswer(3); });
    // iniciar el temporizador
    startTimer();
}

// establecer el tiempo inicial
function startTimer() {
    let time = 14;
    // actualizar el temporizador cada segundo
    timer = setInterval(function () {
        // restablecer el temporizador si se acaba el tiempo
        if (time <=0) {
            line.classList.remove("countdown-line");
            timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end', 'div__time');
            timerContainer.classList.add('time__empty');
            clearInterval(timer);
            life--;
            switch (life) {
                case 2:
                    document.querySelector('.life__3').remove();
                break;
                case 1:
                    document.querySelector('.life__2').remove();
                break;
                case 0:
                    document.querySelector('.life__1').remove();
                break;
            }
            // pasar a la siguiente pregunta
            setTimeout(function () {
                // pasar a la siguiente pregunta o mostrar el puntaje final
                if (currentQuestion < answerCategory.length - 1 && life > 0) {
                    currentQuestion++;
                    showQuestion();
                } else {
                    showScore();
                }

            }, 1000);

        }

        // actualizar la visualización del temporizador
        if (time < 10) {
            timerText.innerText = `Tiempo: 0${time}`;
        } else{
            timerText.innerText = `Tiempo: ${time}`;
        }

        if (time && time < 4) {
            timerContainer.classList.add('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end');
        }
        time--;
    }, 1000);
}

// función para mostrar el puntaje final
function showScore() {
    // mostrar el puntaje final
    let score = 0;
    for (let i = 0; i < answerCategory.length; i++) {
        if (userAnswers[i] === answerCategory[i].correctAnswer) {
            score = score + 10;   
        }
    }
    //Verificar categoria para insertar correctamente en estadisticas
    if (answerCategory===allCategory) {
        answerCategory[currentQuestion].category = "ALEATORIA";
    }
    updateMaxScore(score, answerCategory[currentQuestion].category);
    showMaxScore();

    let scoreText = `SCORE FINAL: ${score}`;
    let scoreFin = document.querySelector(".score");
    scoreFin.classList.remove(".score");
    scoreFin.classList.add("scoreFin");
    scoreFin.innerText = scoreText;
    // desactivar los botones de respuesta
    showBtn0.disabled = true;
    showBtn1.disabled = true;
    showBtn2.disabled = true;
    showBtn3.disabled = true;
    line.classList.remove("countdown-line");
    timerContainer.classList.remove('animate__animated', 'animate__repeat-3', 'animate__flash', 'div__time__end');
    btnAnswers.remove("#btn-answers");
    timerContainer.remove(".div__time");
    lifeContainer.remove();
    showCategory.innerText = `FIN DEL JUEGO`;
    showQuest.remove();
    document.querySelector("#question-container").remove();
    const btnFin = document.querySelector('#btn-fin');
    btnFin.innerHTML=`<button id="btn-ok" type="button" class="btn btn-success text-center-light btn-lg ps-4 pt-3 pb-3 pe-4 g-3 m-4 ">REINICIAR</button>
    <button id="btn-exit" type="button" class="btn btn-danger text-center-light btn-lg ps-4 pt-3 pb-3 pe-4 g-3 m-4">SALIR</button>`;
    const btnExit = document.querySelector('#btn-exit');
    const btnOk = document.querySelector('#btn-ok');

    btnOk.addEventListener("click", function() {
        // Aquí agregamos la acción para mantener al usuario en la misma página
        window.location.assign("./gamePlay.html");
    });
    btnExit.addEventListener("click", function() {
        window.location.assign("./categorysSlider.html");
    });

    Swal.fire({
        background:"#C9FFA5",
        title: `${scoreText}`,
        html:`<h3>DESEA REINICIAR?</h3>,`,
        backdrop: `#18212b`,
        showCancelButton: true,
        cancelButtonText:"SALIR",
        confirmButtonColor: '#27ae60',
        cancelButtonColor: '#c0392b',
    });

    // Agregar evento de clic al botón "OK"
    let confirmButton = Swal.getConfirmButton();
    confirmButton.addEventListener("click", function() {
        // Aquí agregamos la acción para mantener al usuario en la misma página
        window.location.assign("./gamePlay.html");
    });

    // Agregar evento de clic al botón "Cancelar"
    let cancelButton = Swal.getCancelButton();
    cancelButton.addEventListener("click", function() {
        window.location.assign("./categorysSlider.html");
    });
}
/* Mostrar estadisticas */
function showStatistics() {
    
    if (!maxScoreData) {
        Swal.fire({
            background:"#C9FFA5",
            title:"MEJOR PUNTUACIÓN",
            html: 
            `<strong>Aun no hay puntajes registrados. Comienza a jugar para registrar puentajes y superarlos !!</strong>`,
            showCloseButton: true,
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
    }else{
        Swal.fire({
            background:"#C9FFA5",
            title:"MEJOR PUNTUACIÓN",
            html: 
            `<strong>El mejor puntaje es ${maxScoreData.score} en la categoría ${maxScoreData.category}</strong>`,
            showCloseButton: true,
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    }
    
}
statistics.addEventListener("click", function () {showStatistics();
});
statisticsMobile.addEventListener("click", function () {showStatistics();
});

/* Mostrar alert ayuda */
function showHelp() {
    Swal.fire({
        title:"CONTACTANOS",
        text:`Hola ${name}, si necesitas ayuda o tienes alguna sugerencia contactanos a twfa.luca@gmail.com y te responderemos a la brevedad.`,
        showCloseButton: true,
        showConfirmButton: false,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    });
}
help.addEventListener("click", function () {showHelp();
});
helpMobile.addEventListener("click", function () {showHelp();
});

/* Mostrar contenido navbar-toggler */
let nameNav = localStorage.getItem('Alias');
let userId
let avatarImg;
const avatarContainer = document.getElementById("avatar-container");
const changeAvatar = document.querySelector('.btn__avatar');
const nameUser = document.querySelector('#nombre-user');

nameUser.innerHTML=`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-emoji-smile-fill mt-2 text-warning" viewBox="0 0 20 20">
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
</svg>

<p class="text-warning">Hola ${nameNav} !</p>
`;

/* Gener id User */
export function generateUserId() {
    userId = localStorage.getItem('userId');
    if (!userId) {
      // Si el identificador único no está almacenado en el localStorage, se genera uno nuevo
      userId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
      localStorage.setItem('userId', userId);
    }
    return userId;
}
generateUserId();

/* Crear avatar */
async function createAvatar(username) {
    const url = `https://avatars.dicebear.com/api/bottts/${username}.svg`;

    try {
        const response = await fetch(url);
        const svg = await response.text();
        
        avatarImg = document.createElement("img");
        avatarImg.setAttribute('class', 'user__img bg-light me-3');
        avatarImg.setAttribute("src", `data:image/svg+xml,${encodeURIComponent(svg)}`);
        avatarImg.setAttribute("alt", `Avatar for ${username}`);
        avatarContainer.appendChild(avatarImg);
    } catch (error) {
        console.error("Error al obtener el avatar:", error);
    }
}
createAvatar(userId);

/* Cambiar avatar con boton */
function selectAvatar() {
    localStorage.removeItem('userId');
    generateUserId();
    avatarImg.remove();
    createAvatar(userId);
}
changeAvatar.addEventListener("click", function () {selectAvatar();});

// iniciar juego al cargar la página
showQuestion();