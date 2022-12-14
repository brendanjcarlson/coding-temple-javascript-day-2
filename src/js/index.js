// This is just something I found on codepen that recreates Stripe's landing page effect.
// Thought it looked cool :)
let x, y;
const canvasEl = document.getElementById('canvas');
var canvasElCtx = canvasEl.getContext('2d');

const genColor = (x, y, r, g, b) => {
    canvasElCtx.fillStyle = `rgb(${r},${g},${b})`;
    canvasElCtx.fillRect(x, y, 1, 1);
};
const genRed = (x, y, t) =>
    Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
const genGreen = (x, y, t) =>
    Math.floor(
        192 +
            64 *
                Math.sin(
                    (x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300
                )
    );

const genBlue = (x, y, t) =>
    Math.floor(
        192 +
            64 *
                Math.sin(
                    5 * Math.sin(t / 9) +
                        ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100
                )
    );

let t = 0;
const run = () => {
    for (x = 0; x <= 35; x++) {
        for (y = 0; y <= 35; y++) {
            genColor(
                x,
                y,
                genRed(x, y, t),
                genGreen(x, y, t),
                genBlue(x, y, t)
            );
        }
    }
    t = t + 0.008;
    window.requestAnimationFrame(run);
};
run();
// End of codepen code
const modifyList = (actionType, todoContent) => {
    const todoHTML = `
    <li class="app__list__list__item">
        <button id="${actionType === 'add' ? 'btnComplete' : 'btnRemove'}">
            <i class="fa-sharp fa-solid fa-${
                actionType === 'add' ? 'check' : 'minus'
            } fa-xs"></i>
        </button>
        <p>${todoContent}</p>
    </li>`;
    const list = document.getElementById(
        `${actionType === 'add' ? 'todoList' : 'doneList'}`
    );
    list.insertAdjacentHTML(
        `${actionType === 'add' ? 'beforeend' : 'afterbegin'}`,
        todoHTML
    );
};

const form = document.querySelector('.app__form');
const todoList = document.getElementById('todoList');
const doneList = document.getElementById('doneList');
const startOver = document.getElementById('startOver');

form.addEventListener('submit', e => {
    e.preventDefault();
    const todo = document.getElementById('newTodo');
    modifyList('add', todo.value);
    todo.value = '';
});

todoList.addEventListener('click', e => {
    e.preventDefault();
    const todo = e.target.closest('li');
    modifyList('remove', todo.innerText);
    console.log(todo);
    todoList.removeChild(todo);
});

doneList.addEventListener('click', e => {
    e.preventDefault();
    doneList.removeChild(e.target.closest('li'));
});

startOver.addEventListener('click', e => {
    e.preventDefault();
    while (todoList.firstChild || doneList.firstChild) {
        todoList.removeChild(todoList.firstChild);
        doneList.removeChild(doneList.firstChild);
    }
});
// btnComplete moves closest li item to complete
// btnRemove removes closest li item
// give up on today button resets entire list
