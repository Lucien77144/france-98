varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform float uMove;

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
    vUv = uv;
    vPosition = position;

    float time = uTime * .5;

    vPosition.z += cos(noise(vUv * 5. - time));
    vPosition.z += cos(noise(vUv * 1. - time) * 10.);
    vPosition.z *= (vUv.x * 1.);

    // vPosition.x *= uMove;
    // vPosition.z += uMove;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
}