window.onload = function() { build(); }

function build()
{
    var boxes = document.getElementsByTagName("box");
    for(var i = 0; i < boxes.length; i++)
    {
        var substitute = fetchBox(boxes[i].className.replace("box-", ""));
        
        boxes[i].innerHTML = substitute;

        var attributes = boxes[i].attributes;
        Array.prototype.slice.call(boxes[i].attributes).forEach(function(item)
        {
            if(item.name != "class" && item.name != "id")
            {
                var comps = boxes[i].children;

                for(var k = 0; k < comps.length; k++)
                {
                    if(comps[k].id == item.name)
                    {
                        comps[k].innerHTML = item.value;
                    }
                }
            }
        });
    }
}

function fetchBox(boxName)
{
    if(window.XMLHttpRequest) { xmlhttp = new XMLHttpRequest(); }
    else { xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }

    xmlhttp.onreadystatechange = function()
    {
        if(xmlhttp.readyState == 4 && xmlhttp.status==200) { return xmlhttp.responseText; }
    }
    xmlhttp.open("GET", "boxes/" + boxName + ".html", false);
    xmlhttp.send();
    if(xmlhttp.status != 200)
    {
        console.error("An error occurred when fetching box '" + boxName + "'.");
        return "";
    }
    return xmlhttp.responseText;
}