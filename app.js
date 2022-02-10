const cnvs = document.getElementById('jscnvs');
const ctx = cnvs.getContext('2d');
const colors = document.getElementsByClassName('jscolor');
const range = document.getElementById('jsrange');
const mode = document.getElementById('jsmode'); 
const save = document.getElementById('jssave'); 
const FIRST_COLOR = 'rgb(0,0,0)';
const CNVS_SIZE_W = cnvs.offsetWidth; 
const CNVS_SIZE_H = cnvs.offsetHeight; 

cnvs.width = CNVS_SIZE_W;
cnvs.height = CNVS_SIZE_H;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CNVS_SIZE_W, CNVS_SIZE_H);

ctx.strokeStyle = FIRST_COLOR;
ctx.fillStyle = FIRST_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(e) {painting = true;}
function stopPainting(e) {painting = false;}

function onMouseDown(e) {painting = true;}
function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
        ctx.beginPath();// 새로운 경로 생성 //Path는 선
    } else {
        ctx.stroke();//선 그리기
        ctx.lineTo(x, y);//선 끝 좌표
    }//if(painting == trun{}.....)
}

function onMouseEnter(e) {
    const x = e.offsetX;
    const y = e.offsetY;    
    ctx.moveTo(x, y);//선 시작 좌표 // Path의 시작좌표
}

function rangeChange(e) {
    const size = e.target.value;
    ctx.lineWidth = size;
}
function clickColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color
}
function clickMode(e) {
    if (filling === true) {
        filling = false;
        mode.innerText = 'Fill';
    } else {
        filling = true;
        mode.innerText = 'Paint';
        ctx.fillStyle = ctx.strokeStyle;
    }
}
function clickSave(e) {
    const img = cnvs.toDataURL();//Default는 png
    const link = document.createElement('a');
    link.href = img; // url
    link.download = "YourPainting🎨"; //다운로드 파일 이름
    link.click();
}
function clickCnvs() {
    if (filling) {
        ctx.fillRect(0, 0, CNVS_SIZE_W, CNVS_SIZE_H);
    }
}

function clickMouseR(event) {
    event.preventDefault();
}
if (cnvs) {
    cnvs.addEventListener("mousedown",startPainting);
    cnvs.addEventListener("mouseup",stopPainting);
    cnvs.addEventListener("mousemove",onMouseMove);
    cnvs.addEventListener("mouseenter", onMouseEnter);
    cnvs.addEventListener("click", clickCnvs);
    cnvs.addEventListener("contextmenu", clickMouseR);//마우스 우클릭 통제
}

Array.from(colors).forEach(c => c.addEventListener('click', clickColor));

if (range) {
    range.addEventListener('input', rangeChange);
}

if (mode) {
    mode.addEventListener('click', clickMode);
}
if (save) {
    save.addEventListener('click', clickSave);
}