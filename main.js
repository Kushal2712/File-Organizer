(function() {
    let txtbtn = document.querySelector("#mYfirstbutton");
    let filebtn = document.querySelector("#textfile");
    let divcontainer = document.querySelector("#container");
    let breadcumb = document.querySelector("#breadcumb")
    let apathbreadcumb = breadcumb.querySelector("a[purpose='path']");
    let mytemplate = document.querySelector("#myTemplate");
    let app=document.querySelector("#app");
    let appTitleBar=document.querySelector("#app-title");
    let appTitle=document.querySelector("#app-titlebar");
    let appMenuBar=document.querySelector("#app-menubar");
    let appBody=document.querySelector("#app-body");
   

    let cfid = -1;
    let rid = 0;

    let folders = [];
 

    txtbtn.addEventListener("click", addFolder);
    filebtn.addEventListener("click",addFile)
    
    apathbreadcumb.addEventListener("click", viewfolderfrompath);




    function addFolder() {
        let fname = prompt("Enter the Item name");
        if (!!fname) {
            let fidx = folders.findIndex(f => f.name == fname);
            if (fidx == -1) {
                rid++;
                let pid = cfid;
                addFolderToHTMLPage(fname, rid, pid);
                folders.push({
                    id: rid,
                    name: fname,
                    type: "folder",
                    pid: cfid
                })
                persitfolder();

            } else {
                alert("Folder name exists ");
            }
        } else {
            alert("Please enter something")
        }


    }

    function addFile(){
        let fname = prompt("Enter the Item name");
        if (!!fname) {
            let fidx = folders.findIndex(f => f.name == fname);
            if (fidx == -1) {
                rid++;
                let pid=cfid;
                addFileToHTMLPage(fname,rid,pid);
                folders.push({
                    id: rid,
                    name: fname,
                    type: "file",
                    pid:cfid
                })
                persitfolder();

            } else {
                alert("File name exists ");
            }
        } else {
            alert("Please enter something")
        }
    }

    function addFileToHTMLPage(fname,rid,pid) {

        let divtemplatefile = mytemplate.content.querySelector(".file");
        let divfile = document.importNode(divtemplatefile, true);
        let divname = divfile.querySelector("div[purpose='name']");
        let spanEdit = divfile.querySelector("span[action='Edit']");
        let spanDelete = divfile.querySelector("span[action='Delete']");
        let spanView = divfile.querySelector("span[action='View']");
        divname.innerHTML = fname;

        spanEdit.addEventListener("click", editFile)
        spanDelete.addEventListener("click", deleteFile);
        spanView.addEventListener("click", viewTextFile);
        divfile.setAttribute("rid", rid)
        divfile.setAttribute("pid", pid)
        divcontainer.appendChild(divfile);


    }
    

    function addFolderToHTMLPage(fname, rid, pid) {

        let divtemplatefolder = mytemplate.content.querySelector(".folder");
        let divfolder = document.importNode(divtemplatefolder, true);
        let divname = divfolder.querySelector("div[purpose='name']");
        let spanEdit = divfolder.querySelector("span[action='Edit']");
        let spanDelete = divfolder.querySelector("span[action='Delete']");
        let spanView = divfolder.querySelector("span[action='View']");
        divname.innerHTML = fname;

        spanEdit.addEventListener("click", editFolder)
        spanDelete.addEventListener("click", deleteFolder);
        spanView.addEventListener("click", viewfolder);


        divfolder.setAttribute("rid", rid)
        divfolder.setAttribute("pid", pid);
        divcontainer.appendChild(divfolder);


    }

    function viewTextFile(){

        let span=this;
        let divfile=span.parentNode;
        let divname=divfile.querySelector("div[purpose='name']");
        let fname=divname.innerHTML;
        let fid=parseInt(divfile.getAttribute("rid"));

        let notepadMenuBarTemplate=mytemplate.content.querySelector("[purpose='notepad-menu']");
        let notepadMenuBar=document.importNode(notepadMenuBarTemplate,true);
        
        appMenuBar.innerHTML="";
        appMenuBar.appendChild(notepadMenuBar);

        let notepadBodyBarTemplate=mytemplate.content.querySelector("[purpose='notepad-body']");
        let notepadBodyBar=document.importNode(notepadBodyBarTemplate,true);

        appBody.innerHTML="";
        appBody.appendChild(notepadBodyBar);
        appTitleBar.innerHTML=fname;

        let spansave=notepadMenuBar.querySelector("[action=save]");
        let spanBold=notepadMenuBar.querySelector("[action=bold]");
        let spanItalic=notepadMenuBar.querySelector("[action=italic]");
        let spanunderline=notepadMenuBar.querySelector("[action=underline]");
        let inputBgColor=notepadMenuBar.querySelector("[action=bg-color]");
        let inputTextColor=notepadMenuBar.querySelector("[action=tx-color]");
        let selectFontFamily=notepadMenuBar.querySelector("[action=font-family]");
        let selectFontSize=notepadMenuBar.querySelector("[action=font-size]");

        spansave.addEventListener("click",saveFile);
        spanBold.addEventListener("click",makeBold);
        spanItalic.addEventListener("click",makeItalic);
        spanunderline.addEventListener("click",makeUnderline);
        inputBgColor.addEventListener("change",changeBgColor);
        inputTextColor.addEventListener("change",changeTextColor);
        selectFontFamily.addEventListener("change",changeFontFamily)

    }

    function saveFile(){

    }

    function makeBold(){
        let textArea=appBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed==false){
            this.setAttribute("pressed",false);
            textArea.style.fontWeight="bold";
        }else{
            this.setAttribute("pressed",true);
            textArea.style.fontWeight="normal";
        }

    }

    function makeItalic(){
        let textArea=appBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed==false){
            this.setAttribute("pressed",false);
            textArea.style.fontStyle="italic";
        }else{
            this.setAttribute("pressed",true);
            textArea.style.fontStyle="normal";
        }
    }

    function makeUnderline(){
        let textArea=appBody.querySelector("textArea");
        let isPressed=this.getAttribute("pressed")=="true";
        if(isPressed==false){
            this.setAttribute("pressed",false);
            textArea.style.textDecoration="underline";
        }else{
            this.setAttribute("pressed",true);
            textArea.style.textDecoration="normal";
        }
    }

   

    function changeTextColor(){
        let color=this.value;
        let textArea=appBody.querySelector("textArea");
        textArea.style.color=color;

    }

    function changeFontFamily(){
        let font=this.value;
        let textArea=appBody.querySelector("textArea");
        textArea.style.fontStyle=font;

    }

    function changeFontSize(){

    }

    function changeBgColor(){
        let color=this.value;
        let textArea=appBody.querySelector("textArea");
        textArea.style.backgroundColor=color;

    }


    function viewfolder() {
        let spanview = this;
        let divfolder = spanview.parentNode;
        let divname = divfolder.querySelector("div[purpose='name']");
        let fname = divname.innerHTML;
        let fid = parseInt(divfolder.getAttribute("rid"));
        //console.log(foldid);

        let aPathtemp = mytemplate.content.querySelector("a[purpose='path']");
        let aPath = document.importNode(aPathtemp, true);


        aPath.innerHTML = fname;
        aPath.setAttribute("rid", fid);
        aPath.addEventListener("click", viewfolderfrompath)
        breadcumb.appendChild(aPath);
        cfid = fid;
        divcontainer.innerHTML = "";
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].pid == cfid) {
                if(folders[i].type==="folder"){
                        addFolderToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                        }else{
                            addFileToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                        }
                }
        }


    }

    function editFile() {
        let fname = prompt("Enter the new file name");
        if (!!fname) {
            let divfile = this.parentNode;
            let divname = divfile.querySelector("[purpose='name']")
            divname.innerHTML = fname;
            let folder = folders.find(f => f.id == parseInt(divfile.getAttribute("rid")));
            folder.name = fname;
            persitfolder();
        }

    }

    function editFolder() {
        let fname = prompt("Enter the new folder name");
        if (!!fname) {
            let divfolder = this.parentNode;
            let divname = divfolder.querySelector("[purpose='name']")
            divname.innerHTML = fname;
            let folder = folders.find(f => f.id == parseInt(divfolder.getAttribute("rid")));
            folder.name = fname;
            persitfolder();
        }

    }

    function deleteFolder() {
        let spandel = this;
        let ftbd = parseInt(spandel.parentNode.getAttribute("rid"));

        let divfolder = spandel.parentNode;
        let divname = divfolder.querySelector("div[purpose='name']");
        let fname = divname.innerHTML;

        let sure = confirm('Are you sure you want to delete ' + fname + '? ');
        if (!sure) {
            return;
        }

        //html
        divcontainer.removeChild(divfolder)

        //ram
        deleteHelper(ftbd);


        //storage
        persitfolder();



    }

     function deleteFile() {
        let spandel = this;
        let ftbd = parseInt(spandel.parentNode.getAttribute("rid"));

        let divfile = spandel.parentNode;
        let divname = divfile.querySelector("div[purpose='name']");
        let fname = divname.innerHTML;

        let sure = confirm('Are you sure you want to delete ' + fname + '? ');
        if (!sure) {
            return;
        }

        //html
        divcontainer.removeChild(divfile)

        //ram
        deleteHelper(ftbd);


        //storage
        persitfolder();



    }

    function deleteHelper(ftbd) {
        let children = folders.filter(f => f.pid == ftbd);
        for (let i = 0; i < children.length; i++) {
            deleteHelper(children[i].id);
        }

        let rid = folders.findIndex(f => f.id == ftbd);
        folders.splice(rid, 1)
    }

    
   
    function viewfolderfrompath() {
        let apath = this;

        let fid = parseInt(apath.getAttribute("rid"));

        // set the brreadumb
        for (let i = breadcumb.children.length - 1; i >= -0; i--) {
            if (breadcumb.children[i] == apath) {
                break;
            }
            breadcumb.removeChild(breadcumb.children[i]);
        }

        // set
        cfid = fid;
        divcontainer.innerHTML = "";

        for (let i = 0; i < folders.length; i++) {
            if (folders[i].pid == cfid) {
                if(folders[i].type==="folder"){
                        addFolderToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                        }else{
                            addFileToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                        }
                }
        }
    }


    function persitfolder() {
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loaddatafromstorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            folders = JSON.parse(fjson);
        }
        console.log(folders)
        for (let i = 0; i < folders.length; i++) {
            if (folders[i].pid == cfid) {
            if(folders[i].type=="folder"){
                    addFolderToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                    }else{
                        addFileToHTMLPage(folders[i].name, folders[i].id, folders[i].pid);
                    }
            }
        }

    }
    loaddatafromstorage();


})() //iife me is liye likha hai taki namespace polute na ho and multiple  js file ho tb mandatory ho jata hai