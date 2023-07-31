// import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
// import { Pass } from "postprocessing";
// import * as THREE from "three";

// const fragment = `
// #include <packing>

// uniform sampler2D sceneBuffer;
// uniform sampler2D normalBuffer;
// uniform sampler2D depthBuffer;

// uniform float cameraNear;
// uniform float cameraFar;
// uniform vec2 resolution;

// varying vec2 vUv;

// float readDepth (sampler2D depthSampler, vec2 coord) {
// 	float fragCoordZ = texture2D(depthSampler, coord).x;
// 	float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
// 	return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
// }

// void make_kernel_depth( inout vec3 n[9], sampler2D tex, vec2 coord ) {

// 	float w =  1.0 / ( resolution.x );
// 	float h =  1.0 / ( resolution.y );

// 	n[0] = vec3( readDepth( tex, coord + vec2( -w, -h ) ) );
// 	n[1] = vec3( readDepth( tex, coord + vec2( 0.0, -h ) ) );
// 	n[2] = vec3( readDepth( tex, coord + vec2( w, -h) ) );
// 	n[3] = vec3( readDepth( tex, coord + vec2( -w, 0.0 ) ) );
// 	n[4] = vec3( readDepth( tex, coord ) );
// 	n[5] = vec3( readDepth( tex, coord + vec2( w, 0.0 ) ) );
// 	n[6] = vec3( readDepth( tex, coord + vec2( -w, h ) ) );
// 	n[7] = vec3( readDepth( tex, coord + vec2( 0.0, h ) ) );
// 	n[8] = vec3( readDepth( tex, coord + vec2( w, h ) ) );

// }

// void make_kernel_normal( inout vec3 n[9], sampler2D tex, vec2 coord ) {

// 	float w =  1.0 / ( resolution.x );
// 	float h =  1.0 / ( resolution.y );

// 	n[0] = texture2D( tex, coord + vec2( -w, -h ) ).rgb;
// 	n[1] = texture2D( tex, coord + vec2( 0.0, -h ) ).rgb;
// 	n[2] = texture2D( tex, coord + vec2( w, -h) ).rgb;
// 	n[3] = texture2D( tex, coord + vec2( -w, 0.0 ) ).rgb;
// 	n[4] = texture2D( tex, coord ).rgb;
// 	n[5] = texture2D( tex, coord + vec2( w, 0.0 ) ).rgb;
// 	n[6] = texture2D( tex, coord + vec2( -w, h ) ).rgb;
// 	n[7] = texture2D( tex, coord + vec2( 0.0, h ) ).rgb;
// 	n[8] = texture2D( tex, coord + vec2( w, h ) ).rgb;

// }

// vec3 computeSobelEdges ( vec3 m[9] ) {

//     vec3 sobel_edge_h = m[2] + ( 2.0 * m[9] ) + m[2] - ( m[0] + ( 2.0 * m[3] ) + m[6]);
//   	vec3 sobel_edge_v = m[0] + ( 2.0 * m[1] ) + m[2] - ( m[9] + ( 2.0 * m[7] ) + m[8]);
// 	return sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));

// } 

// void main() {

//     vec3 n[9];
//     vec2 uv = vUv;
    
//     // depth kernel
// 	make_kernel_depth( n, depthBuffer, uv );
//     vec3 depthSobel = computeSobelEdges( n );

//     // normal kernel
//     make_kernel_normal( n, normalBuffer, uv );
//     vec3 normalSobel = computeSobelEdges( n );

//     // clean up normal edges
//     if ( length(normalSobel) < 0.8 ){
//         normalSobel *= 0.0;
//     }

//     vec3 sceneColor = texture2D(sceneBuffer, uv).rgb;
//     vec3 lineColor = vec3(1.0, 0.0, 0.0);
//     float outline = clamp( length(normalSobel + depthSobel), 0.0, 1.0 );
//     vec3 finalColor = mix( sceneColor, lineColor, outline );

// 	gl_FragColor = vec4( finalColor, 1.0 );
    
//     // threejs r154 renamed this to <colorspace_fragment>
//     // https://github.com/mrdoob/three.js/pull/26206
// 	#include <encodings_fragment>
// }
// `;
// const vertex =`varying vec2 vUv;

// void main() {
//     vUv = uv;
// 	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
// }`

// class SobelEdgePass extends Pass {

//     constructor( scene, camera, resolution ) {
//         super();
//         this.scene = scene
//         this.camera = camera
//         this.resolution = resolution
//         this.fsQuad = new FullScreenQuad(this.material());
        
//         const depthTexture = new THREE.DepthTexture( resolution.x, resolution.y )
//         const normalBuffer = new THREE.WebGLRenderTarget( resolution.x, resolution.y, { depthTexture, samples: 8 } )
//         normalBuffer.texture.format = THREE.RGBAFormat
//         normalBuffer.texture.generateMipmaps = false
//         normalBuffer.stencilBuffer = false
//         this.normalBuffer = normalBuffer

//         this.normalOverrideMaterial = new THREE.MeshNormalMaterial()
//     }

//     render( renderer, inputBuffer, outputBuffer, deltaTime, stencilTest ) {

//         // render normals + depth
//         renderer.setRenderTarget( this.normalBuffer )
//         const oldMat = this.scene.overrideMaterial
//         this.scene.overrideMaterial = this.normalOverrideMaterial
//         renderer.render( this.scene, this.camera )
//         this.scene.overrideMaterial = oldMat
        
//         // apply uniforms
//         this.fsQuad.material.uniforms.sceneBuffer.value = inputBuffer.texture
//         this.fsQuad.material.uniforms.depthBuffer.value = this.normalBuffer.depthTexture
//         this.fsQuad.material.uniforms.normalBuffer.value = this.normalBuffer.texture

//         // render or send over to next pass
//         if (this.renderToScreen) {
//             renderer.setRenderTarget(null);
//         } else {
//             renderer.setRenderTarget(outputBuffer);
//             if (this.clear) renderer.clear();
//         }
//         this.fsQuad.render(renderer);

//     }

//     material() {
//         return new THREE.ShaderMaterial({
//             uniforms: {
//                 normalBuffer: { value: null },
//                 depthBuffer: { value: null },
//                 sceneBuffer: { value: null },
//                 cameraNear: { value: this.camera.near },
//                 cameraFar: { value: this.camera.far },
//                 resolution: { value: new THREE.Vector2( this.resolution.x, this.resolution.y )}
//             },
//             vertexShader: vertex,
//             fragmentShader: fragment
//         });
//     }
// }

// export { SobelEdgePass }

import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
import { Pass } from "postprocessing";
import * as THREE from "three";

const fragment = `
#include <packing>

uniform sampler2D sceneBuffer;
uniform sampler2D normalBuffer;
uniform sampler2D depthBuffer;
uniform sampler2D colorBuffer;

uniform float cameraNear;
uniform float cameraFar;
uniform vec2 resolution;

varying vec2 vUv;

float readDepth (sampler2D depthSampler, vec2 coord) {
    float fragCoordZ = texture2D(depthSampler, coord).x;
    float viewZ = perspectiveDepthToViewZ(fragCoordZ, cameraNear, cameraFar);
    return viewZToOrthographicDepth(viewZ, cameraNear, cameraFar);
}

void make_kernel_depth(inout vec3 n[9], sampler2D tex, vec2 coord) {

    float w = 1.0 / (resolution.x);
    float h = 1.0 / (resolution.y);

    n[0] = vec3(readDepth(tex, coord + vec2(-w, -h)));
    n[1] = vec3(readDepth(tex, coord + vec2(0.0, -h)));
    n[2] = vec3(readDepth(tex, coord + vec2(w, -h)));
    n[3] = vec3(readDepth(tex, coord + vec2(-w, 0.0)));
    n[4] = vec3(readDepth(tex, coord));
    n[5] = vec3(readDepth(tex, coord + vec2(w, 0.0)));
    n[6] = vec3(readDepth(tex, coord + vec2(-w, h)));
    n[7] = vec3(readDepth(tex, coord + vec2(0.0, h)));
    n[8] = vec3(readDepth(tex, coord + vec2(w, h)));

}

void make_kernel_normal(inout vec3 n[9], sampler2D tex, vec2 coord) {

    float w = 1.0 / (resolution.x);
    float h = 1.0 / (resolution.y);

    n[0] = texture2D(tex, coord + vec2(-w, -h)).rgb;
    n[1] = texture2D(tex, coord + vec2(0.0, -h)).rgb;
    n[2] = texture2D(tex, coord + vec2(w, -h)).rgb;
    n[3] = texture2D(tex, coord + vec2(-w, 0.0)).rgb;
    n[4] = texture2D(tex, coord).rgb;
    n[5] = texture2D(tex, coord + vec2(w, 0.0)).rgb;
    n[6] = texture2D(tex, coord + vec2(-w, h)).rgb;
    n[7] = texture2D(tex, coord + vec2(0.0, h)).rgb;
    n[8] = texture2D(tex, coord + vec2(w, h)).rgb;

}

vec3 computeSobelEdges(vec3 m[9]) {
    vec3 sobel_edge_h = m[2] + (1.7 * m[5]) + m[8] - (m[0] + (1.7 * m[3]) + m[6]);
    vec3 sobel_edge_v = m[0] + (1.2 * m[1]) + m[2] - (m[6] + (1.2 * m[7]) + m[8]);
    return sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));
}


void main() {

    vec3 n[9];
    vec2 uv = vUv;
    
    // depth kernel
    make_kernel_depth(n, depthBuffer, uv);
    vec3 depthSobel = computeSobelEdges(n);

    // normal kernel
    make_kernel_normal(n, normalBuffer, uv);
    vec3 normalSobel = computeSobelEdges(n);

    // clean up normal edges
    if (length(normalSobel) < 0.95) {
        normalSobel *= 0.0;
    }

    vec3 sceneColor = texture2D(sceneBuffer, uv).rgb;
    vec3 lineColor = vec3(0.046, 0.077, 0.112);
    float outline = clamp(length(normalSobel + depthSobel), 0.0, 1.0);
    vec3 finalColor = mix(sceneColor, lineColor, outline);

    gl_FragColor = vec4(finalColor, outline);
    // gl_FragColor = texture2D(normalBuffer, uv);

    // threejs r154 renamed this to <colorspace_fragment>
    // https://github.com/mrdoob/three.js/pull/26206
    #include <encodings_fragment>
}
`;
const vertex = `varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

class SobelEdgePass extends Pass {

    constructor(scene, camera, resolution) {
        super();
        this.scene = scene;
        this.camera = camera;
        this.resolution = resolution;
        this.fsQuad = new FullScreenQuad(this.material());

        const depthTexture = new THREE.DepthTexture(resolution.x, resolution.y);
        const normalBuffer = new THREE.WebGLRenderTarget(resolution.x, resolution.y, { depthTexture, samples: 8 });
        normalBuffer.texture.format = THREE.RGBAFormat;
        normalBuffer.texture.generateMipmaps = false;
        normalBuffer.stencilBuffer = false;
        this.normalBuffer = normalBuffer;

        const colorBuffer = new THREE.WebGLRenderTarget(resolution.x, resolution.y);
        this.colorBuffer = colorBuffer;

        this.normalOverrideMaterial = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide,
            transparent: false
        });
    }

    render(renderer, inputBuffer, outputBuffer, deltaTime, stencilTest) {

        // render normals + depth
        renderer.setRenderTarget(this.normalBuffer);
        const oldMat = this.scene.overrideMaterial;
        this.scene.overrideMaterial = this.normalOverrideMaterial;
        renderer.render(this.scene, this.camera);
        this.scene.overrideMaterial = oldMat;

        // render color buffer
        renderer.setRenderTarget(this.colorBuffer);
        renderer.render(this.scene, this.camera);

        // apply uniforms
        this.fsQuad.material.uniforms.sceneBuffer.value = inputBuffer.texture;
        this.fsQuad.material.uniforms.depthBuffer.value = this.normalBuffer.depthTexture;
        this.fsQuad.material.uniforms.normalBuffer.value = this.normalBuffer.texture;
        this.fsQuad.material.uniforms.colorBuffer.value = this.colorBuffer.texture;

        // render or send over to next pass
        if (this.renderToScreen) {
            renderer.setRenderTarget(null);
        } else {
            renderer.setRenderTarget(outputBuffer);
            if (this.clear) renderer.clear();
        }
        this.fsQuad.render(renderer);

    }

    material() {
        return new THREE.ShaderMaterial({
            uniforms: {
                normalBuffer: { value: null },
                depthBuffer: { value: null },
                sceneBuffer: { value: null },
                colorBuffer: { value: null },
                cameraNear: { value: this.camera.near },
                cameraFar: { value: this.camera.far },
                resolution: { value: new THREE.Vector2(this.resolution.x, this.resolution.y) }
            },
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true
        });
    }
}

export { SobelEdgePass };