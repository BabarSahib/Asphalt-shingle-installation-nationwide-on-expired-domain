module.exports = {
  eleventyComputed: {
    title: data => `Shingle Roof Installation & Replacement in ${data.state?.name || ''} | American Shingle Co.`,
    h1: data => `Shingle Roof Installation in ${data.state?.name || ''}`,
    description: data => `Licensed and insured shingle roof installation and replacement across ${data.state?.name || ''}. Connect with vetted local roofing specialists in 30 to 90 minutes.`,
    breadcrumbs: data => [
      { name: "Service Areas", url: "/states/" },
      { name: data.state?.name, url: `/states/${data.state?.slug}/` }
    ]
  }
};
