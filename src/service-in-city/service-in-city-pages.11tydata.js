module.exports = {
  eleventyComputed: {
    city: data => data.item?.city,
    service: data => data.item?.service,
    title: data => `${data.item?.service?.titleName || ''} in ${data.item?.city?.name || ''}, ${data.item?.city?.stateAbbr || ''} | American Shingle Co.`,
    h1: data => `${data.item?.service?.name || ''} in ${data.item?.city?.name || ''}, ${data.item?.city?.stateAbbr || ''}`,
    description: data => `Professional ${(data.item?.service?.material || '').toLowerCase()} shingle installation in ${data.item?.city?.name || ''}, ${data.item?.city?.stateAbbr || ''}. Connect with licensed and insured contractors in 30 to 90 minutes.`,
    breadcrumbs: data => [
      { name: data.item?.city?.state, url: `/states/${data.item?.city?.stateSlug}/` },
      { name: data.item?.city?.name, url: `/${data.item?.city?.stateSlug}/${data.item?.city?.slug}/` },
      { name: data.item?.service?.name, url: `/${data.item?.city?.stateSlug}/${data.item?.city?.slug}/${data.item?.service?.slug}/` }
    ]
  }
};
