varying vec2 vUv;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;

void main() {
    vec2 uv = vUv - .5;

    vec3 color = uColor;
    vec3 waveColor = vec3(1.);
    float time = uTime * 0.5;
    float dist = length(uv);
    float radius = .5;



    float wave = sin(dist * 20. - time * 7.) * .5 + .9;
    float mask = smoothstep(0., radius, dist);

    float opacity = uOpacity * mix((1. - mask), 0., wave);

    gl_FragColor = vec4(color, opacity);
}