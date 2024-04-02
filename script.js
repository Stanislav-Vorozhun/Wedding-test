// NAVIGATION

const toggleElementClasses = (elements, className) => {
  elements.forEach((element) => element.classList.toggle(className));
};

const overlay = document.getElementById("overlay");
const hamburgerMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".hideScreen");

const toggleMenu = () => {
  toggleElementClasses([overlay, hamburgerMenu, offScreenMenu], "active");
  if (!overlay.classList.contains("active")) {
    enableScroll();
  } else {
    disableScroll();
  }
};

function disableScroll() {
  const scrollY = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollY}px`;
}

function enableScroll() {
  const scrollY = document.body.style.top;
  document.body.style.position = "";
  document.body.style.top = "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
}

hamburgerMenu.addEventListener("click", () => {
  toggleMenu();
});

document.querySelectorAll(".header__item-text").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault(); // Предотвращаем переход по ссылке по умолчанию
    const targetId = item.getAttribute("href"); // Получаем идентификатор элемента, к которому нужно прокрутить
    const targetElement = document.querySelector(targetId); // Находим элемент по идентификатору
    if (targetElement) {
      // Если элемент найден
      toggleMenu();
      window.scrollTo({
        top: targetElement.offsetTop, // Прокручиваем страницу к верху элемента
        behavior: "smooth", // Добавляем плавную анимацию
      });
    }
  });
});

// FORM

const senderName = document.getElementById("name");
const attendanceRadioButtons = document.getElementsByName("attendance");
const allergicRadioButtons = document.getElementsByName("allergic");
const allergicText = document.getElementById("allergyText");
const sleepoverRadioButtons = document.getElementsByName("sleepover");
const menuSelectionWrapper = document.querySelector(".menuSelection__wrapper");
const checkboxes = menuSelectionWrapper.querySelectorAll(
  'input[type="checkbox"]'
);
const foodCheckboxes = document.querySelectorAll(
  '#menuSelectionFood input[type="checkbox"]'
);
const alcoholCheckboxes = document.querySelectorAll(
  '#menuSelectionAlcohol input[type="checkbox"]'
);
const submitButton = document.querySelector(".submit_form");

const getSelectedRadioButtonValue = (radioButtons) => {
  return (
    Array.from(radioButtons).find((radioButton) => radioButton.checked)
      ?.value || ""
  );
};

const getSelectedValues = (checkboxes) => {
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
};

const disableFormElements = (disable) => {
  const elementsToDisable = document.querySelectorAll(
    "label, input, select, textarea"
  );
  elementsToDisable.forEach((element) => {
    if (element.name !== "attendance" && element.id !== "name") {
      element.disabled = disable;
      element.classList.toggle("locked", disable);
    }
  });
};

document.querySelectorAll('input[name="attendance"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Нет") {
      disableFormElements(true);
    } else {
      disableFormElements(false);
    }
  });
});

const noFoodCheckbox = document.getElementById("nothing");
const otherFoodCheckboxes = document.querySelectorAll(
  "#menuSelectionFood input[type='checkbox']:not(#nothing)"
);
const noAlcoholCheckbox = document.getElementById("without_alcohol");
const otherAlcoholCheckboxes = document.querySelectorAll(
  "#menuSelectionAlcohol input[type='checkbox']:not(#without_alcohol)"
);

const handleCheckboxGroup = (noCheckbox, otherCheckboxes) => {
  noCheckbox.addEventListener("change", () => {
    if (noCheckbox.checked) {
      otherCheckboxes.forEach((checkbox) => (checkbox.checked = false));
    }
  });

  otherCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (noCheckbox.checked) {
        noCheckbox.checked = false;
      }
    });
  });
};

handleCheckboxGroup(noFoodCheckbox, otherFoodCheckboxes);
handleCheckboxGroup(noAlcoholCheckbox, otherAlcoholCheckboxes);

//  Валидация Радиобатонов

const allergyInput = document.getElementById("allergyInput");
// Функция для отображения или скрытия поля ввода в зависимости от выбранной радиокнопки
function toggleAllergyInput() {
  if (this.value === "Да") {
    allergyInput.style.display = "block";
  } else {
    allergyInput.style.display = "none";
  }
}

// function validateRadioButtons(radioButtons, label) {
//   let isChecked = false;
//   radioButtons.forEach((radio) => {
//       if (radio.checked) {
//           isChecked = true;
//       }
//   });
//   if (!isChecked) {
//       label.style.color = 'red';
//       return false;
//   } else {
//       label.style.color = '';
//       return true;
//   }
// }

const allergicLabel = document.querySelector('label[for="isAllergic"]');

allergicRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", toggleAllergyInput);
});


const sleepoverRadios = document.querySelectorAll('input[name="sleepover"]');
const sleepoverLabel = document.querySelector('label[for="sleepover"]');

// Добавляем обработчик событий для изменения выбора
sleepoverRadios.forEach(function (radio) {
  radio.addEventListener("change", function () {
    validateSleepover();
  });
});

function validateAllergic() {
  let isChecked = false;
  allergicRadioButtons.forEach((radio)=>{
    if(radio.checked) {
      isChecked = true;
    }
  });
  if (!isChecked) {
    allergicLabel.style.color = 'red';
    return false;
  } else {
    allergicLabel.style.color = '';
    return true
  }
}


function validateSleepover() {
  let isChecked = false;
  // Проверяем, выбран ли один из вариантов
  sleepoverRadios.forEach(function (radio) {
    if (radio.checked) {
      isChecked = true;
    }
  });

  // Если ни один вариант не выбран, меняем цвет текста на красный
  if (!isChecked) {
    sleepoverLabel.style.color = "red";
    return false;
  } else {
    sleepoverLabel.style.color = ''; // Сбрасываем цвет текста
    return true;
  }
}




// ОТПРАВКА ФОРМЫ
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!senderName.value.trim()) {
    senderName.style.color = "red";
    document.querySelector('label[for="name"]').style.color = "red";
    senderName.focus();
    senderName.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  } else {
    senderName.style.color = "black";
    document.querySelector('label[for="name"]').style.color = "black";
  }

  const hasAllergy = getSelectedRadioButtonValue(allergicRadioButtons) === "Да";
  if (hasAllergy && !allergicText.value.trim()) {
    allergicText.style.color = "red";
    allergicText.focus();
    allergicText.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  } else {
    allergicText.style.color = "";
  }

  if (!validateAllergic() ) {
    event.preventDefault();
  }

  if (!validateSleepover()) {
    event.preventDefault(); // Отменяем отправку формы, если поле не прошло валидацию
  }
  else {

    const formData = {
      name: senderName.value,
      attendance: getSelectedRadioButtonValue(attendanceRadioButtons),
      allergic: getSelectedRadioButtonValue(allergicRadioButtons),
      wichAllergiс: allergicText.value,
      foodPreferences: getSelectedValues(foodCheckboxes),
      alcoholPreferences: getSelectedValues(alcoholCheckboxes),
      sleepover: getSelectedRadioButtonValue(sleepoverRadioButtons),
    };
  
    emailjs.send('service_e53111k','template_3am7z2s',formData).then(alert('Отправлено!'));
    event.target.form.reset();

  }

  

  // const formData = {
  //   name: senderName.value,
  //   attendance: getSelectedRadioButtonValue(attendanceRadioButtons),
  //   allergic: getSelectedRadioButtonValue(allergicRadioButtons),
  //   wichAllergiс: allergicText.value,
  //   foodPreferences: getSelectedValues(foodCheckboxes),
  //   alcoholPreferences: getSelectedValues(alcoholCheckboxes),
  //   sleepover: getSelectedRadioButtonValue(sleepoverRadioButtons),
  // };

  // // emailjs.send('service_e53111k','template_3am7z2s',formData).then(alert('Отправлено!'));
  // event.target.form.reset();
});
