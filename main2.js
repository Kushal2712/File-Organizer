(function(){

    let divcontainer=document.querySelector("#container");
    let mytemplate=document.querySelector("#myTemplate");
    
    let btn=document.querySelector("#mYfirstbutton");
    let folders=[];
    let cid=-1;
    let rid=0;

    btn.addEventListener("click",addFolder);

    function addFolder(){
        let fname=prompt("Enter the folder name");
        if(!!fname){
            let fidx=folders.findIndex(f => f.name==fname);
             if(fidx==-1){
            let pid=cid;
                rid++;
                addFolderToHTMLPage(fname,rid,pid);
                folders.push({
                    id:rid,
                    name:fname,
                    type:"folder",
                    pid:cid
                });
                persitfolder();
             }else{
                alert("Folder name already exists");
             }
        }else{
            alert("Please enter something");
        }
    }

    function addFolderToHTMLPage(fname,rid,pid){    
            let divfoldertemplate=mytemplate.content.querySelector(".folder");
            let divfolder=document.importNode(divfoldertemplate,true);
            let divName=divfolder.querySelector("div[purpose='name']");
            let spanEdit=divfolder.querySelector("span[action='Edit']");
            let spanDelete=divfolder.querySelector("span[action='Delete']");
            let spanView=divfolder.querySelector("span[action='View']");

            spanEdit.addEventListener("click",editFolder);
    
            divName.innerHTML=fname;
            divcontainer.appendChild(divfolder);
    }

    function editFolder(){
        let fname=prompt("Enter the new name");
        if(!!fname){
           let divfolder=this.parentNode;
           let divName=divfolder.querySelector("div[purpose='name']");
           divName.innerHTML=fname;
           let folder= folders.find(f => f.id == parseInt(divfolder.getAttribute("rid")));
           folder.name=fname;
           persitfolder();
        }

    }

    function viewfolder(){
        let divfolder=this.parentNode;
        let divName=divfolder.querySelector("div[purpose='name']");
        let fname=divName.innerHTML
        let fid=parseInt(divfolder.getAttribute("rid"));

        let aPathtemp=mytemplate.content.querySelector("a[purpose='path']");
        let apath=document.importNode(aPathtemp,true);
        
        apath.innerHTML=fname;
        apath.setAttribute("rid", fid);

        divcontainer.appendChild(apath);




    }

    function deleteFolder(){

    }

    function persitfolder(){
        let fjson=JSON.stringify(folders);
        localStorage.setItem("data",fjson);
    }


})()