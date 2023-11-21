varying vec2 vUv;

uniform float uTime;
uniform float uOpacity;
uniform float uProgress;
uniform bool uPlaying;

uniform vec3 uColor;
uniform vec3 uPrimaryColor;
uniform vec3 uActionColor;

// uniform sampler2D uPlay;
// uniform sampler2D uPause;

void main() {
    vec2 uv = vUv - .5;
    vec4 fragColor = vec4(uColor, 1.);

    float time = uTime * 0.5;
    float dist = length(uv);
    float radius = .5;

    float wave = sin(dist * 20. - time * 7.) * .5 + .9;
    float mask = smoothstep(0., radius, dist);

    fragColor.a = uOpacity * mix((1. - mask), 0., 1. - step(wave, .6));

    if (uProgress > 0.) {
        fragColor.rgb = mix(uActionColor, uPrimaryColor, uProgress);
    }

    // vec4 play = texture2D(uPlay, vUv * 4. - 1.5);
    // vec4 pause = texture2D(uPause, vUv * 4. - 1.5);
    
    // fragColor = mix(fragColor, vec4(uPictoColor, 1.), uPlaying ? pause.r : play.r);

    gl_FragColor = fragColor;
}