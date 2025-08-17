const moment = require('moment');

moment.locale('en');

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));

  // Blog collection grouped by 'blog' tag
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByTag('blog');
  });

  // Language-specific blog collections
  eleventyConfig.addCollection('blog_en', (collectionApi) => {
    return collectionApi
      .getFilteredByTag('blog')
      .filter((item) => item.url && item.url.startsWith('/en/'));
  });

  eleventyConfig.addCollection('blog_ro', (collectionApi) => {
    return collectionApi
      .getFilteredByTag('blog')
      .filter((item) => item.url && item.url.startsWith('/ro/'));
  });

  // Helper: find counterpart URL by translation_key across languages
  eleventyConfig.addFilter('findCounterpartUrl', (page, collections, targetLang) => {
    try {
      if (!page || !page.data || !page.data.translation_key) return null;
      const key = page.data.translation_key;
      const pool = targetLang === 'ro' ? collections.blog_ro : collections.blog_en;
      if (!pool || !Array.isArray(pool)) return null;
      const match = pool.find((item) => item && item.data && item.data.translation_key === key);
      return match ? match.url : null;
    } catch (e) {
      return null;
    }
  });

  // Folders to copy to output folder
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("favicon_io");
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);

    // This end position could use "lastIndexOf" to return all the paragraphs rather than just the first
    // paragraph when matching is on "<p>" and "</p>".
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}
