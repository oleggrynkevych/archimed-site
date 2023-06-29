import {
    WebGLRenderTarget,
    OrthographicCamera,
    RGBAFormat,
    BufferGeometry,
    BufferAttribute,
    Mesh,
    Scene,
    RawShaderMaterial,
    Vector2,
  } from 'three';
  
  const vertexShader = `precision highp float;
  attribute vec2 position;
  void main() {
    // Look ma! no projection matrix multiplication,
    // because we pass the values directly in clip space coordinates.
    gl_Position = vec4(position, 1.0, 1.0);
  }`;
  
  const fragmentShader = `precision highp float;
  uniform sampler2D uScene;
  uniform vec2 uResolution;
  void main() {

    vec3 bgColor = vec3(0.961, 0.961, 0.961);
    vec3 lineColor = vec3(0.0, 0.0, 0.0);
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec3 color = vec3(uv, 1.0);
    color = texture2D(uScene, uv).rgb;
    // Do your cool postprocessing here
    // color.r += sin(uv.x * 50.0);
    vec2 vUv = uv;


    vec2 texel = vec2( 1.0 / uResolution.x, 1.0 / uResolution.y );

		// kernel definition (in glsl matrices are filled in column-major order)

			const mat3 Gx = mat3( -2, -10, -10, -0.5, 0, 0.5, 10, 10, 2); // x direction kernel
			const mat3 Gy = mat3( -2, -10, -5, -1, 0, 1, 5, 10, 2 ); // y direction kernel

		// fetch the 3x3 neighbourhood of a fragment

		// first column

			float tx0y0 = texture2D( uScene, vUv + texel * vec2( -1, -1 ) ).r;
			float tx0y1 = texture2D( uScene, vUv + texel * vec2( -1,  0 ) ).r;
			float tx0y2 = texture2D( uScene, vUv + texel * vec2( -1,  1 ) ).r;

		// second column

			float tx1y0 = texture2D( uScene, vUv + texel * vec2(  0, -1 ) ).r;
			float tx1y1 = texture2D( uScene, vUv + texel * vec2(  0,  0 ) ).r;
			float tx1y2 = texture2D( uScene, vUv + texel * vec2(  0,  1 ) ).r;

		// third column

			float tx2y0 = texture2D( uScene, vUv + texel * vec2(  1, -1 ) ).r;
			float tx2y1 = texture2D( uScene, vUv + texel * vec2(  1,  0 ) ).r;
			float tx2y2 = texture2D( uScene, vUv + texel * vec2(  1,  1 ) ).r;

		// gradient value in x direction

			float valueGx = Gx[0][0] * tx0y0 + Gx[1][0] * tx1y0 + Gx[2][0] * tx2y0 +
				Gx[0][1] * tx0y1 + Gx[1][1] * tx1y1 + Gx[2][1] * tx2y1 +
				Gx[0][2] * tx0y2 + Gx[1][2] * tx1y2 + Gx[2][2] * tx2y2;

		// gradient value in y direction

			float valueGy = Gy[0][0] * tx0y0 + Gy[1][0] * tx1y0 + Gy[2][0] * tx2y0 +
				Gy[0][1] * tx0y1 + Gy[1][1] * tx1y1 + Gy[2][1] * tx2y1 +
				Gy[0][2] * tx0y2 + Gy[1][2] * tx1y2 + Gy[2][2] * tx2y2;

		// magnitute of the total gradient

			float G = sqrt( ( valueGx * valueGx ) + ( valueGy * valueGy ) );
            G = step(0.8,G);
			gl_FragColor = vec4( mix(bgColor,lineColor, G ), 1 );



    // gl_FragColor = vec4(color, 1.0);
  }`;
  
  export class PostFX_2 {
    constructor(renderer) {
      this.renderer = renderer;
      this.scene = new Scene();
      // three.js for .render() wants a camera, even if we're not using it :(
      this.dummyCamera = new OrthographicCamera();
      this.geometry = new BufferGeometry();
  
      // Triangle expressed in clip space coordinates
      const vertices = new Float32Array([
        -1.0, -1.0,
        3.0, -1.0,
        -1.0, 3.0
      ]);
  
      this.geometry.setAttribute('position', new BufferAttribute(vertices, 2));
  
      this.resolution = new Vector2();
      this.renderer.getDrawingBufferSize(this.resolution);
      console.log(this.resolution)
  
      this.target = new WebGLRenderTarget(this.resolution.x, this.resolution.y, {
        format: RGBAFormat,
        stencilBuffer: false,
        depthBuffer: true,
      });
  
      this.material = new RawShaderMaterial({
        fragmentShader,
        vertexShader,
        uniforms: {
          uScene: { value: this.target.texture },
          uResolution: { value: this.resolution },
        },
      });
  
      // TODO: handle the resize -> update uResolution uniform and this.target.setSize()
  
      this.triangle = new Mesh(this.geometry, this.material);
      // Our triangle will be always on screen, so avoid frustum culling checking
      this.triangle.frustumCulled = false;
      this.scene.add(this.triangle);
    }
  
    render(scene, camera) {
      this.renderer.setRenderTarget(this.target);
      this.renderer.render(scene, camera);
      this.renderer.setRenderTarget(null);
      this.renderer.render(this.scene, this.dummyCamera);
    }
  }