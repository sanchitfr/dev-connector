const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route    api/profile/me
//@desc     Get current user's profile
//@access   Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({user : req.user.id}).populate('user', ['name', 'avatar']);

        if(!profile){
           return res.status(400).json({ msg: 'No profile exists for this user'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    api/profile
//@desc     Create a new user profile
//@access   Private
router.post('/', [auth, [
    check('status', "Status is required").not().isEmpty(),
    check('skills',"Skills are required").not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;

    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //build social links object
    profileFields.social = {};

    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    
    try{
        let profile = await Profile.findOne({ user: req.user.id });

        if(profile){
            //update
            profile = await Profile.findOneAndUpdate({user: req.user.id},
            {$set: profileFields},
            {new: true}
            );
            return res.json(profile);
        }

        //create new profile
        profile = new Profile(profileFields); 
        await profile.save();
        return res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/user/:user_id
//@desc     Get profile by user ID
//@access   Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: 'Profile not found.'});

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') return res.status(400).json({ msg: 'Profile not found.'});
        res.status(500).send('Server Error');
    }
});

//@route    DELETE api/profile/
//@desc     Delete profile, user and posts
//@access   Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo delete posts

        //delete profile
        await Profile.findOneAndRemove({ user: req.user.id });

        //delete user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User removed' });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    PUT api/profile/experience
//@desc     Add experiences to profile
//@access   Private
router.put('/experience', [auth, [

    check('title').notEmpty(),
    check('company').notEmpty(),
    check('from').notEmpty()
]], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    };

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

});

//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete experience
//@access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {

        //Fetch 
        const profile = await Profile.findOne({ user: req.user.id });

        //delete experience
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    PUT api/profile/education
//@desc     Add educations to profile
//@access   Private
router.put('/education', [auth, [

    check('school').notEmpty(),
    check('degree').notEmpty(),
    check('fieldofstudy').notEmpty()
]], async (req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array() })
    };

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    DELETE api/profile/education/:exp_id
//@desc     Delete education
//@access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {

        //Fetch 
        const profile = await Profile.findOne({ user: req.user.id });

        //delete experience
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    Get api/profile/github/:username
//@desc     Get github repos by username
//@access   Public
router.get('/github/:username', (req, res) => {

    try {
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method:'GET',
            headers:{'user-agent' : 'node.js'}
        };

        request(options, (error, response, body)=> {
            if(error) console.error(error);

            if(response.statusCode !=200){
               return res.status(404).json({ msg : 'No Github profile found'});
            }
            res.json(JSON.parse(body));
        })
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;