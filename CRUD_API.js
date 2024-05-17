const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

mongoose.connect(
  'mongodb+srv://mohanjayabal5:LY7kmen0jX9WObMm@cluster1.ohcezvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const movie = new mongoose.Schema({
  name: String,
  img: String,
  summary: String,
})
const Movie = mongoose.model('Movie', movie)

// Create
app.post('/movies', async (req, res) => {
  try {
    const movie = await Movie.create(req.body)
    res.status(201).json(movie)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Read
app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Update
app.put('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(movie)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Delete
app.delete('/movies/:id', async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id)
    res.json({message: 'Movie deleted successfully'})
  } catch (error) {
    res.status(500).json({error: error.message})
  }
})

// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
