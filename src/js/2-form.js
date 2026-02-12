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

form.addEventListener('input', event => {
  if (Object.keys(formData).includes(event.target.name)) {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(localStorageKey, JSON.stringify(formData));
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  if (formData.email.trim() === '' || formData.message.trim() === '') {
    alert('Fill please all fields');
    return;
  }
  console.log(formData);
  localStorage.removeItem(localStorageKey);
  form.reset();
});

let dataFromLocalStorage = getLocalStorageData(localStorageKey);
if (dataFromLocalStorage) {
  console.log(dataFromLocalStorage);
  formData = { ...formData, ...dataFromLocalStorage };
  setDataToField();
}
