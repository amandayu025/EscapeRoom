/*
wall 1 => sofa wall
wall 2 => cabinet wall
wall 3 => tv wall
wall 4 => door wall
*/ 
let inventorySlots = [];

let WALL= document.getElementById("wall");
let INVENTORY= document.getElementById("inventory");
let ALL=document.getElementById("all");
let NOTE_INVENTORY;
let NOTE_ZOOM;
let RECEIPT_INVENTORY;
let RECEIPT_ZOOM;
let KEY_INVENTORY;
let NOTEBOOK_INVENTORY;
let NOTEBOOK_ZOOM;
let CODE_ZOOM=document.createElement("div");
    CODE_ZOOM.id="code-zoom";
    CODE_ZOOM.innerHTML=`
        <div id="display"></div>
        <div>
            <button onclick="add('1')">1</button>
            <button onclick="add('1')">2</button>
            <button onclick="add('1')">3</button>
        </div>
        <div>
            <button onclick="add('1')">4</button>
            <button onclick="add('1')">5</button>
            <button onclick="add('1')">6</button>
        </div>
        <div>
            <button onclick="add('1')">7</button>
            <button onclick="add('1')">8</button>
            <button onclick="add('1')">9</button>
        </div>
        <div>
            <button onclick="add('1')">0</button>
            <button onclick="clear_display()">Clear</button>
        </div>
    `;

const INVENTORY_SLOT_COUNT = 14;

for (let idx = 0; idx < INVENTORY_SLOT_COUNT; idx++) {
    inventorySlots[idx] = document.getElementById("i"+ idx);
}

let bag = [];
let wall1 = 1;
let wall2 = 2;
let wall3 = 3;
let wall4 = 4;
let current_wall;
let itemName;
let itemImageName;
let itemImageBackground;
let visibility;
let cabinet_left;
let cabinet_right;
let tv;
let curtain;
let code;

function go_wall() {
    if (current_wall == wall1) {
        WALL.style.backgroundImage = "url('images/sofa_wall.png')";
        WALL.innerHTML = `
            <button id='note' onclick='add_inventory(NOTE_INVENTORY)'></button>
        `;
        //create all divs and its ids
        itemImageBackground=document.createElement("div");
        itemImageBackground.id="image-background";
        NOTE_INVENTORY=document.createElement("div");
        NOTE_INVENTORY.id="note-inventory";
        NOTE_ZOOM=document.createElement("div");
        NOTE_ZOOM.id="note-zoom";

        //note item in the inventory
        NOTE_INVENTORY.addEventListener('click',()=>{
            open_image(NOTE_ZOOM)
        });
        itemImageBackground.addEventListener('click',()=>{
            close_image(NOTE_ZOOM)
        });
        
    } else if (current_wall == wall2) {
        WALL.style.backgroundImage = "url('images/cabinet_wall.png')";
        WALL.innerHTML = `
            <button id="cdoor-left-closed" onclick='open_close_cabinet("left")'></button>
            <button id="cdoor-right-closed" onclick='open_close_cabinet("right")'></button>
        `;
        //create all divs and its ids
        itemImageBackground=document.createElement("div");
        itemImageBackground.id="image-background";

        cabinet_left= 2;
        cabinet_right= 2;
    } else if (current_wall == wall3) {
        WALL.style.backgroundImage = "url('images/tv_wall.png')";
        WALL.innerHTML = `
            <button id="tv-screen" onclick='turn_on_tv()'></button>
            <button id="key" onclick='add_inventory(KEY_INVENTORY)'></button>
        `;
        //create all divs and its ids
        itemImageBackground=document.createElement("div");
        itemImageBackground.id="image-background";
        KEY_INVENTORY=document.createElement("div");
        KEY_INVENTORY.id="key-inventory";
        
        tv=0;
    } else if (current_wall == wall4) {
        WALL.style.backgroundImage = "url('images/door_wall.png')";
        WALL.innerHTML = `
            <button id="curtain" onclick='open_curtain()'></button>
            <button id="code" onclick='enter_code()'></button> 
            `;
        curtain=0;
        
        document.getElementById("code").addEventListener('click',()=>{
            open_image(CODE_ZOOM)
        });
        itemImageBackground.addEventListener('click',()=>{
            close_image(CODE_ZOOM)
        });
    }
}

function change_wall_right() {
    if (current_wall == wall1) {
        current_wall = wall2;
    } else if (current_wall == wall2) {
        current_wall = wall3;
    } else if (current_wall == wall3) {
        current_wall = wall4;
    } else if (current_wall == wall4) {
        current_wall = wall1;
    }
    go_wall();
}

function change_wall_left() {
    if (current_wall == wall1) {
        current_wall = wall4;
    } else if (current_wall == wall2) {
        current_wall = wall1;
    } else if (current_wall == wall3) {
        current_wall = wall2;
    } else if (current_wall == wall4) {
        current_wall = wall3;
    }
    go_wall();
}
function add_inventory(itemElement) {
    if(bag.length>=INVENTORY_SLOT_COUNT){
        window.alert("Inventory full!");
        return;
    }
    if(bag.includes(itemElement)){
        return;
    }
    bag.push(itemElement);
    render_inventory();
}
function render_inventory(){
    bag.forEach((itemElement,index)=>{

        inventorySlots[index].appendChild(itemElement);
    })
}
function open_image(itemImage){
        ALL.appendChild(itemImageBackground);
        ALL.appendChild(itemImage);
        visibility=1; 
}
function close_image(itemImage){
    itemImage.style.display="none";
    itemImageBackground.style.display="none";
    visibility=0;
}
function open_close_cabinet(side){
    if(side == "right"){
        if(cabinet_right==1){
            document.getElementById("cdoor-right-closed").style.display="block";
            document.getElementById("cdoor-right-open").style.display="none";
            document.getElementById("notebook").style.display="none";
            cabinet_right=0;
            
        }
        else if(cabinet_right==0){
            document.getElementById("cdoor-right-closed").style.display="none";
            document.getElementById("cdoor-right-open").style.display="block";
            document.getElementById("notebook").style.display="block";
            cabinet_right=1;
        }
        else if(cabinet_right==2){
            document.getElementById("cdoor-right-closed").style.display="none";

            let CDOOR_RIGHT_OPEN=document.createElement("button");
            CDOOR_RIGHT_OPEN.id="cdoor-right-open";
            CDOOR_RIGHT_OPEN.onclick=()=>open_close_cabinet("right");

            let NOTEBOOK=document.createElement("button");
            NOTEBOOK.id="notebook";
            NOTEBOOK.onclick=()=>add_inventory(NOTEBOOK_INVENTORY);

            WALL.appendChild(CDOOR_RIGHT_OPEN);
            WALL.appendChild(NOTEBOOK);
            cabinet_right=1;
            
             //create all divs and its ids
            itemImageBackground=document.createElement("div");
            itemImageBackground.id="image-background";
            NOTEBOOK_INVENTORY=document.createElement("div");
            NOTEBOOK_INVENTORY.id="notebook-inventory";
            NOTEBOOK_ZOOM=document.createElement("div");
            NOTEBOOK_ZOOM.id="notebook-zoom";


            NOTEBOOK_INVENTORY.addEventListener('click',()=>{
                open_image(NOTEBOOK_ZOOM)
            });
            itemImageBackground.addEventListener('click',()=>{
                close_image(NOTEBOOK_ZOOM)
            });
        }
    }
    else if(side == "left"){
        if(bag.includes(KEY_INVENTORY)){
            if(cabinet_left==1){
                document.getElementById("cdoor-left-closed").style.display="block";
                document.getElementById("cdoor-left-open").style.display="none";
                document.getElementById("receipt").style.display="none";
                cabinet_left=0;
                
            }
            else if(cabinet_left==0){
                document.getElementById("cdoor-left-closed").style.display="none";
                document.getElementById("cdoor-left-open").style.display="block";
                document.getElementById("receipt").style.display="block";
                cabinet_left=1;
            }
            else if(cabinet_left==2){
                document.getElementById("cdoor-left-closed").style.display="none";
                cabinet_left=1;
                
                let CDOOR_LEFT_OPEN=document.createElement("button");
                CDOOR_LEFT_OPEN.id="cdoor-left-open";
                CDOOR_LEFT_OPEN.onclick=()=>open_close_cabinet("left");

                let RECEIPT=document.createElement("button");
                RECEIPT.id="receipt";
                RECEIPT.onclick=()=>add_inventory(RECEIPT_INVENTORY);

                WALL.appendChild(CDOOR_LEFT_OPEN);
                WALL.appendChild(RECEIPT);

                //create all divs and its ids
                itemImageBackground=document.createElement("div");
                itemImageBackground.id="image-background";
                RECEIPT_INVENTORY=document.createElement("div");
                RECEIPT_INVENTORY.id="receipt-inventory";
                RECEIPT_ZOOM=document.createElement("div");
                RECEIPT_ZOOM.id="receipt-zoom";

                //receipt item in the inventory
                RECEIPT_INVENTORY.addEventListener('click',()=>{
                    open_image(RECEIPT_ZOOM)
                });
                itemImageBackground.addEventListener('click',()=>{
                    close_image(RECEIPT_ZOOM)
                });
            }
        }
        else if (!bag.includes(KEY_INVENTORY)){
            window.alert("It is locked!");
        }
        
    }
}
function turn_on_tv(){
    if(tv==0){
        document.getElementById("tv-screen").style.backgroundImage="url('images/tv_screen_weather.png')";
        tv=1;
    }
    else if (tv==1){
        document.getElementById("tv-screen").style.backgroundImage="url('images/tv_screen_empty.png')";
        tv=0;
    }
}
function open_curtain(){
    if(curtain==0){
        document.getElementById("curtain").style.backgroundImage="url('images/curtain_open.png')";
        curtain=1;
    }
    else if(curtain==1){
        document.getElementById("curtain").style.backgroundImage="url('images/curtain_close.png')";
        curtain=0;
    }
}
function add(val){
    document.getElementById("display").value+=val;
}
function clear_display(){
    document.getElementById("display").value="";
}
function enter(){
    code=document.getElementById("display").value;
    if(code==9564){
        window.alert("Congrats! You Escaped!");
    }
    else{
        window.alert("The code is wrong!");
    }
}
// Dedicated initialization function for clarity
function initializeGame() {
    current_wall = 1;
    go_wall();
}


// Call initialization function
initializeGame();