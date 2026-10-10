module.exports = {
  eleventyComputed: {
    title: data => data.service?.titleName || '',
    h1: data => data.service?.name || '',
    description: data => `Professional ${(data.service?.material || '').toLowerCase()} shingle installation and roof replacement. Vetted, licensed, and insured contractors. Connect in 30 to 90 minutes.`,
    breadcrumbs: data => [
      { name: "Shingle Services", url: "/services/" },
      { name: data.service?.name, url: `/services/${data.service?.slug}/` }
    ]
  }
};
