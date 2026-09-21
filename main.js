function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    var vertices = [
        // D
        // Vertikal D
        -0.85,  0.5,
        -0.85, -0.5,
        -0.775, -0.5,
        -0.775,  0.5,
        -0.85,  0.5,

        // Atas D
        -0.775,  0.5,
        -0.475,  0.3,
        -0.475,  0.2,
        -0.775,  0.4,
        -0.775,  0.5,

        // Samping D
        -0.55,   0.3,
        -0.475,  0.3,
        -0.475, -0.3,
        -0.55,  -0.3,
        -0.55,   0.3,

        // Bawah D
        -0.475, -0.3,
        -0.775, -0.5,
        -0.775, -0.4,
        -0.475, -0.2,
        -0.475, -0.3,

        //B
        // Vertikal B
        -0.25,  0.5,
        -0.25, -0.5,
        -0.175, -0.5,
        -0.175,  0.5,
        -0.25,  0.5,

        // Loop Atas B (Horizontal Atas)
        -0.175,  0.5,
         0.1,    0.45,
         0.1,    0.35,
        -0.175,  0.4,
        -0.175,  0.5,

        // Loop Atas B (Samping)
         0.025,  0.45,
         0.1,    0.45,
         0.1,    0.05,
         0.025,  0.05,
         0.025,  0.45,

        // Strip Tengah B
        -0.175,  0.05,
         0.1,    0.05,
         0.1,   -0.05,
        -0.175, -0.05,
        -0.175,  0.05,

        // Loop Bawah B (Samping)
         0.075, -0.05,
         0.15,  -0.05,
         0.15,  -0.45,
         0.075, -0.45,
         0.075, -0.05,

        // Loop Bawah B (Horizontal Bawah)
         0.15,  -0.45,
        -0.175, -0.5,
        -0.175, -0.4,
         0.15,  -0.35,
         0.15,  -0.45,

        // P
        // Vertikal P
         0.35,  0.5,
         0.35, -0.5,
         0.425, -0.5,
         0.425,  0.5,
         0.35,  0.5,

        // Loop Atas P (Horizontal Atas)
         0.425,  0.5,
         0.7,    0.4,
         0.7,    0.3,
         0.425,  0.4,
         0.425,  0.5,

        // Loop Atas P (Samping)
         0.625,  0.4,
         0.7,    0.4,
         0.7,    0.0,
         0.625,  0.0,
         0.625,  0.4,

        // Loop Atas P (Horizontal Bawah)
         0.7,    0.0,
         0.425, -0.1,
         0.425,  0.0,
         0.7,    0.1,
         0.7,    0.0
    ];
    
    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
    attribute vec2 aPosition;
    void main(){
        gl_Position = vec4(aPosition, 0.0, 1.0);
        gl_PointSize = 20.0;
    }`;

    var fragmentShaderCode = `
        void main(){
            gl_FragColor = vec4(0.0, 0.2, 0.0, 0.85);
        }`;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (var i = 0; i < 14; i++) {
        gl.drawArrays(gl.TRIANGLE_STRIP, i * 5, 5);
    }
}