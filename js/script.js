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
  optAuthorTagsSelector = '.post-author';

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

function generateTags() {
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
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href')
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('article.active .post-tags .list a');
  console.log(activeLinks);

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {

    /* remove class active */
    activeLink.classList.remove('active');

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagsLinks = document.querySelectorAll('.post-tags .list a');
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
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('article .post-tags .list a');
  console.log(tagLinks);
  /* START LOOP: for each link */
  for (let eachTagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    eachTagLink.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function generateAuthors() {
  /* find all authors */
  let articles = document.querySelectorAll(optArticleSelector);
  // console.log(articles);

  /* START LOOP: for every author: */
  for (const article of articles) {

    /* find tags wrapper */
    let authorList = article.querySelector(optAuthorTagsSelector);
    // console.log(authorList);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const author = article.getAttribute('data-author');
    // console.log(author);

    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    authorList.innerHTML = html;
  }

  /* insert HTML of all the links into the tags wrapper */
  const links = document.querySelectorAll('authors a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
    /* END LOOP: for every article: */
  }
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
