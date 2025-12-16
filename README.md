# Interactive Cubic Bezier Curve with Spring Physics (HTML Canvas)

# Overview
This project is an interactive visual simulation of a cubic Bezier curve that behaves like a flexible rope.  
The curve responds in real time to mouse movement and shows smooth, spring-like motion.

The goal of this assignment is to demonstrate understanding of:
- Bezier curve mathematics
- Basic spring physics
- Real-time rendering and interaction using HTML Canvas


# Technology Used
- HTML
- JavaScript (Vanilla)
- HTML5 Canvas API

No external libraries or prebuilt Bezier or physics APIs are used.


# Bezier Curve Implementation
A cubic Bezier curve is implemented using four control points:

 **P0** and **P3** are fixed endpoints.
 **P1** and **P2** are dynamic control points that move smoothly based on user input.

The curve is calculated using the standard cubic Bezier formula:

B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃

The curve is rendered by sampling values of `t` from 0 to 1 in small increments.


# Tangent Calculation
To visualize the direction of the curve, tangents are computed using the derivative of the Bezier equation:

B′(t) = 3(1−t)²(P₁−P₀) + 6(1−t)t(P₂−P₁) + 3t²(P₃−P₂)

The tangent vectors are normalized and drawn as short line segments at regular intervals along the curve.


# Interaction & Physics
Mouse movement is used as the input source for interaction.

Instead of directly moving the control points to the mouse position, a simple spring-damping model is applied to create smooth and natural motion.

The physics model used is:

- Acceleration = −k × (currentPosition − targetPosition)
- Velocity = (velocity + acceleration) × damping
- Position = position + velocity

This makes the curve behave like a soft rope instead of snapping instantly to the input.

# Rendering Loop
The animation runs using `requestAnimationFrame`, maintaining smooth performance close to 60 FPS.

Each frame:
1. Updates spring physics
2. Recalculates Bezier points
3. Draws the curve
4. Draws tangent lines
5. Draws control points

# How to Run
1. Open `index.html` in any modern web browser.
2. Move the mouse to interact with the rope.
3. Observe smooth motion and tangent visualization in real time.

# Notes
- All Bezier math and physics logic is implemented manually.
- No third-party libraries or animation frameworks are used.
- The project focuses on clarity, performance, and real-time interaction.

# Live Demo
https://USERNAME.github.io/interactive-bezier-rope/
