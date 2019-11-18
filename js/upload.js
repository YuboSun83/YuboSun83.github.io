const realFileBtn1 = document.getElementById("real-file1");
const customBtn1 = document.getElementById("custom-button1");
const customTxt = document.getElementById("custom-text");
const filetypeinput = document.getElementById("filetype");
const saveasjson = document.getElementById("SAJSON");
const saveasxml = document.getElementById("SAXML");
const saveascsv = document.getElementById("SACSV");
const display = document.getElementById("display");
const customBtn2 = document.getElementById("custom-button2");
const selectall = document.getElementById("SA");
const reselect = document.getElementById("RS");


let filetype = "json";
filetypeinput.addEventListener("change", function () {
    filetype = filetypeinput.value.toLowerCase();
})

customBtn1.addEventListener("click", function () {
    realFileBtn1.click();
});

realFileBtn1.addEventListener("change", function (event) {
    customTxt.innerHTML = "No file chosen, yet.";

    if (realFileBtn1.value) {
        customTxt.innerHTML = realFileBtn1.value.match(
            /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];

        if (customTxt.innerHTML.endsWith(filetype)) {
            if (filetype.match("json")) {
                let input = event.target;
                let reader = new FileReader();
                reader.onload = function () {
                    // let text = reader.result;
                    let text = reader.result;
                    // console.log(text);
                    let json = JSON.parse(text);
                    let i = 0;
                    json.Result.forEach(element => {
                        
                        let div = document.createElement("div");
                        div.className = "display-element"

                        let cbox = document.createElement("input");
                        cbox.className = "checkbox";
                        cbox.type="checkbox";
                        cbox.id = "checkbox-"+i;
                        i++;

                        let h4 = document.createElement("h4");
                        h4.className = "red";
                        let h4Text = document.createTextNode(element.title);
                        //h4.appendChild(cbox);
                        h4.appendChild(h4Text);

                        let newlink = document.createElement('a');
                        let linkText = document.createTextNode(element.url);
                        newlink.appendChild(linkText);
                        newlink.href = element.url;
                        newlink.className = "newlink";

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic")
                        let descText = document.createTextNode(element.description);
                        desc.appendChild(descText);

                        div.appendChild(cbox)
                        div.appendChild(h4);
                        div.appendChild(newlink);
                        div.appendChild(desc);

                        display.appendChild(div);
                    });

                };
                reader.readAsText(input.files[0]);

            }
            else if (filetype.match("xml")) {
                let input = event.target;
                let reader = new FileReader();
                reader.onload = function () {
                    // let text = reader.result;
                    let text = reader.result;
                    // console.log(text)
                    let txt ="";
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text, "text/xml");
                    for(let i=0; i < xmlDoc.getElementsByTagName("result").length; i++){
                        
                        
                        let div = document.createElement("div");
                        div.className = "display-element";
                        
                        let cbox = document.createElement("input");
                        cbox.className = "checkbox";
                        cbox.type="checkbox";
                        cbox.id ="checkbox-"+i;

                        let h4 = document.createElement("h4"); 
                        h4.className = "red";
                        let h4Text = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
                        
                        h4.appendChild(h4Text);

                        let newlink =document.createElement('a');
                        let linkText = document.createTextNode(xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue);
                        newlink.appendChild(linkText);
                        newlink.href = xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue;4
                        newlink.className = "newlink";

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic");
                        let descText = document.createTextNode(xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue);
                        desc.appendChild(descText);

                        div.appendChild(cbox);
                        div.appendChild(h4);
                        div.appendChild(newlink);
                        div.appendChild(desc);

                        display.appendChild(div);

                    }
                }

                reader.readAsText(input.files[0]);
            }
            else if (filetype.match("csv")) {
                let input = event.target;
                let reader = new FileReader();
                reader.onload = function () {
                    // let text = reader.result;
                    let text = reader.result;
                    // console.log(text)
                    let csv1 = text.split('\n');
                    //console.log(csv1[1]);
                    
                    for(let i = 0; i < csv1.length-1; i++){
                        let csv = csv1[i].split(',');

                        let div = document.createElement("div");
                        div.className = "display-element";

                        let cbox = document.createElement("input");
                        cbox.className = "checkbox";
                        cbox.id = "checkbox-" + i;
                        cbox.type="checkbox";

                        let h4 = document.createElement("h4"); 
                        h4.className = "red";
                        let h4Text = document.createTextNode(csv[0]);
                        
                        h4.appendChild(h4Text);

                        let newlink =document.createElement('a');
                        let linkText = document.createTextNode(csv[1]);
                        newlink.appendChild(linkText);
                        newlink.href = csv[1];
                        newlink.className = "newlink";

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic");
                        let descText = document.createTextNode(csv[2]);
                        desc.appendChild(descText);

                        div.appendChild(cbox);
                        div.appendChild(h4);
                        div.appendChild(newlink);
                        div.appendChild(desc);

                        display.appendChild(div);

                    }
                };
                reader.readAsText(input.files[0]);
                
            }
        }
        else {
            customTxt.innerHTML = "File type doesn't match";
        }

    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
});

saveasjson.addEventListener("click", function(){
    //let display= document.getElementsByClassName(".display-element");
    var check = document.getElementsByClassName("checkbox");
    var elements = document.getElementsByClassName("display-element");
    // alert("test");
    let selected = new Array();
    for(let i=0; i < check.length; i++){
        if(check[i].checked){
            
            // console.log(elements[i].childNodes[1].innerHTML);
            // console.log(elements[i].childNodes[2].innerHTML);
            // console.log(elements[i].childNodes[3].innerHTML);
            selected.push(check[i]);
            // console.log(check[i]);
        }
    }

    if(selected.length == 0){
        alert("No Result is choosen!");
        return;
    }

    let data={};
    for (let i = 0; i < selected.length; i++) {
        let title = elements[i].childNodes[1].innerText;
        let url = elements[i].childNodes[2].innerText;
        let desc = elements[i].childNodes[3].innerText;
        data={"Result":{ "title": title, "url": url, "description": desc}};
        }
    data = JSON.stringify(data)

    console.log(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/json;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'searchresults.json';
    hiddenElement.click();
});
        
saveasxml.addEventListener("click", function(){
    //let display= document.getElementsByClassName(".display-element");
    var check = document.getElementsByClassName("checkbox");
    var elements = document.getElementsByClassName("display-element");
    
    // alert("test");
    var selected = new Array();
    for(let i=0; i < check.length; i++){
        if(check[i].checked){
            // console.log(elements[i].childNodes[1].innerHTML);
            // console.log(elements[i].childNodes[2].innerHTML);
            // console.log(elements[i].childNodes[3].innerHTML);
            selected.push(check[i]);
            // console.log(check[i]);
        }
    }

    if(selected.length == 0){
        alert("No Result is choosen!");
        return;
    }

    let data = "<?xml version='1.0' encoding='UTF-8'?>\n<results>\n";
    for(let i=0; i < selected.length; i++){
        let title = elements[i].childNodes[1].innerText;
        let url = elements[i].childNodes[2].innerText;
        let desc = elements[i].childNodes[3].innerText;
        data += "<result>\n<title>" + title + "</title>\n<url>" + url + "</url>\n<description>" + desc + "</description>\n</result>\n"
    }
    data += "</results>";

    console.log(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/xml;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'searchresults.xml';
    hiddenElement.click();
});


saveascsv.addEventListener("click", function(){
    var check = document.getElementsByClassName("checkbox");
    var elements = document.getElementsByClassName("display-element");
    
    // alert("test");
    var selected = new Array();
    for(let i=0; i < check.length; i++){
        if(check[i].checked){
            // console.log(elements[i].childNodes[1].innerHTML);
            // console.log(elements[i].childNodes[2].innerHTML);
            // console.log(elements[i].childNodes[3].innerHTML);
            selected.push(check[i]);
            // console.log(check[i]);
        }
    }

    if(selected.length == 0){
        alert("No Result is choosen!");
        return;
    }

    let data = "";
    for(let i=0; i < selected.length; i++){
        let title = elements[i].childNodes[1].innerText;
        let url = elements[i].childNodes[2].innerText;
        let desc = elements[i].childNodes[3].innerText;
        data += '"' + title + '","' + url + '","' + desc + '"' + '\n';
    }
    

    //console.log(data);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'searchresults.csv';
    hiddenElement.click();
});
    
selectall.addEventListener("click", function(){
    var check = document.getElementsByClassName("checkbox");
    for(let i=0; i< check.length; i++){
        check[i].checked = true;
    }
});

reselect.addEventListener("click", function(){
    var check = document.getElementsByClassName("checkbox");
    for(let i=0; i< check.length; i++){
        check[i].checked = false;
    }
});
