varying vec2 vUv;

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;

void main() {
    vec2 uv = vUv - .5;
    vec4 fragColor;

    vec3 color = uColor;
    vec3 waveColor = vec3(1.);
    float time = uTime * 0.5;
    float dist = length(uv);
    float radius = .5;

    float wave = sin(dist * 20. - time * 7.) * .5 + .9;
    float mask = smoothstep(0., radius, dist);

    float opacity = uOpacity * mix((1. - mask), 0., 1. - step(wave, .9));

    fragColor = vec4(color, opacity);



    gl_FragColor = fragColor;
}