function scrollToCenter(element) {
  const windowHeight = window.innerHeight;
  const elementHeight = element.clientHeight;
  const scrollOffset = element.getBoundingClientRect().top - (windowHeight - elementHeight) / 2;
  window.scrollBy({ top: scrollOffset, behavior: 'smooth' });
}



// NAVIGATION

document.addEventListener("DOMContentLoaded", function () {
  const burgerIcon = document.querySelector(".nav__burger-icon");
  const closeIcon = document.querySelector(".nav__close-icon");
  const menu = document.querySelector(".nav__menu");
  const links = document.querySelectorAll(".nav__link");
  const preloader = document.getElementById("preloader");

  preloader.style.display = "flex";
  window.onload = function () {
    preloader.style.display = "none";
  };

  burgerIcon.addEventListener("click", function () {
    burgerIcon.classList.add("hidden");
    menu.classList.add("active-menu");
    closeIcon.classList.add("active-icon");
  });

  closeIcon.addEventListener("click", function () {
    burgerIcon.classList.remove("hidden");
    menu.classList.remove("active-menu");
    closeIcon.classList.remove("active-icon");
  });

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Отменяем стандартное поведение ссылки

      const targetId = this.getAttribute("href"); // Получаем значение атрибута href
      const targetElement = document.querySelector(targetId); // Находим целевой элемент

      if (targetElement) {
        // Плавно прокручиваем страницу к целевому элементу
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        burgerIcon.classList.remove("hidden");
        menu.classList.remove("active-menu");
        closeIcon.classList.remove("active-icon");
      }
    });
  });




  // FORM VALIDATION
  const windowHeight = window.innerHeight;

  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const attendRadioButtons = document.querySelectorAll(
    'input[name="attendance"]'
  );
  const foodCheckboxes = document.querySelectorAll(
    'input[name="food_preference"]'
  );
  const alcoholCheckboxes = document.querySelectorAll(
    'input[name="alcohol_preference"]'
  );

  const allergyLabel = document.querySelector('label[for="allergic"]');
  // const allergyChecked = document.querySelectorAll('input[name="allergic"]');
  const allergicRadioButtons = document.querySelectorAll(
    'input[name="allergic"]'
  );
  const allergicText = document.getElementById("allergyText");
  const allergyInput = document.getElementById("allergyInput");

  const sleepoverRadioButtons = document.querySelectorAll(
    'input[name="sleepover"]'
  );
  const sleepoverLabel = document.querySelector('label[for="isSleepover"]');
 
  const nameLabel = document.querySelector('label[for="name"]');
  const attendLabel = document.querySelector('label[for="isAttend"]');
  const foodLabel = document.querySelector('label[for="food_selection"]');
  const alcoholLabel = document.querySelector('label[for="alcoholLabel"]');
  const noFoodCheckbox = document.getElementById("nothing");
const otherFoodCheckboxes = document.querySelectorAll(
  "#menuSelectionFood input[type='checkbox']:not(#nothing)"
);
const noAlcoholCheckbox = document.getElementById("without_alcohol");
const otherAlcoholCheckboxes = document.querySelectorAll(
  "#menuSelectionAlcohol input[type='checkbox']:not(#without_alcohol)"
);

  

  // Функция для отображения или скрытия поля ввода в зависимости от выбранной радиокнопки
  function toggleAllergyInput() {
      if (this.value === "Да" && this.checked) {
          allergyInput.style.display = "block";
      } else {
          allergyInput.style.display = "none";
      }
  }

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



// Предпочтения могут быть или несколько, или ни одного 
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

  // Привязываем обработчик события к каждой радиокнопке "allergic"
  allergicRadioButtons.forEach((radioButton) => {
      radioButton.addEventListener("change", toggleAllergyInput);
  });




  const notAttendRadioButton = document.getElementById('not_attend');
  const attendRadioButton = document.getElementById('attend');
  const menuSelectionFood = document.getElementById('menuSelectionFood');
  const menuSelectionAlcohol = document.getElementById('menuSelectionAlcohol');
  const allergyBox= document.getElementById('allergic-box');
  const sleepoverBox = document.getElementById('sleeper-box');
  
  notAttendRadioButton.addEventListener('change', function() {
      if (this.checked) {
          menuSelectionFood.classList.add('disabled');
          menuSelectionAlcohol.classList.add('disabled');
          allergyBox.classList.add('disabled');
          sleepoverBox.classList.add('disabled');
          
      } else {
          menuSelectionFood.classList.remove('disabled');
          menuSelectionAlcohol.classList.remove('disabled');
          allergyBox.classList.remove('disabled');
          sleepoverBox.classList.remove('disabled');
      }
  });
  
  attendRadioButton.addEventListener('change', function() {
      if (this.checked) {
          menuSelectionFood.classList.remove('disabled');
          menuSelectionAlcohol.classList.remove('disabled');
          allergyBox.classList.remove('disabled');
          sleepoverBox.classList.remove('disabled');
      }
  });







  function isDisabled(element) {
    return element.classList.contains('disabled');
}



  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное действие отправки формы
    


    // Валидация Имени и Фамилии
    
    const nameValue = nameInput.value.trim();
    if (nameValue.split(" ").length < 2) {
      nameLabel.classList.add("error"); // Добавляем класс error к метке
      alert("Введите Имя и Фамилию");
      scrollToCenter(nameLabel);
      return;
    } else {
      nameLabel.classList.remove("error");
    }

    // Валидация присутствия
    
    const attendChecked = Array.from(attendRadioButtons).some(
      (radioButton) => radioButton.checked
    );
    if (!attendChecked) {
      attendLabel.classList.add("error"); // Добавляем класс error к метке, если присутствие не выбрано
      // alert("Выберите отметку о присутствии");
      scrollToCenter(attendLabel)
      return;
    } else {
      attendLabel.classList.remove("error"); // Убираем класс error с метки, если присутствие выбрано
    }

    // Валидация предпочтений по Еде
    if (!isDisabled(menuSelectionFood)) {
      let foodChecked = false;
      foodCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
          foodChecked = true;
          foodLabel.classList.remove("error");
        }
      });
      if (!foodChecked) {
        foodLabel.classList.add("error");
        alert("Выберите хотя бы один вариант предпочтений по Еде");
        scrollToCenter(foodLabel);
        return;
      }
    }
   

    //Валидация аллергии
    if (!isDisabled(allergyBox)){
      const allergyChecked = Array.from(allergicRadioButtons).some(
        (radioButton) => radioButton.checked
      );
      if (!allergyChecked) {
        alert("Выберите есть ли у вас аллергия");
        allergyLabel.classList.add("error"); // Добавляем класс error к метке, если аллергия не выбрана
        scrollToCenter(allergyLabel)
        return;
      } else {
        allergyLabel.classList.remove("error"); // Убираем класс error с метки, если аллергия выбрана
      }


  
      const hasAllergy = getSelectedRadioButtonValue(allergicRadioButtons) === "Да";
        if (hasAllergy && !allergicText.value.trim()) {
      allergicText.classList.add("error");
      scrollToCenter(allergicText);
      return;
  } else {
    allergicText.classList.remove("error"); // Сброс цвета, если поле заполнено
  }
    }
    

    /* ************ */

    // Валидация предпочтений по Алкоголю

    if (!isDisabled(menuSelectionAlcohol)){
      let alcoholChecked = false;
    alcoholCheckboxes.forEach(function (checkbox) {
      if (checkbox.checked) {
        alcoholChecked = true;
        alcoholLabel.classList.remove("error");
      }
    });
    if (!alcoholChecked) {
      alcoholLabel.classList.add("error");
      alert("Выберите хотя бы один вариант предпочтений по Алкоголю");
      scrollToCenter(alcoholLabel)
      return;
    }
    }
    

    // Валидация планирования ночевки
    if (!isDisabled(sleepoverBox)){
      let sleepoverChecked = false;
    sleepoverRadioButtons.forEach(function (radioButton) {
      if (radioButton.checked) {
        sleepoverChecked = true;
        sleepoverLabel.classList.remove("error");
      }
    });
    if (!sleepoverChecked) {
      sleepoverLabel.classList.add("error");
      alert("Выберите планируете ли остаться на ночь после мероприятия");
      return;
    }
    }



    const formData = {
      name: nameValue,
      attendance: getSelectedRadioButtonValue(attendRadioButtons),
      allergic: getSelectedRadioButtonValue(allergicRadioButtons),
      wichAllergiс: allergicText.value,
      foodPreferences: getSelectedValues(foodCheckboxes),
      alcoholPreferences: getSelectedValues(alcoholCheckboxes),
      sleepover: getSelectedRadioButtonValue(sleepoverRadioButtons),
    };
    

    // Если все условия прошли, отправляем форму

    emailjs.send('service_e53111k','template_3am7z2s',formData).then(alert('Отправлено!'));
    form.reset();
  });
});
