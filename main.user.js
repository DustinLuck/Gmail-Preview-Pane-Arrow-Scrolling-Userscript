// ==UserScript==
// @name        Gmail Preview Pane Arrow Scrolling
// @namespace   https://github.com/DustinLuck/
// @include     https://mail.google.com/*
// @grant       none
// @version     0.5.2023.0925
// ==/UserScript==

var elemPreviewPane = null;

function handleKeyDown(e)
{
    var nodesToIgnore = ["textarea", "input"];
    var rolesToIgnore = ["textbox", "combobox", "menu", "menuitem", "menuitemradio", "button"];
    var parentRolesToIgnore = ["alert", "dialog"];

    var targAttr = e.target.attributes;
    var targRole = targAttr.getNamedItem("role")?.value;

    var targParent = e.target.parentNode;
    var parentAttr = targParent.attributes;
    var parentRole = parentAttr.getNamedItem("role")?.value;
    
    if ((e.shiftKey
      || e.altKey
      || e.ctrlKey
      || nodesToIgnore.includes(e.target.nodeName.toLowerCase())
      || rolesToIgnore.includes(targRole)
      || parentRolesToIgnore.includes(parentRole)
        )
     && !targParent.classList.contains("ajU")
    ) {
        return;
    }

    var scrollDirection = 1;
    switch(e.key) {
        case "ArrowUp": //up arrow
            scrollDirection = -1;
        case "ArrowDown": //down arrow
            if (SetPreviewPane()) {
                ScrollPreviewPane(scrollDirection);
                e.preventDefault();
                e.stopPropagation();
            }
            break;
        default:
            return;
        }

}

function SetPreviewPane()
{
    return (elemPreviewPane = document.getElementsByClassName("S3")[0]); // Nu S3 aZ6
}

function ScrollPreviewPane(scrollDirection)
{
    var scrollValue = 25 * scrollDirection;
    if (elemPreviewPane) {
        elemPreviewPane.scrollTop += scrollValue;
    }
}

document.addEventListener('keydown', handleKeyDown, true);
