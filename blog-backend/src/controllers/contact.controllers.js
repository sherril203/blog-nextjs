const { contactModel } = require('../models/contact.model')

const postcontact = async (req, res) => {
  try {
    const contactdata = req.body
    const saved = new contactModel(contactdata)
    await saved.save()
    return res.status(201).send({ message: "data submitted", data: saved })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "data error" })
  }
}

const getcontact = async (req, res) => {
  try {
    const showcontact = await contactModel.find().sort({ _id: -1 })
    return res.status(200).send({ data: showcontact })
  } catch (err) {
    console.error(err)
    return res.status(500).send({ message: "error" })
  }
}

module.exports = { postcontact, getcontact }