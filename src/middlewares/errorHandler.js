export default async function errorHandler(err, req, res, next) {
  res.sendStatus(500);
}
