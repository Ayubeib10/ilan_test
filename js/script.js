
var questions = 0;




function saveResult(x, y, z, action, isCorrect) {
    answers = JSON.parse(localStorage.getItem("answers"));
    if (!answers) answers = [];

    // answers.push(x + " " + action + " " + y + " = " + z + " ==> result:" + isCorrect);
    answers.push({ x: x, action: action, y: y, z: z, isCorrect: isCorrect });
    localStorage.setItem("answers", JSON.stringify(answers));
}

function calculate() {
    isCorrect = false;
    z = parseInt(document.getElementById("result").value);
    x = parseInt(document.getElementById("el1").value);
    y = parseInt(document.getElementById("el2").value);

    if (!z) {
        alert("please answer the question !!!!!!!!!!!!");
        return;
    }

    action = document.getElementById("calc-action").value;

    grade = parseInt(document.getElementById("grade").value);
    switch (action) {
        case "+":
            if (x + y == z) { grade++; isCorrect = true; }
            break;
        case "-":
            if (x - y == z) { grade++; isCorrect = true; }
            break;
        case "*":
            if (x * y == z) { grade++; isCorrect = true; }
            break;
        case "/":
            if (x / y == z) { grade++; isCorrect = true; }
            break;
        default:
            alert("alert!!!!");
            break;
    }
    saveResult(x, y, z, action, isCorrect);
    // if (x + y == z) grade++;

    document.getElementById("grade").value = grade;
    questions++;
    if (questions >= 5) {
        window.location.href = "./result.html";
        return;
    }
    document.getElementById("result").value = "";
    putValues();
}

function putValues() {
    const actions = "+/*-";
    x = Math.floor(Math.random() * 100);
    y = Math.floor(Math.random() * 100);

    let action = "";
    index = Math.random() * actions.length;
    console.log(index);
    action = actions.charAt(index);
    console.log(action);

    document.getElementById("calc-action").value = action;
    document.getElementById("el1").value = x;
    document.getElementById("el2").value = y;
}

function showResult() {
    answers = JSON.parse(localStorage.getItem("answers"));

    //answer object example
    // action: "+"
    // isCorrect: false
    // x: 11
    // y: 83
    // z: 1

    if (answers.length == 0) {
        alert("no result");
        return;
    }
    answers.forEach(element => {
        var color = element.isCorrect ? "green" : "red";
        document.getElementById("result").insertAdjacentHTML("afterbegin", "<h3 style='color:" + color + ";'>" + element.x + " " + element.action + " " + element.y + " =  " + element.z + " || result ==> " + element.isCorrect + "</h3><br/>");
    });
}