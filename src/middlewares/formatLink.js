export default function formatLink(req, res, next) {
  const pattern = /^(https?:\/\/)?(www.)?(youtu(be.com|.be)\/)(embed\/|watch\?(v=|)|v\/)?/;
  const defaultBase = 'https://youtu.be/';
  req.body.youtubeLink = defaultBase + req.body.youtubeLink?.replace(pattern, '').slice(0, 11);
  next();
}
