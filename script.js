const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// crate resize handling
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// fixed control points for start and end point
const P0 = { x: 150, y: canvas.height / 2 };
const P3 = { x: canvas.width - 150, y: canvas.height / 2 };

//  control dynamic points (spring based)
const P1 = { x: 300, y: canvas.height / 2, vx: 0, vy: 0 };
const P2 = { x: canvas.width - 300, y: canvas.height / 2, vx: 0, vy: 0 };

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

// Mouse input are saved
canvas.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Spring constants
const k = 0.02;
const damping = 0.85;

// Spring update
function updateSpring(point, targetX, targetY) {
    const ax = -k * (point.x - targetX);
    const ay = -k * (point.y - targetY);

    point.vx = (point.vx + ax) * damping;
    point.vy = (point.vy + ay) * damping;

    point.x += point.vx;
    point.y += point.vy;
}

// Cubic Bezier point
function bezier(t, p0, p1, p2, p3) {
    const u = 1 - t;
    const tt = t * t;
    const uu = u * u;
    const uuu = uu * u;
    const ttt = tt * t;

    return {
        x:
            uuu * p0.x +
            3 * uu * t * p1.x +
            3 * u * tt * p2.x +
            ttt * p3.x,
        y:
            uuu * p0.y +
            3 * uu * t * p1.y +
            3 * u * tt * p2.y +
            ttt * p3.y,
    };
}

// Bezier derivative (tangent)
function bezierTangent(t, p0, p1, p2, p3) {
    const u = 1 - t;

    return {
        x:
            3 * u * u * (p1.x - p0.x) +
            6 * u * t * (p2.x - p1.x) +
            3 * t * t * (p3.x - p2.x),
        y:
            3 * u * u * (p1.y - p0.y) +
            6 * u * t * (p2.y - p1.y) +
            3 * t * t * (p3.y - p2.y),
    };
}

// Normalize vector
function normalize(v) {
    const len = Math.hypot(v.x, v.y) || 1;
    return { x: v.x / len, y: v.y / len };
}

// Draw loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update springs
    updateSpring(P1, mouse.x - 100, mouse.y);
    updateSpring(P2, mouse.x + 100, mouse.y);

    // Draw Bezier curve
    ctx.beginPath();
    ctx.moveTo(P0.x, P0.y);

    for (let t = 0; t <= 1; t += 0.01) {
        const p = bezier(t, P0, P1, P2, P3);
        ctx.lineTo(p.x, p.y);
    }

    ctx.strokeStyle = "#d426c6ff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw tangents
    for (let t = 0; t <= 1; t += 0.1) {
        const p = bezier(t, P0, P1, P2, P3);
        const tan = normalize(bezierTangent(t, P0, P1, P2, P3));

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + tan.x * 30, p.y + tan.y * 30);
        ctx.strokeStyle = "#c9193fff";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Draw control points
    drawPoint(P0, "#f91616ff");
    drawPoint(P1, "#1da853ff");
    drawPoint(P2, "#198d3cff");
    drawPoint(P3, "#f9163cff");

    requestAnimationFrame(animate);
}

function drawPoint(p, color) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

// then call animate function 
animate(); 
