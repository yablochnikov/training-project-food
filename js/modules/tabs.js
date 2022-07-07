function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(el => {
      el.classList.add('hide');
      el.classList.remove('show', 'fade');
    });

    tabs.forEach(el => {
      el.classList.remove(activeClass);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.add('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((tab, id) => {
        if(target === tab) {
          hideTabContent();
          showTabContent(id);
        }
      });
    }
  });
}

export default tabs;