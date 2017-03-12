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

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial({
  color     :0x00ff00,
  wireframe :true,
});

for (let i = 0, x=0, y=0, z=0; i < 125; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    x += 50;
    if(i % 5 === 0){
        y -= 50;
        x = 0;
    }
    if(i % 25 === 0){
        y = 0;
        x = 0;
        z += 50;
    }
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
    scene.add(mesh);
}

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