export default async function errorHandler(err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
}
