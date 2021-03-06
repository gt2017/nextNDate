const fs = require('fs');
const xlsx = require('node-xlsx');
const path = require('path')


var logFile = path.resolve(`${__dirname}`, "../log");
//从log中提取出结果

const file = fs.readFileSync(logFile, 'utf8');

const lineReg = /^Lines.+/mg;
const branchReg = /^Branches.+/mg;
const functionReg = /^Functions.+/mg;
const statementReg = /^Statements.+/mg;
const resultReg = /\S+ test case (\d).+/g;

const line = file.match(lineReg);
const branch = file.match(branchReg);
// const testcase = file.match(resultReg);
const functions = file.match(functionReg);
const statement = file.match(statementReg);

// console.log(line);
// console.log(branch);
// console.log(functions);
// console.log(statement);
let result = [];
[line, branch, functions, statement].forEach((data, index) => {
    result[index] = [];
    console.log(typeof data);
    console.log(index)
    console.log(data[0].split(":")[0])
    result[index][0] = data[0].split(":")[0].trim();
    result[index][1] = data[0].split(":")[1].trim();

})



// testcase.forEach((data, index) => {
//     result[index] = [];
//     result[index][0] = `Test Case ${index + 1}`;
//     if (data[0] === '✓') {
//         result[index][1] = '通过';
//     } else {
//         result[index][1] = '不通过';
//     }
// });

// result[testcase.length] = [];
// result[testcase.length][0] = 'Statements';
// result[testcase.length][1] = statement[0].split(':')[1].trim();
// result[testcase.length + 1] = [];
// result[testcase.length + 1][0] = 'Branches';
// result[testcase.length + 1][1] = branch[0].split(':')[1].trim();
// result[testcase.length + 2] = [];
// result[testcase.length + 2][0] = 'Functions';
// result[testcase.length + 2][1] = functions[0].split(':')[1].trim();
// result[testcase.length + 3] = [];
// result[testcase.length + 3][0] = 'Lines';
// result[testcase.length + 3][1] = line[0].split(':')[1].trim();

const buffer = xlsx.build([{ name: "worksheet", data: result }]);
fs.writeFileSync('result.xlsx', buffer, 'binary');

console.log('测试结果请到 result.xlsx 中查看');