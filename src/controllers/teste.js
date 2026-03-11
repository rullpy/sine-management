export default function teste (req, res) {
  res.send(req.params); // /teste/:usuarios
  res.send(req.query); // /teste/?id=10
}
