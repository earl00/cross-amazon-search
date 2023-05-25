document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const searchTerm = document.getElementById('search-input').value;
  
    // The list of Amazon domains we want to search
    const amazonDomains = ['de', 'fr', 'es', 'co.uk', 'it', 'nl', 'se', 'pl'];
  
    const tabsIds = [];
  
    for (const domain of amazonDomains) {
      // Open a new tab with the Amazon search URL for each domain
      const url = `https://amazon.${domain}/s?k=${encodeURIComponent(searchTerm)}`;
      const tab = await new Promise(resolve => {
        chrome.tabs.create({ url: url, active: false }, resolve);
      });
      tabsIds.push(tab.id);
    }
  
    await new Promise(resolve => {
      chrome.tabs.group({ tabIds: tabsIds }, resolve);
    });
  
    // Clear the search input
    document.getElementById('search-input').value = '';
  });  