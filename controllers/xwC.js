const router = require('express').Router();
//const JWT = require('jsonwebtoken');
//const BC = require('bcryptjs');

let XW = require('../db').import('../models/xw');


// POST /new  (new puzzle)
router.post('/new', async (req, res) => {
  try {
    const userId = req.user.id;
    const xw = req.body.xw;
    let meta = xw.meta;

    console.log(req.body.xw);
    
    const data = await XW.create({
      title: meta.title,
      author: meta.author,
      copyright: meta.copyright,

      numSquares: xw.numSquares,
      dims: [xw.dims.x, xw.dims.y],

      clues: xw.clues,

      squares: xw.squares,

      solved: xw.solved,

      userId
    });

    res.json(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// GET /  (get all puzzles)
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    const data = await XW.findAll({
      where: { userId }
    });

    res.json(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET /infos  (just get all puzzle names and stats)

// GET /:id  (get a single puzzle)
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;

    let data = await XW.findOne({
      where: { id, userId }
    });
    res.json(data);

  } catch (err) {
    res.status(500).send(err.message);
  }
});


// PUT /:id/status  (status update)
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    
    if (!req.body.xw.meta) req.body.xw.meta = {};
    let title = req.body.xw.meta.title;
    let author = req.body.xw.meta.author;
    let copyright = req.body.xw.meta.copyright;
    let numSquares = req.body.xw.numSquares;
    if (!req.body.xw.dims) req.body.xw.dims = {};
    let dims = [req.body.xw.dims.x, req.body.xw.dims.y];
    let squares = req.body.xw.squares;
    let clues = req.body.xw.clues;
    let solved = req.body.xw.solved;

    let x = await XW.findOne({where: {id, userId}});

    if (!title) title = x.title;
    if (!author) author = x.author;
    if (!copyright) copyright = x.copyright;
    if (!numSquares) numSquares = x.numSquares;
    if ((!dims[0]) && (!dims[1])) dims = x.dims;
    if (!squares) squares = x.squares;
    if (!clues) clues = x.clues;
    if (!solved) solved = x.solved;

    let response = XW.update({
      title,
      author,
      copyright,
      numSquares,
      dims,
      squares,
      clues,
      solved
    }, {where: {id, userId}});

    res.json(response);

  } catch (err) {
    res.status(500).send(err.message);
  }

});

// PUT /:id/puzzle  (puzzle update (create mode?))


// DELETE /:id  (delete puzzle)


// DELETE /:id/status  (reset status on puzzle)



module.exports = router;