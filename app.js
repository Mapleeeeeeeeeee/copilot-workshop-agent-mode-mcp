const STORAGE_KEY = "offline-todos";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");

let todos = loadTodos();
let currentFilter = "all";
const THEME_STORAGE_KEY = "todo-theme";
const THEME_LABELS = {
  light: "🌙 深色模式",
  dark: "☀️ 淺色模式",
};

// 依照使用者選擇或作業系統設定套用主題。
function applyTheme(themePreference = localStorage.getItem(THEME_STORAGE_KEY)) {
  if (themePreference === "light" || themePreference === "dark") {
    document.documentElement.dataset.theme = themePreference;
  } else {
    delete document.documentElement.dataset.theme;
  }

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const activeTheme = themePreference || (isDark ? "dark" : "light");
  themeToggle.textContent = THEME_LABELS[activeTheme];
  themeToggle.setAttribute("aria-label", `切換至${activeTheme === "dark" ? "淺色" : "深色"}模式`);
}

// 從 localStorage 讀取資料，格式錯誤時回傳空清單。
function loadTodos() {
  try {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
    return Array.isArray(parsedTodos) ? parsedTodos : [];
  } catch {
    return [];
  }
}

// 將目前的待辦清單保存到 localStorage。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 產生每筆待辦事項使用的唯一識別碼。
function createTodoId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// 根據資料重新繪製待辦清單與未完成數量。
function render() {
  list.replaceChildren();

  const visibleTodos = todos.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = todo.completed ? "todo-item completed" : "todo-item";
    item.dataset.todoId = todo.id;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `完成「${todo.text}」`);

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  emptyState.textContent = todos.length === 0
    ? "還沒有任何待辦事項,新增一個吧!"
    : `目前沒有符合「${currentFilter === "active" ? "未完成" : "已完成"}」篩選的待辦事項，項目仍保留在清單中。`;
  remainingCount.textContent = `未完成:${todos.filter((todo) => !todo.completed).length} 項`;
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.dataset.theme === "dark"
    || (!document.documentElement.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  const nextTheme = isDark ? "light" : "dark";
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    render();
  });
});

// 新增一筆待辦事項，空白內容不會被加入。
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }

  todos.push({ id: createTodoId(), text, completed: false });
  saveTodos();
  render();
  input.value = "";
  input.focus();
});

// 用事件委派處理勾選與刪除操作。
list.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;

  const todoId = item.dataset.todoId;
  const todo = todos.find((currentTodo) => currentTodo.id === todoId);
  if (!todo) return;

  if (event.target.matches(".todo-checkbox")) {
    todo.completed = !todo.completed;
  }

  if (event.target.matches(".delete-button")) {
    todos = todos.filter((currentTodo) => currentTodo.id !== todoId);
  }

  saveTodos();
  render();
});

applyTheme();
render();
