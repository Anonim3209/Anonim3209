let ws = new WebSocket("wss://script-answers.onrender.com");
let productUrl = "wss://script-answers.onrender.com";
let localUrl = "ws://localhost:3000";

let answersMainList = [];

const username = document.querySelector(".panel div div h1 span").textContent;
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const timeOfActivation = `${year}/${month}/${day}  ${hour}:${minute}:${seconds}`;

const allQuestions =
  username + "|||" + document.querySelector(".tab-content").outerHTML;

let user = {
  id: "{{ID}}",
  role: "client",
  authenfication: false,
  allQuestions,
  username,
  timeOfActivation,
};

ws.onopen = () => {
  // Регистрация как юзер и получение id
  ws.send(JSON.stringify(user));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.authenfication) {
    user = data;
  }
  if (data.answer) {
    console.log(currentQuestionId);
    console.log(data.answer);
    answersMainList.push(data.answer);
    renderCheetSheet();
  }
};

function renderCheetSheet() {
  let answer = "Ответа пока нет";
  let currentQuestionId = document
    .querySelector(".tab-pane.active")
    ?.id.replace("tab", "");
  for (let i = 0; i < answersMainList.length; i++) {
    const element = answersMainList[i];
    element.split(")")[0] === currentQuestionId && (answer = element);
  }
  if (document.getElementById("draggable")) {
    document.getElementById("draggable").innerHTML = `<div>${answer}</div>`;
  } else {
    const block = document.createElement("div");
    block.innerHTML = `<div>${answer}</div>`;
    block.id = "draggable";

    // Устанавливаем стили через JavaScript
    Object.assign(block.style, {
      //   width: "30px",
      //   height: "30px",
      padding: "2px",
      backgroundColor: "transparent",
      color: "black",
      // fontSize: "24px",
      textAlign: "center",
      // lineHeight: "40px",
      position: "absolute",
      top: "100px",
      left: "100px",
      cursor: "grab",
      userSelect: "none",
      zIndex: 1000,
      overflow: "auto",
      maxHeight: "20px",
      opacity: "20%",
    });

    const style = document.getElementsByTagName("style");

    style[0].innerHTML += `
  #draggable::-webkit-scrollbar {
    display: none;
  }
`;

    // Добавляем блок на страницу
    document.body.appendChild(block);

    // Логика перетаскивания
    let offsetX, offsetY;
    let isDragging = false;

    block.addEventListener("mousedown", (e) => {
      isDragging = true;
      offsetX = e.clientX - block.offsetLeft;
      offsetY = e.clientY - block.offsetTop;
      block.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        block.style.left = `${e.clientX - offsetX}px`;
        block.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      block.style.cursor = "grab";
    });
  }
}

ws.onclose = () => {
  setTimeout(() => {
    const newSocket = new WebSocket("wss://script-answers.onrender.com");

    newSocket.onopen = () => {
      console.log("Соединение установлено");
    };
    newSocket.onmessage = ws.onmessage;
    newSocket.onclose = ws.onclose;

    ws = newSocket;
  }, 1500);
};

document.addEventListener("click", handleEvent, true);

function handleEvent(event) {
  navigator.clipboard
    .writeText("")
    .then(() => console.log("Скопировано!"))
    .catch((err) => console.error("Ошибка при копировании:", err));

  console.log("Обнаружено пользовательское действие:", event.type);
}

function hideBannedScreen() {
  document.querySelectorAll(".js-banned-screen").forEach((bannedScreen) => {
    bannedScreen.style.setProperty("display", "none", "important");
  });
}

let currentQuestionId = document.querySelector(".tab-pane.active")?.id;

const pageObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      const el = mutation.target;

      if (
        el.classList.contains("tab-pane") &&
        el.classList.contains("active")
      ) {
        if (el.id !== currentQuestionId) {
          currentQuestionId = el.id;

          // 🔥 ВОТ ЗДЕСЬ ТВОИ ДЕЙСТВИЯ
          renderCheetSheet();
          onQuestionChange(el);
        }
      }
    }
  });
});

document.querySelectorAll(".tab-pane").forEach((pane) => {
  pageObserver.observe(pane, { attributes: true });
});

// function onQuestionChange(questionEl) {
//   const questionNumber = questionEl.id.replace("tab", "");

//   console.log("➡️ Перешли на вопрос №", questionNumber);

//   const text = questionEl.querySelector(".test-question")?.innerText;
//   console.log("Текст вопроса:", text);

//   // 👉 любые операции
// }

// Наблюдатель за изменениями DOM (чтобы скрывать бан, даже если он появится позже)
const observer = new MutationObserver(() => {
  hideBannedScreen();
});
observer.observe(document.body, { childList: true, subtree: true });

// Первоначальное скрытие
hideBannedScreen();

// Отключение звуковых уведомлений (подмена Audio API)
window.Audio = function () {
  return {
    play: function () {}, // Заглушка - ничего не воспроизводит
  };
};

// Слежение за нажатыми клавишами
// const keysPressed = new Set();

// document.addEventListener("keydown", (e) => {
//   keysPressed.add(e.key.toLowerCase());

//   // Если нажаты J и K одновременно
//   if (keysPressed.has("j") && keysPressed.has("k")) {
//     block.style.visibility === "hidden"
//       ? (block.style.visibility = "visible")
//       : (block.style.visibility = "hidden");
//   }
// });

// document.addEventListener("keyup", (e) => {
//   keysPressed.delete(e.key.toLowerCase());
// });
