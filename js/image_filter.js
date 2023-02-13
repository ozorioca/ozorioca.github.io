const div1 = document.getElementById("orig");
const canvas = div1.children[0];
const div2 = document.getElementById("filt");
const canvas2 = div2.children[0];
const div3 = document.getElementById("mod");
const canvas3 = div3.children[0];
const div4 = document.getElementById("origp");
const canvas4 = div4.children[0];
const div5 = document.getElementById("filtp");
const canvas5 = div5.children[0];


const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");
const ctx4 = canvas4.getContext("2d");
const ctx5 = canvas5.getContext("2d");

var startbut = document.querySelector("#runfilt");



ctx2.font = "20px sans-serif";

const img = new Image();
var Imgdata;
img.src = "Rainbow.png";

w = img.width;
h = img.height;
img.onload = () => {


    div1.style.width = w;
    div1.style.height = h + 30;

    div3.style.width = w + 2;
    div3.style.height = h + 30 + 2;

    // div4.style.width = 30;
    // div4.style.height = 30;

    div4.style["top"] = 0.01 * h + 'px';
    div4.style["left"] = 30 + w + 'px';

    div5.style["top"] = 0.65 * h + 'px';
    div5.style["left"] = 30 + w + 'px';


    div2.style.width = w;
    div2.style.height = h + 30;
    div2.style["left"] = 100 + w + 'px';



    canvas.height = h + 30;
    canvas.width = w;

    canvas3.height = h;
    canvas3.width = w;

    canvas2.height = h + 30;
    canvas2.width = w;

    canvas4.height = 60;
    canvas4.width = 40;

    canvas5.height = 60;
    canvas5.width = 40;

    ctx4.font = "10px sans-serif";
    ctx4.textAlign = "center";
    ctx4.fillText("Orig. px", 20, 40);

    ctx5.font = "10px sans-serif";
    ctx5.textAlign = "center";
    ctx5.fillText("Filt. px", 20, 40);

    ctx.font = "16px sans-serif";
    // ctx.strokeRect(0, 0, w, h);
    // ctx.strokeRect(0, 0, 1, 1);
    ctx.textAlign = "center";
    ctx.fillText("Original", w * 0.5, h + 20);
    ctx.drawImage(img, 0, 0);
    Imgdata = ctx.getImageData(0, 0, w, h).data;
    // console.log(Imgdata);

    ctx2.font = "16px sans-serif";
    ctx2.textAlign = "center";
    ctx2.fillText("Filtered", w * 0.5, h + 20);
    // ctx2.drawImage(img, 0, 0);
    // ctx.fillText("Smoothing = TRUE", w * 2.5, 20);
    // ctx.imageSmoothingEnabled = true;
    // ctx.drawImage(img, w, 24, w * 3, h * 3);

    // ctx.fillText("Smoothing = FALSE", w * 5.5, 20);
    // ctx.imageSmoothingEnabled = false;
    // ctx.drawImage(img, w * 4, 24, w * 3, h * 3);
};
// console.log(Imgdata);

// const myImageData = ctx.getImageData(0, 0, w, h).data;
// console.log(myImageData);
// `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const getColorIndicesForCoord = (x, y, width) => {
    const red = y * (width * 4) + x * 4;
    return [red, red + 1, red + 2, red + 3];
};
var pixel, data;


startbut.addEventListener('click',
    async function () {
        console.log(Imgdata);
        // myImageData = ctx.getImageData(0, 0, w, h).data;
        // console.log(myImageData);
        for (let i = 0; i < w; i++) {
            for (let j = 0; j < h; j++) {
                await sleep(0.01);
                n = 3;
                ctx3.clearRect(0, 0, w, h);
                ctx3.strokeStyle = "#000000";
                ctx3.strokeRect(j, i, - 1, - 1);
                ctx3.strokeStyle = "#FFFFFF";
                ctx3.strokeRect(j + n, i + n, - (1 + 2 * n), - (1 + 2 * n));
                ctx4.fillStyle = `rgba(${Imgdata[4 * (j + i * w)]}, ${Imgdata[4 * (j + i * w) + 1]}, ${Imgdata[4 * (j + i * w) + 2]}, 1)`;
                ctx4.fillRect(5, 0, 29, 29);
                ctx2.fillStyle = `rgba(${255 - Imgdata[4 * (j + i * w)]}, ${255 - Imgdata[4 * (j + i * w) + 1]}, ${255 - Imgdata[4 * (j + i * w) + 2]}, 1)`;
                ctx2.fillRect(j, i + 1, - 1, - 1);
                ctx5.fillStyle = `rgba(${255 - Imgdata[4 * (j + i * w)]}, ${255 - Imgdata[4 * (j + i * w) + 1]}, ${255 - Imgdata[4 * (j + i * w) + 2]}, 1)`;
                ctx5.fillRect(5, 0, 29, 29);
            }
        }
    }, false);


