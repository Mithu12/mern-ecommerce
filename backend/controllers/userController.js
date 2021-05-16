import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateTokens.js";



// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))){
        const {_id, name, isAdmin} = user

        res.json(
            {
                _id,name,email,isAdmin,token:generateToken(_id)
            }
        )

    }
    else {
        res.status(401)
        throw new Error('Invalid Name or Password')
    }
})


// @desc    register new User
// @route   POST /api/users/
// @access  Public

export const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

    const user = await User.findOne({email})
    if (user ){
        res.status(400)
        throw new Error('User Email already exists')
    }

    const newUser = await User.create({
        name, email, password
    })

    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            name,
            email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser._id)
        })
    }else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

export const getUSerProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user){
        const {_id, name, email, isAdmin} = user

        res.json(
            {
                _id,name,email,isAdmin
            }
        )

    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

})



// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user){
        const {name, email, password} = req.body
        user.name = name || user.name
        user.email = email || user.email
        if (password){
            user.password = password
        }

        const updatedProfile = await user.save()
        res.json(
            {
                _id: updatedProfile._id,
                name: updatedProfile.name,
                email: updatedProfile.email,
                isAdmin: updatedProfile.isAdmin,
                token: generateToken(updatedProfile._id)
            }
        )


    }
    else {
        res.status(404)
        throw new Error('User not found')
    }

    res.send('success')
})
