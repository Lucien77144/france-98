varying vec2 vUv;

uniform sampler2D uSpotLight;
uniform float uTime;
uniform vec2 uResolution;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// Gradient Noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/XdXGW8
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
    vec2 uv = vUv;
    vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

    float t = uTime * .25;
    st += noise(st * 2.) + t;

    vec3 color = vec3(1.) * smoothstep(1., 0., noise(st));

    float mask = texture2D(uSpotLight, uv).r;
    color = mix(color, vec3(0.), 1. - mask);

    gl_FragColor = vec4(vec3(1., 0., 0.), mask.r);
}