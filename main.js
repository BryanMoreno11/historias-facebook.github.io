//variables
let usuario = "";
let currentActive = 0;
let timer;
let paused = false;
const storyWrapper = document.querySelector(".stories-full-view .story");
let allStories = [{
        id: 0,
        author: "Walther White",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj1ubiAKrojBKW_mRvUpi4kBQs6tWmznnH52Gaoymqm5_pKGT1n9hFzjg2NdggvQOWKx0&usqp=CAU",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }
    },
    {
        id: 1,
        author: "Jesse",
        imageUrl: "https://images5.fanpop.com/image/photos/31200000/Breaking-Bad-Season-5-Promo-Photos-breaking-bad-31234879-245-350.jpg",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }
    },
    {
        id: 2,
        author: "Mike",
        imageUrl: "https://images5.fanpop.com/image/photos/31200000/Breaking-Bad-Season-5-Promo-Photos-breaking-bad-31234868-245-350.jpg",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }
    },

    {
        id: 3,
        author: "Saul Goodman",
        imageUrl: "https://i.ytimg.com/vi/Phh6zfUKGik/oar2.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLC_N_50Iwg-tfgdjHgNIYFAPA7VzA",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }

    },

    {
        id: 4,
        author: "Hank",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/d/db/Hank_Schrader_S5B.png/220px-Hank_Schrader_S5B.png",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }

    },

    {
        id: 5,
        author: "Skyler",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Skyler_White_S5B.png/220px-Skyler_White_S5B.png",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }

    },

    {
        id: 6,
        author: "Gustavo Fring",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/69/Gustavo_Fring_BCS_S3E10.png",
        comentarios: [],
        reacciones: {
            like: 0,
            love: 0,
            haha: 0,
            wow: 0,
            sad: 0,
            angry: 0
        }

    },
];
historia = {
    id: 0,
    imageUrl: "",
    comentarios: [],
    reacciones: {
        like: 0,
        love: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
    }
};
cargarHistorias();
cargarUsuario();
//funciones
//----Función para añadir una nueva historia
async function agregarHistoriaURL() {
    event.preventDefault();
    const { value: imagen } = await Swal.fire({
        title: "Ingrese la url de la imagen",
        input: "url",
        inputPlaceholder: "url de la imagen",
        showCancelButton: true,
    });
    if (imagen) {
        agregarHistoria(imagen);
    }
}
///->>>Evento para agregar una imágen
document.getElementById('inputImagen').addEventListener('change', function(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.addEventListener(
            "load",
            function() {
                var src = reader.result;
                agregarHistoria(src);
            },
            false
        );
        reader.readAsDataURL(input.files[0]);
    }
});

function agregarHistoria(url) {
    historia.id = allStories.length;
    historia.imageUrl = url;
    let ob = Object.assign({}, historia);
    allStories.push(ob);
    localStorage.setItem("historias", JSON.stringify(allStories));
    createStorie(ob, allStories.indexOf(ob));
}


//->>>>>Función para cargar las historias de Local Storage
function cargarHistorias() {
    let historias = localStorage.getItem("historias");
    historias = JSON.parse(historias);
    if (historias) {
        allStories = historias;
    }
}
//->>>>>Función para cargar usuario de Local Storage
function cargarUsuario() {
    usuario = localStorage.getItem("usuarioActual");
    historia.author = usuario;
}
/*Método que se activa cada que se envia algo de local storage, carga las historias junto
con sus comentarios*/
window.addEventListener('storage', (event) => {
    if (event.key === 'historias') {
        console.log("Local storage en accion");
        cargarHistorias();
        createStories();
        createCommentTextForCurrentStory();
        createReacciones();
    }
});

//->>>>>>Acceder a los elementos del DOM
document.getElementById("bienvenido").innerHTML = `Bienvenido ${usuario}!`
const stories = document.querySelector(".stories");
const storiesFullView = document.querySelector(".stories-full-view");
const closeBtn = document.querySelector(".close-btn");
const storyImageFull = document.querySelector(".stories-full-view .story img");
const storyAuthorFull = document.querySelector(
    ".stories-full-view .story .author"
);
const nextBtn = document.querySelector(".stories-container .next-btn");
const previousBtn = document.querySelector(".stories-container .previous-btn");
const storiesContent = document.querySelector(".stories-container .content");
const nextBtnFull = document.querySelector(".stories-full-view .next-btn");
const previousBtnFull = document.querySelector(
    ".stories-full-view .previous-btn"
);
//->>>>Crear las historias
const createStories = () => {
    let historias = document.querySelector(".stories");
    historias.innerHTML = '';
    allStories.forEach((s, i) => {
        const story = document.createElement("div");
        story.classList.add("story");
        const img = document.createElement("img");
        img.src = s.imageUrl;
        const author = document.createElement("div");
        author.classList.add("author");
        author.innerHTML = s.author;

        story.appendChild(img);
        story.appendChild(author);
        historias.appendChild(story);
        story.addEventListener("click", () => {
            showFullView(i);
        });
    });
};
//->>>>>Eliminar historias
const deleteStories = () => {
    allStories.forEach((storie) => {
        let historia = document.querySelector(".story");
        if (historia) {
            historia.remove();
        }
    })
}

//Función para crear una historia
const createStorie = (s, i) => {
    const story = document.createElement("div");
    story.classList.add("story");
    const img = document.createElement("img");
    img.src = s.imageUrl;
    const author = document.createElement("div");
    author.classList.add("author");
    author.innerHTML = s.author;
    story.appendChild(img);
    story.appendChild(author);
    stories.appendChild(story);
    story.addEventListener("click", () => {
        showFullView(i);
    });
    storiesContent.scrollLeft += 300;
};

createStories();
//->>>>>>>Crear los input comentario
function createCommentElements(index) {
    const commentInput = document.createElement("input");
    commentInput.setAttribute("type", "text");
    commentInput.setAttribute("placeholder", "Escribe un comentario...");
    commentInput.classList.add("comment-input");
    //////comentarios
    const commentBtn = document.createElement("button");
    commentBtn.innerHTML = "Comentar";
    commentBtn.classList.add("comment-btn");

    commentBtn.addEventListener("click", () => {
        const commentText = commentInput.value;
        if (commentText.trim() !== "") {
            console.log("la historia es", index);
            if (!allStories[index].comentarios) {
                [index].comentarios = []; // Inicializar si no existe
            }
            allStories[index].comentarios.push({
                author: usuario,
                comentario: commentText
            });
            createCommentTextForCurrentStory();
            commentInput.value = "";
            localStorage.setItem("historias", JSON.stringify(allStories));
            console.log("Comentario añadido:", allStories[index].comentarios);
        }
    });
    const commentSection = document.createElement("div");
    commentSection.classList.add("comment-section");
    commentSection.appendChild(commentInput);
    commentSection.appendChild(commentBtn);
    return commentSection;
}
//->>>>>>>Crear los text comentario
function createCommentElementsText(index) {
    const comentariosContainer = document.createElement('details');
    comentariosContainer.innerHTML = '<summary>Ver Comentarios</summary>';
    const allComments = allStories[index].comentarios;
    let commentsToShow = allComments;
    if (allStories[index].author !== usuario) {
        commentsToShow = allComments.filter(comment => comment.author == usuario);
    }
    commentsToShow.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerText = `${comment.comentario} (${comment.author})`;
        comentariosContainer.appendChild(commentElement);
    });

    comentariosContainer.classList.add("comment-text");
    return comentariosContainer;
}

///->>>>Evento que desencadena la vista completa de las historias
const showFullView = (index) => {
    paused = false;
    currentActive = index;
    updateFullView();
    storiesFullView.classList.add("active");
    createReacciones();
    createCommentInputForCurrentStory();
    createCommentTextForCurrentStory();
    startTimer();
};
//->>>>>>>>Crear el comentario Input
const createCommentInputForCurrentStory = () => {
    // Limpiar cualquier comentario anterior
    const commentSection = document.querySelector(".comment-section");
    if (commentSection) {
        commentSection.remove();
    }
    // Crear el input de comentario solo para la historia actual
    const currentStory = allStories[currentActive];
    if (currentStory.author !== usuario) {
        const commentSection = createCommentElements(currentActive);
        storiesFullView.appendChild(commentSection);
    }
};
//->>>>>>>>Crear el comentario Text
const createCommentTextForCurrentStory = () => {
    // Limpiar cualquier comentario anterior
    let commentText = document.querySelector(".comment-text");
    if (commentText) {
        console.log("El comentario texto");
        commentText.remove();
    }
    commentText = createCommentElementsText(currentActive);
    storiesFullView.appendChild(commentText);
};
//->>>>>>Crear reacciones
const createReacciones = () => {
    //Eliminar reacciones anteriores
    let reacciones = document.querySelector(".reacciones");
    if (reacciones) {
        reacciones.remove();
    }

    const reaccionesDiv = document.createElement('div');
    reaccionesDiv.classList.add('reacciones');
    const emojis = [
        { class: 'like', emoji: '&#x1F44D;' },
        { class: 'love', emoji: '&#x2764;' },
        { class: 'haha', emoji: '&#x1F604;' },
        { class: 'wow', emoji: '&#x1F62E;' },
        { class: 'sad', emoji: '&#x1F622;' },
        { class: 'angry', emoji: '&#x1F620;' },
    ];
    emojis.forEach(emoji => {
        const button = document.createElement('button');
        button.classList.add(emoji.class);
        console.log(allStories[currentActive].reacciones);
        reaccionesDiv.appendChild(button);
        button.innerHTML = emoji.emoji + allStories[currentActive].reacciones[emoji.class];
        button.addEventListener('click', function() {
            if (allStories[currentActive].author != usuario) {
                allStories[currentActive].reacciones[button.className]++;
                localStorage.setItem("historias", JSON.stringify(allStories));
                button.innerHTML = emoji.emoji + allStories[currentActive].reacciones[emoji.class];
            }
        });

    });
    storiesFullView.appendChild(reaccionesDiv);
}
const startTimer = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
        if (!paused) { // Si la historia no está pausada, avanza automáticamente
            nextStory();
        } else { // Si está pausada, reinicia el temporizador
            startTimer();
        }
    }, 5000);
};

const nextStory = () => {
    if (currentActive >= allStories.length - 1) {
        return;
    }
    currentActive++;
    updateFullView();
    storiesFullView.scrollLeft += 300; // Avanza automáticamente al siguiente
    startTimer();
};

const pauseStory = () => {
    clearTimeout(timer);
    paused = !paused; // Cambia el estado de pausa al hacer clic en la historia
    startTimer(); // Reinicia el temporizador
    storyWrapper.classList.toggle("paused");

};

storyImageFull.addEventListener("click", () => {
    pauseStory();
});


closeBtn.addEventListener("click", () => {
    storiesFullView.classList.remove("active");
    paused = true;
    storyWrapper.classList.remove("paused");

});

const updateFullView = () => {
    storyImageFull.src = allStories[currentActive].imageUrl;
    storyAuthorFull.innerHTML = allStories[currentActive].author;
    createReacciones();
    createCommentInputForCurrentStory();
    createCommentTextForCurrentStory();
};

nextBtn.addEventListener("click", () => {

    storiesContent.scrollLeft += 300;
});

previousBtn.addEventListener("click", () => {
    storiesContent.scrollLeft -= 300;
});

const auto = true;
const intervalTime = 5000;

storiesContent.addEventListener("scroll", () => {
    if (storiesContent.scrollLeft <= 24) {
        previousBtn.classList.remove("active");
    } else {
        previousBtn.classList.add("active");
    }

    let maxScrollValue =
        storiesContent.scrollWidth - storiesContent.clientWidth - 24;

    if (storiesContent.scrollLeft >= maxScrollValue) {
        nextBtn.classList.remove("active");
    } else {
        nextBtn.classList.add("active");
    }
});

nextBtnFull.addEventListener("click", () => {
    if (currentActive >= allStories.length - 1) {
        return;
    }
    currentActive++;
    updateFullView();
});

previousBtnFull.addEventListener("click", () => {
    if (currentActive <= 0) {
        return;
    }
    currentActive--;
    updateFullView();
});