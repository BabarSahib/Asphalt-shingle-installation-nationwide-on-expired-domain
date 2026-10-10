module.exports = {
  eleventyComputed: {
    title: data => data.costItem?.title || '',
    h1: data => data.costItem?.title || '',
    description: data => `Comprehensive guide to ${(data.costItem?.material || '').toLowerCase()} shingle roof costs in 2026. Explore pricing per square, Good-Better-Best tiers, and contractor bid factors.`,
    breadcrumbs: data => [
      { name: "Roofing Costs", url: "/roofing-costs/" },
      { name: `${data.costItem?.material || ''} Cost`, url: `/roofing-costs/${data.costItem?.slug || ''}/` }
    ]
  }
};
