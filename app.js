'use strict'

const scene = new THREE.Scene(); //シーンを設定：シーンについて
//レンダラーを設定：レンダラーについて
const renderer = new THREE.WebGLRenderer({
//   alpha:true,
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
camera.position.x = 206;
camera.position.y = -188;
camera.position.z = 272;

const geometry = new THREE.BoxGeometry( 10, 10, 10 );
// const material = new THREE.MeshBasicMaterial({
//   color     :0x00ff00,
//   wireframe :true,
// });

const URL = 'http://localhost:8000/n0bisuke.jpg'
const meshs = [];

//テクスチャ読み込み
const materialLoad = (cb) => {
    const loader = new THREE.TextureLoader();
    loader.load(URL, (texture) => {
        const material = new THREE.MeshBasicMaterial({map: texture});
        cb(material);
    });
}

//複数生成
const particle = (material) => {
    for (let i = 0, x=0, y=0, z=0; i < 125; i++) {
        meshs[i] = new THREE.Mesh(geometry, material);
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

        meshs[i].position.x = x;
        meshs[i].position.y = y;
        meshs[i].position.z = z;
        scene.add(meshs[i]);
    }
}

//アニメーション
const animate = () => {
  for(let mesh of meshs){
    mesh.rotation.y += 0.01;      
  }
//   console.log(camera.position);
  render();
  window.requestAnimationFrame(animate);
}

materialLoad((material) => {
    particle(material);
    animate();
});

//まだまだでません

//シーンとカメラを描画
//シーンとカメラがあってはじめて成立する
// renderer.render(scene, camera);


//==================================================================
//ちょっと追加
function render(){
  renderer.render(scene, camera);  
}

//コントローラーの追加
const controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );
//==================================================================