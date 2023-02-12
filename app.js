window.addEventListener("load", function () {
    const canvas_div = document.getElementById("canvas_div");

    const canvas = document.getElementById("canvas");
    //console.log(canvas_div.getBoundingClientRect().width);
    canvas.width = canvas_div.getBoundingClientRect().width;
    canvas.height = canvas_div.getBoundingClientRect().height;

    const context = canvas.getContext("2d");
    let canvas_bg = "transparent";
    context.fillStyle = canvas_bg;
    context.fillRect(0, 0, canvas.width, canvas.height);

    let stroke_slider = document.getElementById("stroke_width");
    let stroke_color = document.getElementById("stroke_color");

    let is_drawing = false;

    function start(event) {
        is_drawing = true;
        context.beginPath();
        context.moveTo(
            event.touches[0].clientX - canvas.offsetLeft,
            event.touches[0].clientY - canvas.offsetTop
        );
        event.preventDefault();
    }

    function draw(event) {
        // console.log(event.touches[0].clientY);
        //console.log(event.touches[0].clientX - canvas.offsetLeft);
        // console.log(event.touches[0].clientY - canvas.offsetTop);

        if (is_drawing) {
            context.lineTo(
                event.touches[0].clientX - canvas.offsetLeft,
                event.touches[0].clientY - canvas.offsetTop
            );
            context.strokeStyle = stroke_color.value;
            context.lineWidth = stroke_slider.value;
            context.lineCap = "round";
            context.lineJoin = "round";
            context.stroke();
        }
        event.preventDefault();

        // console.log(canvas.offsetLeft);
    }

    function stop(event) {
        if (is_drawing) {
            context.stroke();
            context.closePath();
            is_drawing = false;
        }
        event.preventDefault();
    }

    function clear_canvas(arg) {
        context.fillStyle = canvas_bg;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stop);
    document.getElementById("clear").addEventListener("click", clear_canvas);
});


document.getElementById("save").addEventListener("click", function() {
    const link = document.createElement("a");
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
});
