const realFileBtn = document.getElementById("real-file");
const customBtn = document.getElementById("custom-button");
const customTxt = document.getElementById("custom-text");
const filetypeinput = document.getElementById("filetype");
const display = document.getElementById("display");

let filetype = "json";
filetypeinput.addEventListener("change", function () {
    filetype = filetypeinput.value.toLowerCase();
})

customBtn.addEventListener("click", function () {
    realFileBtn.click();
});

realFileBtn.addEventListener("change", function (event) {
    customTxt.innerHTML = "No file chosen, yet.";

    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value.match(
            /[\/\\]([\w\d\s\.\-\(\)]+)$/
        )[1];

        if (customTxt.innerHTML.endsWith(filetype)) {
            if (filetype.match("json")) {
                let input = event.target;
                let reader = new FileReader();
                reader.onload = function () {
                    // let text = reader.result;
                    let text = reader.result;
                    console.log(text);
                    let json = JSON.parse(text);
                    json.Result.forEach(element => {
                        let div = document.createElement("div");
                        div.className = "display-element"

                        let h4 = document.createElement("h4");
                        h4.className = "red";
                        let h4Text = document.createTextNode(element.title);
                        h4.appendChild(h4Text);

                        let newlink = document.createElement('a');
                        let linkText = document.createTextNode(element.url);
                        newlink.appendChild(linkText);
                        newlink.href = element.url;

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic")
                        let descText = document.createTextNode(element.description);
                        desc.appendChild(descText);

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
                    console.log(text)
                    let txt ="";
                    let parser = new DOMParser();
                    let xmlDoc = parser.parseFromString(text, "text/xml");
                    for(let i=0; i < xmlDoc.getElementsByTagName("result").length; i++){
                        
                        
                        let div = document.createElement("div");
                        div.className = "display-element";
                        
                        let h4 = document.createElement("h4"); 
                        h4.className = "red";
                        let h4Text = document.createTextNode(xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue);
                        h4.appendChild(h4Text);

                        let newlink =document.createElement('a');
                        let linkText = document.createTextNode(xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue);
                        newlink.appendChild(linkText);
                        newlink.href = xmlDoc.getElementsByTagName("url")[i].childNodes[0].nodeValue;

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic");
                        let descText = document.createTextNode(xmlDoc.getElementsByTagName("description")[i].childNodes[0].nodeValue);
                        desc.appendChild(descText);

                        div.appendChild(h4);
                        div.appendChild(newlink);
                        div.appendChild(desc);

                        display.appendChild(div);
                    }
                }


                // let getXMLFile = function(path, callback){
                //     let request = new XMLHttpRequest();
                //     request.open("GET", path);
                //     request.setRequestHeader("Content-Type", "text/xml");
                //     request.onreadystatechange = function(){
                //         if(request.readyState === 4 && request.status === 200){
                //             callback(request.responseXML);
                //         }
                //     };
                //     request.send();
                // }

                // getXMLFile(customTxt.innerHTML, function(xml){
                //     console.log(xml);
                // });
                reader.readAsText(input.files[0]);
            }
            else if (filetype.match("csv")) {
                let input = event.target;
                let reader = new FileReader();
                reader.onload = function () {
                    // let text = reader.result;
                    let text = reader.result;
                    console.log(text)
                    let csv1 = text.split('\n');
                    //console.log(csv1[1]);
                    
                    for(let i = 0; i < csv1.length-1; i++){
                        let csv = csv1[i].split(',');

                        let div = document.createElement("div");
                        div.className = "display-element";

                        let h4 = document.createElement("h4"); 
                        h4.className = "red";
                        let h4Text = document.createTextNode(csv[0]);
                        h4.appendChild(h4Text);

                        let newlink =document.createElement('a');
                        let linkText = document.createTextNode(csv[1]);
                        newlink.appendChild(linkText);
                        newlink.href = csv[1];

                        let desc = document.createElement("p");
                        desc.classList.add("black");
                        desc.classList.add("italic");
                        let descText = document.createTextNode(csv[2]);
                        desc.appendChild(descText);

                        div.appendChild(h4);
                        div.appendChild(newlink);
                        div.appendChild(desc);

                        display.appendChild(div);

                    }
                    // csv1.Result.forEach(element => {
                        
                    //     let csv = element.split(',');
                    //     let div = document.createElement("div");
                    //     div.className = "display-element"

                    //     let h4 = document.createElement("h4");
                    //     h4.className = "red";
                    //     let h4Text = document.createTextNode();
                    //     h4.appendChild(h4Text);

                    //     let newlink = document.createElement('a');
                    //     let linkText = document.createTextNode();
                    //     newlink.appendChild(linkText);
                    //     newlink.href = element.url;

                    //     let desc = document.createElement("p");
                    //     desc.classList.add("black");
                    //     desc.classList.add("italic")
                    //     let descText = document.createTextNode(element.description);
                    //     desc.appendChild(descText);

                    //     div.appendChild(h4);
                    //     div.appendChild(newlink);
                    //     div.appendChild(desc);

                    //     display.appendChild(div);
                    //})
                };
                reader.readAsText(input.files[0]);
                
            }

        }
        else {
            customTxt.innerHTML = "File type doesn't match";
        }

        // let newlink = document.createElement('a');
        // let linkText = document.createTextNode(customTxt.innerHTML);
        // newlink.appendChild(linkText);
        // newlink.title = "my title text";
        // newlink.href = "assets/" + customTxt.innerHTML;

        // let display = document.getElementById("display");
        // display.appendChild(newlink);
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
});
