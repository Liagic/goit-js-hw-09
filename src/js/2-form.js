function getLocalStorageData(key) {
  const data = localStorage.getItem(key);
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }
  return null;
}
function setDataToField() {
  form.email.value = formData.email;
  form.message.value = formData.message;
}
let formData = {
  email: '',
  message: '',
};
const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';
let dataFromLocalStorage = getLocalStorageData(localStorageKey);
if (dataFromLocalStorage) {
  console.log(dataFromLocalStorage);
  formData = { ...formData, ...dataFromLocalStorage };
  setDataToField();
}

form.addEventListener('input', event => {
  if (Object.keys(formData).includes(event.target.name)) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email && formData.message) {
    console.log(formData);
    localStorage.removeItem(localStorageKey);
    formData = {
      email: '',
      message: '',
    };
    form.reset();
    return;
  }
  alert('Fill please all fields');
});
