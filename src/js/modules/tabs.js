const initTabs = (tabsContainerId) => {
  const tabList = document.getElementById(tabsContainerId);
  const tabBodies = document.querySelectorAll('.tab-body-element');

  tabBodies.forEach((tabBody) => (tabBody.style.display = 'none'));
  tabBodies[0].style.display = 'block';

  tabList.addEventListener('click', (evt) => {
    const tabId = evt.target.getAttribute('data-tab-name');

    if (tabId) {
      tabBodies.forEach((tabBody) => (tabBody.style.display = 'none'));
      console.log(tabList.children);
      Array.from(tabList.children).forEach((tab) => tab.classList.remove('popular__tab--active'));
      evt.target.classList.add('popular__tab--active');
      const tabBody = document.getElementById(tabId);
      tabBody.style.display = 'block';
    }
  });
};

export default initTabs;
