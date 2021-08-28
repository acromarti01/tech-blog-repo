$(".clickable-elements").click(async function(event) {
    event.preventDefault();
    console.log("GOOD SO FAR");
    let title;
    let content;
    if (event.target.hasAttribute("data-title"))
    {
        title = event.target.getAttribute("data-title");
    }
    else {title = "NO TITLE";}
    if (event.target.hasAttribute("data-title"))
    {
        content = event.target.getAttribute("data-content");
    }
    else {content = "NO CONTENT"}

    console.log(title, content);
    console.log(event.target);

    const response = await fetch("/dashboard/edit-blog", {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        console.log("SAVE STUFF");
        document.location.replace("/dashboard/edit-blog");
    }
    else { alert(response.statusText); }

});








// const buttons = document.getElementsByClassName("clickable-elements");
// const editBlogHandler = async(event) => {
//     event.preventDefault();
//     let title;
//     let content;
//     if (event.target.hasAttribute("data-title"))
//     {
//         title = event.target.getAttribute("data-title");
//     }
//     else {title = "NO TITLE";}
//     if (event.target.hasAttribute("data-title"))
//     {
//         content = event.target.getAttribute("data-content");
//     }
//     else {content = "NO CONTENT"}

//     console.log(title, content);
//     console.log(event.target);

//     const response = await fetch("/dashboard/edit-blog", {
//         method: "POST",
//         body: JSON.stringify({ title, content }),
//         headers: { "Content-Type": "application/json" },
//     });
//     if (response.ok) 
//     {
//         document.location.replace("/dashboard");
//     }
//     else { alert(response.statusText); }
// }

// for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", editBlogHandler);
// }


