varying vec2 vUv;

uniform float uTime;
uniform float uOpacity;
uniform float uProgress;
uniform vec3 uColor;
uniform vec3 uPrimaryColor;
uniform vec3 uActionColor;

uniform sampler2D uPlay;
uniform sampler2D uPause;

void main() {
    vec2 uv = vUv - .5;
    vec3 color = uColor;

    float time = uTime * 0.5;
    float dist = length(uv);
    float radius = .5;

    float wave = sin(dist * 20. - time * 7.) * .5 + .9;
    float mask = smoothstep(0., radius, dist);

    float opacity = uOpacity * mix((1. - mask), 0., 1. - step(wave, .6));

    if (uProgress > 0.) {
        color = mix(uActionColor, uPrimaryColor, uProgress);
    }

    gl_FragColor = vec4(color, opacity);
}