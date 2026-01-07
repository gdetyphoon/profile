// music
const audio = document.getElementById("music");
const btn = document.getElementById("playBtn");
window.addEventListener("load",()=>{
  const p=audio.play();
  if(p)p.then(()=>btn.textContent="❚❚").catch(()=>btn.textContent="▶");
});
btn.addEventListener("click",()=>{
  if(audio.paused){audio.play();btn.textContent="❚❚"}else{audio.pause();btn.textContent="▶"}
});

// comments
const form=document.getElementById("commentForm");
const list=document.getElementById("commentList");
let comments=JSON.parse(localStorage.getItem("comments")||"[]");
function renderComments(){list.innerHTML="";comments.forEach(c=>{const d=document.createElement("div");d.className="comment";d.innerHTML=`<div class="comment-head"><div class="author">${c.name}</div><div class="date">${c.date}</div></div><div class="text">${c.text}</div>`;list.appendChild(d)})}
renderComments();
form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value;
  const text=document.getElementById("text").value;
  const date=new Date().toLocaleString();
  comments.push({name,text,date});
  localStorage.setItem("comments",JSON.stringify(comments));
  renderComments();
  form.reset();
});

// avatar upload
const avatar=document.getElementById("avatar");
const uploadBtn=document.getElementById("uploadBtn");
const uploadInput=document.getElementById("uploadAvatar");
const savedAvatar=localStorage.getItem("avatarImage");
if(savedAvatar){avatar.src=savedAvatar}
uploadBtn.addEventListener("click",()=>uploadInput.click());
uploadInput.addEventListener("change",()=>{
  const file=uploadInput.files[0];
  if(!file)return;
  const reader=new FileReader();
  reader.onload=()=>{
    avatar.src=reader.result;
    localStorage.setItem("avatarImage",reader.result);
  };
  reader.readAsDataURL(file);
});

// particles
const pBox=document.getElementById("particles");
for(let i=0;i<30;i++){const s=document.createElement("span");const size=Math.random()*3+1;s.style.position="absolute";s.style.width=size+"px";s.style.height=size+"px";s.style.background="rgba(255,255,255,.5)";s.style.borderRadius="50%";s.style.left=Math.random()*100+"%";s.style.top=Math.random()*100+"%";s.style.animation=`float ${Math.random()*20+10}s linear infinite`;pBox.appendChild(s)}
const st=document.createElement("style");st.innerHTML="@keyframes float{from{transform:translateY(0)}to{transform:translateY(-120vh)}}";document.head.appendChild(st);
