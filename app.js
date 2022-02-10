const cnvs = document.getElementById('jscnvs');
const ctx = cnvs.getContext('2d');


ctx.strokeStyle = 'rgb(0,0,0)';
ctx.lineWidth = 2.5;

cnvs.width = cnvs.offsetWidth;
cnvs.height = cnvs.offsetHeight;

let painting = false;

function startPainting(e) {painting = true;}
function stopPainting(e) {painting = false;}

function onMouseDown(e) {painting = true;}
function onMouseMove(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    if (!painting) {
        ctx.beginPath();
    } else {
        ctx.stroke();//선 그리기
        ctx.lineTo(x, y);//선 끝 좌표
    }
}

function onMouseEnter(e) {
    const x = e.offsetX;
    const y = e.offsetY;
    
    ctx.moveTo(x,y);//선 시작 좌표
}

if (cnvs) {
    cnvs.addEventListener("mousemove",onMouseMove);
    cnvs.addEventListener("mousedown",startPainting);
    cnvs.addEventListener("mouseup",stopPainting);
    // cnvs.addEventListener("mouseleave",stopPainting);
}