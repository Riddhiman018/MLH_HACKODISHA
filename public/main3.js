import * as THREE from '/build/three.module.js'
console.log(THREE)
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js'
import {FontLoader} from './jsm/loaders/FontLoader.js'
import {TextGeometry} from './jsm/geometries/TextGeometry.js'
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const renderer = new THREE.WebGLRenderer({
  canvas:document.querySelector('#bg')
})
const canvas = document.querySelector('#bg')
const username = new URL(window.location).searchParams.get('username')
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
            document.querySelector('#notes').value = 'Note saved successfully'
            document.querySelector('#title').value = ''
        }
    }catch(error){
        console.log(error)
    }
})
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(5)
const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshBasicMaterial({
  color: 0xFF6347,
  wireframe:true
})
const torus = new THREE.Mesh(geometry,material)
const controls = new OrbitControls(camera,renderer.domElement)
//scene.add(torus)
const eyeText = new FontLoader()
const irisText = new FontLoader()
const loader = new GLTFLoader()
loader.load('./eyes/scene.gltf',function(glb){
  console.log(glb)
  glb.scene.scale.set(50, 50, 50)
  glb.scene.rotation.set(0, -185, 0)
  scene.add(glb.scene)
},function(progress){
  console.log(progress)
},function(error){
  console.log(error)
})
eyeText.load('./Roseritta_Regular.json',function (font){
  const eyeGeometry = new TextGeometry('Eyes',{
    font:font,
    size:0.3,
    height:1
  })
  const eyeMesh = new THREE.Mesh(eyeGeometry,[
    new THREE.MeshPhongMaterial({color:0xed4008})
  ])
  eyeMesh.position.setX(0.7)
  eyeMesh.position.setY(1.35)
  eyeMesh.position.setZ(0.2)
  scene.add(eyeMesh)
})
irisText.load('./Roseritta_Regular.json',function (font){
  const irisGeometry = new TextGeometry('Iris',{
    font:font,
    size:0.2,
    height:1
  })
  const irisMesh = new THREE.Mesh(irisGeometry,[
    new THREE.MeshPhongMaterial({color:0x0000FF})
  ])
  irisMesh.position.setX(-0.5)
  irisMesh.position.setY(0)
  irisMesh.position.setZ(0.2)
  scene.add(irisMesh)
})
// const size = 10;
// const divisions = 10;
const light = new THREE.AmbientLight( 0x404040,10 ); // soft white light
scene.add( light );
// const light = new THREE.PointLight(0xffffff,5)
// light.position.set(0,100,40)
// scene.add(light)
// const light3 = new THREE.PointLight(0xffffff,5)
// light3.position.set(0,-100,40)
// scene.add(light3)
// const light4 = new THREE.PointLight(0xffffff,1)
// light4.position.set(0,0,-40)
// scene.add(light4)
// const light5 = new THREE.PointLight(0xffffff,1)
// light5.position.set(0,0,-40)
// scene.add(light5)
function animate(){
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
}
canvas.addEventListener('dblclick',function(){
    const fact = new FontLoader()
    fact.load('./Roseritta_Regular.json',function(font){
        const factGeometry = new TextGeometry('Fact:\nBrain has the control of the entire cognitive system\nof the body',{
            font:font,
            size:0.1,
            height:0.8
        })
        const factmesh = new THREE.Mesh(factGeometry,[
            new THREE.MeshPhongMaterial({color:0xed4008})
          ])
        factmesh.position.set(-1, -0.75,0.3)
        scene.add(factmesh)
    })
})
animate()