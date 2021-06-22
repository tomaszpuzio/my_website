const holeElement = document.getElementById("top-half-hole-img");
const hiElement = document.getElementById("hi-img");
const thxElement = document.getElementById("thx-img");
const topHalfHoleElement = document.getElementById("top-half-hole-img");
const bottomHalfHoleElement = document.getElementById("bottom-half-hole-img");
const chatbotElement = document.getElementById("chatbot");
const form = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");
const fields = {
  csrf_token: {
    input: document.getElementById("csrf_token"),
    error: document.getElementById("csrf_token-error-text"),
    img: document.getElementById("csrf_token-error-img")
  },
  name: {
    input: document.getElementById("name-input"),
    error: document.getElementById("name-error-text"),
    img: document.getElementById("name-error-img")
  },
  email: {
    input: document.getElementById("email-input"),
    error: document.getElementById("email-error-text"),
    img: document.getElementById("email-error-img")
  },
  message: {
    input: document.getElementById("message-input"),
    error: document.getElementById("message-error-text"),
    img: document.getElementById("message-error-img")
  }
};

function isElementInViewport (el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function onVisibilityChange(el, callback) {
  var old_visible;
  return function () {
    var visible = isElementInViewport(el);
    if (visible != old_visible) {
      old_visible = visible;
      callback(visible);
    }
  }
}

function onTransitionChange() {
  hiElement.style.display = "flex";
}

var chatBotHandler = onVisibilityChange(holeElement, function(visible) {
  if (visible) {
    chatbotElement.addEventListener("webkitTransitionEnd", onTransitionChange);
    chatbotElement.style.top = "130px";
  } else {
    chatbotElement.removeEventListener("webkitTransitionEnd", onTransitionChange);
    hiElement.style.display = "none";
    chatbotElement.style.top = "320px";
  }
});


window.addEventListener('scroll', chatBotHandler, false);

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      csrf_token: fields.csrf_token.input.value,
      name: fields.name.input.value,
      email: fields.email.input.value,
      message: fields.message.input.value
    })
  });

  if (response.ok) {
    successMessage.innerHTML = await response.text();
    hiElement.style.display = "none";

    setTimeout(() => {
      thxElement.style.display = "flex";

      setTimeout(() => {
        thxElement.style.display = "none";
        chatbotElement.style.top = "320px";
        chatbotElement.removeEventListener("webkitTransitionEnd", onTransitionChange);
        window.removeEventListener('scroll', chatBotHandler, false);

        setTimeout(() => {
          topHalfHoleElement.style.width = "0";
          bottomHalfHoleElement.style.width = "0";
          topHalfHoleElement.style.height = "0";
          bottomHalfHoleElement.style.height = "0";
        }, 1000);
      }, 1000);
    }, 500);

    form.style.display = "none";
    successMessage.style.display = "block";
    Object.keys(fields).forEach(key => {
      fields[key].img.className = "error-img hide";
    });
  } else {
    const errors = await response.json();
    Object.keys(errors).forEach(key => {
      if (fields[key] !== undefined) {
        fields[key].input.classList.add("is-invalid");
        fields[key].error.classList.add("invalid-feedback");
        fields[key].img.className = "error-img";

        fields[key].error.innerHTML = errors[key][0];
      }
    });
  }
});
