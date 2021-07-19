module.exports = (results, page, perPage, totalResults) => {

  return {
    results: results.rows,
    totalResults,
    page,
    totalPages: Math.ceil(totalResults / perPage),
  }
}