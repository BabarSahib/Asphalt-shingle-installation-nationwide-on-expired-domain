module.exports = {
  eleventyComputed: {
    title: data => data.resourceItem?.title || '',
    h1: data => data.resourceItem?.title || '',
    description: data => data.resourceItem?.excerpt || '',
    breadcrumbs: data => [
      { name: "Resources", url: "/resources/" },
      { name: (data.resourceItem?.title || '').slice(0, 35), url: `/resources/${data.resourceItem?.slug || ''}/` }
    ]
  }
};
