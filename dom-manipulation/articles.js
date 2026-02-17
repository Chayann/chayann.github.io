/* filtering the forms */
function showFilter() {
    document.getElementById("filterContent").style.display = "block";
    document.getElementById("newContent").style.display = "none";
}

function showAddNew() {
    document.getElementById("newContent").style.display = "flex";
    document.getElementById("filterContent").style.display = "none";
}

/* filtering the articles */
function filterArticles() {
    let showOpinion = document.getElementById("opinionCheckbox").checked;
    let showRecipe = document.getElementById("recipeCheckbox").checked;
    let showUpdate = document.getElementById("updateCheckbox").checked;

    let opinions = document.getElementsByClassName("opinion");
    for (let i = 0; i < opinions.length; i++) {
        if(showOpinion) {
            opinions[i].style.display = "block";
        } else {
            opinions[i].style.display = "none";
        }
    }

    let recipes = document.getElementsByClassName("recipe");
    for (let i = 0; i < recipes.length; i++) {
        if(showRecipe) {
            recipes[i].style.display = "block";
        } else {
            recipes[i].style.display = "none";
        }
    }

    let updates = document.getElementsByClassName("update");
    for (let i = 0; i < updates.length; i++) {
        if(showUpdate) {
            updates[i].style.display = "block";
        } else {
            updates[i].style.display = "none";
        }
    }   

}

/* adding a new article */
function addNewArticle() {
    let title = document.getElementById("inputHeader").value;
    let text = document.getElementById("inputArticle").value;

    let typeClass = "";
    let typeLabel = "";

    if(document.getElementById("opinionRadio").checked) {
        typeClass = "opinion";
        typeLabel = "Opinion";
    } else if(document.getElementById("recipeRadio").checked) {
        typeClass = "recipe";
        typeLabel = "Recipe";
    } else if(document.getElementById("lifeRadio").checked) {
        typeClass = "update";
        typeLabel = "Update";
    }
    else {
        return;
    }
    
    // creating the article element
    let article = document.createElement("article");
    article.className = typeClass;

    // creating marker
    let marker = document.createElement("span");
    marker.className = "marker";
    marker.innerText = typeLabel;

    // title
    let h2 = document.createElement("h2");
    h2.innerText = title;

    // creating the text paragraph
    let p = document.createElement("p");
    p.innerText = text;

    // creating the read more link
    let linkParagraph = document.createElement("p");
    let link = document.createElement("a");
    link.href = "moreDetails.html";
    link.innerText = "Read more...";
    linkParagraph.appendChild(link);

    // adding everything to article
    article.appendChild(marker);
    article.appendChild(h2);
    article.appendChild(p);
    article.appendChild(linkParagraph);

    // add the article to the list
    document.getElementById("articleList").appendChild(article);

    // clearing the form
    document.getElementById("inputHeader").value = "";
    document.getElementById("inputArticle").value = "";
    document.getElementById("opinionRadio").checked = false;
    document.getElementById("recipeRadio").checked = false;
    document.getElementById("lifeRadio").checked = false;

    // returning to the filter view
    filterArticles();

}