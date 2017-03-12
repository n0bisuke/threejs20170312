'use strict'

const scene = new THREE.Scene(); //シーンを設定：シーンについて
//レンダラーを設定：レンダラーについて
const renderer = new THREE.WebGLRenderer({
  // alpha:true,
//   antialias: true,
});

//描画する領域の大きさを設定しておく
const canvasWidth  = 600; //window.innerWidth
const canvasHeight = 400; //window.innerHeight
//canvasのサイズを設定
renderer.setSize( canvasWidth, canvasHeight );
document.body.appendChild( renderer.domElement );

//カメラの設定：カメラについて
const camera = new THREE.PerspectiveCamera( 75, canvasWidth / canvasHeight, 1, 1000 );
camera.position.z = 100;

//ジオメトリの設定：ジオメトリについて
//この場合はプレーンジオメトリ
const geometry = new THREE.BoxGeometry( 20, 20, 20 );

//マテリアルの設定
const material = new THREE.MeshBasicMaterial();
//ジオメトリとマテリアルをメッシュに設定
//この３つは必ずセットになる
const mesh = new THREE.Mesh(geometry, material);

//まだでません
//シーンにオブジェクトを追加する
scene.add(mesh);

//まだまだでません

//シーンとカメラを描画
//シーンとカメラがあってはじめて成立する
renderer.render(scene, camera);


//==================================================================
//ちょっと追加
function render(){
  renderer.render(scene, camera);  
}

//コントローラーの追加
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
//==================================================================