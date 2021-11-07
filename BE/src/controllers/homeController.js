import db from "../models/index"
import CRUDService from "../services/CRUDService"

const getHomePage = async (req, res) => {
    try {
        const data = await db.User.findAll()
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}
const getAboutPage = (req, res) => {
    return res.render('aboutpage.ejs')
}

const getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

const postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send('post crud from server')
}

const displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

const getEditCRUD = async (req, res) => {
    const userId = req.query.id
    if (userId) {
        const userData = await CRUDService.getUserInfoById(userId);


        return res.render('editCRUD.ejs', {
            user: userData
        })
    }
    else {
        return res.send('Khong tim thay nguoi dung')
    }
}

const putCRUD = async (req, res) => {
    const data = req.body
    const allUsers = await CRUDService.updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

const deleteCRUD = async (req, res) => {
    const id = req.query.id
    if (id) {

        await CRUDService.deleleUserById(id)
        return res.send('Delete user succeed!')
    }
    else {
        return res.send('Khong tim thay nguoi dung')

    }
}

const homeController = {
    getHomePage,
    getAboutPage,
    getCRUD,
    postCRUD,
    displayGetCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD
}

export default homeController