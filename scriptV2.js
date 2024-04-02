const toggleElementClasses = (elements, className) => {
  elements.forEach((element) => element.classList.toggle(className));
};

// Функция для блокировки/разблокировки прокрутки страницы
const toggleScroll = () => {
  const scrollY = window.scrollY;
  const body = document.body;
  body.style.position = body.style.position === "fixed" ? "" : "fixed";
  body.style.top = body.style.position === "fixed" ? `-${scrollY}px` : "";
  window.scrollTo(0, parseInt(scrollY || "0") * -1);
};

// Функция для скрытия/показа поля ввода в зависимости от выбранной радиокнопки
const toggleAllergyInput = () => {
  allergyInput.style.display = allergicRadioButtons.value === "Да" ? "block" : "none";
};

// Функция для валидации радиобатонов
const validateRadioButtons = (radioButtons, labelForRadio) => {
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      const nameLabel = document.querySelector(`label[for="${labelForRadio}"]`);
      const isChecked = Array.from(radioButtons).some((radioButton) => radioButton.checked);
      nameLabel.style.color = isChecked ? "" : "red";
    });
  });
};

// Функция для включения/отключения элементов формы
const toggleFormElements = (elements, disable) => {
  elements.forEach((element) => {
    if (element.name !== "attendance" && element.id !== "name") {
      element.disabled = disable;
      element.classList.toggle("locked", disable);
    }
  });
};

// Функция для обработки группы чекбоксов
const handleCheckboxGroup = (noCheckbox, otherCheckboxes) => {
  noCheckbox.addEventListener("change", () => {
    otherCheckboxes.forEach((checkbox) => (checkbox.checked = !noCheckbox.checked));
  });
};

// Функция для получения выбранных значений из группы чекбоксов
const getSelectedValues = (checkboxes) => {
  return Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
};


// Функция для получения значения выбранной радиокнопки
const getSelectedRadioButtonValue = (radioButtons) => {
  return Array.from(radioButtons).find((radioButton) => radioButton.checked)?.value || "";
};







// NAVIGATION

const overlay = document.getElementById("overlay");
const hamburgerMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".hideScreen");

const toggleMenu = () => {
  toggleElementClasses([overlay, hamburgerMenu, offScreenMenu], "active");
  toggleScroll();
};

hamburgerMenu.addEventListener("click", toggleMenu);

document.querySelectorAll(".header__item-text").forEach((item) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = item.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      toggleMenu();
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// FORM

const senderName = document.getElementById("name");
const attendanceRadioButtons = document.querySelectorAll('input[name="attendance"]');
const allergicRadioButtons = document.querySelectorAll('input[name="allergic"]');
const allergicText = document.getElementById("allergyText");
const sleepoverRadioButtons = document.querySelectorAll('input[name="sleepover"]');
const foodCheckboxes = document.querySelectorAll('#menuSelectionFood input[type="checkbox"]');
const alcoholCheckboxes = document.querySelectorAll('#menuSelectionAlcohol input[type="checkbox"]');
const submitButton = document.querySelector(".submit_form");
const allergyInput = document.getElementById("allergyInput");

// Валидация радиобатонов
validateRadioButtons(attendanceRadioButtons, 'attend');
validateRadioButtons(allergicRadioButtons, 'allergyText');

// Обработка радиобатонов "Нет"
attendanceRadioButtons.forEach((radio) => {
  radio.addEventListener("change", () => {
    toggleFormElements([senderName, ...foodCheckboxes, ...alcoholCheckboxes], radio.value === "Нет");
  });
});

// Обработка групп чекбоксов
const otherFoodCheckboxes = document.querySelectorAll('#menuSelectionFood input[type="checkbox"]:not(#nothing)');
const otherAlcoholCheckboxes = document.querySelectorAll('#menuSelectionAlcohol input[type="checkbox"]:not(#without_alcohol)');

handleCheckboxGroup(document.getElementById("nothing"), otherFoodCheckboxes);
handleCheckboxGroup(document.getElementById("without_alcohol"), otherAlcoholCheckboxes);

// Обработка поля аллергии
allergicRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", toggleAllergyInput);
});

// Обработка отправки формы
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

  const hasAllergy = allergicRadioButtons.value === "Да";
  if (hasAllergy && !allergicText.value.trim()) {
    allergicText.style.color = "red";
    allergicText.focus();
    allergicText.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  } else {
    allergicText.style.color = "";
  }

  const formData = {
    name: senderName.value,
    attendance: getSelectedRadioButtonValue(attendanceRadioButtons),
    allergic: getSelectedRadioButtonValue(allergicRadioButtons),
    wichAllergiс: allergicText.value,
    foodPreferences: getSelectedValues(foodCheckboxes),
    alcoholPreferences: getSelectedValues(alcoholCheckboxes),
    sleepover: getSelectedRadioButtonValue(sleepoverRadioButtons),
  };

  console.log(formData);
  alert("Отправлено!");
  event.target.form.reset();
});