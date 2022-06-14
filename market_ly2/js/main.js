var sideNav = document.getElementById("outputNav")
var detail = document.getElementById("outputDetail")
var navHTML = ''
function createList(){
  ALL_RECORD.map((item,index)=>{
    var icon = ""
   
    if(item.is_def){
       icon =`<i data-icon="${item.md_id}_${item.version}">def</i>`
    }else{
      icon = `<i data-icon="${item.md_id}_${item.version}"></i>`
    }
    navHTML += `<li class="list-group-item mktList" data-nbtn="select" data-index="${index}" data-mkt-id="${item.md_id}_${item.version}" data-is_def="${item.is_def}" data-name="${item.md_name}" data-md_id="${item.md_id}">${item.md_name} ------- ${icon}
    </li>`
  })
  console.log(ALL_RECORD,sideNav)
}

createList()
sideNav.innerHTML = navHTML;
console.log(navHTML)

const gbData = []

$('[data-nbtn="select"]').click((ev)=>{
  let obj = $(ev.currentTarget)
  let index = obj.attr('data-index');
  let mkt_id = obj.attr('data-mkt-id');
  let is_def = obj.attr('data-is_def');
  let md_name = obj.attr('data-name');
  let objData = {mkt_id:mkt_id, is_added:false,is_def:is_def}
  gbData.push(objData)
  showDetail(index, mkt_id)
  console.log("Btn Clicked")
})



function showDetail(index,mkt_id){
    var data = ALL_RECORD[index];
    var btn = ''
    if(data.is_def){
      btn = `<button data-nbtn="nochange">Default</button>`
    }else{
      debugger
      let key = isAdded(mkt_id);
      btn =  key ? `<button data-nbtn="add">Remove</button>`:`<button data-nbtn="add">Add</button>`
    }
    var temp = `<h2>${data.md_name}</h2>
    <h2>${data.md_id}</h2> ${btn}`;
    console.log(data,temp)
    detail.innerHTML = temp;

    if(!data.is_def){
      $('[data-nbtn="add"]').click((ev)=>{
        console.log("add Module",index, mkt_id);
        var iconDom = $(`[data-icon="${mkt_id}"]`)[0] ;
        console.log(iconDom)
        iconDom.innerHTML = "added";
        isAdded(mkt_id,true)

    })
    }
}

function isAdded(mktData, key){
  console.log("isAdded ",mktData, gbData)
  for(let i=0; i < gbData.length ; i++){
    if(gbData[i].mkt_id === mktData){
      if(gbData[i].is_added){
        return true
      }else if(key){
        gbData[i].is_added = !gbData[i].is_added;
      }
      console.log(gbData[i].mkt_id,mktData)     
    }
  }
  return false;
}