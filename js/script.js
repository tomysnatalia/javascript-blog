'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /*[DONE] remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  // console.log('clickedElement (with plus): ' + clickedElement);
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');
  console.log(hrefAttribute);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(clickedElement.getAttribute('href'));
  console.log(correctArticle);

  /* [DONE] add class 'active' to the correct article */
  correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optAuthorSelector = '.data-author',
  optAuthorTagsSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorListSelector = '.authors.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';

function generateTitleLinks(customSelector = '') {
  /* remove list of links in left column */
  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  let articles = document.querySelectorAll(optArticleSelector + customSelector);
  // console.log(articles);

  let html = '';

  for (const article of articles) {
    /* get 'id' for each article and save it to a const */
    const articleId = article.getAttribute('id');

    /* find the correct article using the selector (value of 'title') and save it to const */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log(articleTitle);

    const titleList = document.querySelector(article.getAttribute('id'));
    // console.log(titleList);

    /* create HTML code for link and save it to const */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert the HTML code into titleList */
    html = html + linkHTML;
    // console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return classNumber;
  console.log(classNumber);
}

function calculateTagsParams(tags) {
  const params = { max: 0, min: 10 };

  for (const tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
    } else { (tags[tag] < params.min)
      params.min = tags[tag]
    }
  }
  return params;
}

function calculateAuthorTags(authors) {

  for (const author in authors) {
    console.log(author + ' write ' + authors[author] + ' articles');

  }
}


function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  let articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* START LOOP: for every article: */
  for (const article of articles) {

    /* find tags wrapper */
    let titleList = article.querySelector(optArticleTagsSelector);
    // console.log(titleList);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    // console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    // console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      // console.log(tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';

      /* add generated code to html variable */
      html = html + linkHTML;
      // console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    titleList.innerHTML = html;
  }

  /* insert HTML of all the links into the tags wrapper */
  const links = document.querySelectorAll('.tags a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsPrams: ', tagsParams);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = ' ';

  /* [NEW] START LOOP: for each tag in allTags */
  for (const tag in allTags) {

    /* [NEW] generate code of link and add it to allTagsHTML */

    const tagLinkHTML = '<li><a class=' + optCloudClassPrefix  + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '"><span>' + tag +  '</span></a></li> ';
    // console.log('taglinkHTML: ', tagLinkHTML)

    allTagsHTML += tagLinkHTML
    // console.log(allTagsHTML);

    /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  // console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  // console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('article.active .post-tags .list a');
  // console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {

    /* remove class active */
    activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagsLinks = document.querySelectorAll('.post-tags .list a');
  // console.log(hrefTagsLinks);
  /* START LOOP: for each found tag link */
  for (let hrefTagsLink of hrefTagsLinks) {
    if (hrefTagsLink.getAttribute('href') == href) {
      /* add class active */
      hrefTagsLink.classList.add('active');
      // console.log(hrefTagsLink);
      /* END LOOP: for each found tag link */
    }
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('article .post-tags .list a');
  // console.log(tagLinks);
  /* START LOOP: for each link */
  for (let eachTagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    eachTagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors() {
  let article = document.querySelectorAll(optArticleSelector);
  let allAuthors = {};

  /* find all authors */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every author: */
  for (const article of articles) {

    /* find tags wrapper */
    let authorList = article.querySelector(optAuthorTagsSelector);
    console.log(authorList);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articlesAuthors = article.getAttribute('data-author');
    console.log(articlesAuthors);

    /* SPLIT authors into array */
    const articlesAuthorsArray = articlesAuthors.split();
    /* START LOOP: for each author */
    for (let author of articlesAuthorsArray) {
      console.log(author);


    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

      /* [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors.hasOwnProperty(author)){
        /* [NEW] add new Author to allAuthors object*/
        allAuthors[author] = 1;
      } else {
        allAuthors[author] ++;
      }
    }

    authorList.innerHTML = html;
  }

  /* insert HTML of all the links into the tags wrapper */
  const links = document.querySelectorAll('authors a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
    /* END LOOP: for every article: */
  }

   /* [NEW] find list of authors in right column */
   const authorList = document.querySelector('.authors');
   const authorsParams = calculateAuthorTags(allAuthors);

  /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = ' ';

  /* [NEW] START LOOP: for each tag in allTags */
  for (const author in allAuthors) {

    /* [NEW] generate code of link and add it to allTagsHTML */

    const authorLinkHTML = '<li><a href="#author-' + author + '"><span>' + author + ' (' + allAuthors[author] + ') ' + '</span></a></li> ';
    console.log('authorLinkHTML: ', authorLinkHTML);

    allAuthorsHTML += authorLinkHTML;
    console.log(allAuthorsHTML);

    /* [NEW] END LOOP: for each tag in allTags */
  }

  /* [NEW] add html from allTagsHTML to tagList */
  authorList.innerHTML = allAuthorsHTML;

}
generateAuthors();

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this.querySelector('a');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);

  /* find all authors links with class active */
  const activeLinks = document.querySelectorAll('article.active .post-author');
  console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagsLinks = document.querySelectorAll('.post-author');
  console.log(hrefTagsLinks);
  /* START LOOP: for each found tag link */
  for (let hrefTagsLink of hrefTagsLinks) {
    if (hrefTagsLink.getAttribute('href') == href) {
      /* add class active */
      hrefTagsLink.classList.add('active');
      console.log(hrefTagsLink);
      /* END LOOP: for each found tag link */
    }
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('article .post-author');
  console.log(authorLinks);

  /* START LOOP: for each link */
  for (let authorLink of authorLinks) {

    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
}
addClickListenersToAuthors();



