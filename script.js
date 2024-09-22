const checkbox = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressLabel = document.querySelector(".progress-label");
const progressValue = document.querySelector(".progress-value");
const num =document.querySelector(".num")
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well began its half done!",
  "Just a step away keep going!",
  "Whoa! you just completed almost all the goals ,time for chill!",
  "you are very consistent good for you !!"
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {}


// const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
//     first :{
//         name: '',
//         completed: false,
//     },
//     second :{
//         name: '',
//         completed: false,
//     },
//     third :{
//         name: '',
//         completed: false,
//     }
// };



let completedGoalsCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressValue.style.width = `${(completedGoalsCount /inputFields.length)*100}% `
progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed `;
progressLabel.innerText = allQuotes[completedGoalsCount];


checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allFieldsFilled = [...inputFields].every((input) => {
      return input.value;
    });
    console.log(allFieldsFilled);
    if (allFieldsFilled) {
      checkbox.parentElement.classList.toggle("completed");
      //   progressValue.style.width = "33.33%";
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      //   console.log(completedGoalsCount)
      progressValue.style.width = `${(completedGoalsCount / inputFields.length) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/${inputFields.length} completed `;
      num.innerText=`${inputFields.length}`;
      progressLabel.innerText = allQuotes[completedGoalsCount];

      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorLabel.parentElement.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
if(allGoals[input.id]){
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }
}

  input.addEventListener("focus", () => {
    errorLabel.parentElement.classList.remove("show-error");
  });

  input.addEventListener("input", (evt) => {
    if (allGoals[input.id] && allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    if(allGoals[input.id]){

    allGoals[input.id].name = input.value;
    } else {
        allGoals[input.id]={
            name: input.value,
            completed: false,
        }
    }

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
