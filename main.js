(function() {
    let btn = document.querySelector("#mYfirstbutton");
    let divcontainer = document.querySelector("#container");
    let mytemplate = document.querySelector("#myTemplate");
    let fid = 0;
    let folders = [];

    btn.addEventListener("click", addFolder);


    function addFolder() {
        let fname = prompt("Enter the Item name");
        if (!!fname) {
            let fidx = folders.findIndex(f => f.name == fname);
            if (fidx == -1) {
                fid++;
                addFolderToHTMLPage(fname, fid);
                folders.push({
                    id: fid,
                    name: fname
                })
                persitfolder();

            } else {
                alert("Folder name exists ");
            }
        } else {
            alert("Please enter something")
        }


    }

    function addFolderToHTMLPage(fname, fid) {

        let divtemplatefolder = mytemplate.content.querySelector(".folder");
        let divfolder = document.importNode(divtemplatefolder, true);
        let divname = divfolder.querySelector("div[purpose='name']");
        let spanEdit = divfolder.querySelector("span[action='Edit']");
        let spanDelete = divfolder.querySelector("span[action='Delete']");
        divname.innerHTML = fname;

        spanEdit.addEventListener("click", editFolder)
        spanDelete.addEventListener("click", deleteFolder);

        divfolder.setAttribute("fid", fid)

        divcontainer.appendChild(divfolder);

    }

    function editFolder() {
        let fname = prompt("Enter the new folder name");
        if (!!fname) {
            let divfolder = this.parentNode;
            let divname = divfolder.querySelector("[purpose='name']")
            divname.innerHTML = fname;
            let folder = folders.find(f => f.id == parseInt(divfolder.getAttribute("fid")));
            folder.name = fname;
            persitfolder();
        }

    }

    function deleteFolder() {
        let divfolder = this.parentNode;
        divcontainer.removeChild(divfolder);
        localStorage.removeItem("data", fid);
        let idx = folders.findIndex(f => f.id == parseInt(divfolder.getAttribute("fid")));
        folders.splice(idx, 1);
        persitfolder();

    }

    function persitfolder() {
        console.log(folders)
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data", fjson);
    }

    function loaddatafromstorage() {
        let fjson = localStorage.getItem("data");
        if (!!fjson) {
            let folders = JSON.parse(fjson);
            folders.forEach(f => addFolderToHTMLPage(f.name, f.id))
        }
    }
    loaddatafromstorage();


})() //iife me is liye likha hai taki namespace polute na ho and multiple  js file ho tb mandatory ho jata hai