let isChuTi = true;
let problems_number = 10;
let problemAnswer;
let answerForDisplay;
let timerInterval; // 新增全局变量，用于存储计时器
let startTime; // 新增全局变量，用于存储开始时间
let problemType = 'plus'; // 新增全局变量，用于存储问题类型


function displayProblems() {
    // console.log("Current problemType:", problemType); // 打印当前的problemType
    let problemButton = document.getElementById("problemButton");
    let problemContainer = document.getElementById("problemContainer");
    
    if(isChuTi) {       
        let problems;
        if (problemType === 'plus') {
            problems = createPlusProblems(problems_number);
            problemType = 'mul';
        } else {
            problems = createMulProblems(problems_number);
            problemType = 'plus';
        }
        answerForDisplay = problems.map(problem => problem.a).join("<br>");
        problemContainer.innerHTML = problems.map(problem => problem.p).join("<br>");
        // problemContainer.innerHTML = problems.map(problem => `<span style="display: inline-block; width: 50%;">${problem.p}</span>`).join("<br>");
        problemButton.innerHTML = "显示答案";
        isChuTi = false;
        startTime = new Date(); // 记录开始时间
        startTimer(); // 第一次点击按钮，启动计时器
    } else {
        problemContainer.innerHTML = answerForDisplay;
        problemButton.innerHTML = "出题";
        isChuTi = true;
        clearInterval(timerInterval); // 第二次点击按钮，停止计时器
    }
    
}

function createPlusProblems(problems_number) {
    let res = [];
    while (problems_number >= 0) {
        let num1 = Math.floor(Math.random() * 900) + 100; 
        let num2 = Math.floor(Math.random() * 900) + 100; 
        let num3 = Math.floor(Math.random() * 900) + 100; 
        let op1 = Math.random() < 0.5? '+' : '-';
        let op2 = Math.random() < 0.5? '+' : '-';
        // 确保不出现连加和连减的情况
        if (op1 === op2) {
            op2 = op2 === '+'? '-' : '+';
        }
        problemAnswer = solveProblem(num1, num2, num3, op1, op2);
        if (problemAnswer === false) {
            continue;
        }
        let problem = {
            p : `${num1} ${op1} ${num2} ${op2} ${num3} = ?`,
            a : `${num1} ${op1} ${num2} ${op2} ${num3} = ${problemAnswer}`,
        }
        res.push(problem);
        problems_number--;
    }
    return res;
}

function solveProblem(num1, num2, num3, op1, op2) {
    let sum = 0;
    if (op1 === '-') {
        sum = num1 - num2;
        if (sum < 0) return false;
        else return sum += num3;
    }

    sum = num1 + num2 - num3;
    if (sum < 0) return false;
    return sum;
}

function createMulProblems(problems_number) {
    let res = [];
    while(problems_number >=0) {
        let num1 = Math.random() < 0.5 ? Math.floor(Math.random() * 90) + 10 : Math.floor(Math.random() * 900) + 100;
        let num2 = Math.floor(Math.random()*9) + 1;
        let problem = {
            p : `${num1} x ${num2} = ?`,
            a : `${num1} x ${num2} = ${num1*num2}`,
        }
        res.push(problem);
        problems_number--;
    }
    return res;
}

// 显示计时器
function startTimer() {
    timerInterval = setInterval(updateTimer, 1000);
}

// 更新计时器
function updateTimer() {
    let currentTime = new Date();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); // 计算已过时间（秒）
    let timerElement = document.getElementById("timer");
    timerElement.innerHTML = "已过时间： " + Math.floor(elapsedTime/60) + " 分 " + elapsedTime%60 + " 秒";
}

