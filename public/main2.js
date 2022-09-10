import * as THREE from '/build/three.module.js'
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js'
import {FontLoader} from './jsm/loaders/FontLoader.js'
import {TextGeometry} from './jsm/geometries/TextGeometry.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
const submitBtn = document.querySelector('.submitNotes')
console.log(document.querySelector('#notes').textContent)
console.log(submitBtn)
submitBtn.addEventListener('click',async function(e){
    console.log('Clicked')
    const text = document.querySelector('#notes').value
    const title = document.querySelector('#title').value
    try{
        const result = await fetch('https://mlhriddhiman.herokuapp.com/notes',{    
        method:'POST',
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                username:username,
                note:text,
                title:title
            })
        })
        if(result){
            console.log(result)
        }
    }catch(error){
        console.log(error)
    }
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(100)
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({
  color: 0xFF6347,
  wireframe:true
})
const torus = new THREE.Mesh(geometry,material)
const controls = new OrbitControls(camera,renderer.domElement)
//scene.add(torus)
const aortaText = new FontLoader()
const ventricularText = new FontLoader()
const loader = new GLTFLoader()
loader.load('./brain/scene.gltf',function(glb){
  console.log(glb)
  glb.scene.scale.set(0.25, 0.25, 0.25)
  scene.add(glb.scene)
},function(progress){
  console.log(progress)
},function(error){
  console.log(error)
})
aortaText.load('./Roseritta_Regular.json',function (font){
  const aortaGeometry = new TextGeometry('1-Aorta',{
    font:font,
    size:0.3,
    height:1
  })
  const aortaMesh = new THREE.Mesh(aortaGeometry,[
    new THREE.MeshPhongMaterial({color:0xed4008})
  ])
  aortaMesh.position.setX(0.7)
  aortaMesh.position.setY(1.35)
  aortaMesh.position.setZ(0.2)
  scene.add(aortaMesh)
})
ventricularText.load('./Roseritta_Regular.json',function (font){
  const veinGeometry = new TextGeometry('2-Ventricles',{
    font:font,
    size:0.2,
    height:1
  })
  const veinMesh = new THREE.Mesh(veinGeometry,[
    new THREE.MeshPhongMaterial({color:0xed4008})
  ])
  veinMesh.position.setX(-2.2)
  veinMesh.position.setY(1.45)
  veinMesh.position.setZ(0.2)
  scene.add(veinMesh)
})
// const size = 10;
// const divisions = 10;
const light = new THREE.PointLight(0xffffff,5)
light.position.set(0,100,40)
scene.add(light)
const light3 = new THREE.PointLight(0xffffff,5)
light3.position.set(0,-100,40)
scene.add(light3)
const light4 = new THREE.PointLight(0xffffff,5)
light4.position.set(100,-100,40)
scene.add(light4)
const light5 = new THREE.PointLight(0xffffff,5)
light5.position.set(-100,-100,40)
scene.add(light5)
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
}
animate()