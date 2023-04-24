import { json } from 'body-parser';
import pool from '../configs/connectDB'
import multer from 'multer';
let getHomepage = (req, res) => {
    let data = [];
    pool.query('SELECT * FROM users ORDER BY id', (err, results) => {
        if (err) throw err;
        results.rows.forEach(row => {
            data.push({
                id: row.id,
                address: row.address,
                email: row.email,
                first_name: row.first_name,
                last_name: row.last_name
            });
        });
        //  console.log(data);
        res.render("index.ejs", { dataUser: data });
    });
};
let getDetailPage = async (req, res) => {
    let userId = req.params.id;
    let user = await pool.query(`SELECT * FROM users WHERE id =$1`, [userId]);
    // console.log('check request params', user.rowsơ0);
    return res.send(JSON.stringify(user.rows[0]));
}
//Thêm user
let createNewUser = async (req, res) => {
    console.log(`check req`, req.body)
    let { first_name, last_name, email, address } = req.body;
    await pool.query(`insert into users(first_name,last_name,email,address) values($1,$2,$3,$4)`, [first_name, last_name, email, address])
    return res.redirect('/')
}
//Xóa user
let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.query(`delete from users where id=$1`, [userId]);
    return res.redirect('/')//quay ve trang chu 
}
let editUser = async (req, res) => {
    let id = req.params.id //lay id nguoi dung
    let user = (await pool.query(`select *from users where id=$1`, [id])).rows[0];
    return res.render('update.ejs', { dataUser: user }) //x<-y
}
let postUpdateUser = async (req, res) => {
    let { first_name, last_name, email, address, id } = req.body;
    await pool.query(`update users set first_name=$2,last_name=$3,email=$4,address=$5 where id=$1`,
        [id, first_name, last_name, email, address])
    return res.redirect('/')
}
let getUploadFilePage = async (req, res) => {
    res.render('uploadfile.ejs');
}
const upload = multer().single('profile_pic');
const upload_multiple = multer().array('multiple_images');
let handleUploadFile = async (req, res) => {
    console.log(req.file);
    // upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    // else if (err instanceof multer.MulterError) {
    //     return res.send(err);
    // }
    // else if (err) {
    //     return res.send(err);
    // }

    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    // });
}
let handleUploadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    console.log('check files', files)
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    //file là 1 array được quét
    result += '<hr/><a href="/upload">Upload more images</a>';
    res.send(result);
};
module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, editUser, postUpdateUser,
    getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}