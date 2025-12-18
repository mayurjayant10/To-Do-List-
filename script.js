document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("input");
  const addbutton = document.getElementById("add-btn");
  const list = document.getElementById("list");

  let tasks = JSON.parse(localStorage.getItem("task")) || [];

  
  tasks.forEach((task) => render(task));

  
  addbutton.addEventListener("click", () => {
    const taskslist = input.value.trim();
    if (taskslist === "") return;

    const oldlist = {
      id: Date.now(),
      item: taskslist,
      completed: false,
    };

    tasks.push(oldlist);
    input.value = "";
    savetask();
    render(oldlist);
  });

 
  function savetask() {
    localStorage.setItem("task", JSON.stringify(tasks));
  }

  function render(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.item}</span>
      <button>DELETE</button>
    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        task.completed = !task.completed;
        li.classList.toggle("completed");
        savetask();
      }
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      savetask();
    });

    list.appendChild(li);
  }
});
