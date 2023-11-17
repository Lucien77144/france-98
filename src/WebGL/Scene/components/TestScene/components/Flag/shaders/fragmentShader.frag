varying vec2 vUv;

uniform sampler2D uFlagTexture;

void main() {
    vec2 uv = vUv;

    gl_FragColor = texture2D(uFlagTexture, uv);
}